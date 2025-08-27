<script>
  // Data dummy untuk overview
  let seasons = [
    { id: 1, nama: 'Ramadhan', periodeAwal: '2024-03-10', periodeAkhir: '2024-04-09', status: 'aktif', jumlahPaket: 5 },
    { id: 2, nama: 'Syawal', periodeAwal: '2024-04-10', periodeAkhir: '2024-05-09', status: 'aktif', jumlahPaket: 3 },
    { id: 3, nama: 'Dzulhijjah', periodeAwal: '2024-06-15', periodeAkhir: '2024-07-14', status: 'aktif', jumlahPaket: 4 }
  ];

  let categories = [
    { id: 1, nama: 'Premium', levelLayanan: 'premium', status: 'aktif', jumlahPaket: 8 },
    { id: 2, nama: 'Standard', levelLayanan: 'standard', status: 'aktif', jumlahPaket: 12 },
    { id: 3, nama: 'Ekonomi', levelLayanan: 'ekonomi', status: 'aktif', jumlahPaket: 6 },
    { id: 4, nama: 'VIP', levelLayanan: 'vip', status: 'aktif', jumlahPaket: 4 }
  ];

  let umrahPackages = [
    { id: 1, nama: 'Paket Umrah Ramadhan Premium 2024', musim: 'Ramadhan', kategori: 'Premium', airline: 'Saudi Airlines', harga: 25000000, kuota: 30, status: 'aktif' },
    { id: 2, nama: 'Paket Umrah Syawal Standard 2024', musim: 'Syawal', kategori: 'Standard', airline: 'Garuda Indonesia', harga: 18000000, kuota: 25, status: 'aktif' },
    { id: 3, nama: 'Paket Umrah Dzulhijjah VIP 2024', musim: 'Dzulhijjah', kategori: 'VIP', airline: 'Emirates', harga: 35000000, kuota: 20, status: 'aktif' }
  ];

  // Hitung statistik
  $: totalSeasons = seasons.length;
  $: activeSeasons = seasons.filter(s => s.status === 'aktif').length;
  $: totalCategories = categories.length;
  $: activeCategories = categories.filter(c => c.status === 'aktif').length;
  $: totalPackages = umrahPackages.length;
  $: activePackages = umrahPackages.filter(p => p.status === 'aktif').length;

  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }
</script>

<div class="space-y-6">
  <!-- Statistik Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Total Musim -->
    <div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-slate-600">Total Musim</p>
          <p class="text-3xl font-bold text-slate-800">{totalSeasons}</p>
          <p class="text-xs text-slate-500">{activeSeasons} aktif</p>
        </div>
        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
            <path d="M16 2v4"/>
            <path d="M8 2v4"/>
            <path d="M3 10h18"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Total Kategori -->
    <div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-slate-600">Total Kategori</p>
          <p class="text-3xl font-bold text-slate-800">{totalCategories}</p>
          <p class="text-xs text-slate-500">{activeCategories} aktif</p>
        </div>
        <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Total Paket -->
    <div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-slate-600">Total Paket</p>
          <p class="text-3xl font-bold text-slate-800">{totalPackages}</p>
          <p class="text-xs text-slate-500">{activePackages} aktif</p>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
            <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
            <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
            <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Daftar Musim -->
  <div class="bg-white rounded-2xl shadow-soft border border-white/60 overflow-hidden">
    <div class="px-6 py-4 border-b border-slate-100">
      <h3 class="text-lg font-semibold text-slate-800">Daftar Musim Umrah</h3>
    </div>
    
    <div class="divide-y divide-slate-100">
      {#each seasons as season}
        <div class="px-6 py-4 hover:bg-slate-50 transition-colors duration-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
                  <path d="M16 2v4"/>
                  <path d="M8 2v4"/>
                  <path d="M3 10h18"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-slate-800">{season.nama}</p>
                <p class="text-sm text-slate-500">{season.periodeAwal} - {season.periodeAkhir}</p>
                <p class="text-xs text-slate-400">{season.jumlahPaket} paket tersedia</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-xs font-medium rounded-full {season.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                {season.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}
              </span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Daftar Kategori -->
  <div class="bg-white rounded-2xl shadow-soft border border-white/60 overflow-hidden">
    <div class="px-6 py-4 border-b border-slate-100">
      <h3 class="text-lg font-semibold text-slate-800">Daftar Kategori Umrah</h3>
    </div>
    
    <div class="divide-y divide-slate-100">
      {#each categories as category}
        <div class="px-6 py-4 hover:bg-slate-50 transition-colors duration-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-slate-800">{category.nama}</p>
                <p class="text-sm text-slate-500">Level: {category.levelLayanan}</p>
                <p class="text-xs text-slate-400">{category.jumlahPaket} paket tersedia</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-xs font-medium rounded-full {category.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                {category.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}
              </span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Daftar Paket Terbaru -->
  <div class="bg-white rounded-2xl shadow-soft border border-white/60 overflow-hidden">
    <div class="px-6 py-4 border-b border-slate-100">
      <h3 class="text-lg font-semibold text-slate-800">Paket Umrah Terbaru</h3>
    </div>
    
    <div class="divide-y divide-slate-100">
      {#each umrahPackages as umrahPackage}
        <div class="px-6 py-4 hover:bg-slate-50 transition-colors duration-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                  <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                  <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                  <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-slate-800">{umrahPackage.nama}</p>
                <p class="text-sm text-slate-500">{umrahPackage.musim} • {umrahPackage.kategori} • {umrahPackage.airline}</p>
                <p class="text-xs text-slate-400">Kuota: {umrahPackage.kuota} orang</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-slate-800">{formatCurrency(umrahPackage.harga)}</p>
              <span class="px-2 py-1 text-xs font-medium rounded-full {umrahPackage.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                {umrahPackage.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}
              </span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
