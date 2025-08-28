# Top Inquiry - Fitur Dinamis

## Deskripsi
Card Top Inquiry telah diupdate untuk menggunakan data dinamis dari database Supabase. Data diambil berdasarkan leads yang ada di sistem dan menghitung conversion rate berdasarkan booking yang berhasil.

## Fitur yang Ditambahkan

### 1. Fungsi Helper Baru
- `getTopInquiriesByBranch(branchId, filter, limit)` di `src/lib/supabase-helpers.js`
- Mengambil data top inquiry berdasarkan branch dan filter
- Menghitung conversion rate otomatis

### 2. Logika Data
- **Untuk Umrah**: Menggunakan `umrah_season_id` dari table `leads`
- **Untuk Pelancongan**: Menggunakan `destination_id` dari table `leads`
- **Filter Branch**: Otomatis filter berdasarkan branch user jika user adalah admin branch
- **Filter Jenis**: Dropdown untuk memilih keseluruhan/Umrah/Pelancongan
- **Conversion Rate**: Dihitung dari ratio booking/leads untuk setiap package

### 3. Komponen TopInquiry.svelte
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

### Perhitungan Conversion Rate
1. Menghitung total leads untuk setiap package
2. Menghitung total booking untuk setiap package yang sama
3. Conversion rate = (total booking / total leads) × 100%
4. Mengurutkan berdasarkan conversion rate tertinggi
5. Menampilkan top 5 package

## Struktur Data Return
```javascript
{
  id: "package_id",
  name: "Nama Package",
  totalInquiries: 89,
  totalBookings: 23,
  conversion: "25.8%",
  type: "umrah" | "outbound",
  rank: 1
}
```

## Dependencies
- `src/lib/supabase-helpers.js` - Fungsi database helper
- `src/lib/stores/auth.js` - Store untuk user authentication
- `src/lib/components/TopInquiry.svelte` - Komponen utama

## Database Tables yang Digunakan
- `leads` - Data inquiry utama
- `bookings` - Data booking untuk menghitung conversion rate
- `umrah_seasons` - Data season umrah (untuk umrah)
- `destinations` - Data destinasi (untuk pelancongan)
- `admin_role` - Data role user untuk branch filtering

## Algoritma Conversion Rate
1. **Group by Package**: Mengelompokkan leads berdasarkan package (umrah_season_id atau destination_id)
2. **Count Leads**: Menghitung total inquiry untuk setiap package
3. **Count Bookings**: Menghitung total booking untuk package yang sama
4. **Calculate Rate**: Conversion rate = (bookings / leads) × 100%
5. **Sort & Limit**: Mengurutkan berdasarkan conversion rate tertinggi dan ambil top 5

## Contoh Perhitungan
- Package A: 100 leads, 25 bookings → Conversion: 25.0%
- Package B: 80 leads, 20 bookings → Conversion: 25.0%
- Package C: 60 leads, 12 bookings → Conversion: 20.0%

Package A dan B akan diurutkan berdasarkan total leads jika conversion rate sama.
