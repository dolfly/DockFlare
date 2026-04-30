# Deployment Docker (Profil Email)

DockFlare Email Suite terdiri dari dua microservice tambahan: **Mail Manager** dan **Webmail PWA**. Layanan ini bersifat opsional dan dikelola menggunakan **profiles** Docker Compose.

## Mengaktifkan Profil Email

Untuk menjalankan DockFlare dengan dukungan email, Anda harus menyertakan profil `email` saat menjalankan perintah Docker Compose.

### Menjalankan container
```bash
docker compose --profile email up -d
```

### Menghentikan container
Jika Anda menjalankan `docker compose down`, semua layanan termasuk email akan dihentikan. Untuk menjalankan ulang dengan email, ingat untuk menyertakan profil:
```bash
docker compose --profile email up -d
```

## Konfigurasi Docker Compose

Layanan email sudah termasuk dalam `docker-compose.yml` default. Bagian yang relevan adalah:

```yaml
  dockflare-mail-manager:
    image: alplat/dockflare-mail-manager:stable
    container_name: dockflare-mail-manager
    restart: unless-stopped
    profiles: ["email"]
    environment:
      - DOCKFLARE_MASTER_URL=http://dockflare:5000
      - MAIL_DATA_PATH=/data
    volumes:
      - mail_data:/data
    depends_on:
      dockflare:
        condition: service_started
    networks:
      - cloudflare-net
      - dockflare-internal

  dockflare-webmail:
    image: alplat/dockflare-webmail:stable
    container_name: dockflare-webmail
    restart: unless-stopped
    profiles: ["email"]
    environment:
      - DOCKFLARE_MASTER_URL=https://dockflare.TLD  # ganti dengan domain Anda
    labels:
      - dockflare.enable=true
      - dockflare.hostname=mail.dockflare.TLD  # ganti dengan domain Anda
      - dockflare.service=http://dockflare-webmail:80
    depends_on:
      dockflare-mail-manager:
        condition: service_started
    networks:
      - cloudflare-net
      - dockflare-internal

volumes:
  mail_data:
```

> **Penting:** Sebelum menjalankan profil email, perbarui dua nilai placeholder di layanan `dockflare-webmail`:
> - `DOCKFLARE_MASTER_URL` — URL HTTPS publik DockFlare Master Anda (mis. `https://dockflare.example.com`)
> - Label `dockflare.hostname` — subdomain tempat Webmail dapat diakses (mis. `mail.example.com`)

## Deskripsi Layanan

| Layanan | Deskripsi | Port |
| :--- | :--- | :--- |
| `dockflare-mail-manager` | Engine backend yang memproses MIME, mengelola SQLite, dan menangani webhook. | Hanya internal |
| `dockflare-webmail` | Aplikasi frontend berbasis Vue untuk pengguna. | 80 (Internal) |

## Volume Persisten

Email Suite memperkenalkan volume baru: `mail_data`.

*   **Lokasi:** `/data` di dalam container `mail-manager`.
*   **Isi:**
    *   `/data/db/mail.db`: Database SQLite berisi semua metadata pesan dan indeks pencarian.
    *   `/data/attachments/`: Penyimpanan filesystem untuk semua lampiran email.
*   **Penting:** **Jangan pernah hapus volume ini** kecuali Anda ingin menghapus semua email yang tersimpan secara permanen. Pastikan volume ini termasuk dalam strategi backup host Anda.

## Verifikasi

Setelah container dijalankan, periksa statusnya di UI DockFlare Master di bawah item navigasi **Email**. Anda akan melihat status "Running" (hijau) untuk kedua layanan di kartu **Status Container**.
