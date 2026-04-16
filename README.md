# Website Toko Mitra Jaya - Sembako & Air Isi Ulang

Selamat datang! Berikut adalah dokumentasi lengkap untuk website toko Anda.

## 📋 Daftar File

1. **index.html** - File HTML utama (struktur halaman)
2. **style.css** - File CSS (styling dan desain)
3. **script.js** - File JavaScript (fungsionalitas)
4. **README.md** - File dokumentasi ini

## ✨ Fitur-Fitur Website

### 1. **Header & Navigasi**
   - Logo dan nama toko yang menarik
   - Menu navigasi yang mudah digunakan
   - Keranjang belanja dengan counter jumlah item

### 2. **Halaman Utama (Hero Section)**
   - Banner besar dengan slogan toko
   - Tombol "Lihat Produk" untuk navigasi cepat

### 3. **Tentang Kami**
   - Deskripsi toko
   - Daftar keunggulan toko dengan icon
   - Desain responsif dengan 2 kolom

### 4. **Katalog Produk**
   - Menampilkan 12 produk (sembako, air isi ulang, minuman)
   - Filter produk berdasarkan kategori:
     - Semua produk
     - Sembako (beras, minyak, gula, garam, telur, tepung)
     - Air Isi Ulang (galon, refill, box)
     - Minuman (kopi, teh, susu)
   - Setiap produk menampilkan:
     - Emoji icon
     - Nama produk
     - Deskripsi
     - Harga dalam Rupiah
     - Tombol "Tambah" dan "Detail"

### 5. **Keranjang Belanja**
   - Sidebar interaktif di sisi kanan
   - Menampilkan semua item yang ditambahkan
   - Fitur:
     - Tambah/kurangi jumlah item
     - Hapus item dari keranjang
     - Kalkulasi otomatis subtotal, pajak (10%), dan total
   - Data keranjang disimpan di localStorage (persisten)

### 6. **Checkout**
   - Ringkasan pembelian lengkap
   - Pilihan metode pembayaran
   - Integrasi WhatsApp untuk menghubungi toko
   - Otomatis kosongkan keranjang setelah checkout

### 7. **Kontak & Lokasi**
   - Informasi lengkap toko:
     - Alamat fisik
     - Nomor telepon dan WhatsApp
     - Jam operasional
   - Form kontak untuk pengunjung
   - Desain responsif 2 kolom

### 8. **Footer**
   - Hak cipta dan informasi toko

## 🚀 Cara Menggunakan Website

### Membuka Website
1. Simpan ketiga file (index.html, style.css, script.js) di folder yang sama
2. Buka file index.html menggunakan browser modern (Chrome, Firefox, Edge, Safari)
3. Atau gunakan Live Server extension di VS Code

### Navigasi Halaman
- Gunakan menu di header untuk navigasi ke setiap bagian
- Klik "Lihat Produk" di hero section untuk langsung ke katalog produk

### Berbelanja
1. Lihat produk di katalog
2. Gunakan filter untuk mencari kategori tertentu
3. Klik "Tambah" untuk menambahkan item ke keranjang
4. Klik icon keranjang di header untuk membuka sidebar
5. Di sidebar, bisa:
   - Mengatur jumlah item dengan tombol +/-
   - Menghapus item
   - Melihat total harga
6. Klik "Checkout" untuk melakukan pemesanan

## 📱 Fitur Responsif

Website ini dirancang untuk bekerja dengan baik di semua ukuran layar:
- Desktop (1200px ke atas)
- Tablet (768px - 1199px)
- Mobile (dibawah 768px)

## 🛠️ Cara Mengubah Data Toko

### Mengubah Nama & Logo
Di file **index.html**, cari section `<header>` dan ubah:
```html
<div class="logo">
    <h1>🏪 Mitra Jaya</h1>
    <p>Sembako & Air Isi Ulang</p>
</div>
```

### Mengubah Produk
Di file **script.js**, di bagian `const produk = [...]`, ubah atau tambah produk:
```javascript
{
    id: 1,
    nama: 'Nama Produk',
    kategori: 'sembako', // sembako, air, minuman
    harga: 75000,
    emoji: '🍚',
    deskripsi: 'Deskripsi produk'
}
```

### Mengubah Informasi Kontak
Di file **index.html**, cari section `<section id="kontak">` dan ubah:
```html
<p>Jl. Raya Makmur No. 45<br>Kelapa Gading, Jakarta Utara 14240</p>
<p>Telepon: (021) 1234-5678<br>WhatsApp: +62 812-3456-7890</p>
<p>Senin - Minggu<br>06:00 - 21:00 WIB</p>
```

### Mengubah Warna
Di file **style.css**, cari warna utama dan ubah:
```css
/* Warna utama */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 💾 Fitur Penyimpanan Data

- **Keranjang Belanja** disimpan di localStorage browser
  - Data akan tetap ada meskipun browser ditutup
  - Setiap browser memiliki penyimpanan terpisah

## 📞 Integrasi WhatsApp

Website ini terintegrasi dengan WhatsApp Business untuk:
- Pengunjung bisa langsung chat dengan toko saat checkout
- Nomor WhatsApp dapat diubah di file script.js:
```javascript
const nomorWhatsApp = '6281234567890'; // Ubah dengan nomor Anda
```

## ⚠️ Catatan Penting

1. **Metode Pembayaran**: Saat ini checkout menampilkan opsi metode pembayaran tetapi proses pembayaran sebenarnya harus ditangani secara manual melalui WhatsApp atau telepon
2. **Database**: Website ini menggunakan data statis. Untuk toko nyata, perlu backend server untuk menyimpan data pesanan
3. **Email**: Form kontak tidak langsung mengirim email. Untuk fungsionalitas penuh, perlu backend/service pihak ketiga

## 🔧 Cara Meningkatkan Website

Jika ingin menambah fitur:
1. **Database Real-time**: Tambahkan Firebase atau backend server
2. **Payment Gateway**: Integrasikan Midtrans, Stripe, atau sejenisnya
3. **Admin Panel**: Untuk mengelola produk dan pesanan
4. **User Account**: Sistem login dan riwayat pembelian
5. **Email Notifications**: Konfirmasi pesanan otomatis
6. **SMS Alerts**: Notifikasi melalui SMS

## 🎨 Customization Tips

### Mengubah Skema Warna
Edit di `style.css`:
- Warna utama: `#667eea` dan `#764ba2`
- Warna tombol: `#ff4757`
- Warna latar: `#f8f9fa`

### Menambah Produk Baru
Tambah di `script.js` sebelum penutup array `]`:
```javascript
{
    id: 13,
    nama: 'Produk Baru',
    kategori: 'sembako',
    harga: 50000,
    emoji: '🆕',
    deskripsi: 'Deskripsi produk baru'
}
```

## 📱 Testing Checklist

- [ ] Cek tampilan di desktop
- [ ] Cek tampilan di tablet
- [ ] Cek tampilan di mobile
- [ ] Test tambah produk ke keranjang
- [ ] Test ubah jumlah item
- [ ] Test hapus item
- [ ] Test filter kategori produk
- [ ] Test checkout dan integrasi WhatsApp
- [ ] Test form kontak
- [ ] Test responsivitas di zoom browser berbeda

## 🆘 Troubleshooting

**Masalah**: Keranjang kosong saat buka ulang browser
- **Solusi**: Pastikan browser mendukung localStorage dan tidak dalam mode private

**Masalah**: WhatsApp tidak terbuka saat checkout
- **Solusi**: Pastikan nomor WhatsApp benar (format: 62 + tanpa 0 di depan)

**Masalah**: Tampilan berantakan di mobile
- **Solusi**: Clear cache browser (Ctrl+Shift+Del) dan refresh halaman

## 📧 Dukungan

Jika ada pertanyaan atau masalah, silahkan hubungi melalui:
- WhatsApp: +62 812-3456-7890
- Email: info@mitrajaya.com

---

**Terima kasih telah menggunakan template website ini!** 🎉

Semoga website Anda sukses dan dipercaya oleh banyak pelanggan.
