# Dashboard Admin Rayhar

Dashboard admin untuk manajemen data umrah, pelanggan, dan destinasi wisata.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

## 🎯 Fitur Utama

- **Dashboard Super Admin** - Manajemen lengkap sistem
- **Dashboard Admin Branch** - Manajemen cabang
- **Data Pelanggan** - CRUD data pelanggan
- **Data Umrah** - Manajemen paket umrah
- **Data Destinasi** - Manajemen destinasi wisata
- **Input Airline** - Manajemen maskapai
- **Input Musim & Kategori** - Manajemen musim dan kategori umrah

## 🔧 Konfigurasi

### Environment Variables
Buat file `.env.local` dengan konfigurasi Supabase:
```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup
Lihat file `SUPABASE_SETUP.md` untuk panduan lengkap setup database.

## 📱 Deployment

### Netlify
1. Push code ke repository
2. Connect ke Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

**⚠️ Catatan Penting**: Logo Rayhar sudah diperbaiki untuk deployment ke Netlify. Lihat `NETLIFY_DEPLOYMENT.md` untuk detail lengkap.

## 🎨 UI Components

- **Sidebar** - Navigasi utama dengan logo Rayhar
- **Summary Cards** - Kartu ringkasan data
- **Data Tables** - Tabel data dengan fitur filter dan search
- **Form Inputs** - Form input yang responsif

## 🛠️ Tech Stack

- **Frontend**: SvelteKit 5 + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Icons**: Lucide Svelte
- **Charts**: Chart.js
- **Deployment**: Netlify

## 📚 Dokumentasi

- `AUTH_README.md` - Sistem autentikasi
- `UMRAH_README.md` - Fitur manajemen umrah
- `CUSTOMER_FILTER_README.md` - Filter pelanggan
- `NETLIFY_DEPLOYMENT.md` - Panduan deployment ke Netlify
- `SUPABASE_SETUP.md` - Setup database Supabase

## 🐛 Troubleshooting

### Logo Tidak Muncul
Jika logo Rayhar tidak muncul:
1. Pastikan file logo asli `logorayharsvg.svg` ada di folder `static/`
2. Test dengan file `static/test-logo.html`
3. Periksa console browser untuk error
4. Verifikasi path `/logorayharsvg.svg` bisa diakses

### Build Error
1. Hapus folder `node_modules` dan `package-lock.json`
2. Jalankan `npm install` ulang
3. Pastikan Node.js version 18+

## 📄 License

© 2024 Rayhar. All rights reserved.
