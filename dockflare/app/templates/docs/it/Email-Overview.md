# Panoramica della Suite e-mail

DockFlare Email è un sistema di posta elettronica completamente auto-ospitato e sovrano, costruito sulla tua infrastruttura DockFlare esistente. È progettato per offrire la comodità della posta elettronica cloud con la privacy e il controllo dell'auto-hosting.

## Il concetto di e-mail sovrana

Tradizionalmente, ospitare autonomamente un server di posta è difficile a causa del «blocco degli IP residenziali»: gli indirizzi IP domestici vengono bloccati dai principali provider di posta. DockFlare risolve questo problema utilizzando Cloudflare come **rete di consegna senza stato**:

1.  **Cloudflare** si occupa del lavoro pesante: consegna SMTP, routing MX e buffering temporaneo.
2.  **DockFlare** è il proprietario dei dati. I tuoi messaggi, gli allegati e le configurazioni delle caselle sono archiviati sul tuo hardware.

Nessun contenuto e-mail persiste nell'infrastruttura di Cloudflare. Viene temporaneamente memorizzato in un bucket R2 durante il transito e rimosso immediatamente dopo che il Mail Manager locale lo elabora.

## Architettura

Il sistema è composto da diversi componenti integrati:

*   **Flusso in entrata:** Internet → Cloudflare Email Routing → Inbound Worker → Buffer R2 → Webhook DockFlare Mail Manager → Archiviazione locale.
*   **Flusso in uscita:** Interfaccia Webmail → API Mail Manager → Outbound Worker → Cloudflare `send_email` → Internet.
*   **Sovranità dei dati:** Tutte le e-mail vengono analizzate e archiviate in un database SQLite locale, con gli allegati salvati nel filesystem locale.

## Invio in uscita – Piani e limitazioni

Cloudflare Email Sending (Beta) prevede due livelli in base al piano Cloudflare:

| Destinatario | Piano gratuito | Workers Paid Plan (5 $/mese) |
| :--- | :--- | :--- |
| Indirizzi Cloudflare verificati (confermati nel proprio account CF) | ✅ Consentito | ✅ Consentito |
| Qualsiasi indirizzo esterno | ❌ Non consentito | ✅ Consentito |

DockFlare configura automaticamente i record di firma DKIM e il sottodominio di invio (`mail.tuodominio.com`) durante la configurazione del dominio. Tuttavia, **l'invio esterno completo richiede due ulteriori passaggi manuali:**

1. **Passare al Cloudflare Workers Paid Plan** – disponibile a 5 $/mese nella dashboard Cloudflare.
2. **Attivare CF Email Sending (Beta)** – accedere alla [Dashboard Cloudflare → Email → Email Sending](https://dash.cloudflare.com/) e abilitare la funzione per il proprio account.

Fino al completamento di questi passaggi, le e-mail in uscita dal client webmail verranno consegnate solo agli indirizzi verificati nel proprio account Cloudflare. Il badge di stato del dominio nella pagina di gestione e-mail di DockFlare indica se DKIM è configurato (`Sending: Active`) o non ancora impostato (`Sending: Pending`).

## Funzionalità principali

*   **Supporto multi-dominio:** Ospita la posta per tutti i domini che gestisci su Cloudflare.
*   **Applicazione delle quote all'edge:** Casella piena? I Cloudflare Workers rifiutano l'e-mail a livello SMTP (5.2.2) prima ancora che raggiunga il tuo server, risparmiando larghezza di banda.
*   **Ricerca full-text:** Ricerca fulminea in tutte le tue e-mail grazie a SQLite FTS5.
*   **Privacy al primo posto:** Tutte le interazioni API utilizzano l'autenticazione EdDSA JWT. Il contenuto HTML delle e-mail viene sanitizzato prima del rendering per prevenire XSS e pixel di tracciamento.
*   **Webmail PWA:** Un client webmail moderno e responsive, installabile su smartphone o desktop.
*   **Notifiche push:** Ricevi notifiche in tempo reale per le nuove e-mail tramite Web Push (VAPID).
*   **Resilienza:** Se il tuo server va offline, Cloudflare R2 mette in buffer le e-mail in entrata e riprova la consegna automaticamente ogni 5 minuti.
