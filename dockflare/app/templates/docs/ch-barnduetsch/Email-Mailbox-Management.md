# Postfach- & Quota-Verwaltig

D Charte **Postfachverwaltig** uf de E-Mail-Syte isch de Ort, wo du kontrolliersch, wer E-Mails empfange chan u wievil Spycher erlaubt isch.

## Postfächer erstelle

1.  Klick uf **Postfach zuefiege**.
2.  **Adrässe:** Gib de gwünschte Präfix ii (z.B. `info`). D Domain wird automatisch ahänkt.
3.  **Anzeigname:** De Name, wo Empfänger gsehnd (z.B. `Support-Team`).
4.  **Quota:** Wähl s anfängliche Spycherlimit.

## S Quota-System verstah

DockFlare nutzt es abgstufts Quota-System, um z sorge, dass dim Server nöd de Spycherplatz ausgeit, während en angenehmis Erläbnis für Benutzer bote wird.

### Weiches Limit (Quota)
Wenn es Postfach sini konfigurierti Quota überschritet:
*   S System füegt en **Warn-E-Mail** von ere Systemadrässe i de Poschtiigang vo em Benutzer ii.
*   De Benutzer chan no E-Mails empfange, bis er s Hard Limit erreicht.
*   D Quota-Leiischte i de Master-UI wird **gäl**.

### Hartes Limit (Ablähnig)
S Hard Limit wird automatisch berechnet als **Weiches Limit + 15% (mindischtens 10 MB Puffer)**.
*   **Edge-Ablähnig:** D Ablähnig passiert am Cloudflare Edge. De Mailserver vom Absender krit de SMTP-Fehler **5.2.2 Mailbox full**.
*   D E-Mail erreicht nie dine R2-Transit-Bucket oder dine lokale Server u spart Bandwidth.
*   D Quota-Leiischte i de Master-UI wird **rot**.

## Catch-All-Postfächer

En Catch-All-Postfach empfangt alli E-Mails, wo an dini Domain gschickt wärde u zu keim bestehende, spezifische Postfach passe.
1.  Klick uf **Catch-All konfiguriere**.
2.  Wähl es Zil-Postfach.
3.  Klick uf **Aktiviere**.

## Auto-Responder (Urlaubsmodus)

Du chasch automatisierti Antwörte für edes Postfach iistelle:
1.  Klick uf s **Auto-Responder**-Symbol (Roboter) näbe emene Postfach.
2.  Gib dini Nochricht u de Betreff ii.
3.  Stell en **Datumsberiich** ii, wänn de Responder aktiv sii soll.
4.  **Antwortintervall:** Stell ii, wie oft de Responder em gliche Absender antwortet (z.B. einisch alli 24 Stunde), um „E-Mail-Loops" z verhindere.
