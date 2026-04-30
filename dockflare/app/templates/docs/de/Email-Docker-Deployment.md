# Docker-Deployment (E-Mail-Profil)

Die DockFlare E-Mail-Suite besteht aus zwei zusätzlichen Microservices: dem **Mail Manager** und dem **Webmail PWA**. Diese Dienste sind optional und werden über Docker Compose **Profile** verwaltet.

## E-Mail-Profil aktivieren

Um DockFlare mit E-Mail-Unterstützung zu starten, müssen Sie das `email`-Profil in Ihren Docker-Compose-Befehlen angeben.

### Container starten
```bash
docker compose --profile email up -d
```

### Container stoppen
Wenn Sie `docker compose down` ausführen, werden alle Dienste einschließlich E-Mail gestoppt. Um mit E-Mail neu zu starten, vergessen Sie nicht das Profil:
```bash
docker compose --profile email up -d
```

## Docker Compose-Konfiguration

Die E-Mail-Dienste sind bereits in der Standard-`docker-compose.yml` enthalten. Die relevanten Abschnitte sind:

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
      - DOCKFLARE_MASTER_URL=https://dockflare.TLD  # durch Ihre Domain ersetzen
    labels:
      - dockflare.enable=true
      - dockflare.hostname=mail.dockflare.TLD  # durch Ihre Domain ersetzen
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

> **Wichtig:** Bevor Sie das E-Mail-Profil starten, ersetzen Sie die beiden Platzhalter im `dockflare-webmail`-Dienst:
> - `DOCKFLARE_MASTER_URL` — die öffentliche HTTPS-URL Ihres DockFlare Masters (z. B. `https://dockflare.example.com`)
> - Label `dockflare.hostname` — die Subdomain, unter der Webmail erreichbar sein soll (z. B. `mail.example.com`)

## Dienstübersicht

| Dienst | Beschreibung | Port |
| :--- | :--- | :--- |
| `dockflare-mail-manager` | Das Backend, das MIME verarbeitet, SQLite verwaltet und Webhooks behandelt. | Nur intern |
| `dockflare-webmail` | Die Vue-basierte Frontend-Anwendung für Benutzer. | 80 (Intern) |

## Persistente Volumes

Die E-Mail-Suite führt ein neues Volume ein: `mail_data`.

*   **Pfad:** `/data` im `mail-manager`-Container.
*   **Inhalt:**
    *   `/data/db/mail.db`: Die SQLite-Datenbank mit allen Nachrichten-Metadaten und Suchindizes.
    *   `/data/attachments/`: Der Dateisystem-Speicher für alle E-Mail-Anhänge.
*   **Wichtig:** **Löschen Sie dieses Volume niemals**, es sei denn, Sie möchten alle gespeicherten E-Mails dauerhaft entfernen. Stellen Sie sicher, dass dieses Volume in Ihrer Host-Backup-Strategie berücksichtigt wird.

## Verifizierung

Sobald die Container gestartet sind, überprüfen Sie ihren Status in der DockFlare Master-UI unter dem Menüpunkt **E-Mail**. Sie sollten den Status „Läuft" (grün) für beide Dienste in der Karte **Container-Status** sehen.
