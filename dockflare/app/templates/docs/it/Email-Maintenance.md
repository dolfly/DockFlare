# Manutenzione e risoluzione dei problemi

DockFlare Email è progettato per richiedere poca manutenzione, ma capire come gestire i backup e i problemi comuni è importante per l'affidabilità a lungo termine.

## Backup e ripristino

Tutti i tuoi dati e-mail sono archiviati nel volume Docker `mail_data`. Per eseguire un backup:

1.  **Backup completo del volume:** Esegui il backup dell'intera cartella del volume sul tuo host. Questa è l'opzione più sicura poiché cattura il database SQLite grezzo e tutti i file allegati.
2.  **Backup dall'interfaccia:** Nella pagina **E-mail**, trova la scheda **Backup e ripristino** e fai clic su **Scarica backup**. Questo genera un archivio ZIP dei tuoi dati e-mail. Nota: questo backup contiene e-mail e allegati in testo normale — conservalo in modo sicuro.

Per ripristinare:
1.  Assicurati che il volume `mail_data` sia montato nel tuo `docker-compose.yml`.
2.  Nella pagina **E-mail**, nella scheda **Backup e ripristino**, seleziona il tuo file ZIP e fai clic su **Ripristina backup**. Questo sovrascriverà definitivamente i dati e-mail esistenti.

## Log

Il debug dei problemi di consegna richiede spesso di esaminare i log del container `dockflare-mail-manager`.

```bash
docker logs -f dockflare-mail-manager
```

La pagina E-mail include anche una scheda **Log di consegna**. Fai clic su **Analizza** per aprire il visualizzatore di log, che ha due schede:
*   **Log in uscita:** Cronologia di tutti i tentativi di invio e-mail.
*   **Log dei rimbalzi:** Cronologia di tutti i fallimenti di consegna (NDR) per le e-mail inviate.

## Resilienza e auto-riparazione

### Buffering R2
Se il tuo server va offline (es. interruzione di corrente, problemi di rete), il Cloudflare Inbound Worker rileva che il tuo webhook locale non è raggiungibile. Mantiene l'e-mail al sicuro nella **cache temporanea R2**.
*   Il worker esegue un **Cron Job** ogni 5 minuti.
*   Tenterà automaticamente di consegnare le e-mail in buffer fino al ripristino del server.

### Parità del filesystem
Il Mail Manager include una routine di avvio che garantisce la sincronizzazione tra database e filesystem. Se un file allegato esiste senza un record nel database («orfano»), verrà eliminato automaticamente per risparmiare spazio.

## Problemi comuni

### «Worker Error» nei log
Assicurati che il tuo token API abbia le autorizzazioni `Workers Scripts` e `Workers KV Storage`. Se hai aggiornato DockFlare di recente, potrebbe essere necessario fare clic su **Ridistribuisci Worker** nella pagina E-mail per sincronizzare le nuove variabili d'ambiente.

### La posta è in ritardo
Controlla i log **Cron** nella dashboard di Cloudflare Worker. Se il tuo server locale è sotto carico pesante o ha problemi di rete, il worker metterà le e-mail in buffer su R2 e le consegnerà quando il server risponderà.
