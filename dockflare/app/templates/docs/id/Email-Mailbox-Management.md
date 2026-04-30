# Manajemen Mailbox & Kuota

Kartu **Mailbox Management** di halaman Email adalah tempat Anda mengontrol siapa yang dapat menerima email dan berapa banyak penyimpanan yang diizinkan.

## Membuat Mailbox

1.  Klik **Add Mailbox**.
2.  **Alamat:** Masukkan prefix yang diinginkan (mis. `info`). Domain akan ditambahkan secara otomatis.
3.  **Nama Tampilan:** Nama yang ditampilkan kepada penerima (mis. `Tim Dukungan`).
4.  **Kuota:** Pilih batas penyimpanan awal.

## Memahami Sistem Kuota

DockFlare menggunakan sistem kuota bertingkat untuk memastikan server Anda tidak kehabisan ruang disk sambil memberikan pengalaman yang baik bagi pengguna.

### Batas Lunak (Kuota)
Ketika sebuah mailbox melebihi kuota yang dikonfigurasi:
*   Sistem menyisipkan **Email Peringatan** dari alamat sistem ke Inbox pengguna.
*   Pengguna masih bisa menerima email hingga mencapai Batas Keras.
*   Bar kuota di Master UI akan berubah menjadi **Kuning**.

### Batas Keras (Penolakan)
Batas Keras dihitung otomatis sebagai **Batas Lunak + 15% (minimum buffer 10 MB)**.
*   **Penolakan di Edge:** Penolakan terjadi di Cloudflare Edge. Server email pengirim menerima error SMTP **5.2.2 Mailbox full**.
*   Email tidak pernah masuk ke bucket R2 transit atau server lokal Anda, menghemat bandwidth.
*   Bar kuota di Master UI akan berubah menjadi **Merah**.

## Mailbox Catch-all

Mailbox catch-all menerima semua email yang dikirim ke domain Anda yang tidak cocok dengan mailbox spesifik yang ada.
1.  Klik **Configure Catch-all**.
2.  Pilih mailbox tujuan.
3.  Klik **Enable**.

## Auto-Responder (Mode Liburan)

Anda dapat mengatur balasan otomatis untuk mailbox mana pun:
1.  Klik ikon **Auto-Responder** (robot) di samping mailbox.
2.  Masukkan pesan dan subjek Anda.
3.  Tetapkan **Rentang Tanggal** kapan responder harus aktif.
4.  **Interval Balas:** Atur seberapa sering responder harus membalas pengirim yang sama (mis. sekali setiap 24 jam) untuk mencegah "email loop".
