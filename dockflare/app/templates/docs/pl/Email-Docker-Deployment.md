# Wdrożenie Docker (profil poczty e-mail)

Pakiet poczty e-mail DockFlare składa się z dwóch dodatkowych mikroserwisów: **Mail Manager** i **Webmail PWA**. Usługi te są opcjonalne i zarządzane za pomocą **profili** Docker Compose.

## Włączanie profilu poczty e-mail

Aby uruchomić DockFlare z obsługą poczty e-mail, musisz dołączyć profil `email` do poleceń Docker Compose.

### Uruchamianie kontenerów
```bash
docker compose --profile email up -d
```

### Zatrzymywanie kontenerów
Jeśli uruchomisz `docker compose down`, zostaną zatrzymane wszystkie usługi, w tym poczta e-mail. Aby ponownie uruchomić z pocztą, pamiętaj o dołączeniu profilu:
```bash
docker compose --profile email up -d
```

## Konfiguracja Docker Compose

Usługi poczty e-mail są już zawarte w domyślnym pliku `docker-compose.yml`. Odpowiednie sekcje to:

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
      - DOCKFLARE_MASTER_URL=https://dockflare.TLD  # zastąp własną domeną
    labels:
      - dockflare.enable=true
      - dockflare.hostname=mail.dockflare.TLD  # zastąp własną domeną
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

> **Ważne:** Przed uruchomieniem profilu poczty e-mail zaktualizuj dwie wartości zastępcze w usłudze `dockflare-webmail`:
> - `DOCKFLARE_MASTER_URL` — publiczny adres URL HTTPS Twojego DockFlare Master (np. `https://dockflare.example.com`)
> - Etykieta `dockflare.hostname` — subdomena, pod którą Webmail będzie dostępny (np. `mail.example.com`)

## Opis usług

| Usługa | Opis | Port |
| :--- | :--- | :--- |
| `dockflare-mail-manager` | Silnik backendowy przetwarzający MIME, zarządzający SQLite i obsługujący webhooki. | Tylko wewnętrzny |
| `dockflare-webmail` | Aplikacja frontendowa oparta na Vue dla użytkowników. | 80 (wewnętrzny) |

## Trwałe wolumeny

Pakiet poczty e-mail wprowadza nowy wolumen: `mail_data`.

*   **Lokalizacja:** `/data` wewnątrz kontenera `mail-manager`.
*   **Zawartość:**
    *   `/data/db/mail.db`: Baza danych SQLite zawierająca wszystkie metadane wiadomości i indeksy wyszukiwania.
    *   `/data/attachments/`: Magazyn systemu plików dla wszystkich załączników e-mail.
*   **Ważne:** **Nigdy nie usuwaj tego wolumenu**, chyba że chcesz trwale skasować wszystkie przechowywane e-maile. Upewnij się, że wolumen jest uwzględniony w strategii tworzenia kopii zapasowych.

## Weryfikacja

Po uruchomieniu kontenerów sprawdź ich status w interfejsie DockFlare Master w pozycji nawigacyjnej **Poczta e-mail**. W karcie **Status kontenerów** powinieneś zobaczyć zielony status „Uruchomiony" dla obu usług.
