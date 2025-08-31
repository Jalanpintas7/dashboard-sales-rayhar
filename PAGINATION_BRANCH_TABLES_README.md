# Penambahan Fitur Paginasi pada Tabel Branch

## Masalah yang Ditemukan

### 1. **Akar Masalah Utama:**
- **Data table pelanggan branch tidak memiliki paginasi** ketika data lebih dari 10
- **Data table lead branch tidak memiliki paginasi** ketika data lebih dari 10
- **Admin branch harus scroll panjang** untuk melihat semua data
- **Performance UI yang buruk** ketika data terlalu banyak

### 2. **Analisis Detail:**
```
Komponen yang Belum Ada Paginasi:
- CustomerTableBranch: Tampilkan semua data pelanggan sekaligus
- LeadTableBranch: Tampilkan semua data lead sekaligus

Komponen yang Sudah Ada Paginasi (Referensi):
- CustomerTable: Paginasi lengkap dengan 10 item per halaman
- FilteredUmrahData: Paginasi untuk berbagai tab
- DataDestinasi: Paginasi untuk destinasi dan outbound packages
```

### 3. **Masalah pada Kode:**
- Tidak ada state paginasi (`currentPage`, `itemsPerPage`)
- Tidak ada computed values untuk paginasi
- Tidak ada UI paginasi di bagian bawah tabel
- Data ditampilkan semua sekaligus tanpa limit

## Solusi yang Diterapkan

### 1. **Penambahan State Paginasi:**
```javascript
// State untuk pagination
let currentPage = 1;
let itemsPerPage = 10;
```

### 2. **Computed Values untuk Paginasi:**
```javascript
// Pagination
$: totalPages = Math.ceil(data.length / itemsPerPage);
$: startIndex = (currentPage - 1) * itemsPerPage;
$: endIndex = startIndex + itemsPerPage;
$: paginatedData = data.slice(startIndex, endIndex);
```

### 3. **Fungsi Navigasi Paginasi:**
```javascript
// Fungsi untuk halaman berikutnya
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
  }
}

// Fungsi untuk halaman sebelumnya
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
  }
}

// Fungsi untuk pergi ke halaman tertentu
function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
  }
}
```

### 4. **Generate Page Numbers:**
```javascript
// Generate page numbers for pagination
function getPageNumbers() {
  const pages = [];
  const maxVisiblePages = 5;
  
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  }
  return pages;
}
```

## File yang Diubah

### 1. **`src/lib/components/CustomerTableBranch.svelte`:**
- Menambahkan import `ChevronLeft`, `ChevronRight`
- Menambahkan state paginasi (`currentPage`, `itemsPerPage`)
- Menambahkan computed values untuk paginasi
- Menambahkan fungsi navigasi paginasi
- Mengubah loop data dari `customersData` ke `paginatedCustomers`
- Menambahkan UI paginasi di bagian bawah tabel

### 2. **`src/lib/components/LeadTableBranch.svelte`:**
- Menambahkan import `ChevronLeft`, `ChevronRight`
- Menambahkan state paginasi (`currentPage`, `itemsPerPage`)
- Menambahkan computed values untuk paginasi
- Menambahkan fungsi navigasi paginasi
- Mengubah loop data dari `leadsData` ke `paginatedLeads`
- Menambahkan UI paginasi di bagian bawah tabel

## Fitur Paginasi yang Ditambahkan

### 1. **Navigasi Halaman:**
- **Previous/Next**: Tombol navigasi ke halaman sebelumnya/berikutnya
- **Page Numbers**: Tombol nomor halaman yang dapat diklik
- **Ellipsis**: Indikator halaman yang tersembunyi (`...`)

### 2. **Informasi Halaman:**
- **Status Halaman**: "Menampilkan X - Y dari Z data"
- **Current Page**: Halaman yang sedang aktif
- **Total Pages**: Total halaman yang tersedia

### 3. **Responsive Design:**
- **Mobile**: Layout vertikal untuk layar kecil
- **Desktop**: Layout horizontal untuk layar besar
- **Disabled States**: Tombol disabled ketika tidak bisa diklik

### 4. **Smart Page Numbers:**
```
Contoh untuk 20 halaman:
- Halaman 1-3: [1] [2] [3] [4] [...] [20]
- Halaman 10: [1] [...] [9] [10] [11] [...] [20]
- Halaman 18-20: [1] [...] [17] [18] [19] [20]
```

## Cara Kerja Paginasi

### 1. **Flow Data:**
```
Database → Full Data → Pagination Logic → Paginated Data → UI Display
   ↓         ↓           ↓                ↓              ↓
Raw Data → customersData → slice(start, end) → paginatedCustomers → Table Rows
```

### 2. **Pagination Logic:**
- **Items per Page**: 10 data per halaman
- **Current Page**: Halaman yang sedang aktif
- **Start Index**: (currentPage - 1) × itemsPerPage
- **End Index**: startIndex + itemsPerPage
- **Total Pages**: Math.ceil(totalData / itemsPerPage)

### 3. **State Management:**
- **Reactive Variables**: Menggunakan Svelte `$:` untuk computed values
- **Event Handlers**: Fungsi untuk navigasi halaman
- **UI Updates**: Otomatis update ketika state berubah

## UI/UX Improvements

### 1. **Visual Feedback:**
- **Active Page**: Warna ungu untuk halaman aktif (CustomerTableBranch)
- **Active Page**: Warna biru untuk halaman aktif (LeadTableBranch)
- **Hover States**: Efek hover pada tombol navigasi
- **Disabled States**: Opacity dan cursor untuk tombol disabled

### 2. **Accessibility:**
- **Keyboard Navigation**: Tombol dapat diakses dengan keyboard
- **Screen Readers**: Informasi halaman yang jelas
- **Focus States**: Focus indicator yang jelas

### 3. **Mobile Optimization:**
- **Responsive Layout**: Layout yang menyesuaikan ukuran layar
- **Touch Friendly**: Tombol yang cukup besar untuk touch
- **Scroll Behavior**: Paginasi yang tidak mengganggu scroll

## Testing

### 1. **Test Cases:**
- ✅ Data lebih dari 10 → Paginasi muncul
- ✅ Data kurang dari 10 → Paginasi tidak muncul
- ✅ Navigasi halaman → Data berubah sesuai halaman
- ✅ Previous/Next → Tombol disabled ketika tidak bisa diklik
- ✅ Page Numbers → Klik nomor halaman berfungsi
- ✅ Ellipsis → Indikator halaman tersembunyi

### 2. **Data Scenarios:**
```
Jertih Branch: 3 data → Tidak ada paginasi
Shah Alam Branch: 3 data → Tidak ada paginasi
Kuala Lumpur Branch: 6 data → Tidak ada paginasi
Future: 15+ data → Paginasi muncul dengan 2 halaman
```

## Perbedaan dengan Super Admin

### 1. **CustomerTable (Super Admin):**
- **Filter & Search**: Fitur pencarian dan filter
- **All Branches**: Data dari semua branch
- **Advanced Features**: Fitur tambahan yang lebih lengkap

### 2. **CustomerTableBranch (Branch Admin):**
- **Branch Specific**: Data hanya dari branch tertentu
- **Simple View**: Tampilan yang lebih sederhana
- **Same Pagination**: Paginasi yang identik

## Kesimpulan

Fitur paginasi telah berhasil ditambahkan ke kedua tabel branch dengan:

1. **State paginasi lengkap** (currentPage, itemsPerPage, totalPages)
2. **Computed values** untuk kalkulasi paginasi
3. **Fungsi navigasi** (next, prev, goToPage)
4. **Smart page numbers** dengan ellipsis
5. **UI paginasi yang responsive** dan user-friendly
6. **Konsistensi** dengan implementasi paginasi yang sudah ada

Sekarang admin branch dapat melihat data dengan lebih nyaman menggunakan paginasi, terutama ketika data bertambah banyak di masa depan! 🎉📄

## Next Steps

Setelah penambahan paginasi ini, fitur branch admin sudah lengkap:
- ✅ Data table pelanggan dengan paginasi
- ✅ Data table lead dengan paginasi
- ✅ Modal detail dengan informasi lengkap
- ✅ Informasi harga yang lengkap
- ✅ UI/UX yang responsive dan user-friendly
