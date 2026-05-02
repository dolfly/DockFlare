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

## Ausgehende Nachrichten – Tarife & Einschränkungen

Cloudflare Email Sending (Beta) bietet je nach Cloudflare-Tarif zwei Stufen:

| Empfänger | Free-Tarif | Workers Paid Plan (5 $/Monat) |
| :--- | :--- | :--- |
| Verifizierte Cloudflare-Adressen (im CF-Konto bestätigte Adressen) | ✅ Erlaubt | ✅ Erlaubt |
| Beliebige externe Adressen | ❌ Nicht erlaubt | ✅ Erlaubt |

DockFlare richtet die DKIM-Signierschlüssel und die Versandsubdomain (`mail.ihredomain.com`) automatisch während der Domain-Einrichtung ein. **Für den vollständigen externen Versand sind jedoch zwei zusätzliche manuelle Schritte erforderlich:**

1. **Upgrade auf den Cloudflare Workers Paid Plan** – verfügbar für 5 $/Monat in Ihrem Cloudflare-Dashboard.
2. **CF Email Sending (Beta) aktivieren** – navigieren Sie in Ihrem [Cloudflare-Dashboard → E-Mail → E-Mail-Versand](https://dash.cloudflare.com/) und aktivieren Sie die Funktion für Ihr Konto.

Bis diese Schritte abgeschlossen sind, werden ausgehende E-Mails nur an E-Mail-Adressen zugestellt, die in Ihrem Cloudflare-Konto verifiziert sind. Das Domain-Status-Badge auf der DockFlare E-Mail-Verwaltungsseite zeigt an, ob DKIM konfiguriert ist (`Sending: Active`) oder noch nicht eingerichtet wurde (`Sending: Pending`).

## Hauptfunktionen

*   **Multi-Domain-Unterstützung:** Hosten Sie E-Mails für beliebig viele Domains, die Sie in Cloudflare verwalten.
*   **Edge-Quota-Durchsetzung:** Postfach voll? Cloudflare Workers lehnen die E-Mail auf SMTP-Ebene ab (5.2.2), bevor sie Ihren Server erreicht und Bandbreite verbraucht.
*   **Volltextsuche:** Blitzschnelle Suche in allen E-Mails mittels SQLite FTS5.
*   **Privacy First:** Alle API-Interaktionen nutzen EdDSA-JWT-Authentifizierung. HTML-E-Mail-Inhalte werden vor der Darstellung bereinigt, um XSS und Tracking-Pixel zu verhindern.
*   **PWA-Webmail:** Ein moderner, mobil-responsiver Webmail-Client, der auf Ihrem Telefon oder Desktop installiert werden kann.
*   **Push-Benachrichtigungen:** Erhalten Sie in Echtzeit Benachrichtigungen über neue E-Mails via Web Push (VAPID).
*   **Ausfallsicherheit:** Wenn Ihr Server offline geht, puffert Cloudflare R2 Ihre eingehenden E-Mails und versucht die Zustellung automatisch alle 5 Minuten erneut.
