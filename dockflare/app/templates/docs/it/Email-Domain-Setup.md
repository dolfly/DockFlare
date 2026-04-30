# Configurazione del dominio

Una volta che i container Docker sono in esecuzione con il profilo `email`, puoi avviare il processo di configurazione automatizzato nell'interfaccia web di DockFlare.

## Il wizard di configurazione e-mail

1.  Naviga alla pagina **E-mail** nella barra laterale sinistra.
2.  Fai clic su **Configura dominio e-mail**.
3.  Seleziona la **Zona Cloudflare** (dominio) che desideri configurare.
4.  Fai clic su **Conferma configurazione**.

### Cosa avviene durante la configurazione?
DockFlare esegue diversi passaggi automatizzati tramite l'API Cloudflare:
*   **Abilita Email Routing** sulla tua zona.
*   **Configura il DNS:** Crea record MX, SPF (TXT), DMARC (TXT) e DKIM (CNAME) richiesti da Cloudflare Email Routing.
*   **Provisioning dello storage:** Crea un bucket R2 dedicato per il buffering temporaneo del transito.
*   **Distribuzione dei Worker:** Distribuisce un Inbound Worker (per ricevere la posta) e un Outbound Worker (per inviare la posta).
*   **Inizializzazione KV:** Crea un namespace Cloudflare KV per monitorare le quote delle caselle all'edge.

## Verifica dello stato DNS

Le modifiche DNS possono richiedere tempo per propagarsi. Nella pagina E-mail vedrai una scheda **Record DNS**.
*   Fai clic su **Verifica DNS** per controllare lo stato attuale dei tuoi record MX, SPF e DMARC. (DKIM è gestito automaticamente da Cloudflare Email Routing e non viene verificato separatamente qui.)
*   Il sistema mostrerà badge verdi quando i record vengono rilevati correttamente nel DNS pubblico.

## Aggiornamento / Ridistribuzione dei Worker

Se aggiorni la versione di DockFlare o modifichi le autorizzazioni API, potresti dover aggiornare i tuoi Worker.
*   Fai clic sul pulsante **Ridistribuisci Worker**.
*   Questo caricherà nuovamente la logica più recente dei Worker e risincronizzerà tutti i binding (R2, KV, Webhook Secrets) senza influire sui tuoi dati e-mail archiviati.

## Rimozione di un dominio

Se desideri interrompere l'hosting della posta per un dominio:
*   Fai clic su **Rimuovi dominio**.
*   Questo rimuoverà le regole di routing, i Worker inbound/outbound, il bucket R2 di transito e i record DNS da Cloudflare.
*   **Nota:** Questo *non* elimina i tuoi dati e-mail locali nel volume `mail_data`. Abilita **Includi dati locali** nella finestra di dialogo di rimozione se vuoi anche cancellare i messaggi e gli allegati archiviati sul tuo server.
