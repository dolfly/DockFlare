# Webmail bruuche (PWA)

DockFlare beinhaltet en modernen, responsive Webmail-Client, wo dir ermöglicht, dini E-Mails vo jedem Gerät us z verwalte.

## Webmail ufruefe

Es git zwei Wäg, sech bi Webmail aamälde:

1.  **SSO (Single Sign-On):** Wenn du als Admin i de DockFlare Master-UI aaglöggt bisch, klick uf **Webmail öffne** uf de E-Mail-Syte. Du wirsch automatisch authentifiziert u i dini Postfächer iigloggt.
2.  **Direktes Login:** Navigier zu `https://mail.dinedomain.com`. Wenn du i de Master-UI es Passwort für dis Postfach gstellt häsch, chasch dich direkt mit dinere E-Mail-Adrässe u dim Passwort aalögge.

## Als PWA installiere

DockFlare Webmail isch e **Progressive Web App (PWA)**. Das bedütet, du chasch si uf dim Gerät installiere für en App-ähnlichi Erfahrig.

### Uf Mobile (iOS/Android) (mobile Unterstützig wird no entwicklet)
*   Öffne d Webmail-URL i dim Mobile-Browser.
*   **iOS:** Tipp uf s „Teile"-Symbol u wähl **Zum Home-Bildschirm zuefiege**.
*   **Android:** Tipp uf d drei Punkt u wähl **App installiere** oder **Zum Startbildschirm zuefiege**.

### Uf em Desktop (Chrome/Edge/Brave)
*   Suech s „Installiere"-Symbol i de Adräsleischte (meischtens en chlyne Monitor mit emene Pfyl nach unne).
*   Klick uf **Installiere**.

## Hauptfunktione

*   **Suech:** Nutze d Suchleischte, um E-Mails z finde. DockFlare nutzt Volltext-Suech (FTS5), um dini Betreffe, Absender u Nochrichteninhalte lokal z indexiere.
*   **Push-Benachrichtigunge:** Aktivier Benachrichtigunge i de Webmail-Istellige, um Echtzeit-Alarme für neui E-Mails uf dim Desktop oder Mobile-Gerät z kriege.

## Sicherheit

*   **EdDSA-Authentifizierig:** Webmail nutzt hochsicherheits Ed25519-JSON-Web-Tokens (JWT), wo vom DockFlare Master usgstellt wärde, für alli API-Interaktione.
*   **HTML-Bräinigig:** Alli ikommende HTML-E-Mails wärde vor em Rendere bräinigt (mit DOMPurify), um dich vor Cross-Site-Scripting (XSS) u Tracking-Pixel z schütze.
