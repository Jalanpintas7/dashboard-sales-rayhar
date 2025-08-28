# Fitur Input Airline

## Deskripsi
Fitur ini memungkinkan admin untuk menambahkan airline/maskapai penerbangan baru ke dalam sistem. Data airline akan disimpan ke dalam tabel `airlines` di database Supabase.

## Komponen yang Dibuat

### AirlineInput.svelte
Komponen form untuk input data airline baru.

**Fitur:**
- Input nama airline (wajib diisi)
- Dropdown untuk memilih status (Aktif/Non-Aktif)
- Validasi input
- Loading state saat submit
- Pesan sukses/error
- Auto-reset form setelah berhasil submit

**Struktur Data:**
```javascript
{
  namaAirline: string,    // Nama airline/maskapai
  status: 'aktif' | 'nonaktif'  // Status airline
}
```

**Data yang Disimpan ke Database:**
```javascript
{
  name: string,          // Nama airline (dari namaAirline)
  is_active: boolean     // Status aktif (true jika 'aktif', false jika 'nonaktif')
}
```

## Integrasi dengan Supabase

### Tabel Database
Fitur ini menggunakan tabel `airlines` dengan struktur:
- `id` (uuid, primary key) - Auto-generated
- `name` (text) - Nama airline
- `is_active` (boolean) - Status aktif/nonaktif
- `created_at` (timestamp) - Auto-generated
- `updated_at` (timestamp) - Auto-updated

### Helper Functions
Menggunakan fungsi dari `supabase-helpers.js`:
- `createAirline(airlineData)` - Membuat airline baru

### Operasi Database
1. **INSERT** - Saat menambah airline baru

## Cara Penggunaan

### Menambah Airline Baru
1. Buka halaman "Input Musim & Kategori"
2. Isi nama airline di form "Input Airline Baru"
3. Pilih status (Aktif/Nonaktif)
4. Klik tombol "Tambah Airline"
5. Data akan tersimpan ke database
6. Form akan reset dan pesan sukses ditampilkan

## Error Handling

### Validasi Input
- Nama airline tidak boleh kosong
- Pesan error ditampilkan jika validasi gagal

### Error Database
- Error saat menyimpan data ditampilkan ke user
- Console log untuk debugging developer

## State Management

### Local State
- `airlineData` - Data form input
- `isLoading` - Status loading saat submit
- `message` - Pesan sukses/error
- `messageType` - Tipe pesan (success/error)

### Reactive Updates
- Form auto-reset setelah submit berhasil
- Loading state untuk UX yang baik

## Styling

### Design System
- Menggunakan Tailwind CSS
- Konsisten dengan komponen lain
- Responsive design
- Hover effects dan transitions

### Color Scheme
- Blue untuk primary actions (konsisten dengan tema airline)
- Green untuk status aktif
- Red untuk status nonaktif dan error

### Icon
- Menggunakan icon pesawat terbang yang sesuai dengan tema airline
- Background biru (`bg-blue-100`) dengan icon biru (`text-blue-600`)

## Keamanan

### Role-Based Access
- Hanya super admin yang bisa akses
- Menggunakan komponen `RoleGuard`
- Redirect ke login jika tidak authorized

### Data Validation
- Validasi input di frontend
- Sanitasi data sebelum ke database
- Error handling yang aman

## Testing

### Manual Testing
1. Test form validation
2. Test submit data ke database
3. Test error scenarios

### Database Testing
1. Verifikasi data tersimpan dengan benar
2. Verifikasi constraint dan foreign key
3. Test dengan data yang sudah ada

## Troubleshooting

### Common Issues
1. **Data tidak tersimpan**: Cek koneksi Supabase dan console error
2. **Form tidak reset**: Cek fungsi handleSubmit dan state management

### Debug Steps
1. Buka browser console
2. Cek network tab untuk API calls
3. Verifikasi data di Supabase dashboard
4. Test dengan data minimal

## Future Enhancements

### Fitur yang Bisa Ditambahkan
1. Edit nama airline
2. Delete airline (soft delete)
3. Bulk operations
4. Search dan filter
5. Pagination untuk data besar
6. Export data ke Excel/CSV
7. Logo airline
8. Informasi rute dan jadwal

### Performance Improvements
1. Implement caching
2. Optimize database queries
3. Add loading skeletons

## Dependencies

### Frontend
- Svelte 5
- Tailwind CSS
- Supabase JS Client

### Backend
- Supabase (PostgreSQL)
- Row Level Security (RLS)

## File Locations

```
src/lib/components/
├── AirlineInput.svelte           # Form input airline
└── index.js                     # Export components

src/routes/InputMusim&Kategori/
└── +page.svelte                # Halaman utama

src/lib/
├── supabase.js                 # Supabase client
└── supabase-helpers.js         # Helper functions
```

## Layout Halaman

### Grid Layout
Halaman sekarang menggunakan layout 3 kolom:
```
[Musim] [Kategori] [Airline]
```

### Responsive Design
- **Mobile**: 1 kolom (stacked)
- **Tablet**: 2 kolom
- **Desktop**: 3 kolom

## Data Existing

Saat ini sudah ada beberapa airline di database:
- Saudi Airlines
- Emirates
- Qatar Airways
- Turkish Airlines
- Malaysia Airlines
- Garuda Indonesia
- Lion Air
- AirAsia

## Support

Jika ada masalah atau pertanyaan tentang fitur ini, silakan:
1. Cek console browser untuk error
2. Verifikasi koneksi Supabase
3. Cek permissions dan role user
4. Hubungi developer team
