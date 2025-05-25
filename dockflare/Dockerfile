# DockFlare: Automates Cloudflare Tunnel ingress from Docker labels.
# Copyright (C) 2025 ChrispyBacon-Dev <https://github.com/ChrispyBacon-dev/DockFlare>


# Stage 1: Build frontend assets
FROM node:20-alpine AS frontend-builder
LABEL stage=frontend-builder
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json* ./
# Install dependencies
RUN npm install

# Copy Tailwind and PostCSS configs
COPY tailwind.config.js postcss.config.js ./

# Copy the 'app' directory which contains templates and static sources
# This copies dockflare/app/* to /usr/src/app/app/*
COPY ./app ./app

# --- DEBUG: Check state after copying ./app and before mkdir ---
RUN echo "DEBUG: Contents of /usr/src/app after COPY ./app ./app:" && ls -Alp /usr/src/app
RUN echo "DEBUG: Contents of /usr/src/app/app after COPY ./app ./app:" && ls -Alp /usr/src/app/app
RUN echo "DEBUG: Details of /usr/src/app/app/static after COPY ./app ./app (if it exists):" && ls -ld /usr/src/app/app/static || echo "/usr/src/app/app/static does not exist yet"

# Ensure the output directory structure exists
# This creates /usr/src/app/app/static/css if it (and its parents) don't exist
RUN mkdir -p ./app/static/css

# --- DEBUG: Check state after mkdir -p ---
RUN echo "DEBUG: Details of /usr/src/app/app/static AFTER mkdir -p:" && ls -ld /usr/src/app/app/static
RUN echo "DEBUG: Contents of /usr/src/app/app/static AFTER mkdir -p:" && ls -Alp /usr/src/app/app/static

# Build CSS. Your package.json script is:
# "build:css": "tailwindcss -c ./tailwind.config.js -i ./app/templates/input.css -o ./app/static/css/output.css --minify"
# This should create /usr/src/app/app/static/css/output.css
RUN npm run build:css || (echo "npm run build:css FAILED"; exit 1)

# --- DEBUG: Check state after npm run build:css ---
RUN echo "DEBUG: Details of /usr/src/app/app/static AFTER npm run build:css:" && ls -ld /usr/src/app/app/static || echo "/usr/src/app/app/static NOT FOUND after build"
RUN echo "DEBUG: Contents of /usr/src/app/app/static AFTER npm run build:css:" && ls -Alp /usr/src/app/app/static || echo "/usr/src/app/app/static NOT FOUND after build"
RUN echo "DEBUG: Specifically checking for /usr/src/app/app/static/css/output.css AFTER npm run build:css:"
RUN ls -l /usr/src/app/app/static/css/output.css || echo "/usr/src/app/app/static/css/output.css NOT FOUND after build"

# Stage 2: Setup Python runtime environment
FROM python:3.13-slim AS runtime
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

ENV CLOUDFLARED_VERSION="2024.1.5"
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "amd64" ]; then \
        CLOUDFLARED_ARCH="linux-amd64"; \
    elif [ "$ARCH" = "arm64" ]; then \
        CLOUDFLARED_ARCH="linux-arm64"; \
    else \
        echo "Unsupported architecture: $ARCH" && exit 1; \
    fi && \
    wget -q "https://github.com/cloudflare/cloudflared/releases/download/${CLOUDFLARED_VERSION}/cloudflared-${CLOUDFLARED_ARCH}.deb" && \
    dpkg -i "cloudflared-${CLOUDFLARED_ARCH}.deb" && \
    rm "cloudflared-${CLOUDFLARED_ARCH}.deb" && \
    cloudflared --version && \
    mkdir -p /root/.cloudflared

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the built CSS file
COPY --from=frontend-builder /usr/src/app/app/static/css/output.css /app/static/css/output.css

# Copy the application code
COPY ./app /app
ENV PYTHONPATH=/
EXPOSE 5000
CMD ["python", "main.py"]