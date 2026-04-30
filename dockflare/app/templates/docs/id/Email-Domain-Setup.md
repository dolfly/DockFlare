# Pengaturan & Konfigurasi Domain

Setelah container Docker berjalan dengan profil `email`, Anda dapat memulai proses pengaturan otomatis di Web UI DockFlare.

## Wizard Pengaturan Email

1.  Navigasi ke halaman **Email** di sidebar kiri.
2.  Klik **Set Up Email Domain**.
3.  Pilih **Cloudflare Zone** (domain) yang ingin Anda konfigurasi.
4.  Klik **Confirm Setup**.

### Apa yang terjadi selama pengaturan?
DockFlare melakukan beberapa langkah otomatis melalui Cloudflare API:
*   **Mengaktifkan Email Routing** pada zone Anda.
*   **Mengkonfigurasi DNS:** Membuat record MX, SPF (TXT), DMARC (TXT), dan DKIM (CNAME) sesuai yang diperlukan Cloudflare Email Routing.
*   **Menyediakan Storage:** Membuat bucket R2 khusus untuk buffering transit sementara.
*   **Men-deploy Worker:** Men-deploy Inbound Worker (untuk menerima email) dan Outbound Worker (untuk mengirim email).
*   **Menginisialisasi KV:** Membuat namespace Cloudflare KV untuk melacak kuota mailbox di edge.

## Memverifikasi Kesehatan DNS

Perubahan DNS memerlukan waktu untuk menyebar. Di halaman Email, Anda akan melihat kartu **DNS Records**.
*   Klik **Verify DNS** untuk memeriksa status terkini record MX, SPF, dan DMARC Anda. (DKIM dikelola secara otomatis oleh Cloudflare Email Routing dan tidak diverifikasi secara terpisah di sini.)
*   Sistem akan menampilkan badge hijau ketika record terdeteksi dengan benar di DNS publik.

## Memperbarui / Men-deploy Ulang Worker

Jika Anda memperbarui versi DockFlare atau mengubah izin API, Anda mungkin perlu menyegarkan worker Anda.
*   Klik tombol **Redeploy Workers**.
*   Ini akan mengunggah ulang logika worker terbaru dan menyinkronkan ulang semua binding (R2, KV, Webhook Secrets) tanpa memengaruhi data email yang tersimpan.

## Menghapus Domain

Jika Anda ingin berhenti meng-hosting email untuk sebuah domain:
*   Klik **Teardown Domain**.
*   Ini akan menghapus aturan routing, Inbound/Outbound Workers, bucket R2 transit, dan record DNS dari Cloudflare.
*   **Catatan:** Ini *tidak* menghapus data email lokal Anda di volume `mail_data`. Aktifkan **Include local data** di dialog teardown jika Anda juga ingin menghapus pesan dan lampiran yang tersimpan di server Anda.
