# ... (imports and other functions remain the same) ...
# --- Flask Web Server ---
app = Flask(__name__)
app.secret_key = os.urandom(24) # Needed for potential future flash messages

@app.route('/')
def status_page():
    """Displays the current tunnel status and controls."""
    update_cloudflared_container_status()
    with state_lock:
        # Create a deep copy for safe iteration and modification in template if needed
        # Also ensures datetimes are converted for display
        template_rules = json.loads(json.dumps(managed_rules, default=str))

    display_token = "Not available"
    if tunnel_state.get("token"):
        token = tunnel_state["token"]
        if len(token) > 10: display_token = f"{token[:5]}...{token[-5:]}"
        else: display_token = "Token retrieved (short)"

    # Use the same HTML template structure, but add the form/button in the table
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Cloudflare Tunnel Manager</title>
        <style>
            body { font-family: sans-serif; padding: 20px; background-color: #f4f4f4; color: #333; }
            h1, h2, h3 { color: #555; }
            .container { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; vertical-align: top; } /* Align top */
            th { background-color: #f2f2f2; }
            td pre { margin: 0; background-color: transparent; padding: 0; white-space: pre-wrap; word-break: break-all;}
            .status-box { padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-top: 10px; word-wrap: break-word; }
            .error { background-color: #ffebeb; border-color: #ffc2c2; color: #a00; }
            .success { background-color: #e6ffed; border-color: #c3e6cb; color: #155724;}
            .info { background-color: #e7f3fe; border-color: #b8daff; color: #004085;}
            .warning { background-color: #fff3cd; border-color: #ffeeba; color: #856404;}
            .status-active { color: green; }
            .status-pending { color: orange; }
            .button { padding: 10px 15px; border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 1em; margin-right: 10px; }
            .small-button { padding: 5px 10px; font-size: 0.9em; } /* Smaller button */
            .start-button { background-color: #28a745; }
            .stop-button { background-color: #dc3545; }
            .delete-button { background-color: #dc3545; } /* Red for delete */
            .button:disabled { background-color: #cccccc; cursor: not-allowed; opacity: 0.6; }
            form { display: inline-block; margin: 0; } /* Adjust form display */
        </style>
    </head>
    <body>
        <h1>Cloudflare Tunnel Manager</h1>

        <!-- Initialization & Tunnel Details (Unchanged) -->
        <div class="container">
            <h2>Initialization Status</h2>
            <div class="status-box {{ 'error' if tunnel_state.get('error') else ('success' if tunnel_state.get('token') else 'info') }}">
                <p><strong>Message:</strong> {{ tunnel_state.status_message }}</p>
                {% if tunnel_state.get('error') %}
                <p><strong>Error Details:</strong> <pre>{{ tunnel_state.error }}</pre></p>
                {% endif %}
            </div>
            <h3>Tunnel Details</h3>
            <p><strong>Desired Tunnel Name:</strong> <pre>{{ tunnel_state.name }}</pre></p>
            <p><strong>Tunnel ID:</strong> <pre>{{ tunnel_state.id if tunnel_state.id else 'Not available' }}</pre></p>
            <p><strong>Tunnel Token:</strong> <pre>{{ display_token }}</pre></p>
        </div>

        <!-- Agent Control (Unchanged) -->
        <div class="container">
             <h2>Tunnel Agent Control (<pre>{{ cloudflared_container_name }}</pre>)</h2>
             <p><strong>Agent Container Status:</strong>
                <strong style="text-transform: capitalize;"
                        class="{{ 'success' if agent_state.container_status == 'running' else ('error' if 'error' in agent_state.container_status or 'unavailable' in agent_state.container_status or agent_state.container_status == 'dead' else ('warning' if agent_state.container_status == 'exited' else 'info')) }}">
                  {{ agent_state.container_status.replace('_', ' ') }}
                </strong>
             </p>
             {% if agent_state.last_action_status %}
             <div class="status-box {{ 'error' if 'Error' in agent_state.last_action_status else 'info' }}">
                <strong>Last Action Result:</strong> {{ agent_state.last_action_status }}
             </div>
             {% endif %}
             <form action="{{ url_for('start_tunnel') }}" method="post" style="margin-right: 10px;"> <button type="submit" class="button start-button" {{ 'disabled' if not tunnel_state.get('token') or agent_state.container_status == 'running' or not docker_client }}> Start Tunnel Agent</button> </form>
             <form action="{{ url_for('stop_tunnel') }}" method="post"> <button type="submit" class="button stop-button" {{ 'disabled' if agent_state.container_status != 'running' or not docker_client }}> Stop Tunnel Agent</button> </form>
        </div>

        <!-- Managed Rules Table -->
        <div class="container">
            <h2>Managed Ingress Rules</h2>
            {% if rules %}
            <table>
                <thead>
                    <tr>
                        <th>Hostname</th>
                        <th>Service Target</th>
                        <th>Status</th>
                        <th>Managing Container</th>
                        <th>Delete Scheduled At (UTC)</th>
                        <th>Actions</th> <!-- New Column -->
                    </tr>
                </thead>
                <tbody>
                    {% for hostname, details in rules.items() %}
                    <tr>
                        <td><pre>{{ hostname }}</pre></td>
                        <td><pre>{{ details.service }}</pre></td>
                        <td><strong class="{{ 'status-active' if details.status == 'active' else 'status-pending' }}">{{ details.status }}</strong></td>
                        <td><pre>{{ details.container_id[:12] if details.container_id else 'N/A' }}</pre></td>
                        <td>{{ details.delete_at if details.status == 'pending_deletion' else 'N/A' }}</td>
                        <td>
                            <!-- Add Force Delete Form/Button -->
                            <form action="{{ url_for('force_delete_rule', hostname=hostname) }}" method="post"
                                  onsubmit="return confirm('Are you sure you want to force delete the rule for {{ hostname }} immediately? This bypasses the grace period.');">
                                <button type="submit" class="button delete-button small-button">Force Delete</button>
                            </form>
                        </td>
                    </tr>
                    {% endfor %}
                </tbody>
            </table>
            {% else %}
            <p>No ingress rules are currently being managed.</p>
            {% endif %}
        </div>

    </body>
    </html>
    """
    return render_template_string(
        html_template,
        tunnel_state=tunnel_state,
        agent_state=cloudflared_agent_state,
        display_token=display_token,
        cloudflared_container_name=CLOUDFLARED_CONTAINER_NAME,
        docker_client=docker_client,
        rules=template_rules # Pass the managed rules to the template
    )

# --- Action Routes ---

@app.route('/start', methods=['POST'])
def start_tunnel():
    start_cloudflared_container()
    return redirect(url_for('status_page'))

@app.route('/stop', methods=['POST'])
def stop_tunnel():
    stop_cloudflared_container()
    return redirect(url_for('status_page'))

# --- NEW ROUTE for Force Delete ---
@app.route('/force_delete/<hostname>', methods=['POST'])
def force_delete_rule(hostname):
    """Immediately removes a rule from state and triggers CF update."""
    logging.info(f"Received request to force delete rule for hostname: {hostname}")
    state_changed = False
    update_success = False

    with state_lock:
        if hostname in managed_rules:
            logging.info(f"Removing rule for {hostname} from local state.")
            del managed_rules[hostname]
            state_changed = True
            # Note: We don't save state *yet*. Save only if CF update succeeds.
        else:
            logging.warning(f"Attempted to force delete rule for {hostname}, but it was not found in managed state.")
            # Set a status message?
            cloudflared_agent_state["last_action_status"] = f"Warning: Rule for {hostname} not found in state for force deletion."
            return redirect(url_for('status_page')) # Redirect even if not found

    # If state was changed, trigger Cloudflare update (outside the state lock)
    if state_changed:
        logging.info(f"Triggering Cloudflare config update after force deleting {hostname} from state.")
        if update_cloudflare_config():
            # Save state ONLY if the Cloudflare update was successful
            logging.info(f"Cloudflare update successful after force delete. Saving state.")
            save_state()
            cloudflared_agent_state["last_action_status"] = f"Successfully force deleted rule for {hostname}."
        else:
            # CF update failed! State is now inconsistent.
            logging.error(f"CRITICAL: Failed to update Cloudflare config after removing {hostname} from local state. State is inconsistent!")
            # Attempt to reload state from file to revert? Risky.
            # Or, just log the error prominently.
            cloudflared_agent_state["last_action_status"] = f"Error: Failed to push force delete for {hostname} to Cloudflare. State potentially inconsistent!"
            # We intentionally DO NOT save state here. The rule is gone locally but maybe still in CF.
            # Reconciliation on next restart *should* fix it eventually.

    return redirect(url_for('status_page'))


# --- Main Execution ---
# (No changes needed in the main block)
if __name__ == '__main__':
    # ... (rest of the main block remains the same) ...
    logging.info("Application starting up...")
    load_state()
    logging.info("State loading complete.")
    try: initialize_tunnel()
    except Exception as init_err: logging.error(f"Unhandled exception during initialize_tunnel: {init_err}", exc_info=True)
    logging.info(f"Tunnel initialization complete. Status: {tunnel_state.get('status_message')}")

    logging.info(f"Checking tunnel state before agent start: ID={tunnel_state.get('id')}, Token Present={bool(tunnel_state.get('token'))}")
    if tunnel_state.get("id") and tunnel_state.get("token"):
         logging.info("Tunnel is initialized. Proceeding with reconciliation and agent start.")
         try: reconcile_state(); logging.info("Reconciliation complete.")
         except Exception as recon_err: logging.error(f"Error during initial reconciliation: {recon_err}", exc_info=True)
         logging.info("Attempting to automatically start tunnel agent...")
         agent_started_ok = False
         try: agent_started_ok = start_cloudflared_container()
         except Exception as start_err: logging.error(f"Unhandled exception calling start_cloudflared_container: {start_err}", exc_info=True); cloudflared_agent_state["last_action_status"] = f"Error: Unhandled exception during start ({start_err})"
         if agent_started_ok: logging.info("Call to start_cloudflared_container returned success.")
         else: logging.warning("Call to start_cloudflared_container returned failure.")
    else: logging.warning("Tunnel not fully initialized, skipping agent start and background tasks.")

    logging.info("Proceeding to background task and Flask setup.")
    if docker_client and tunnel_state.get("id"):
        logging.info("Starting background threads for Docker events and cleanup.")
        event_thread = threading.Thread(target=docker_event_listener, name="DockerEventListener", daemon=True)
        cleanup_thread = threading.Thread(target=cleanup_expired_rules, name="CleanupTask", daemon=True)
        event_thread.start(); cleanup_thread.start()
    else: logging.warning("Background tasks disabled (Docker client or Tunnel not ready).")

    logging.info("Starting Flask application server...")
    try: app.run(host='0.0.0.0', port=5000, use_reloader=False)
    except Exception as flask_err: logging.error(f"Flask server encountered an error: {flask_err}", exc_info=True)

    logging.info("Flask app stopping or encountered error, signalling background threads...")
    stop_event.set()
    logging.info("Exiting application.")