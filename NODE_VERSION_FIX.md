# Fix Node.js Version Compatibility Error

## Error yang Terjadi
```
npm error notsup Required: {"node":"^20.19 || ^22.12 || >=24"}
npm error notsup Actual:   {"npm":"10.8.2","node":"v18.20.8"}
```

## Penyebab
Package SvelteKit v2 + Svelte v5 + Vite v7 membutuhkan Node.js versi 20+ atau 22+ atau 24+, tapi Netlify menggunakan Node.js 18.20.8.

## Solusi

### 1. Update netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".svelte-kit/netlify"

[build.environment]
  NODE_VERSION = "20"
```

### 2. Buat file .nvmrc
```
20
```

### 3. Package yang Membutuhkan Node.js 20+
- `@sveltejs/kit`: ^2.22.0 (SvelteKit v2)
- `@sveltejs/vite-plugin-svelte`: ^6.0.0 
- `svelte`: ^5.0.0 (Svelte v5)
- `vite`: ^7.0.4 (Vite v7)

## Verifikasi
1. Commit dan push perubahan
2. Deploy ulang ke Netlify
3. Build seharusnya berhasil dengan Node.js 20

## Catatan
- Node.js 18 sudah tidak didukung untuk SvelteKit v2
- Gunakan Node.js 20 untuk kompatibilitas terbaik
- Jika masih error, coba Node.js 22 atau 24
