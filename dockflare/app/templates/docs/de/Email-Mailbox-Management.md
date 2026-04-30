# Postfach- & Quota-Verwaltung

Die Karte **Postfachverwaltung** auf der E-Mail-Seite ist der Ort, an dem Sie steuern, wer E-Mails empfangen darf und wie viel Speicherplatz erlaubt ist.

## Postfächer erstellen

1.  Klicken Sie auf **Postfach hinzufügen**.
2.  **Adresse:** Geben Sie den gewünschten Prefix ein (z. B. `info`). Die Domain wird automatisch angehängt.
3.  **Anzeigename:** Der Name, der Empfängern angezeigt wird (z. B. `Support-Team`).
4.  **Quota:** Wählen Sie das anfängliche Speicherlimit.

## Das Quota-System verstehen

DockFlare verwendet ein abgestuftes Quota-System, um sicherzustellen, dass Ihr Server nicht zu wenig Speicherplatz bekommt, und gleichzeitig eine angenehme Benutzererfahrung zu bieten.

### Soft Limit (Quota)
Wenn ein Postfach sein konfiguriertes Quota überschreitet:
*   Das System legt eine **Warn-E-Mail** von einer Systemadresse in den Posteingang des Benutzers.
*   Der Benutzer kann weiterhin E-Mails empfangen, bis das Hard Limit erreicht wird.
*   Die Quota-Leiste in der Master-UI wird **gelb**.

### Hard Limit (Ablehnung)
Das Hard Limit wird automatisch berechnet als **Soft Limit + 15 % (mindestens 10 MB Puffer)**.
*   **Edge-Ablehnung:** Die Ablehnung erfolgt am Cloudflare Edge. Der Mailserver des Absenders erhält den SMTP-Fehler **5.2.2 Mailbox full**.
*   Die E-Mail gelangt nie in Ihren R2-Transit-Bucket oder Ihren lokalen Server und spart Bandbreite.
*   Die Quota-Leiste in der Master-UI wird **rot**.

## Catch-All-Postfächer

Ein Catch-All-Postfach empfängt alle E-Mails, die an Ihre Domain gesendet werden und keinem vorhandenen, spezifischen Postfach entsprechen.
1.  Klicken Sie auf **Catch-All konfigurieren**.
2.  Wählen Sie ein Ziel-Postfach aus.
3.  Klicken Sie auf **Aktivieren**.

## Auto-Responder (Abwesenheitsmodus)

Sie können automatische Antworten für jedes Postfach einrichten:
1.  Klicken Sie auf das **Auto-Responder**-Symbol (Roboter) neben einem Postfach.
2.  Geben Sie Ihre Nachricht und den Betreff ein.
3.  Legen Sie einen **Datumsbereich** fest, in dem der Responder aktiv sein soll.
4.  **Antwortintervall:** Legen Sie fest, wie oft der Responder demselben Absender antworten soll (z. B. einmal alle 24 Stunden), um „E-Mail-Schleifen" zu verhindern.
