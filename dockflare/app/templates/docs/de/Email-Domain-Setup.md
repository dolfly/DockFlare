# Domain-Einrichtung & Konfiguration

Sobald Ihre Docker-Container mit dem `email`-Profil laufen, können Sie den automatisierten Einrichtungsprozess in der DockFlare Web-UI starten.

## Der E-Mail-Einrichtungsassistent

1.  Navigieren Sie zur Seite **E-Mail** in der linken Seitenleiste.
2.  Klicken Sie auf **E-Mail-Domain einrichten**.
3.  Wählen Sie die **Cloudflare-Zone** (Domain) aus, die Sie konfigurieren möchten.
4.  Klicken Sie auf **Einrichtung bestätigen**.

### Was passiert während der Einrichtung?
DockFlare führt mehrere automatisierte Schritte über die Cloudflare-API durch:
*   **E-Mail-Routing aktivieren** für Ihre Zone.
*   **DNS konfigurieren:** Erstellt MX-Einträge, SPF (TXT), DMARC (TXT) und DKIM (CNAME) gemäß den Anforderungen von Cloudflare E-Mail-Routing.
*   **Speicher bereitstellen:** Erstellt einen dedizierten R2-Bucket für den temporären Transit-Puffer.
*   **Worker bereitstellen:** Stellt einen Inbound Worker (zum Empfangen) und einen Outbound Worker (zum Senden) bereit.
*   **KV initialisieren:** Erstellt einen Cloudflare-KV-Namespace zum Verfolgen der Postfach-Quotas am Edge.

## DNS-Status prüfen

DNS-Änderungen können Zeit brauchen, um sich zu propagieren. Auf der E-Mail-Seite sehen Sie eine Karte **DNS-Einträge**.
*   Klicken Sie auf **DNS prüfen**, um den aktuellen Status Ihrer MX-, SPF- und DMARC-Einträge zu überprüfen. (DKIM wird automatisch von Cloudflare E-Mail-Routing verwaltet und wird hier nicht separat geprüft.)
*   Das System zeigt grüne Badges an, wenn die Einträge korrekt im öffentlichen DNS erkannt wurden.

## Worker aktualisieren / neu bereitstellen

Wenn Sie Ihre DockFlare-Version aktualisieren oder API-Berechtigungen ändern, müssen Sie möglicherweise Ihre Worker aktualisieren.
*   Klicken Sie auf **Worker neu bereitstellen**.
*   Dies lädt die neueste Worker-Logik neu und synchronisiert alle Bindungen (R2, KV, Webhook-Secrets) neu, ohne Ihre gespeicherten E-Mail-Daten zu beeinflussen.

## Domain entfernen

Wenn Sie das E-Mail-Hosting für eine Domain beenden möchten:
*   Klicken Sie auf **Domain entfernen**.
*   Dies entfernt Routing-Regeln, Inbound-/Outbound-Worker, den R2-Transit-Bucket und DNS-Einträge aus Cloudflare.
*   **Hinweis:** Dadurch werden Ihre lokalen E-Mail-Daten im `mail_data`-Volume *nicht* gelöscht. Aktivieren Sie **Lokale Daten einschließen** im Entfernen-Dialog, wenn Sie auch die auf Ihrem Server gespeicherten Nachrichten und Anhänge löschen möchten.
