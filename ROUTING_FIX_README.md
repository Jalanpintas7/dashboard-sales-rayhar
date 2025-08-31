# Solusi Masalah Routing "Page not found"

## Masalah
Setelah deploy berhasil, masih muncul error "Page not found" saat mengakses halaman selain homepage.

## Penyebab
Adapter Netlify secara otomatis men-generate file `_redirects` yang kompleks yang dapat mengganggu routing SPA.

## Solusi yang Diterapkan

### 1. Menggunakan Adapter Static
Mengubah dari `@sveltejs/adapter-netlify` ke `@sveltejs/adapter-static`:

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

const config = { 
  kit: { 
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: false
    }) 
  } 
};

export default config;
```

### 2. Update netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "20"
```

### 3. File Routing Manual
Setelah build, copy file routing ke folder `build`:

```bash
copy _redirects build\_redirects
copy _headers build\_headers
```

### 4. File _redirects
```
/*    /index.html   200
```

### 5. File _headers
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

## Mengapa Solusi Ini Berfungsi

1. **Adapter Static**: Lebih sederhana dan tidak men-generate routing yang kompleks
2. **Fallback**: Menggunakan `fallback: 'index.html'` untuk SPA routing
3. **Routing Manual**: File `_redirects` sederhana yang memastikan semua route mengarah ke `index.html`
4. **Folder Build**: Output yang bersih dan mudah dikelola

## Langkah Verifikasi

1. **Build Lokal**: `npm run build`
2. **Periksa Folder**: `build/` harus berisi:
   - `index.html`
   - `_app/`
   - `_redirects`
   - `_headers`
   - `favicon.svg`
   - `logorayharsvg.svg`
3. **Deploy**: Upload folder `build/` ke Netlify
4. **Test**: Buka aplikasi dan test routing

## Keuntungan Adapter Static

- ✅ Routing lebih sederhana dan predictable
- ✅ Tidak ada edge functions yang kompleks
- ✅ Build output yang bersih
- ✅ Mudah di-debug dan troubleshoot
- ✅ Kompatibel dengan semua hosting static

## Catatan
- Pastikan semua file routing ada di folder `build/` sebelum deploy
- Gunakan folder `build/` sebagai publish directory di Netlify
- Jika ada perubahan routing, rebuild dan copy ulang file routing
