# Gambaran Umum Email Suite

DockFlare Email adalah sistem email berdaulat yang sepenuhnya self-hosted, dibangun di atas infrastruktur DockFlare yang sudah ada. Dirancang untuk memberikan kemudahan email berbasis cloud sekaligus menjaga privasi dan kendali penuh atas data Anda.

## Konsep Email Berdaulat

Secara tradisional, self-hosting email sulit dilakukan karena "pemblokiran IP rumahan" — alamat IP residensial diblokir oleh penyedia email besar. DockFlare memecahkan masalah ini dengan menggunakan Cloudflare sebagai **jaringan pengiriman tanpa status**:

1.  **Cloudflare** menangani pekerjaan berat: pengiriman SMTP, routing MX, dan buffering sementara.
2.  **DockFlare** memiliki data. Pesan, lampiran, dan konfigurasi mailbox Anda tersimpan di hardware Anda sendiri.

Tidak ada konten email yang tersimpan secara permanen di infrastruktur Cloudflare. Email di-buffer sebentar di bucket R2 selama transit dan segera dihapus setelah Mail Manager lokal memprosesnya.

## Arsitektur

Sistem terdiri dari beberapa komponen terintegrasi:

*   **Alur Masuk:** Internet → Cloudflare Email Routing → Inbound Worker → Buffer R2 → Webhook DockFlare Mail Manager → Penyimpanan Lokal.
*   **Alur Keluar:** UI Webmail → API Mail Manager → Outbound Worker → Cloudflare `send_email` → Internet.
*   **Kedaulatan Data:** Semua email diurai dan disimpan dalam database SQLite lokal dengan lampiran tersimpan di filesystem lokal.

## Fitur Utama

*   **Dukungan Multi-Domain:** Host email untuk sebanyak mungkin domain yang Anda kelola di Cloudflare.
*   **Penegakan Kuota di Edge:** Mailbox penuh? Cloudflare Workers menolak email di level SMTP (5.2.2) sebelum mencapai server Anda, menghemat bandwidth.
*   **Pencarian Full-Text:** Pencarian super cepat di semua email menggunakan SQLite FTS5.
*   **Privasi Utama:** Semua interaksi API menggunakan autentikasi EdDSA JWT. Konten HTML email disanitasi sebelum ditampilkan untuk mencegah XSS dan piksel pelacak.
*   **Webmail PWA:** Klien webmail modern dan responsif untuk mobile yang dapat diinstal di ponsel atau desktop.
*   **Notifikasi Push:** Terima notifikasi email baru secara real-time melalui Web Push (VAPID).
*   **Ketahanan:** Jika server Anda offline, Cloudflare R2 mem-buffer email masuk dan mencoba pengiriman ulang secara otomatis setiap 5 menit.
