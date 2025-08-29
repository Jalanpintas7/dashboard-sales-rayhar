<script>
  import FilteredUmrahData from '$lib/components/FilteredUmrahData.svelte';
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  import { user, loading } from '$lib/stores/auth.js';
  import { goto } from '$app/navigation';
  import { Search, X, Heart, RefreshCw } from 'lucide-svelte';
  import { 
    fetchUmrahSeasons, 
    fetchUmrahCategories, 
    fetchUmrahPackages 
  } from '$lib/umrah-data-helpers.js';
  
  // Redirect ke login jika tidak ada user (hanya jika di halaman ini)
  $: if (!$loading && !$user) {
    goto('/login');
  }

  // State untuk pencarian dan filter
  let searchMusim = '';
  let filterStatus = '';
  
  // State untuk data yang difilter
  let filteredSeasons = [];
  let filteredCategories = [];
  let filteredPackages = [];
  
  // Loading state
  let isLoading = false;

  // Load data awal
  async function loadFilteredData() {
    isLoading = true;
    try {
      const [seasonsData, categoriesData, packagesData] = await Promise.all([
        fetchUmrahSeasons(),
        fetchUmrahCategories(),
        fetchUmrahPackages()
      ]);

      // Apply filters
      applyFilters(seasonsData, categoriesData, packagesData);
    } catch (error) {
      console.error('Error loading filtered data:', error);
    } finally {
      isLoading = false;
    }
  }

  // Apply filters to data
  function applyFilters(seasons, categories, packages) {
    // Filter seasons
    filteredSeasons = seasons.filter(season => {
      const matchesSearch = !searchMusim || 
        season.name.toLowerCase().includes(searchMusim.toLowerCase());
      const matchesStatus = !filterStatus || 
        (filterStatus === 'aktif' && season.is_active) ||
        (filterStatus === 'nonaktif' && !season.is_active);
      
      return matchesSearch && matchesStatus;
    });

    // Filter categories
    filteredCategories = categories.filter(category => {
      const matchesStatus = !filterStatus || 
        (filterStatus === 'aktif' && category.is_active) ||
        (filterStatus === 'nonaktif' && !category.is_active);
      
      return matchesStatus;
    });

    // Filter packages
    filteredPackages = packages.filter(umrahPackage => {
      const matchesStatus = !filterStatus || 
        (filterStatus === 'aktif' && umrahPackage.is_active) ||
        (filterStatus === 'nonaktif' && !umrahPackage.is_active);
      
      return matchesStatus;
    });
  }

  // Handle search and filter changes
  function handleSearch() {
    loadFilteredData();
  }

  function handleReset() {
    searchMusim = '';
    filterStatus = '';
    loadFilteredData();
  }

  // Load data on mount
  loadFilteredData();
</script>

<RoleGuard allowedRoles={['super_admin']} redirectTo="/login">
  <div class="p-6 space-y-6">
    <!-- Header Halaman -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">Data Umrah</h1>
      <p class="text-slate-600">Kelola data musim, kategori, dan paket umrah yang tersedia</p>
    </div>

    <!-- Data Table dengan Pencarian -->
    <div class="bg-white rounded-2xl shadow-soft border border-white/60 overflow-hidden">
     

      <!-- Menu Pencarian dan Filter -->
      <div class="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Search by Musim -->
          <div>
            <label for="searchMusim" class="block text-sm font-medium text-slate-700 mb-2">Cari Musim</label>
            <div class="relative">
              <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="searchMusim"
                type="text"
                bind:value={searchMusim}
                placeholder="Cari musim umrah..."
                class="w-full pl-12 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>



          <!-- Filter by Status -->
          <div>
            <label for="filterStatus" class="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              id="filterStatus"
              bind:value={filterStatus}
              class="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Non-Aktif</option>
            </select>
          </div>


        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 mt-4">
          <button 
            on:click={handleSearch}
            disabled={isLoading}
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-xl transition-colors duration-200"
          >
            {#if isLoading}
              <RefreshCw class="w-4 h-4 animate-spin" />
            {:else}
              <Search class="w-4 h-4" />
            {/if}
            {isLoading ? 'Mencari...' : 'Cari Data'}
          </button>
          <button 
            on:click={handleReset}
            disabled={isLoading}
            class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl transition-colors duration-200"
          >
            <X class="w-4 h-4" />
            Reset
          </button>
        </div>

        <!-- Hasil Pencarian -->
        {#if isLoading}
          <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <div class="flex items-center gap-3">
              <RefreshCw class="w-4 h-4 text-blue-600 animate-spin" />
              <p class="text-blue-800 text-sm">Memuat data...</p>
            </div>
          </div>
        {:else if filteredSeasons.length === 0 && filteredCategories.length === 0 && filteredPackages.length === 0}
          <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <p class="text-yellow-800 text-sm">Tidak ada data yang ditemukan dengan filter yang dipilih</p>
            </div>
          </div>
        {/if}
      </div>

      <!-- Data Table Content -->
      <FilteredUmrahData 
        seasons={filteredSeasons}
        categories={filteredCategories}
        packages={filteredPackages}
        isLoading={isLoading}
      />
    </div>

    
  </div>
</RoleGuard>
