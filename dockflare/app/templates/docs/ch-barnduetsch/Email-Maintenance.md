# Wartig & Problem löse

DockFlare Email isch so designt, dass wenig Wartig nötig isch. Aber s Verstah vo Backups u häufige Problem isch wichtig für d langfristigi Zuverlässigkeit.

## Backup & Restore

Alli dini E-Mail-Date sind im Docker-Volume `mail_data` gspicheret. So machsch en Backup:

1.  **Vollständigs Volume-Backup:** Sich de ganze Volume-Ordner uf dinere Host-Maschine. Das isch d sicherchti Option, will si d rohi SQLite-Datebank u alli Ahangs-Datei ufnimmt.
2.  **UI-Backup:** Uf de Syte **E-Mail** findisch d Charte **Backup & Restore** u klicksch uf **Backup abelade**. Das erstellt es ZIP-Archiv vo dine E-Mail-Date. Hinwys: Das Backup enthält E-Mails u Ahäng im Klartext — bewahr's sicher uf.

Zum Wiederherstelle:
1.  Stell sicher, dass s `mail_data`-Volume i dim `docker-compose.yml` iigehänkt isch.
2.  Uf de Syte **E-Mail** i de Charte **Backup & Restore** wähl dini ZIP-Datei u klick uf **Backup wiederherstelle**. Das überschrybt d bestehende E-Mail-Date permanent.

## Logs

Zum Debugge vo Zustellproblem muesch oft d Logs vom `dockflare-mail-manager`-Container aaluege.

```bash
docker logs -f dockflare-mail-manager
```

D E-Mail-Syte beinhaltet au e Charte **Zustelllogs**. Klick uf **Undersuche**, um de Log-Viewer z öffne, wo zwei Tabs het:
*   **Usgehendi Logs:** Verlauf vo allne usgehende E-Mail-Versuech.
*   **Bounce-Logs:** Verlauf vo allne Zustellfehlere (NDRs) für E-Mails, wo du gschickt häsch.

## Widerstandsfähigkeit & Sälbstheilig

### R2-Puffere
Wenn din Server offline geit (z.B. Stromusfall, Internetunderbruch), merkt de Cloudflare Inbound Worker, dass din lokale Webhook nöd erreichbar isch. Er bewahrt d E-Mail sicher im **R2-temp_cache**.
*   De Worker führt alli 5 Minute en **Cron Job** us.
*   Er versuecht automatisch, gepufferte E-Mails zuezstelle, bis din Server wieder online isch.

### Filesystem-Parität
De Mail Manager beinhaltet en Startroutine, wo sicherstellt, dass Datebank u Filesystem synchron sind. Wenn e Ahangs-Datei existiert, aber keinen Datebankdatensatz het (en „Waise"), wird si automatisch glärt, um Spycherplatz z spare.

## Häufigi Problem

### „Worker Error" i de Logs
Stell sicher, dass din API-Token d Berechtigunge `Workers Scripts` u `Workers KV Storage` het. Wenn du DockFlare kürzlich aktualisiert häsch, chasch es sii, dass du uf de E-Mail-Syte uf **Worker neu deploye** klicke muesch, um neui Umgebigsvariable z synchronisiere.

### E-Mails wärde verzögert
Prüef d **Cron**-Logs im Cloudflare Worker Dashboard. Wenn din lokale Server stark usglaschtet isch oder Netzwerkprobleme het, pufferet de Worker E-Mails i R2 u stellt si zue, sobald din Server antwortet.
