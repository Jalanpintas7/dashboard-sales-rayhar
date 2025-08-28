# Fitur Tracking Sales Consultant

## Deskripsi
Fitur ini memungkinkan admin branch untuk melacak performa sales consultant berdasarkan data dari tabel bookings. Fitur ini memberikan insight tentang siapa sales consultant yang paling banyak dipilih oleh user saat melakukan booking.

## Fitur Utama

### 1. Top Sales Consultant Card
- **Lokasi**: Dashboard Branch - sebelah kanan Sales & Inquiry Overview
- **Fungsi**: Menampilkan 5 sales consultant teratas berdasarkan jumlah booking
- **Data yang ditampilkan**:
  - Nama consultant
  - Total revenue yang dihasilkan
  - Jumlah total booking
  - Jumlah booking 30 hari terakhir
  - Profile picture (dengan fallback ke avatar generator)

### 2. Sales Consultant Statistics
- **Lokasi**: Dashboard Branch - bagian bawah dashboard
- **Fungsi**: Menampilkan statistik detail dan ranking lengkap sales consultant
- **Fitur**:
  - Filter periode (30, 60, 90 hari)
  - Summary cards (Total Consultant, Total Bookings, Top Performer)
  - Tabel ranking dengan medal (🥇🥈🥉)
  - Performance score dan label (Excellent, Good, Fair, Poor)
  - Refresh data otomatis

### 3. Detail Modal
- **Fungsi**: Menampilkan detail lengkap sales consultant ketika card diklik
- **Informasi yang ditampilkan**:
  - Profile picture dan informasi kontak
  - Statistik performa
  - Total revenue dan bookings

## Struktur Database

### Tabel yang digunakan:
1. **bookings** - Data booking customer
2. **sales_consultant** - Data sales consultant
3. **branches** - Data cabang

### Relasi:
- `bookings.sales_consultant_id` → `sales_consultant.id`
- `bookings.branch_id` → `branches.id`

## Fungsi Helper

### `getTopSalesConsultants(branchId, limit)`
- **Parameter**:
  - `branchId`: ID cabang (opsional, untuk filter per cabang)
  - `limit`: Jumlah consultant yang ditampilkan
- **Return**: Array data consultant dengan statistik
- **Fitur**:
  - Grouping berdasarkan sales consultant
  - Kalkulasi total bookings dan revenue
  - Filter booking 30 hari terakhir
  - Sorting berdasarkan jumlah booking

## Cara Kerja

### 1. Data Loading
- Data diambil saat komponen mount
- Menggunakan user ID untuk mendapatkan branch ID
- Query ke tabel bookings dengan join ke sales_consultant
- Data di-group dan di-calculate

### 2. Performance Scoring
- Score = (Total Bookings × 0.6) + (Recent Bookings × 0.4)
- Recent bookings mendapat bobot lebih tinggi untuk mendorong performa terkini

### 3. Auto Refresh
- Data di-refresh setiap 5 menit
- Manual refresh dengan tombol refresh
- Timestamp "Terakhir diperbarui" ditampilkan

## Fitur Tambahan

### 1. Error Handling
- Fallback ke data dummy jika ada error
- Tombol "Coba Lagi" untuk retry
- Loading state dengan spinner

### 2. Responsive Design
- Layout responsive untuk mobile dan desktop
- Grid system yang adaptif
- Hover effects dan transitions

### 3. Accessibility
- Alt text untuk gambar
- Keyboard navigation
- Screen reader friendly

## Penggunaan

### Untuk Admin Branch:
1. Login ke dashboard branch
2. Lihat card "Top Sales Consultant" di sebelah kanan
3. Klik card untuk melihat detail consultant
4. Scroll ke bawah untuk melihat statistik lengkap
5. Gunakan filter periode untuk analisis berbeda

### Untuk Developer:
1. Import komponen: `import SalesConsultantStats from '$lib/components/SalesConsultantStats.svelte'`
2. Gunakan fungsi helper: `import { getTopSalesConsultants } from '$lib/supabase-helpers.js'`
3. Customize sesuai kebutuhan

## Customization

### 1. Performance Score Formula
```javascript
// Ubah bobot di SalesConsultantStats.svelte
performanceScore: (consultant.totalBookings * 0.6) + (consultant.recentBookings * 0.4)
```

### 2. Filter Periode
```javascript
// Tambah periode baru di array periods
const periods = [
  { value: '30', label: '30 Hari' },
  { value: '60', label: '60 Hari' },
  { value: '90', label: '90 Hari' },
  { value: '180', label: '6 Bulan' } // Tambah ini
];
```

### 3. Performance Labels
```javascript
// Ubah threshold dan label
const getPerformanceLabel = (score) => {
  if (score >= 90) return 'Outstanding';
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Very Good';
  if (score >= 60) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Needs Improvement';
};
```

## Troubleshooting

### 1. Data tidak muncul
- Periksa koneksi database
- Pastikan tabel `bookings` dan `sales_consultant` ada
- Check console untuk error

### 2. Performance lambat
- Pastikan ada index pada `sales_consultant_id` dan `branch_id`
- Kurangi limit data yang diambil
- Implementasi pagination jika diperlukan

### 3. Error "Branch ID not found"
- Pastikan user memiliki role `admin_branch`
- Check tabel `admin_role` untuk mapping user-branch

## Roadmap

### Fitur yang akan ditambahkan:
1. **Grafik Performa**: Chart.js atau D3.js untuk visualisasi trend
2. **Export Data**: Download CSV/Excel untuk laporan
3. **Email Notifications**: Alert untuk performa menurun
4. **Goal Setting**: Target booking per consultant
5. **Team Comparison**: Benchmark antar cabang

## Dependencies

### External:
- `@supabase/supabase-js` - Database client
- `ui-avatars.com` - Avatar generator

### Internal:
- `$lib/stores/auth.js` - User authentication
- `$lib/supabase-helpers.js` - Database helper functions

## Testing

### Test Cases:
1. **Data Loading**: Pastikan data muncul dengan benar
2. **Error Handling**: Test dengan koneksi database yang bermasalah
3. **Responsive**: Test di berbagai ukuran layar
4. **Performance**: Test dengan data yang banyak
5. **Accessibility**: Test dengan screen reader

## Deployment

### Environment Variables:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build:
```bash
npm run build
```

## Support

Jika ada masalah atau pertanyaan:
1. Check console browser untuk error
2. Periksa network tab untuk request yang gagal
3. Review Supabase logs
4. Hubungi tim development
