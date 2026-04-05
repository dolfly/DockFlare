#!/bin/sh
MASTER_URL="${DOCKFLARE_MASTER_URL:-}"
echo "{\"masterUrl\": \"${MASTER_URL}\"}" > /usr/share/nginx/html/config.json
exec nginx -g "daemon off;"
