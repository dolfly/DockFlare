# E-Mail-Suite – Überblick

DockFlare Email ist ein vollständig selbst gehostetes, souveränes E-Mail-System, das auf Ihrer bestehenden DockFlare-Infrastruktur aufbaut. Es bietet den Komfort cloudbasierter E-Mail-Dienste bei gleichzeitiger Wahrung von Datenschutz und Kontrolle.

## Das Konzept der souveränen E-Mail

Traditionell ist das Selbsthosten von E-Mail schwierig, da private IP-Adressen von großen Anbietern blockiert werden („Home-IP-Blacklisting"). DockFlare löst dieses Problem, indem Cloudflare als **statusloses Zustellnetzwerk** genutzt wird:

1.  **Cloudflare** übernimmt die schwere Arbeit der SMTP-Zustellung, des MX-Routings und der temporären Pufferung.
2.  **DockFlare** besitzt die Daten. Ihre Nachrichten, Anhänge und Postfachkonfigurationen werden auf Ihrer eigenen Hardware gespeichert.

Es werden keine E-Mail-Inhalte dauerhaft in der Cloudflare-Infrastruktur gespeichert. Sie werden während des Transits kurz in einem R2-Bucket gepuffert und sofort gelöscht, nachdem der lokale Mail Manager sie verarbeitet hat.

## Architektur

Das System besteht aus mehreren integrierten Komponenten:

*   **Eingehend:** Internet → Cloudflare E-Mail-Routing → Inbound Worker → R2-Puffer → DockFlare Mail Manager Webhook → Lokaler Speicher.
*   **Ausgehend:** Webmail-UI → Mail Manager API → Outbound Worker → Cloudflare `send_email` → Internet.
*   **Datensouveränität:** Alle E-Mails werden geparst und in einer lokalen SQLite-Datenbank gespeichert; Anhänge werden im lokalen Dateisystem abgelegt.

## Hauptfunktionen

*   **Multi-Domain-Unterstützung:** Hosten Sie E-Mails für beliebig viele Domains, die Sie in Cloudflare verwalten.
*   **Edge-Quota-Durchsetzung:** Postfach voll? Cloudflare Workers lehnen die E-Mail auf SMTP-Ebene ab (5.2.2), bevor sie Ihren Server erreicht und Bandbreite verbraucht.
*   **Volltextsuche:** Blitzschnelle Suche in allen E-Mails mittels SQLite FTS5.
*   **Privacy First:** Alle API-Interaktionen nutzen EdDSA-JWT-Authentifizierung. HTML-E-Mail-Inhalte werden vor der Darstellung bereinigt, um XSS und Tracking-Pixel zu verhindern.
*   **PWA-Webmail:** Ein moderner, mobil-responsiver Webmail-Client, der auf Ihrem Telefon oder Desktop installiert werden kann.
*   **Push-Benachrichtigungen:** Erhalten Sie in Echtzeit Benachrichtigungen über neue E-Mails via Web Push (VAPID).
*   **Ausfallsicherheit:** Wenn Ihr Server offline geht, puffert Cloudflare R2 Ihre eingehenden E-Mails und versucht die Zustellung automatisch alle 5 Minuten erneut.
