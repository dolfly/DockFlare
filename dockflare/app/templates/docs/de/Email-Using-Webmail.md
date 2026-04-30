# Webmail verwenden (PWA)

DockFlare enthält einen modernen, responsiven Webmail-Client, mit dem Sie Ihre E-Mails von jedem Gerät aus verwalten können.

## Webmail aufrufen

Es gibt zwei Möglichkeiten, sich bei Webmail anzumelden:

1.  **SSO (Single Sign-On):** Wenn Sie als Administrator in der DockFlare Master-UI angemeldet sind, klicken Sie auf der E-Mail-Seite auf **Webmail öffnen**. Sie werden automatisch authentifiziert und in Ihren Postfächern angemeldet.
2.  **Direktanmeldung:** Navigieren Sie zu `https://mail.ihredomain.de`. Wenn Sie in der Master-UI ein Passwort für Ihr Postfach festgelegt haben, können Sie sich direkt mit Ihrer E-Mail-Adresse und Ihrem Passwort anmelden.

## Als PWA installieren

DockFlare Webmail ist eine **Progressive Web App (PWA)**. Das bedeutet, Sie können sie auf Ihrem Gerät für ein app-ähnliches Erlebnis installieren.

### Auf Mobilgeräten (iOS/Android) (mobile Unterstützung derzeit noch in Entwicklung)
*   Öffnen Sie die Webmail-URL in Ihrem mobilen Browser.
*   **iOS:** Tippen Sie auf das „Teilen"-Symbol und wählen Sie **Zum Home-Bildschirm hinzufügen**.
*   **Android:** Tippen Sie auf die drei Punkte und wählen Sie **App installieren** oder **Zum Startbildschirm hinzufügen**.

### Auf dem Desktop (Chrome/Edge/Brave)
*   Suchen Sie das „Installieren"-Symbol in der Adressleiste (üblicherweise ein kleiner Monitor mit einem Pfeil nach unten).
*   Klicken Sie auf **Installieren**.

## Hauptfunktionen

*   **Suche:** Nutzen Sie die Suchleiste, um E-Mails zu finden. DockFlare verwendet Volltextsuche (FTS5), um Betreff, Absender und Nachrichtentext lokal zu indizieren.
*   **Push-Benachrichtigungen:** Aktivieren Sie Benachrichtigungen in den Webmail-Einstellungen, um Echtzeit-Benachrichtigungen für neue E-Mails auf Ihrem Desktop oder Mobilgerät zu erhalten.

## Sicherheit

*   **EdDSA-Authentifizierung:** Webmail verwendet hochsichere Ed25519-JSON-Web-Tokens (JWT), die vom DockFlare Master ausgestellt werden, für alle API-Interaktionen.
*   **HTML-Bereinigung:** Alle eingehenden HTML-E-Mails werden vor der Darstellung bereinigt (mittels DOMPurify), um Sie vor Cross-Site-Scripting (XSS) und Tracking-Pixeln zu schützen.
