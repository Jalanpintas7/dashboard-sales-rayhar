<script>
  import UmrahDataOverview from '$lib/components/UmrahDataOverview.svelte';
</script>

<div class="p-6 space-y-6">
  <!-- Header Halaman -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-slate-800 mb-2">Data Umrah</h1>
    <p class="text-slate-600">Lihat dan kelola semua data musim, kategori, dan paket umrah yang tersedia</p>
  </div>

  <!-- Menu Pencarian Data Umrah -->
  <div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-slate-800 mb-2">Pencarian Data Umrah</h2>
      <p class="text-slate-600">Cari dan filter data musim, kategori, dan paket umrah</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search by Musim -->
      <div>
        <label for="searchMusim" class="block text-sm font-medium text-slate-700 mb-2">Cari Musim</label>
        <div class="relative">
          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            id="searchMusim"
            type="text"
            placeholder="Cari musim umrah..."
            class="w-full pl-12 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <!-- Search by Kategori -->
      <div>
        <label for="searchKategori" class="block text-sm font-medium text-slate-700 mb-2">Cari Kategori</label>
        <div class="relative">
          <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            id="searchKategori"
            type="text"
            placeholder="Cari kategori umrah..."
            class="w-full pl-12 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <!-- Filter by Status -->
      <div>
        <label for="filterStatus" class="block text-sm font-medium text-slate-700 mb-2">Filter Status</label>
        <select
          id="filterStatus"
          class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Non-Aktif</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <!-- Filter by Periode -->
      <div>
        <label for="searchPeriode" class="block text-sm font-medium text-slate-700 mb-2">Filter Periode</label>
        <select
          id="searchPeriode"
          class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Semua Periode</option>
          <option value="ramadhan">Ramadhan</option>
          <option value="syawal">Syawal</option>
          <option value="dzulhijjah">Dzulhijjah</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-3 mt-6 pt-4 border-slate-100">
      <button class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors duration-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        Cari Data
      </button>
      <button class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl transition-colors duration-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        Reset Filter
      </button>
      <a href="/InputMusim&Kategori" class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors duration-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Tambah Data Baru
      </a>
    </div>
  </div>

  <!-- Data Overview -->
  <div class="mb-6">
    <h2 class="text-2xl font-bold text-slate-800 mb-2">Data Overview</h2>
    <p class="text-slate-600">Ringkasan lengkap data musim, kategori, dan paket umrah yang tersedia</p>
  </div>
  <UmrahDataOverview />

  <!-- Informasi Tambahan -->
  <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6">
    <div class="flex items-start gap-3">
      <div class="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 text-white">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052c1.994-.049 3.76-.968 5.312-2.513C19.243 3 21.75 5.322 21.75 8.25c0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
        </svg>
      </div>
      <div>
        <h3 class="font-semibold text-amber-900 mb-2">Tips Pengelolaan Data Umrah</h3>
        <ul class="text-sm text-amber-800 space-y-1">
          <li>• Monitor status musim dan kategori secara berkala untuk memastikan data tetap akurat</li>
          <li>• Update jumlah paket yang tersedia sesuai dengan booking yang masuk</li>
          <li>• Review harga paket secara periodik untuk mempertahankan kompetitivitas</li>
          <li>• Pastikan informasi periode musim sesuai dengan kalender Hijriyah yang berlaku</li>
          <li>• Gunakan fitur pencarian dan filter untuk menemukan data dengan cepat</li>
          <li>• Backup data secara berkala untuk keamanan informasi</li>
        </ul>
      </div>
    </div>
  </div>
</div>
