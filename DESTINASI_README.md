# Fitur Manajemen Destinasi - Dashboard Admin Rayhar

## Overview
Fitur manajemen destinasi memungkinkan admin untuk mengelola destinasi pelancongan yang tersedia dalam sistem. Fitur ini terdiri dari dua halaman utama:

1. **Input Destinasi** (`/InputDestinasi`) - Untuk menambah destinasi baru
2. **Data Destinasi** (`/DataDestinasi`) - Untuk melihat dan mengelola semua destinasi

## Struktur File

### Komponen
- `src/lib/components/DestinationInputCard.svelte` - Form input destinasi baru
- `src/lib/components/DestinationList.svelte` - Daftar destinasi dengan statistik

### Halaman
- `src/routes/InputDestinasi/+page.svelte` - Halaman input destinasi
- `src/routes/DataDestinasi/+page.svelte` - Halaman data destinasi

## Fitur yang Tersedia

### 1. Input Destinasi Baru
- **Form Input:**
  - Nama Destinasi (wajib)
  - Negara (wajib)
  - Deskripsi (opsional)
  - Upload Gambar (opsional)
  - Status Aktif/Non-Aktif

- **Validasi:**
  - Field wajib tidak boleh kosong
  - Format gambar yang didukung: PNG, JPG, GIF
  - Maksimal ukuran file: 10MB

### 2. Data Destinasi
- **Statistik:**
  - Total Destinasi
  - Destinasi Aktif
  - Destinasi Non-Aktif

- **Tabel Destinasi:**
  - ID Destinasi
  - Nama Destinasi
  - Negara
  - Status
  - Aksi (Toggle Status, Hapus)

- **Filter dan Pencarian:**
  - Pencarian berdasarkan nama atau negara
  - Filter berdasarkan status (Aktif/Non-Aktif)

## Cara Penggunaan

### Menambah Destinasi Baru
1. Klik menu "Input Destinasi" di sidebar
2. Isi form dengan informasi destinasi
3. Upload gambar (opsional)
4. Set status aktif/non-aktif
5. Klik "Tambah Destinasi"

### Mengelola Destinasi
1. Klik menu "Data Destinasi" di sidebar
2. Gunakan fitur pencarian untuk menemukan destinasi tertentu
3. Filter berdasarkan status jika diperlukan
4. Toggle status destinasi dengan klik ikon status
5. Hapus destinasi dengan klik ikon hapus

## Integrasi dengan Sidebar

Sidebar sudah terintegrasi dengan fitur destinasi melalui menu:
- **Input Destinasi** - Icon map-pin, href: `/InputDestinasi`
- **Data Destinasi** - Icon database, href: `/DataDestinasi`

## Styling dan UI

- Menggunakan Tailwind CSS dengan custom theme
- Design modern dengan glassmorphism effect
- Responsive design untuk desktop dan mobile
- Color scheme sesuai dengan brand Rayhar (purple, yellow, white)

## Data Structure

```javascript
{
  id: Number,
  nama: String,
  negara: String,
  deskripsi: String,
  gambar: File | null,
  aktif: Boolean,
  tanggalDibuat: String
}
```

## Future Enhancements

- Integrasi dengan database (Supabase/PostgreSQL)
- Image optimization dan storage
- Bulk operations (import/export)
- Advanced filtering dan sorting
- Pagination untuk data besar
- Real-time updates
- Audit trail untuk perubahan

## Technical Notes

- Menggunakan Svelte 5 dengan reactive statements
- Component-based architecture
- Event handling untuk form submission
- File upload handling
- Responsive grid layout
- Custom CSS classes untuk styling

## Troubleshooting

### Common Issues:
1. **Form tidak submit:** Pastikan semua field wajib terisi
2. **Gambar tidak upload:** Pastikan format file didukung dan ukuran < 10MB
3. **Sidebar tidak muncul:** Pastikan layout sudah benar dan Sidebar component diimport

### Debug:
- Buka browser console untuk melihat log
- Periksa network tab untuk request/response
- Pastikan semua dependencies terinstall

## Support

Untuk bantuan teknis atau pertanyaan, silakan hubungi tim development.
