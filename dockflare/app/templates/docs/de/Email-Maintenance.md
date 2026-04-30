# Wartung & Fehlerbehebung

DockFlare Email ist auf einen geringen Wartungsaufwand ausgelegt, aber das Verständnis von Backup-Verfahren und häufigen Problemen ist für die langfristige Zuverlässigkeit wichtig.

## Backup & Wiederherstellung

Alle Ihre E-Mail-Daten werden im Docker-Volume `mail_data` gespeichert. So führen Sie ein Backup durch:

1.  **Vollständiges Volume-Backup:** Sichern Sie den gesamten Volume-Ordner auf Ihrem Host-System. Dies ist die sicherste Option, da sie die rohe SQLite-Datenbank und alle Anhang-Dateien erfasst.
2.  **UI-Backup:** Suchen Sie auf der Seite **E-Mail** die Karte **Backup & Wiederherstellung** und klicken Sie auf **Backup herunterladen**. Dies erstellt ein ZIP-Archiv Ihrer E-Mail-Daten. Hinweis: Dieses Backup enthält E-Mails und Anhänge im Klartext – bewahren Sie es sicher auf.

Zur Wiederherstellung:
1.  Stellen Sie sicher, dass das `mail_data`-Volume in Ihrer `docker-compose.yml` eingebunden ist.
2.  Wählen Sie auf der Seite **E-Mail** unter der Karte **Backup & Wiederherstellung** Ihre ZIP-Datei aus und klicken Sie auf **Backup wiederherstellen**. Dies überschreibt vorhandene E-Mail-Daten dauerhaft.

## Logs

Das Debuggen von Zustellproblemen erfordert oft einen Blick in die Logs des `dockflare-mail-manager`-Containers.

```bash
docker logs -f dockflare-mail-manager
```

Die E-Mail-Seite enthält auch eine Karte **Zustelllogs**. Klicken Sie auf **Untersuchen**, um den Log-Viewer zu öffnen, der zwei Reiter hat:
*   **Ausgehende Logs:** Verlauf aller ausgehenden E-Mail-Versuche.
*   **Bounce-Logs:** Verlauf aller Zustellfehler (NDRs) für E-Mails, die Sie gesendet haben.

## Ausfallsicherheit & Selbstheilung

### R2-Pufferung
Wenn Ihr Server offline geht (z. B. Stromausfall, Internetausfall), bemerkt der Cloudflare Inbound Worker, dass Ihr lokaler Webhook nicht erreichbar ist. Er bewahrt die E-Mail sicher im **R2-temp_cache**.
*   Der Worker führt alle 5 Minuten einen **Cron Job** aus.
*   Er versucht automatisch, gepufferte E-Mails zuzustellen, bis Ihr Server wieder online ist.

### Dateisystem-Parität
Der Mail Manager enthält eine Startroutine, die sicherstellt, dass Datenbank und Dateisystem synchron sind. Wenn eine Anhang-Datei existiert, aber keinen Datenbankeintrag hat (ein „Waisenkind"), wird sie automatisch gelöscht, um Speicherplatz zu sparen.

## Häufige Probleme

### „Worker Error" in den Logs
Stellen Sie sicher, dass Ihr API-Token die Berechtigungen `Workers Scripts` und `Workers KV Storage` besitzt. Wenn Sie DockFlare kürzlich aktualisiert haben, müssen Sie möglicherweise auf der E-Mail-Seite auf **Worker neu bereitstellen** klicken, um neue Umgebungsvariablen zu synchronisieren.

### E-Mails werden verzögert
Überprüfen Sie die **Cron**-Logs im Cloudflare Worker Dashboard. Wenn Ihr lokaler Server stark ausgelastet ist oder Netzwerkprobleme hat, puffert der Worker E-Mails in R2 und stellt sie zu, sobald Ihr Server antwortet.
