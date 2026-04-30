# Despliegue Docker (perfil de correo electrónico)

La Suite de correo electrónico DockFlare consta de dos microservicios adicionales: el **Mail Manager** y el **Webmail PWA**. Estos servicios son opcionales y se gestionan mediante **perfiles** de Docker Compose.

## Activar el perfil de correo electrónico

Para iniciar DockFlare con soporte de correo electrónico, debe incluir el perfil `email` en sus comandos de Docker Compose.

### Iniciar los contenedores
```bash
docker compose --profile email up -d
```

### Detener los contenedores
Si ejecuta `docker compose down`, se detendrán todos los servicios, incluido el correo. Para reiniciar con correo, recuerde incluir el perfil:
```bash
docker compose --profile email up -d
```

## Configuración de Docker Compose

Los servicios de correo ya están incluidos en el `docker-compose.yml` predeterminado. Las secciones relevantes son:

```yaml
  dockflare-mail-manager:
    image: alplat/dockflare-mail-manager:stable
    container_name: dockflare-mail-manager
    restart: unless-stopped
    profiles: ["email"]
    environment:
      - DOCKFLARE_MASTER_URL=http://dockflare:5000
      - MAIL_DATA_PATH=/data
    volumes:
      - mail_data:/data
    depends_on:
      dockflare:
        condition: service_started
    networks:
      - cloudflare-net
      - dockflare-internal

  dockflare-webmail:
    image: alplat/dockflare-webmail:stable
    container_name: dockflare-webmail
    restart: unless-stopped
    profiles: ["email"]
    environment:
      - DOCKFLARE_MASTER_URL=https://dockflare.TLD  # reemplazar con su dominio
    labels:
      - dockflare.enable=true
      - dockflare.hostname=mail.dockflare.TLD  # reemplazar con su dominio
      - dockflare.service=http://dockflare-webmail:80
    depends_on:
      dockflare-mail-manager:
        condition: service_started
    networks:
      - cloudflare-net
      - dockflare-internal

volumes:
  mail_data:
```

> **Importante:** Antes de iniciar el perfil de correo, actualice los dos valores de marcador de posición en el servicio `dockflare-webmail`:
> - `DOCKFLARE_MASTER_URL` — la URL HTTPS pública de su DockFlare Master (ej. `https://dockflare.example.com`)
> - Etiqueta `dockflare.hostname` — el subdominio donde Webmail será accesible (ej. `mail.example.com`)

## Descripción de los servicios

| Servicio | Descripción | Puerto |
| :--- | :--- | :--- |
| `dockflare-mail-manager` | El motor backend que procesa MIME, gestiona SQLite y maneja webhooks. | Solo interno |
| `dockflare-webmail` | La aplicación frontend basada en Vue para los usuarios. | 80 (Interno) |

## Volúmenes persistentes

La Suite de correo introduce un nuevo volumen: `mail_data`.

*   **Ubicación:** `/data` dentro del contenedor `mail-manager`.
*   **Contenido:**
    *   `/data/db/mail.db`: La base de datos SQLite con todos los metadatos de mensajes e índices de búsqueda.
    *   `/data/attachments/`: El almacenamiento en el sistema de archivos para todos los archivos adjuntos.
*   **Importante:** **Nunca elimine este volumen** a menos que desee borrar permanentemente todos los correos almacenados. Asegúrese de incluirlo en su estrategia de copias de seguridad.

## Verificación

Una vez iniciados los contenedores, compruebe su estado en la interfaz DockFlare Master bajo el elemento de navegación **Correo electrónico**. Debería ver un estado «En ejecución» (verde) para ambos servicios en la tarjeta **Estado de los contenedores**.
