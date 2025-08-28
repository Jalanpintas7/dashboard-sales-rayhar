# Top Inquiry - Update Tampilan

## Perubahan yang Dibuat

### Deskripsi
Card Top Inquiry telah diupdate untuk menampilkan jumlah leads ketika conversion rate adalah 0.0%, sehingga memberikan informasi yang lebih berguna kepada user.

### Perubahan Tampilan

#### Sebelum:
- Selalu menampilkan conversion rate (termasuk "0.0%")
- Label selalu "conversion"

#### Sesudah:
- **Jika conversion rate > 0% dan ≤ 100%**: Menampilkan conversion rate dengan label "conversion"
- **Jika conversion rate = 0.0% atau > 100%**: Menampilkan jumlah leads dengan label "leads"

### Implementasi

#### Komponen TopInquiry.svelte
```svelte
<div class="text-right flex-shrink-0">
  {#if inquiry.conversion === '0.0%' || parseFloat(inquiry.conversion) > 100}
    <p class="text-slate-900 font-bold text-sm lg:text-base">{inquiry.totalInquiries}</p>
    <p class="text-slate-500 text-xs lg:text-sm">leads</p>
  {:else}
    <p class="text-slate-900 font-bold text-sm lg:text-base">{inquiry.conversion}</p>
    <p class="text-slate-500 text-xs lg:text-sm">conversion</p>
  {/if}
</div>
```

### Contoh Tampilan

#### Package dengan Conversion Rate > 0:
```
Umrah Package A
25.8% conversion
```

#### Package dengan Conversion Rate = 0 atau > 100%:
```
Umrah Package B
15 leads

Aceh Package
25 leads

Balkan Package  
30 leads
```

### Manfaat Perubahan

1. **Informasi Lebih Berguna**: User dapat melihat berapa banyak leads yang ada untuk package dengan conversion rate 0%
2. **Analisis Lebih Baik**: Memudahkan identifikasi package yang memiliki banyak leads tapi belum ada booking
3. **Prioritas Marketing**: Membantu menentukan package mana yang perlu fokus marketing untuk meningkatkan conversion

### Data yang Ditampilkan

- **Conversion Rate**: Ketika ada booking dari leads dan conversion rate ≤ 100%
- **Jumlah Leads**: Ketika belum ada booking (conversion rate 0%) atau conversion rate tidak masuk akal (> 100%)
- **Ranking**: Tetap berdasarkan conversion rate tertinggi
- **Top 5**: Hanya menampilkan 5 package teratas

### Struktur Data

```javascript
{
  id: "package_id",
  name: "Nama Package",
  totalInquiries: 15,        // Jumlah leads
  totalBookings: 0,          // Jumlah booking
  conversion: "0.0%",        // Conversion rate
  type: "umrah" | "outbound",
  rank: 1
}
```

### Logika Tampilan

1. **Conversion Rate > 0% dan ≤ 100%**: Tampilkan persentase conversion
2. **Conversion Rate = 0% atau > 100%**: Tampilkan jumlah leads
3. **Sorting**: Tetap berdasarkan conversion rate tertinggi
4. **Limit**: Hanya 5 data teratas

### Kompatibilitas

- ✅ Super Admin: Data dari semua branch
- ✅ Branch Admin: Data dari branch tertentu
- ✅ Filter: Keseluruhan/Umrah/Pelancongan
- ✅ Real-time: Auto-refresh ketika filter berubah
