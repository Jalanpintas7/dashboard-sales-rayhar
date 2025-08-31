# Deployment ke Netlify

## Masalah yang Diperbaiki
- Logo Rayhar hilang saat deploy ke Netlify
- Path assets yang salah (`/src/lib/assets/` tidak bisa diakses di production)

## Solusi yang Diterapkan

### 1. Pindahkan Assets ke Folder Static
- Logo `logorayharsvg.svg` dipindahkan dari `src/lib/assets/` ke `static/`
- Semua path logo diupdate dari `/src/lib/assets/logorayharsvg.svg` menjadi `/logorayharsvg.svg`

### 2. Update Komponen
- `Sidebar.svelte` - Update path logo di mobile dan desktop sidebar
- `login/+page.svelte` - Update import dan path logo

### 3. Konfigurasi Netlify
- File `netlify.toml` dibuat dengan konfigurasi yang tepat
- Redirect rules untuk SPA routing
- Build command dan publish directory yang benar

## Struktur File yang Benar
```
static/
├── favicon.svg
├── logorayharsvg.svg    # Logo Rayhar
└── robots.txt
```

## Cara Deploy
1. Push code ke repository
2. Connect repository ke Netlify
3. Build command: `npm run build`
4. Publish directory: `build`
5. Deploy!

## Catatan Penting
- Semua assets yang perlu diakses publik harus ditempatkan di folder `static/`
- Path assets harus dimulai dengan `/` (root) bukan dengan `src/`
- Netlify akan serve semua file dari folder `static/` sebagai static assets
