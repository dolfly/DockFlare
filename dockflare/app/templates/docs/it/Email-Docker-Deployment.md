# Distribuzione Docker (profilo e-mail)

La Suite e-mail DockFlare è composta da due microservizi aggiuntivi: il **Mail Manager** e il **Webmail PWA**. Questi servizi sono facoltativi e gestiti tramite i **profili** di Docker Compose.

## Abilitazione del profilo e-mail

Per avviare DockFlare con il supporto e-mail, devi includere il profilo `email` nei comandi Docker Compose.

### Avvio dei container
```bash
docker compose --profile email up -d
```

### Arresto dei container
Se esegui `docker compose down`, verranno arrestati tutti i servizi, incluso quello e-mail. Per riavviare con la posta, ricorda di includere il profilo:
```bash
docker compose --profile email up -d
```

## Configurazione Docker Compose

I servizi e-mail sono già inclusi nel `docker-compose.yml` predefinito. Le sezioni rilevanti sono:

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
      - DOCKFLARE_MASTER_URL=https://dockflare.TLD  # sostituire con il proprio dominio
    labels:
      - dockflare.enable=true
      - dockflare.hostname=mail.dockflare.TLD  # sostituire con il proprio dominio
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

> **Importante:** Prima di avviare il profilo e-mail, aggiorna i due valori segnaposto nel servizio `dockflare-webmail`:
> - `DOCKFLARE_MASTER_URL` — l'URL HTTPS pubblico del tuo DockFlare Master (es. `https://dockflare.example.com`)
> - Etichetta `dockflare.hostname` — il sottodominio dove la Webmail sarà accessibile (es. `mail.example.com`)

## Descrizione dei servizi

| Servizio | Descrizione | Porta |
| :--- | :--- | :--- |
| `dockflare-mail-manager` | Il motore backend che elabora i MIME, gestisce SQLite e gestisce i webhook. | Solo interno |
| `dockflare-webmail` | L'applicazione frontend basata su Vue per gli utenti. | 80 (Interno) |

## Volumi persistenti

La Suite e-mail introduce un nuovo volume: `mail_data`.

*   **Posizione:** `/data` all'interno del container `mail-manager`.
*   **Contenuto:**
    *   `/data/db/mail.db`: Il database SQLite contenente tutti i metadati dei messaggi e gli indici di ricerca.
    *   `/data/attachments/`: L'archiviazione filesystem per tutti gli allegati e-mail.
*   **Importante:** **Non eliminare mai questo volume** a meno che tu non voglia cancellare definitivamente tutte le e-mail archiviate. Assicurati che questo volume sia incluso nella tua strategia di backup.

## Verifica

Una volta avviati i container, controlla il loro stato nell'interfaccia DockFlare Master sotto la voce di navigazione **E-mail**. Dovresti vedere lo stato «In esecuzione» (verde) per entrambi i servizi nella scheda **Stato dei container**.
