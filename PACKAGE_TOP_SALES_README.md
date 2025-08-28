# Package Top Sales - Fitur Dinamis

## Deskripsi
Card Package Top Sales telah diupdate untuk menggunakan data dinamis dari database Supabase. Data diambil berdasarkan booking yang ada di sistem.

## Fitur yang Ditambahkan

### 1. Fungsi Helper Baru
- `getTopPackagesByBranch(branchId, filter, limit)` di `src/lib/supabase-helpers.js`
- Mengambil data top packages berdasarkan branch dan filter

### 2. Logika Data
- **Untuk Umrah**: Menggunakan `umrah_season_id` dari table `bookings`
- **Untuk Pelancongan**: Menggunakan `destination_id` dari table `bookings`
- **Filter Branch**: Otomatis filter berdasarkan branch user jika user adalah admin branch
- **Filter Jenis**: Dropdown untuk memilih keseluruhan/Umrah/Pelancongan

### 3. Komponen PackageTopSales.svelte
- Data dinamis dari database
- Loading state
- Error handling
- Empty state
- Auto-refresh ketika filter berubah

## Cara Kerja

### Filter Data
1. **Keseluruhan**: Menampilkan semua package (umrah + pelancongan)
2. **Umrah**: Hanya menampilkan package umrah berdasarkan `umrah_season_id`
3. **Pelancongan**: Hanya menampilkan package pelancongan berdasarkan `destination_id`

### Branch Filtering
- Jika user adalah admin branch, data otomatis difilter berdasarkan branch user
- Jika user adalah super admin, menampilkan data dari semua branch

### Perhitungan Sales
- Menghitung total booking untuk setiap package
- Mengurutkan berdasarkan jumlah sales tertinggi
- Menampilkan top 5 package

## Struktur Data Return
```javascript
{
  id: "package_id",
  name: "Nama Package",
  totalSales: 45,
  type: "umrah" | "outbound",
  rank: 1
}
```

## Dependencies
- `src/lib/supabase-helpers.js` - Fungsi database helper
- `src/lib/stores/auth.js` - Store untuk user authentication
- `src/lib/components/PackageTopSales.svelte` - Komponen utama

## Database Tables yang Digunakan
- `bookings` - Data booking utama
- `umrah_seasons` - Data season umrah (untuk umrah)
- `destinations` - Data destinasi (untuk pelancongan)
- `admin_role` - Data role user untuk branch filtering
