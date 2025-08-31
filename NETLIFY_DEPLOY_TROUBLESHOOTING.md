# Netlify Deploy Troubleshooting

## Masalah Umum dan Solusi Cepat

### 1. Logo Tidak Muncul di Sidebar
**Gejala**: Logo hilang setelah deploy ke Netlify
**Solusi**: 
- Gunakan import SVG: `import logoSrc from '$lib/assets/logorayharsvg.svg';`
- Jangan gunakan path absolut: `/src/lib/assets/logorayharsvg.svg`

### 2. Error "Page not found"
**Gejala**: Halaman tidak ditemukan, routing tidak berfungsi
**Solusi**:
- Pastikan ada file `netlify.toml` dengan konfigurasi yang benar
- Pastikan file `_redirects` dan `_headers` ada di folder `.svelte-kit/netlify/`
- Gunakan `@sveltejs/adapter-netlify`

### 3. Build Gagal
**Gejala**: Error saat build atau deploy
**Solusi**:
- Jalankan `npm run build` lokal untuk test
- Periksa error di console
- Pastikan semua dependencies terinstall

### 4. Node.js Version Compatibility Error
**Gejala**: 
```
npm error notsup Required: {"node":"^20.19 || ^22.12 || >=24"}
npm error notsup Actual:   {"npm":"10.8.2","node":"v18.20.8"}
```

**Solusi**:
- Update `netlify.toml` dengan `NODE_VERSION = "20"`
- Buat file `.nvmrc` dengan isi `20`
- SvelteKit v2 + Svelte v5 + Vite v7 membutuhkan Node.js 20+

## File Konfigurasi yang Diperlukan

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".svelte-kit/netlify"

[build.environment]
  NODE_VERSION = "20"
```

### .nvmrc
```
20
```

### _redirects
```
/*    /index.html   200
```

### _headers
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

## Langkah Verifikasi

1. **Build Lokal**: `npm run build`
2. **Periksa Folder**: `.svelte-kit/netlify/` harus berisi:
   - `_redirects`
   - `_headers`
   - `_app/`
   - `favicon.svg`
   - `logorayharsvg.svg`
3. **Deploy**: Upload folder `.svelte-kit/netlify/` ke Netlify
4. **Test**: Buka aplikasi dan test routing + logo

## Troubleshooting Cepat

| Masalah | Solusi |
|---------|--------|
| Logo hilang | Gunakan import SVG, bukan path absolut |
| Page not found | Pastikan file `_redirects` ada dan benar |
| Build error | Jalankan `npm run build` lokal |
| Routing error | Periksa file `_redirects` |
| Assets tidak load | Periksa file `_headers` dan caching |
| Node.js version error | Update `NODE_VERSION = "20"` di netlify.toml |

## Support
Jika masih ada masalah, periksa:
- Console browser untuk error JavaScript
- Network tab untuk failed requests
- Build logs di Netlify dashboard
- File konfigurasi sudah benar dan ada di folder build
- Versi Node.js yang digunakan (harus 20+ untuk SvelteKit v2)
