# E-Mail-Voraussetzungen & Einrichtung

Bevor Sie die E-Mail-Suite aktivieren, stellen Sie sicher, dass Ihre Umgebung und Ihr Cloudflare-Konto korrekt konfiguriert sind.

## Cloudflare-Anforderungen

1.  **Domain-Verwaltung:** Ihre Domain muss in Cloudflare aktiv sein.
2.  **E-Mail-Routing:** Die Domain muss für Cloudflare E-Mail-Routing berechtigt sein (auf den meisten Tarifen verfügbar, einschließlich Free) und für Cloudflare E-Mail-Versand (Beta-Zugang für ausgehende Mails erforderlich).
3.  **R2-Speicher:** R2 muss in Ihrem Cloudflare-Dashboard aktiviert sein. R2 beinhaltet ein kostenloses Kontingent von 10 GB; zur Aktivierung kann jedoch eine Zahlungsmethode erforderlich sein.

## API-Token-Berechtigungen

Die E-Mail-Suite benötigt zusätzliche Berechtigungen für Ihr vorhandenes DockFlare-API-Token. Aktualisieren Sie es unter **Benutzerprofil > API-Token** und fügen Sie folgende Berechtigungen hinzu:

| Bereich | Spezifische Berechtigung | Zugriffsebene | Zweck |
| :--- | :--- | :--- | :--- |
| **Account** | **Workers Scripts** | **Bearbeiten** | Bereitstellung von Inbound-/Outbound-Workern |
| **Account** | **Workers KV Storage** | **Bearbeiten** | Echtzeit-Quota-Durchsetzung am Edge |
| **Account** | **R2 Storage** | **Bearbeiten** | Erstellen und Verwalten von Transit-Buckets |
| **Zone** | **E-Mail-Routing** | **Bearbeiten** | Routing aktivieren und Regeln verwalten |
| **Zone** | **DNS** | **Bearbeiten** | Erstellen von MX-, SPF-, DMARC- und DKIM-Einträgen |

> **Sicherheitshinweis:** Es wird dringend empfohlen, die „Account Resources" und „Zone Resources" dieses Tokens auf das spezifische Konto und die Domains zu beschränken, die Sie mit DockFlare verwenden möchten.

## Systemanforderungen

*   **DockFlare:** v3.1.0 oder höher.
*   **Docker:** v20.10+.
*   **Docker Compose:** v2.20+ (erforderlich für `profiles`-Unterstützung).
*   **Speicherplatz:** Stellen Sie sicher, dass auf dem Host-System ausreichend Speicherplatz für das `mail_data`-Volume vorhanden ist, in dem alle E-Mail-Datenbanken und Anhänge gespeichert werden.
