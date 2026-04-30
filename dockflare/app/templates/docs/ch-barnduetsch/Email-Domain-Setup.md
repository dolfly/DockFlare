# Domain-Istellig & Konfiguration

Sobald dini Docker-Container mit em `email`-Profil loufe, chasch de automatisierte Istelligsprozess i de DockFlare Web-UI starte.

## De E-Mail-Istelligsassistent

1.  Navigier zur Syte **E-Mail** i de linke Syytenleischte.
2.  Klick uf **E-Mail-Domain irichtte**.
3.  Wähl d **Cloudflare-Zone** (Domain) us, wo du konfiguriere möchtisch.
4.  Klick uf **Istellig bestättige**.

### Was passiert während de Istellig?
DockFlare führt mehreri automatisierti Schritte über d Cloudflare-API us:
*   **Email Routing aktiviere** uf dinere Zone.
*   **DNS konfiguriere:** Erstellt MX-Iiträg, SPF (TXT), DMARC (TXT) u DKIM (CNAME) wie's Cloudflare Email Routing bruucht.
*   **Spycher bereitstelle:** Erstellt en dedizierte R2-Bucket für temporärs Transit-Buffering.
*   **Worker deploye:** Stellt en Inbound Worker (zum E-Mails empfange) u en Outbound Worker (zum E-Mails schicke) bereit.
*   **KV initialisiere:** Erstellt en Cloudflare-KV-Namespace, um Postfach-Quotas am Edge z tracke.

## DNS-Status prüefe

DNS-Änderige chöi Zyt bruuche, um sech z verbreite. Uf de E-Mail-Syte gsehsch e Charte **DNS-Iiträg**.
*   Klick uf **DNS prüefe**, um de aktuelle Status vo dine MX-, SPF- u DMARC-Iiträg z kontrolliere. (DKIM wird automatisch vo Cloudflare Email Routing verwaltet u wird nöd separaat verifiziert.)
*   S System zeigt grüeni Badges, wenn d Iiträg korrekt im öffentliche DNS erkannt worde sind.

## Worker aktualisiere / neu deploye

Wenn du dini DockFlare-Version aktualisiersch oder API-Berechtigunge ändersch, chasch es sii, dass du dini Worker aktualisiere muesch.
*   Klick uf **Worker neu deploye**.
*   Das ladt d nöischti Worker-Logik neu u synchronisiert alli Bindigunge (R2, KV, Webhook-Secrets) neu, ohni dini gspicherete E-Mail-Date z beeinflusse.

## Domain entferne

Wenn du s E-Mail-Hosting für e Domain beende möchtisch:
*   Klick uf **Domain entferne**.
*   Das entfernt d Routing-Regle, Inbound-/Outbound-Worker, de R2-Transit-Bucket u DNS-Iiträg us Cloudflare.
*   **Hinwys:** Das löscht dini lokale E-Mail-Date im `mail_data`-Volume *nöd*. Aktivier **Lokali Date iischliesse** im Entferne-Dialog, wenn du au d Nochrichtige u Ahäng uf dim Server lösche möchtisch.
