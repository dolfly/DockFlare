# Menggunakan Webmail (PWA)

DockFlare menyertakan klien webmail modern dan responsif yang memungkinkan Anda mengelola email dari perangkat apa pun.

## Mengakses Webmail

Ada dua cara untuk masuk ke Webmail:

1.  **SSO (Single Sign-On):** Jika Anda adalah admin yang masuk ke UI DockFlare Master, klik **Open Webmail** di halaman Email. Anda akan diautentikasi secara otomatis dan masuk ke mailbox Anda.
2.  **Login Langsung:** Navigasi ke `https://mail.yourdomain.com`. Jika Anda telah menetapkan kata sandi untuk mailbox Anda di Master UI, Anda dapat masuk langsung menggunakan alamat email dan kata sandi.

## Menginstal sebagai PWA

DockFlare Webmail adalah **Progressive Web App (PWA)**. Ini berarti Anda dapat menginstalnya di perangkat Anda untuk pengalaman seperti aplikasi.

### Di Mobile (iOS/Android) (dukungan mobile saat ini masih dalam pengembangan)
*   Buka URL webmail di browser mobile Anda.
*   **iOS:** Ketuk ikon "Share" dan pilih **Add to Home Screen**.
*   **Android:** Ketuk tiga titik dan pilih **Install App** atau **Add to Home Screen**.

### Di Desktop (Chrome/Edge/Brave)
*   Cari ikon "Install" di address bar (biasanya monitor kecil dengan panah ke bawah).
*   Klik **Install**.

## Fitur Utama

*   **Pencarian:** Gunakan search bar untuk menemukan email. DockFlare menggunakan Full-Text Search (FTS5) untuk mengindeks subjek, pengirim, dan isi pesan secara lokal.
*   **Notifikasi Push:** Aktifkan notifikasi di pengaturan Webmail untuk menerima peringatan real-time untuk email baru di desktop atau perangkat mobile Anda.

## Keamanan

*   **Autentikasi EdDSA:** Webmail menggunakan JSON Web Token Ed25519 keamanan tinggi (JWT) yang dikeluarkan oleh DockFlare Master untuk semua interaksi API.
*   **Sanitasi HTML:** Semua email HTML masuk disanitasi (menggunakan DOMPurify) sebelum ditampilkan untuk melindungi Anda dari cross-site scripting (XSS) dan piksel pelacak.
