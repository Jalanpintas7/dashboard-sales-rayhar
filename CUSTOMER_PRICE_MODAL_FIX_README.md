# Perbaikan Modal Detail Pelanggan dengan Informasi Harga

## Masalah yang Ditemukan

### 1. **Akar Masalah Utama:**
- **Modal detail pelanggan tidak menampilkan informasi harga total price**
- **Admin branch tidak bisa melihat berapa total harga yang dibayar pelanggan**
- **Informasi harga hanya menampilkan jumlah pax, bukan nilai uang**

### 2. **Analisis Detail:**
```
Data yang tersedia di database:
- total_price: Field untuk menyimpan total harga (RM)
- bilangan: Field untuk menyimpan jumlah pax
- Kedua field sudah ada di tabel bookings
```

### 3. **Masalah pada Kode:**
- Field `total_price` tidak diambil dari database
- Modal detail tidak menampilkan informasi harga
- Tabel utama tidak menampilkan total harga
- Tidak ada kalkulasi harga per pax

## Solusi yang Diterapkan

### 1. **Perbaikan Komponen CustomerTableBranch:**
- Menambahkan kolom HARGA di tabel utama
- Menampilkan total price dan jumlah pax di kolom harga
- Modal detail menampilkan informasi harga lengkap

### 2. **Perbaikan Data Mapping:**
- Menambahkan field `total_price` ke dalam query database
- Mapping data dari `bookings.total_price` ke komponen
- Handling untuk kasus harga tidak tersedia

### 3. **Penambahan Data Sample dengan Harga:**
- **Jertih**: 3 data dengan harga RM 5,000 - RM 14,000
- **Shah Alam**: 3 data dengan harga RM 9,500 - RM 18,000  
- **Kuala Lumpur**: 6 data dengan harga RM 5,000 - RM 25,380

### 4. **Fitur Harga yang Ditambahkan:**
```
Tabel Utama:
- Kolom HARGA: Total Price + Jumlah Pax

Modal Detail:
- Total Harga: RM X,XXX (besar dan hijau)
- Jumlah Pax: X pax
- Harga per Pax: RM X,XXX (kalkulasi otomatis)
```

## File yang Diubah

### 1. **`src/lib/components/CustomerTableBranch.svelte`:**
- Menambahkan kolom HARGA di tabel utama
- Menampilkan total price dan jumlah pax
- Modal detail dengan informasi harga lengkap
- Kalkulasi harga per pax otomatis

### 2. **`src/lib/data/customers.js`:**
- Menambahkan field `total_price` ke mapping data
- Memastikan harga diambil dari database

### 3. **Database Migration:**
- `add_sample_prices_for_customers`: Menambah harga untuk semua data sample

## Struktur Data Harga

### 1. **Field Database:**
```sql
bookings.total_price: DECIMAL - Total harga dalam RM
bookings.bilangan: INTEGER - Jumlah pax
```

### 2. **Mapping ke Komponen:**
```javascript
total_price: booking.total_price || '-'
price: booking.bilangan ? `${booking.bilangan} pax` : '-'
```

### 3. **Tampilan UI:**
```
Tabel: RM X,XXX + X pax
Modal: Total Harga (besar) + Jumlah Pax + Harga per Pax
```

## Cara Kerja Setelah Perbaikan

### 1. **Flow Data Harga:**
```
Database → Query → Mapping → UI Display → Modal Detail
   ↓         ↓       ↓         ↓           ↓
total_price → total_price → total_price → Tabel → Modal
```

### 2. **Kalkulasi Otomatis:**
- **Total Harga**: Langsung dari database
- **Jumlah Pax**: Dari field `bilangan`
- **Harga per Pax**: `total_price / bilangan` (otomatis)

### 3. **Format Harga:**
- **Indonesia**: Menggunakan `toLocaleString('id-ID')`
- **Currency**: RM (Ringgit Malaysia)
- **Decimal**: 2 angka desimal

## Testing

### 1. **Test Cases:**
- ✅ Klik row pelanggan → Modal detail muncul dengan harga
- ✅ Total harga ditampilkan dengan format RM X,XXX
- ✅ Harga per pax dihitung otomatis
- ✅ Kolom harga di tabel menampilkan total price + pax

### 2. **Data yang Diharapkan:**
```
Jertih:
- Ahmad bin Ismail: RM 9,500 (2 pax) → RM 4,750/pax
- Siti Aminah: RM 14,000 (3 pax) → RM 4,667/pax
- Mohd Zulkifli: RM 5,000 (1 pax) → RM 5,000/pax

Shah Alam:
- Kamarul: RM 18,000 (4 pax) → RM 4,500/pax
- Nor Azizah: RM 9,500 (2 pax) → RM 4,750/pax
- Razali: RM 14,000 (3 pax) → RM 4,667/pax
```

## UI/UX Improvements

### 1. **Tabel Utama:**
- Kolom HARGA dengan total price (hijau) + jumlah pax (abu-abu)
- Informasi harga yang jelas dan mudah dibaca

### 2. **Modal Detail:**
- Total harga ditampilkan besar dan hijau untuk emphasis
- Informasi harga yang terorganisir dengan baik
- Kalkulasi harga per pax yang informatif

### 3. **Responsive Design:**
- Kolom harga yang responsive di mobile
- Modal detail yang scrollable untuk data panjang

## Kesimpulan

Modal detail pelanggan telah berhasil diperbaiki dengan:

1. **Informasi harga lengkap** (total price, jumlah pax, harga per pax)
2. **Kolom harga di tabel utama** untuk preview cepat
3. **Data harga real-time** dari database Supabase
4. **Format harga yang user-friendly** (RM dengan separator ribuan)
5. **Kalkulasi otomatis** harga per pax

Sekarang admin branch dapat melihat informasi harga lengkap ketika mengklik row pelanggan, memberikan insight yang lebih baik tentang nilai transaksi setiap pelanggan! 🎉💰
