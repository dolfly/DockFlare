# E-Mail-Suite – Überblick

DockFlare Email isch es vollständig sälber ghoschtetets, souvräns E-Mail-System, wo uf dim bestehende DockFlare-Infrastruktur ufbaut. Es isch dazue designt, d Bequemlichkeit vo cloudbasierte E-Mail mit em Dateschutz u de Kontrolle vom Sälber-Hoschte z verbinde.

## S Konzept vo de souvräne E-Mail

Tradizionäll isch s Sälber-Hoschte vo E-Mail schwierig wäge em „IP-Blacklisting", wo Wohngebiet-IP-Adrässe vo grosse Anbieteri blockt werde. DockFlare löst das, indem Cloudflare als **statuslosis Zustellnetz** gnutzt wird:

1.  **Cloudflare** übernimmt d schweri Arbet: SMTP-Zustellig, MX-Routing u temporärs Puffere.
2.  **DockFlare** besitzt d Date. Dini Nochrichtige, Ahäng u Postfach-Istellige wärde uf dim eigene Hardware gspicheret.

Kei E-Mail-Inhalt bliibt permanent uf de Cloudflare-Infrastruktur. Er wird churz in emene R2-Bucket während em Transit gspicheret u sofort glärt, nachdem de lokali Mail Manager ihn verarbeitet het.

## Architektur

S System bstoht us mehrere integrierte Komponente:

*   **Igehend:** Internet → Cloudflare Email Routing → Inbound Worker → R2-Puffer → DockFlare Mail Manager Webhook → Lokali Spycherig.
*   **Usgehend:** Webmail-UI → Mail Manager API → Outbound Worker → Cloudflare `send_email` → Internet.
*   **Date-Souveränität:** Alli E-Mails wärde analysiert u in ere lokale SQLite-Datebank gspicheret, mit Ahäng im lokale Filesystem.

## Hauptfunktione

*   **Multi-Domain-Unterstützig:** Hoschte E-Mail für so vieli Domains wie du i Cloudflare verwaltisch.
*   **Edge-Quota-Durchsetzung:** Postfach voll? Cloudflare Workers lehne d E-Mail uf SMTP-Ebeni ab (5.2.2), bevor si din Server erreicht, u spare so Bandwidth.
*   **Volltextsuech:** Blitzschnälli Suech durch alli dini E-Mails mit SQLite FTS5.
*   **Dateschutz zerscht:** Alli API-Interaktione nutze EdDSA-JWT-Authentifizierig. HTML-E-Mail-Inhalt wird vor em Rendere bräinigt, um XSS u Tracking-Pixel z verhindere.
*   **PWA-Webmail:** En modernen, mobile-responsive Webmail-Client, wo uf dim Telefon oder Desktop installiert wärde chan.
*   **Push-Benachrichtigunge:** Kriegsch Benachrichtigunge über neui E-Mails i Echtzeit per Web Push (VAPID).
*   **Widerstandsfähigkeit:** Wenn din Server offline geit, pufferet Cloudflare R2 dini ikommende E-Mails u versuecht d Zustellig automatisch alli 5 Minute no einisch.
