# Pemeliharaan & Troubleshooting

DockFlare Email dirancang untuk membutuhkan sedikit pemeliharaan, tetapi memahami cara menangani backup dan masalah umum penting untuk keandalan jangka panjang.

## Backup & Restore

Semua data email Anda tersimpan di volume Docker `mail_data`. Untuk melakukan backup:

1.  **Backup Volume Penuh:** Backup seluruh folder volume di mesin host Anda. Ini adalah opsi paling aman karena menangkap database SQLite mentah dan semua file lampiran.
2.  **Backup via UI:** Di halaman **Email**, temukan kartu **Backup & Restore** dan klik **Download Backup**. Ini menghasilkan arsip ZIP data email Anda. Catatan: backup ini berisi email dan lampiran dalam teks biasa — simpan dengan aman.

Untuk restore:
1.  Pastikan volume `mail_data` terpasang di `docker-compose.yml` Anda.
2.  Di halaman **Email** di kartu **Backup & Restore**, pilih file ZIP Anda dan klik **Restore Backup**. Ini akan menimpa data email yang ada secara permanen.

## Log

Debugging masalah pengiriman sering kali memerlukan pemeriksaan log container `dockflare-mail-manager`.

```bash
docker logs -f dockflare-mail-manager
```

Halaman Email juga menyertakan kartu **Delivery Logs**. Klik **Investigate** untuk membuka log viewer, yang memiliki dua tab:
*   **Outbound Log:** Riwayat semua upaya pengiriman email keluar.
*   **Bounce Log:** Riwayat semua kegagalan pengiriman (NDR) untuk email yang Anda kirim.

## Ketahanan & Self-Healing

### Buffering R2
Jika server Anda offline (mis. pemadaman listrik, gangguan internet), Cloudflare Inbound Worker akan mendeteksi bahwa webhook lokal Anda tidak dapat dijangkau. Email akan disimpan dengan aman di **R2 temp_cache**.
*   Worker menjalankan **Cron Job** setiap 5 menit.
*   Secara otomatis akan mencoba ulang pengiriman email yang di-buffer hingga server Anda kembali online.

### Paritas Filesystem
Mail Manager menyertakan rutinitas startup yang memastikan database dan filesystem sinkron. Jika file lampiran ada tetapi tidak memiliki record database ("orphan"), file tersebut akan dihapus otomatis untuk menghemat ruang.

## Masalah Umum

### "Worker Error" di Log
Pastikan Token API Anda memiliki izin `Workers Scripts` dan `Workers KV Storage`. Jika Anda baru memperbarui DockFlare, Anda mungkin perlu mengklik **Redeploy Workers** di halaman Email untuk menyinkronkan variabel lingkungan baru.

### Email tertunda
Periksa log **Cron** di dashboard Cloudflare Worker. Jika server lokal Anda sedang dalam beban berat atau mengalami masalah jaringan, worker akan mem-buffer email ke R2 dan mengirimannya setelah server Anda merespons.
