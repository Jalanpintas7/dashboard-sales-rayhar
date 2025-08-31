# Deployment ke Netlify

## Masalah yang Diperbaiki
- Logo Rayhar hilang saat deploy ke Netlify
- Path assets yang salah (`/src/lib/assets/` tidak bisa diakses di production)
- File SVG asli perlu dipindahkan ke folder `static/` untuk akses publik

## Solusi yang Diterapkan

### 1. Pindahkan Assets ke Folder Static
- Logo asli `logorayharsvg.svg` dipindahkan dari `src/lib/assets/` ke `static/`
- Semua path logo diupdate dari `/src/lib/assets/logorayharsvg.svg` menjadi `/logorayharsvg.svg`
- Logo asli tetap digunakan (tidak diganti dengan logo baru)

### 2. Update Komponen
- `Sidebar.svelte` - Update path logo di mobile dan desktop sidebar
- `login/+page.svelte` - Update path logo
- Semua komponen menggunakan logo asli dengan path yang benar

### 3. Konfigurasi Build
- File `svelte.config.js` - Konfigurasi SvelteKit yang sederhana
- File `vite.config.js` - Konfigurasi untuk SVG tanpa hash
- File `netlify.toml` - Konfigurasi deployment Netlify
- File `static/_redirects` - Redirect rules untuk Netlify

### 4. File Test
- Dibuat `static/test-logo.html` untuk verifikasi logo asli bisa diakses

## Struktur File yang Benar
```
static/
├── _redirects           # Netlify redirects
├── favicon.svg
├── logorayharsvg.svg    # Logo asli Rayhar
├── test-logo.html       # File test
└── robots.txt
```

## Cara Deploy
1. Push code ke repository
2. Connect repository ke Netlify
3. Build command: `npm run build`
4. Publish directory: `build`
5. Deploy!

## Troubleshooting
Jika logo masih tidak muncul:
1. Buka `/test-logo.html` di browser untuk test logo asli
2. Periksa console browser untuk error
3. Pastikan file `logorayharsvg.svg` ada di folder `static/`
4. Verifikasi path `/logorayharsvg.svg` bisa diakses
5. Periksa file `_redirects` di Netlify

## Catatan Penting
- Logo asli Rayhar tetap digunakan (tidak diganti)
- Semua assets yang perlu diakses publik harus ditempatkan di folder `static/`
- Path assets harus dimulai dengan `/` (root) bukan dengan `src/`
- Netlify akan serve semua file dari folder `static/` sebagai static assets
- File `_redirects` memastikan routing yang benar di Netlify
