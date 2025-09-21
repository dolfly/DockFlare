# Quick Start (Docker Compose)

This guide will walk you through the fastest way to get DockFlare up and running using Docker Compose.

### 1. Create the `docker-compose.yml` file

First, create a `docker-compose.yml` file with the following content. This configuration uses the stable image of DockFlare, maps the required Docker socket, provisions Redis for caching/queueing, and sets up persistent volumes for both DockFlare and Redis.

```yaml
version: '3.8'
services:
  dockflare:
    image: alplat/dockflare:stable
    container_name: dockflare
    restart: unless-stopped
    ports:
      - "5000:5000" # Exposes the web UI on the default port
    volumes:
      # Mount the Docker socket (read-only)
      - /var/run/docker.sock:/var/run/docker.sock:ro
      
      # This volume is crucial for persisting your encrypted configuration
      - ./dockflare_data:/app/data
    environment:
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - redis
    networks:
      - cloudflare-net
      - dockflare-internal
    # Optional: publish the DockFlare UI itself via Cloudflare
    # labels:
    #   - "dockflare.enable=true"
    #   - "dockflare.hostname=dockflare.domain.tld"
    #   - "dockflare.service=http://dockflare:5000"

  redis:
    image: redis:7-alpine
    container_name: dockflare-redis
    restart: unless-stopped
    command: ["redis-server", "--save", "", "--appendonly", "no"]
    volumes:
      - ./dockflare_redis:/data
    networks:
      - dockflare-internal

# This volume stores your encrypted credentials and state
volumes:
  dockflare_data:
  dockflare_redis:

# It is recommended to use an external network for your services
networks:
  cloudflare-net:
    name: cloudflare-net
    external: true
  dockflare-internal:
    name: dockflare-internal
```

**Notes:**
- Before running the compose file, ensure the external network `cloudflare-net` exists: `docker network create cloudflare-net`.
- The private `dockflare-internal` network isolates Redis so only the DockFlare container can access it, even if other services join `cloudflare-net`.

### 2. Run DockFlare

Once you have saved the `docker-compose.yml` file, you can start DockFlare with the following command:

```bash
docker compose up -d
```

This will pull the latest stable image and start the DockFlare container in the background.

### 3. Complete the Pre-Flight Setup

After starting the container, open your web browser and navigate to `http://<your-server-ip>:5000`.

You will be greeted by the **Pre-Flight Setup Wizard**. This one-time process will guide you through:
1.  Creating a password for the Web UI.
2.  Entering your Cloudflare credentials (Account ID, Zone ID, and API Token).
3.  Configuring your initial Cloudflare Tunnel.
 4.  *(Optional)* Restoring from a full DockFlare backup archive. If you already have a `dockflare_backup_*.zip`, choose **Restore from backup** before Step 1—the wizard will import your configuration and automatically restart the container.

### 4. For Existing Users (Upgrading)

If you are upgrading from an older version of DockFlare that used a `.env` file, DockFlare will automatically detect it. You will be guided through a simple migration process to import your existing settings and create a password for the new secure setup.
