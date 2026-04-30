# Docker-Deployment (E-Mail-Profil)

D DockFlare E-Mail-Suite bstoht us zwei zusätzliche Microservices: em **Mail Manager** u em **Webmail PWA**. Die Dienschte sind optional u wärde über Docker Compose **Profile** verwaltet.

## E-Mail-Profil aktiviere

Um DockFlare mit E-Mail-Unterstützig z starte, muesch s `email`-Profil i dine Docker-Compose-Befehle aagäh.

### Container starte
```bash
docker compose --profile email up -d
```

### Container stoppe
Wenn du `docker compose down` usfürisch, wärde alli Dienschte inklusive E-Mail gstoppt. Um mit E-Mail neu z starte, vergiss s Profil nöd:
```bash
docker compose --profile email up -d
```

## Docker Compose-Konfiguration

D E-Mail-Dienschte sind scho i de Standard-`docker-compose.yml` derbi. D relevante Abschnitte sind:

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
      - DOCKFLARE_MASTER_URL=https://dockflare.TLD  # ersetze mit diner Domain
    labels:
      - dockflare.enable=true
      - dockflare.hostname=mail.dockflare.TLD  # ersetze mit diner Domain
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

> **Wichtig:** Bevor du s E-Mail-Profil startesch, ersetze d zwei Platzhalterwert im `dockflare-webmail`-Diensch:
> - `DOCKFLARE_MASTER_URL` — d öffentlichi HTTPS-URL vo dim DockFlare Master (z.B. `https://dockflare.example.com`)
> - Label `dockflare.hostname` — d Subdomain, wo Webmail erreichbar isch (z.B. `mail.example.com`)

## Dienschtübersicht

| Diensch | Beschriibig | Port |
| :--- | :--- | :--- |
| `dockflare-mail-manager` | S Backend, wo MIME verarbeitet, SQLite verwaltet u Webhooks behandlet. | Nur intern |
| `dockflare-webmail` | D Vue-basierti Frontend-Applikation für Benutzer. | 80 (Intern) |

## Persistenti Volumes

D E-Mail-Suite füehrt es nöis Volume ii: `mail_data`.

*   **Pfad:** `/data` im `mail-manager`-Container.
*   **Inhalt:**
    *   `/data/db/mail.db`: D SQLite-Datebank mit allne Nochrichtige-Metadate u Suchindize.
    *   `/data/attachments/`: D Filesystem-Spycherig für alli E-Mail-Ahäng.
*   **Wichtig:** **Lösch das Volume nie**, es sei denn, du wottsch alli gspicherete E-Mails permanent lösche. Stell sicher, dass das Volume i dinere Backup-Strategie drinn isch.

## Verifizierig

Sobald d Container gstartet sind, prüef ihre Status i de DockFlare Master-UI under em Menüpunkt **E-Mail**. Du söttesch en grüene „Running"-Status für beidi Dienschte i de Charte **Container-Status** gseh.
