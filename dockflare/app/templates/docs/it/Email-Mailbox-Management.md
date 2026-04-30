# Gestione caselle e quote

La scheda **Gestione caselle** nella pagina E-mail è il punto in cui controlli chi può ricevere posta e quanta memoria può utilizzare.

## Creazione delle caselle

1.  Fai clic su **Aggiungi casella**.
2.  **Indirizzo:** Inserisci il prefisso desiderato (es. `info`). Il dominio viene aggiunto automaticamente.
3.  **Nome visualizzato:** Il nome mostrato ai destinatari (es. `Team supporto`).
4.  **Quota:** Seleziona il limite di archiviazione iniziale.

## Il sistema delle quote

DockFlare utilizza un sistema di quote a livelli per garantire che il tuo server non esaurisca lo spazio su disco, offrendo al contempo un'esperienza fluida agli utenti.

### Limite morbido (Quota)
Quando una casella supera la quota configurata:
*   Il sistema inserisce una **e-mail di avviso** da un indirizzo di sistema nella casella in entrata dell'utente.
*   L'utente può continuare a ricevere posta fino al raggiungimento del Limite rigido.
*   La barra della quota nell'interfaccia Master diventa **gialla**.

### Limite rigido (Rifiuto)
Il Limite rigido viene calcolato automaticamente come **Limite morbido + 15% (buffer minimo di 10 MB)**.
*   **Rifiuto all'edge:** Il rifiuto avviene all'edge di Cloudflare. Il server di posta del mittente riceve l'errore SMTP **5.2.2 Mailbox full**.
*   L'e-mail non entra mai nel tuo bucket R2 di transito né nel tuo server locale, risparmiando larghezza di banda.
*   La barra della quota nell'interfaccia Master diventa **rossa**.

## Caselle Catch-all

Una casella catch-all riceve tutte le e-mail inviate al tuo dominio che non corrispondono a nessuna casella specifica esistente.
1.  Fai clic su **Configura Catch-all**.
2.  Seleziona una casella di destinazione.
3.  Fai clic su **Abilita**.

## Risponditori automatici (Modalità assenza)

Puoi impostare risposte automatiche per qualsiasi casella:
1.  Fai clic sull'icona **Risponditore automatico** (robot) accanto a una casella.
2.  Inserisci il messaggio e l'oggetto.
3.  Imposta un **Intervallo di date** per quando il risponditore deve essere attivo.
4.  **Intervallo di risposta:** Imposta la frequenza con cui il risponditore deve rispondere allo stesso mittente (es. una volta ogni 24 ore) per evitare i «loop di e-mail».
