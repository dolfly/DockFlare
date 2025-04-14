import os
import subprocess
import sys
import logging
import re
import docker # Import Docker SDK
from docker.errors import NotFound, APIError
from flask import Flask, jsonify, render_template_string, redirect, url_for, request
from dotenv import load_dotenv
import time # For potential waits

# --- Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
load_dotenv() # Load environment variables from .env file

CF_API_TOKEN = os.getenv('CF_API_TOKEN')
TUNNEL_NAME = os.getenv('TUNNEL_NAME')
CF_ACCOUNT_ID = os.getenv('CF_ACCOUNT_ID') # <-- Read Account ID

# Name for the separate cloudflared container we will manage
CLOUDFLARED_CONTAINER_NAME = os.getenv('CLOUDFLARED_CONTAINER_NAME', f"cloudflared-agent-{TUNNEL_NAME}")
# Cloudflared Docker image
CLOUDFLARED_IMAGE = "cloudflare/cloudflared:latest"

# --- Environment Variable Checks ---
if not CF_API_TOKEN:
    logging.error("FATAL: CF_API_TOKEN environment variable not set.")
    sys.exit(1)
if not TUNNEL_NAME:
    logging.error("FATAL: TUNNEL_NAME environment variable not set.")
    sys.exit(1)
if not CF_ACCOUNT_ID: # <-- Add Account ID check
    logging.error("FATAL: CF_ACCOUNT_ID environment variable not set.")
    sys.exit(1)

# --- Docker Client ---
try:
    docker_client = docker.from_env()
    docker_client.ping() # Check connection
    logging.info("Successfully connected to Docker daemon.")
except Exception as e:
    logging.error(f"FATAL: Failed to connect to Docker daemon: {e}")
    logging.error("Ensure Docker is running and the socket is mounted correctly if applicable.")
    docker_client = None


# --- Global State ---
tunnel_state = {
    "name": TUNNEL_NAME,
    "id": None,
    "token": None,
    "status_message": "Initializing...",
    "error": None,
    "cloudflared_container_status": "unknown", # e.g., running, exited, not_found
    "last_action_status": None, # Feedback after start/stop
}

# --- Cloudflared Helper ---
def run_cloudflared_command(command_args):
    """Runs a cloudflared command with debug logging and returns its output."""
    # Prepend the debug flag and main command
    base_command = ['cloudflared', '--loglevel', 'debug'] # <-- Add debug flag
    command = base_command + command_args

    env = os.environ.copy()
    env['CF_API_TOKEN'] = CF_API_TOKEN # Ensure token is in environment
    env['CF_ACCOUNT_ID'] = CF_ACCOUNT_ID # <-- Pass Account ID to environment
    env['NONINTERACTIVE'] = '1'      # Try to prevent interactive prompts

    # Ensure TUNNEL_ORIGIN_CERT is NOT explicitly set here

    logging.info(f"Running command: {' '.join(command)}")
    logging.info(f"Using environment CF_ACCOUNT_ID={env.get('CF_ACCOUNT_ID')}") # Log Account ID usage

    try:
        result = subprocess.run(
            command, # Use the command with debug flag
            capture_output=True,
            text=True,
            check=True,
            env=env, # Pass the modified environment
            timeout=90 # Slightly longer timeout for debug
        )
        # Log stdout/stderr even on success when debugging might be useful
        logging.info(f"Command successful. stdout:\n{result.stdout}")
        if result.stderr:
             # stderr might contain debug logs, log as info unless it looks like an error
             if "ERR" in result.stderr or "error" in result.stderr.lower() or "fail" in result.stderr.lower():
                  logging.warning(f"Command stderr (potential error):\n{result.stderr}")
             else:
                  logging.info(f"Command stderr (debug logs):\n{result.stderr}") # Log debug output from stderr

        return result.stdout.strip(), result.stderr.strip()
    except subprocess.CalledProcessError as e:
        logging.error(f"Command failed: {' '.join(command)}")
        logging.error(f"Return code: {e.returncode}")
        # Log the full stdout/stderr from the failed command
        logging.error(f"stdout:\n{e.stdout}")
        logging.error(f"stderr:\n{e.stderr}") # This stderr is critical for debugging failure
        # Store the more detailed stderr in state
        if "Docker API error" not in str(tunnel_state.get("error","")):
            error_detail = e.stderr.strip() if e.stderr else f"Exited with status {e.returncode}"
            tunnel_state["error"] = f"Cloudflared Error: {error_detail}"
        raise # Re-raise the exception
    except subprocess.TimeoutExpired:
        logging.error(f"Command timed out: {' '.join(command)}")
        tunnel_state["error"] = "Cloudflared command timed out."
        raise
    except Exception as e:
        logging.error(f"Error running command {' '.join(command)}: {e}", exc_info=True)
        tunnel_state["error"] = f"Subprocess execution error: {e}"
        raise

# --- Tunnel Management Logic ---
# (No changes needed in find_tunnel_id, create_tunnel, get_tunnel_token itself)
# (Error logging within initialize_tunnel is slightly refined to rely on run_cloudflared_command setting state['error'])
def find_tunnel_id(name):
    """Finds the tunnel ID by its name."""
    try:
        stdout, _ = run_cloudflared_command(['tunnel', 'list'])
        lines = stdout.splitlines()
        for line in lines[1:]: # Skip header
            parts = line.split()
            if len(parts) >= 2:
                 if parts[1] == name: # Check the second column specifically for the name
                     tunnel_id = parts[0]
                     logging.info(f"Found existing tunnel '{name}' with ID: {tunnel_id}")
                     return tunnel_id
    except Exception:
        # Error is logged and state['error'] is set within run_cloudflared_command
        # Re-raising allows initialize_tunnel to catch it if needed, but state is set
        raise
    return None

def create_tunnel(name):
    """Creates a new tunnel."""
    try:
        stdout, _ = run_cloudflared_command(['tunnel', 'create', name])
        match = re.search(r'tunnel\s+.*\s+with id\s+([a-f0-9-]+)', stdout, re.IGNORECASE)
        if match:
            tunnel_id = match.group(1)
            logging.info(f"Successfully created tunnel '{name}' with ID: {tunnel_id}")
            return tunnel_id
        else:
             logging.error(f"Could not parse tunnel ID from creation output: {stdout}")
             if not tunnel_state.get("error"): # Set error if not already set by subprocess fail
                 tunnel_state["error"] = "Could not parse tunnel ID from creation output."
             return None
    except Exception:
        # Error is logged and state['error'] is set within run_cloudflared_command
        raise
    return None # Should be unreachable if exception is raised, but for completeness

def get_tunnel_token(tunnel_identifier):
    """Gets the token for a given tunnel ID or name."""
    try:
        token, _ = run_cloudflared_command(['tunnel', 'token', tunnel_identifier])
        logging.info(f"Successfully retrieved token for tunnel: {tunnel_identifier}")
        return token
    except Exception:
        # Error is logged and state['error'] is set within run_cloudflared_command
        raise
    return None # Should be unreachable

def initialize_tunnel():
    """Checks for the tunnel, creates if needed, and gets the token."""
    tunnel_state["status_message"] = f"Checking for tunnel '{TUNNEL_NAME}'..."
    tunnel_state["error"] = None # Clear previous errors at start of initialization
    tunnel_id = None
    try:
        tunnel_id = find_tunnel_id(TUNNEL_NAME)
        # If find_tunnel_id failed, run_cloudflared_command has set state['error'] and raised Exception
    except Exception:
        tunnel_state["status_message"] = "Failed during tunnel check (see error details)."
        return # Stop if listing failed

    # Proceed only if listing didn't explicitly fail (no exception raised)
    if not tunnel_id:
        tunnel_state["status_message"] = f"Tunnel '{TUNNEL_NAME}' not found. Creating..."
        try:
            tunnel_id = create_tunnel(TUNNEL_NAME)
             # If create_tunnel failed, run_cloudflared_command has set state['error'] and raised Exception
        except Exception:
             tunnel_state["status_message"] = "Failed during tunnel creation (see error details)."
             return # Stop if creation failed

        if not tunnel_id:
            # This case happens if create_tunnel didn't raise but returned None (e.g., couldn't parse ID)
            if not tunnel_state.get("error"): # Check if error was already set
                 tunnel_state["error"] = "Failed to create tunnel (no specific error)."
            tunnel_state["status_message"] = "Failed to create tunnel (see error details)."
            return # Stop

    # Proceed only if we have an ID
    if tunnel_id:
        tunnel_state["id"] = tunnel_id
        tunnel_state["status_message"] = f"Fetching token for tunnel ID {tunnel_id}..."
        token = None
        try:
            token = get_tunnel_token(tunnel_id)
             # If get_tunnel_token failed, run_cloudflared_command has set state['error'] and raised Exception
        except Exception:
            tunnel_state["status_message"] = "Failed during token retrieval (see error details)."
            return # Stop

        if token:
            tunnel_state["token"] = token
            tunnel_state["status_message"] = "Tunnel setup complete."
            tunnel_state["error"] = None # Clear errors if we reached success
        else:
            # This case happens if get_tunnel_token didn't raise but returned None
            if not tunnel_state.get("error"): # Check if error was already set
                 tunnel_state["error"] = "Failed to retrieve tunnel token (no specific error)."
            tunnel_state["status_message"] = "Failed to retrieve tunnel token (see error details)."

    # If we finish and still have no tunnel_id and no error, something is wrong
    elif not tunnel_state.get("error"):
         tunnel_state["status_message"] = "Tunnel initialization incomplete."
         tunnel_state["error"] = "Tunnel ID was not found or created, but no specific error was recorded."


# --- Docker Container Management ---
# (This section remains unchanged)
def get_cloudflared_container():
    """Gets the cloudflared container object if it exists."""
    if not docker_client:
        logging.warning("Docker client not available.")
        return None
    try:
        container = docker_client.containers.get(CLOUDFLARED_CONTAINER_NAME)
        return container
    except NotFound:
        return None
    except APIError as e:
        logging.error(f"Docker API error getting container: {e}")
        tunnel_state["error"] = f"Docker API error: {e}"
        return None

def update_cloudflared_container_status():
    """Updates the tunnel_state with the current container status."""
    if not docker_client:
        tunnel_state["cloudflared_container_status"] = "docker_unavailable"
        return
    container = get_cloudflared_container()
    if container:
        try:
            container.reload()
            tunnel_state["cloudflared_container_status"] = container.status
        except (NotFound, APIError) as e:
            logging.warning(f"Error reloading container status: {e}")
            tunnel_state["cloudflared_container_status"] = "not_found"
    else:
        if "Docker API error" not in str(tunnel_state.get("error", "")):
             tunnel_state["cloudflared_container_status"] = "not_found"
        else:
             tunnel_state["cloudflared_container_status"] = "docker_error"


def start_cloudflared_container():
    """Starts the cloudflared agent container."""
    tunnel_state["last_action_status"] = None
    if not docker_client:
        msg = "Docker client not available. Cannot start container."
        logging.error(msg)
        tunnel_state["last_action_status"] = f"Error: {msg}"
        return False
    if not tunnel_state.get("token"):
        msg = "Tunnel token not available. Cannot start container."
        logging.error(msg)
        tunnel_state["last_action_status"] = f"Error: {msg}"
        if not tunnel_state.get("id"):
             initialize_tunnel()
             if not tunnel_state.get("token"):
                 return False
        else:
             token_retry = get_tunnel_token(tunnel_state.get("id"))
             if token_retry:
                 tunnel_state["token"] = token_retry
             else:
                 msg = "Tunnel token not available (retrieval failed previously). Cannot start container."
                 logging.error(msg)
                 tunnel_state["last_action_status"] = f"Error: {msg}"
                 return False

    token = tunnel_state["token"]
    container = get_cloudflared_container()

    try:
        if container:
            if container.status == 'running':
                msg = f"Container '{CLOUDFLARED_CONTAINER_NAME}' is already running."
                logging.info(msg)
                tunnel_state["last_action_status"] = msg
                return True
            else:
                logging.info(f"Starting existing container '{CLOUDFLARED_CONTAINER_NAME}'...")
                container.start()
                tunnel_state["last_action_status"] = f"Successfully started container '{CLOUDFLARED_CONTAINER_NAME}'."
                logging.info(tunnel_state["last_action_status"])
                time.sleep(2)
                update_cloudflared_container_status()
                return True
        else:
            logging.info(f"Container '{CLOUDFLARED_CONTAINER_NAME}' not found. Creating and starting...")
            try:
                logging.info(f"Pulling image {CLOUDFLARED_IMAGE}...")
                docker_client.images.pull(CLOUDFLARED_IMAGE)
            except APIError as img_err:
                 logging.warning(f"Could not pull image {CLOUDFLARED_IMAGE}: {img_err}. Proceeding with local version if available.")

            new_container = docker_client.containers.run(
                image=CLOUDFLARED_IMAGE,
                command=f"tunnel --no-autoupdate run --token {token}",
                name=CLOUDFLARED_CONTAINER_NAME,
                network_mode="host",
                restart_policy={"Name": "unless-stopped"},
                detach=True,
                remove=False
            )
            tunnel_state["last_action_status"] = f"Successfully created and started container '{new_container.name}'."
            logging.info(tunnel_state["last_action_status"])
            time.sleep(2)
            update_cloudflared_container_status()
            return True
    except APIError as e:
        msg = f"Docker API error starting container: {e}"
        logging.error(msg)
        tunnel_state["last_action_status"] = f"Error: {msg}"
        update_cloudflared_container_status()
        return False
    except Exception as e:
        msg = f"Unexpected error starting container: {e}"
        logging.error(msg, exc_info=True)
        tunnel_state["last_action_status"] = f"Error: {msg}"
        update_cloudflared_container_status()
        return False


def stop_cloudflared_container():
    """Stops the cloudflared agent container."""
    tunnel_state["last_action_status"] = None
    if not docker_client:
        msg = "Docker client not available. Cannot stop container."
        logging.error(msg)
        tunnel_state["last_action_status"] = f"Error: {msg}"
        return False

    container = get_cloudflared_container()

    if not container:
        msg = f"Container '{CLOUDFLARED_CONTAINER_NAME}' not found. Cannot stop."
        logging.warning(msg)
        tunnel_state["last_action_status"] = msg
        update_cloudflared_container_status()
        return True

    if container.status != 'running':
        msg = f"Container '{CLOUDFLARED_CONTAINER_NAME}' is not running (status: {container.status})."
        logging.info(msg)
        tunnel_state["last_action_status"] = msg
        update_cloudflared_container_status()
        return True

    try:
        logging.info(f"Stopping container '{CLOUDFLARED_CONTAINER_NAME}'...")
        container.stop(timeout=30)
        tunnel_state["last_action_status"] = f"Successfully stopped container '{CLOUDFLARED_CONTAINER_NAME}'."
        logging.info(tunnel_state["last_action_status"])
        time.sleep(2)
        update_cloudflared_container_status()
        return True
    except APIError as e:
        msg = f"Docker API error stopping container: {e}"
        logging.error(msg)
        tunnel_state["last_action_status"] = f"Error: {msg}"
        update_cloudflared_container_status()
        return False
    except Exception as e:
        msg = f"Unexpected error stopping container: {e}"
        logging.error(msg, exc_info=True)
        tunnel_state["last_action_status"] = f"Error: {msg}"
        update_cloudflared_container_status()
        return False

# --- Flask Web Server ---
# (This section remains unchanged)
app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/')
def status_page():
    """Displays the current tunnel status and controls."""
    update_cloudflared_container_status()

    display_token = "Not available"
    if tunnel_state.get("token"):
        token = tunnel_state["token"]
        if len(token) > 10:
            display_token = f"{token[:5]}...{token[-5:]}"
        else:
            display_token = "Token retrieved (short)"
    elif tunnel_state.get("error") and "token" in tunnel_state["error"].lower():
         display_token = "Failed to retrieve token"
    elif tunnel_state.get("id"):
        display_token = "Token not retrieved"

    display_error = tunnel_state.get("error") or (tunnel_state.get("last_action_status") and "Error" in tunnel_state["last_action_status"])

    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Cloudflare Tunnel Status</title>
        <style>
            body { font-family: sans-serif; padding: 20px; background-color: #f4f4f4; color: #333; }
            h1, h2 { color: #555; }
            .container { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
            .status-box { padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-top: 10px; word-wrap: break-word; }
            .error { background-color: #ffebeb; border-color: #ffc2c2; color: #a00; }
            .success { background-color: #e6ffed; border-color: #c3e6cb; color: #155724;}
            .info { background-color: #e7f3fe; border-color: #b8daff; color: #004085;}
            .warning { background-color: #fff3cd; border-color: #ffeeba; color: #856404;}
            pre { background-color: #eee; padding: 10px; border-radius: 3px; word-wrap: break-word; white-space: pre-wrap;}
            .button { padding: 10px 15px; border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 1em; margin-right: 10px; }
            .start-button { background-color: #28a745; } /* Green */
            .stop-button { background-color: #dc3545; } /* Red */
            .button:disabled { background-color: #cccccc; cursor: not-allowed; opacity: 0.6; }
            form { display: inline-block; }
        </style>
    </head>
    <body>
        <h1>Cloudflare Tunnel Manager</h1>

        <div class="container">
            <h2>Initialization Status</h2>
            <div class="status-box {{ 'error' if error else ('success' if token else 'info') }}">
                <p><strong>Message:</strong> {{ status_message }}</p>
                {% if error %}
                <p><strong>Error Details:</strong> <pre>{{ error }}</pre></p>
                {% endif %}
            </div>
            <h3>Tunnel Details</h3>
            <p><strong>Desired Tunnel Name:</strong> <pre>{{ name }}</pre></p>
            <p><strong>Tunnel ID:</strong> <pre>{{ id if id else 'Not available' }}</pre></p>
            <p><strong>Tunnel Token:</strong> <pre>{{ display_token }}</pre></p>
             <p><small>Note: Full token must be available internally to start the tunnel agent.</small></p>
        </div>

        <div class="container">
             <h2>Tunnel Agent Control (<pre>{{ cloudflared_container_name }}</pre>)</h2>
             <p><strong>Agent Container Status:</strong>
                <strong style="text-transform: capitalize;"
                        class="{{ 'success' if cloudflared_container_status == 'running' else ('error' if 'error' in cloudflared_container_status or 'unavailable' in cloudflared_container_status or cloudflared_container_status == 'dead' else ('warning' if cloudflared_container_status == 'exited' else 'info')) }}">
                  {{ cloudflared_container_status.replace('_', ' ') }}
                </strong>
             </p>

             {% if last_action_status %}
             <div class="status-box {{ 'error' if 'Error' in last_action_status else 'info' }}">
                <strong>Last Action Result:</strong> {{ last_action_status }}
             </div>
             {% endif %}

             <form action="{{ url_for('start_tunnel') }}" method="post" style="margin-right: 10px;">
                <button type="submit" class="button start-button"
                        {{ 'disabled' if not token or cloudflared_container_status == 'running' or not docker_client }}>
                    Start Tunnel Agent
                </button>
             </form>
             <form action="{{ url_for('stop_tunnel') }}" method="post">
                <button type="submit" class="button stop-button"
                        {{ 'disabled' if cloudflared_container_status != 'running' or not docker_client }}>
                    Stop Tunnel Agent
                </button>
             </form>
             <p><small>Agent control requires connection to Docker daemon.</small></p>
        </div>

    </body>
    </html>
    """
    return render_template_string(
        html_template,
        name=tunnel_state["name"],
        id=tunnel_state.get("id"),
        status_message=tunnel_state["status_message"],
        error=tunnel_state.get("error"),
        display_token=display_token,
        token=tunnel_state.get("token"),
        cloudflared_container_name=CLOUDFLARED_CONTAINER_NAME,
        cloudflared_container_status=tunnel_state["cloudflared_container_status"],
        last_action_status=tunnel_state.get("last_action_status"),
        docker_client=docker_client
    )

# --- Action Routes ---
# (Unchanged)
@app.route('/start', methods=['POST'])
def start_tunnel():
    logging.info("Received request to start tunnel agent.")
    start_cloudflared_container()
    return redirect(url_for('status_page'))

@app.route('/stop', methods=['POST'])
def stop_tunnel():
    logging.info("Received request to stop tunnel agent.")
    stop_cloudflared_container()
    return redirect(url_for('status_page'))


# --- Main Execution ---
# (Unchanged)
if __name__ == '__main__':
    try:
         initialize_tunnel()
    except Exception as init_err:
         logging.error(f"Unexpected error during initial tunnel setup: {init_err}", exc_info=True)
         if not tunnel_state.get("error"):
             tunnel_state["error"] = f"Initialization failed: {init_err}"
         tunnel_state["status_message"] = "Tunnel initialization failed."

    if docker_client:
        try:
            update_cloudflared_container_status()
        except Exception as docker_err:
            logging.error(f"Error getting initial Docker status: {docker_err}", exc_info=True)
            tunnel_state["cloudflared_container_status"] = "docker_error"

    logging.info("Starting Flask application server.")
    app.run(host='0.0.0.0', port=5000)