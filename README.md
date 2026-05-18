# CineVault — My_Film (Demo Lokal)

Ringkasan
- Aplikasi front-end demo untuk menjelajahi koleksi film sederhana.
- Dibangun sebagai static site: `index.html`, `index.css`, `index.js`, plus halaman pendukung `genre.html` dan `wishlist.html`.

Fitur utama
- Navigasi SPA sederhana via `navigateTo()` pada `index.html`.
- Watchlist (simpan/hapus film) yang tersimpan di `localStorage`.
- Modal detail film dengan daftar pemeran.
- Tema dark/light toggle.
- Filter pencarian, sort, dan genre pills.
- Notifikasi singkat (toast) saat menambah/menghapus watchlist.
- Perbaikan responsif: navbar scrollable di layar kecil.

Struktur proyek (ringkas)
- `index.html` — Halaman utama (multi-page sections sebagai SPA).
- `genre.html` — Halaman genre terpisah.
- `wishlist.html` — Halaman watchlist terpisah.
- `index.css` — Gaya aplikasi.
- `index.js` — Logika UI: navigation, modal, watchlist, theme, filter.

Cara menjalankan (lokal)
- Opsi cepat: buka `index.html` langsung di browser (double-click) untuk demo statis.
- Opsi server lokal (direkomendasikan untuk beberapa browser yang membatasi resource):

Bash/Python:

```bash
python -m http.server 8000
# lalu buka http://localhost:8000 di browser
```

PowerShell (buka file langsung):

```powershell
Start-Process index.html
```

Periksa syntax JavaScript (cek cepat):

```bash
node --check index.js
```

Perubahan penting yang saya lakukan
- Navbar: ubah beberapa link untuk memakai `navigateTo()` sehingga berperilaku seperti SPA.
- Watchlist: tombol simpan (♡/♥), penyimpanan ke `localStorage`, halaman watchlist render dinamis.
- Toast: notifikasi singkat saat tambah/hapus watchlist.
- Responsif: navbar link menjadi horizontally scrollable pada layar kecil.
- Tambahan: handler pada modal untuk menambah film ke watchlist.

Testing singkat yang sudah dilakukan
- Syntax check `node --check index.js` — tidak ada error sintaks.
- Manual QA ringan: menambah/hapus watchlist, verifikasi badge dan modal, toast muncul.

Langkah selanjutnya yang saya rekomendasikan
- Commit perubahan ke Git dan push ke remote.
- (Opsional) Tambahkan unit/integration tests atau linting (ESLint).
- (Opsional) Integrasi data film dari API eksternal.

Contoh perintah Git (opsional):

```bash
git add .
git commit -m "Add SPA nav, watchlist, toast, responsive fixes, README"
git push
```

Butuh saya commit & push perubahan sekarang? Jika ya, saya akan melakukan commit ke branch `main` dengan pesan ringkas.