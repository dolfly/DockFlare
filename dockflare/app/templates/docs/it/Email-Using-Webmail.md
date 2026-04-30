# Uso della Webmail (PWA)

DockFlare include un client webmail moderno e responsive che ti consente di gestire le tue e-mail da qualsiasi dispositivo.

## Accesso alla Webmail

Ci sono due modi per accedere alla Webmail:

1.  **SSO (Single Sign-On):** Se sei un amministratore connesso all'interfaccia DockFlare Master, fai clic su **Apri Webmail** nella pagina E-mail. Verrai autenticato automaticamente e accederai alle tue caselle.
2.  **Accesso diretto:** Vai su `https://mail.tuodominio.com`. Se hai impostato una password per la tua casella nell'interfaccia Master, puoi accedere direttamente con il tuo indirizzo e-mail e la password.

## Installazione come PWA

La Webmail DockFlare è una **Progressive Web App (PWA)**. Puoi installarla sul tuo dispositivo per un'esperienza simile a un'app nativa.

### Su mobile (iOS/Android) (supporto mobile attualmente in sviluppo)
*   Apri l'URL della Webmail nel browser mobile.
*   **iOS:** Tocca l'icona «Condividi» e seleziona **Aggiungi alla schermata Home**.
*   **Android:** Tocca i tre puntini e seleziona **Installa app** o **Aggiungi alla schermata Home**.

### Su desktop (Chrome/Edge/Brave)
*   Cerca l'icona «Installa» nella barra degli indirizzi (di solito un piccolo monitor con una freccia verso il basso).
*   Fai clic su **Installa**.

## Funzionalità principali

*   **Ricerca:** Usa la barra di ricerca per trovare le e-mail. DockFlare utilizza la ricerca full-text (FTS5) per indicizzare localmente oggetti, mittenti e corpo dei messaggi.
*   **Notifiche push:** Abilita le notifiche nelle impostazioni della Webmail per ricevere avvisi in tempo reale per le nuove e-mail sul desktop o dispositivo mobile.

## Sicurezza

*   **Autenticazione EdDSA:** La Webmail utilizza token JSON Web ad alta sicurezza Ed25519 (JWT) emessi dal DockFlare Master per tutte le interazioni API.
*   **Sanitizzazione HTML:** Tutte le e-mail HTML in entrata vengono sanitizzate (tramite DOMPurify) prima del rendering per proteggerti da attacchi cross-site scripting (XSS) e pixel di tracciamento.
