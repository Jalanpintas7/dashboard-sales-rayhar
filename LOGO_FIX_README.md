# Solusi Masalah Logo Tidak Muncul di Netlify

## Masalah
Logo di sidebar tidak muncul ketika aplikasi di-deploy ke Netlify, meskipun berfungsi normal di development.

## Akar Masalah
Masalah terjadi karena penggunaan path absolut yang salah di komponen Sidebar:
```svelte
<!-- SALAH - Path absolut yang tidak akan bekerja di production -->
<img src="/src/lib/assets/logorayharsvg.svg" alt="Rayhar Logo" />
```

## Solusi yang Diterapkan

### 1. Menggunakan Import SVG (Direkomendasikan)
Mengubah komponen Sidebar untuk menggunakan import seperti yang sudah ada di halaman login:

```svelte
<script>
  import logoSrc from '$lib/assets/logorayharsvg.svg';
  // ... kode lainnya
</script>

<!-- Menggunakan variabel logoSrc -->
<img src={logoSrc} alt="Rayhar Logo" />
```

### 2. Menambahkan File Deklarasi Tipe
Membuat file `src/vite-env.d.ts` untuk memastikan TypeScript mengenali import SVG:

```typescript
/// <reference types="@sveltejs/kit" />

declare module '*.svg' {
  const content: string;
  export default content;
}
```

### 3. Konfigurasi Netlify yang Benar
Membuat file konfigurasi Netlify yang benar:

**File `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = ".svelte-kit/netlify"

[build.environment]
  NODE_VERSION = "18"
```

**File `_redirects`:**
```
/*    /index.html   200
```

**File `_headers`:**
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

## Solusi Tambahan untuk "Page not found"

### 4. Menggunakan Adapter Netlify yang Benar
Pastikan menggunakan `@sveltejs/adapter-netlify` dan konfigurasi yang benar:

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-netlify';

const config = { 
  kit: { 
    adapter: adapter() 
  } 
};

export default config;
```

### 5. Memastikan File Konfigurasi Ada di Build
Setelah build, file `_redirects` dan `_headers` harus ada di folder `.svelte-kit/netlify/`:

```
.svelte-kit/netlify/
├── _redirects
├── _headers
├── _app/
├── favicon.svg
├── logorayharsvg.svg
└── robots.txt
```

## Mengapa Solusi Ini Berfungsi

1. **Import SVG**: Vite akan memproses file SVG dan menghasilkan chunk terpisah (`logorayharsvg.js`) yang tersedia di production
2. **Path Relatif**: Import menggunakan path relatif yang akan di-resolve dengan benar oleh bundler
3. **Type Safety**: File deklarasi tipe memastikan TypeScript mengenali import SVG
4. **Netlify Config**: File `netlify.toml` memastikan build menggunakan folder yang benar
5. **Routing**: File `_redirects` memastikan SPA routing berfungsi dengan benar
6. **Caching**: File `_headers` memastikan assets di-cache dengan benar

## Verifikasi
Setelah deploy, logo seharusnya muncul di:
- Sidebar desktop (kiri)
- Sidebar mobile (kanan)
- Halaman login (sudah berfungsi sebelumnya)

Dan routing seharusnya berfungsi normal tanpa error "Page not found".

## Catatan Tambahan
- Pastikan file SVG ada di `src/lib/assets/logorayharsvg.svg`
- Build berhasil menghasilkan chunk `logorayharsvg.js` yang menunjukkan SVG diproses dengan benar
- Gunakan import untuk semua asset SVG untuk konsistensi
- Pastikan folder `.svelte-kit/netlify/` berisi semua file yang diperlukan setelah build
- Deploy menggunakan folder `.svelte-kit/netlify/` sebagai publish directory
