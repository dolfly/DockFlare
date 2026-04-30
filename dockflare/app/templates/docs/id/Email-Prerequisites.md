# Prasyarat & Konfigurasi Email

Sebelum mengaktifkan Email Suite, pastikan lingkungan dan akun Cloudflare Anda sudah dikonfigurasi dengan benar.

## Persyaratan Cloudflare

1.  **Manajemen Domain:** Domain Anda harus aktif di Cloudflare.
2.  **Email Routing:** Domain harus memenuhi syarat untuk Cloudflare Email Routing (tersedia di sebagian besar paket, termasuk Free) dan Cloudflare Email Sending (Akses Beta diperlukan untuk email keluar).
3.  **Penyimpanan R2:** R2 harus diaktifkan di dashboard Cloudflare Anda. R2 mencakup tier gratis 10 GB, tetapi Anda mungkin perlu menambahkan metode pembayaran untuk mengaktifkannya.

## Izin Token API

Email Suite memerlukan izin tambahan pada Token API DockFlare Anda yang ada. Perbarui di **Profil Pengguna > Token API** dan tambahkan izin berikut:

| Cakupan | Izin Spesifik | Level Akses | Tujuan |
| :--- | :--- | :--- | :--- |
| **Account** | **Workers Scripts** | **Edit** | Men-deploy worker inbound/outbound |
| **Account** | **Workers KV Storage** | **Edit** | Penegakan kuota real-time di edge |
| **Account** | **R2 Storage** | **Edit** | Membuat dan mengelola bucket transit |
| **Zone** | **Email Routing** | **Edit** | Mengaktifkan routing dan mengelola aturan |
| **Zone** | **DNS** | **Edit** | Membuat record MX, SPF, DMARC, dan DKIM |

> **Catatan Keamanan:** Sangat disarankan untuk membatasi "Account Resources" dan "Zone Resources" token ini hanya pada akun dan domain spesifik yang ingin Anda gunakan dengan DockFlare.

## Persyaratan Sistem

*   **DockFlare:** v3.1.0 atau lebih baru.
*   **Docker:** v20.10+.
*   **Docker Compose:** v2.20+ (diperlukan untuk dukungan `profiles`).
*   **Penyimpanan:** Pastikan ada ruang disk yang cukup di mesin host untuk volume `mail_data`, yang akan menyimpan semua database email dan lampiran.
