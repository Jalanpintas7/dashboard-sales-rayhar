# Deployment ke Netlify

## Masalah yang Diperbaiki
- Logo Rayhar hilang saat deploy ke Netlify
- Path assets yang salah (`/src/lib/assets/` tidak bisa diakses di production)
- File SVG terlalu kompleks dan tidak di-copy dengan benar

## Solusi yang Diterapkan

### 1. Pindahkan Assets ke Folder Static
- Logo `logorayharsvg.svg` dipindahkan dari `src/lib/assets/` ke `static/`
- Dibuat logo alternatif yang lebih sederhana: `rayhar-logo.svg`
- Semua path logo diupdate dari `/src/lib/assets/logorayharsvg.svg` menjadi `/rayhar-logo.svg`

### 2. Update Komponen
- `Sidebar.svelte` - Update path logo di mobile dan desktop sidebar
- `login/+page.svelte` - Update import dan path logo

### 3. Konfigurasi SvelteKit & Vite
- File `svelte.config.js` diupdate dengan konfigurasi yang tepat
- File `vite.config.js` disederhanakan dengan `publicDir: 'static'`
- Konfigurasi Netlify adapter yang optimal

### 4. File Test
- Dibuat `static/test-logo.html` untuk verifikasi logo bisa diakses

## Struktur File yang Benar
```
static/
├── favicon.svg
├── logorayharsvg.svg    # Logo asli (kompleks)
├── rayhar-logo.svg      # Logo baru (sederhana)
├── logo.svg             # Logo test
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
1. Buka `/test-logo.html` di browser untuk test logo
2. Periksa console browser untuk error
3. Pastikan file ada di folder `static/`
4. Coba logo yang lebih sederhana (`rayhar-logo.svg`)

## Catatan Penting
- Semua assets yang perlu diakses publik harus ditempatkan di folder `static/`
- Path assets harus dimulai dengan `/` (root) bukan dengan `src/`
- Netlify akan serve semua file dari folder `static/` sebagai static assets
- File SVG yang terlalu kompleks mungkin tidak di-copy dengan benar
