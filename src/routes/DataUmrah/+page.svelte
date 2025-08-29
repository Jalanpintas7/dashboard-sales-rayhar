<script>
  import { onMount } from 'svelte';
  import FilteredUmrahData from '$lib/components/FilteredUmrahData.svelte';
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  import { user, loading } from '$lib/stores/auth.js';
  import { goto } from '$app/navigation';
  import { Search } from 'lucide-svelte';
  import { 
    fetchUmrahSeasons, 
    fetchUmrahCategories, 
    fetchUmrahPackages 
  } from '$lib/umrah-data-helpers.js';
  
  // Redirect ke login jika tidak ada user (hanya jika di halaman ini)
  $: if (!$loading && !$user) {
    goto('/login');
  }

  // State untuk pencarian
  let searchTerm = '';
  
  // State untuk data asli (tidak difilter)
  let allSeasons = [];
  let allCategories = [];
  let allPackages = [];
  
  // State untuk data yang difilter (realtime)
  let filteredSeasons = [];
  let filteredCategories = [];
  let filteredPackages = [];
  
  // Loading state
  let isLoading = false;

  // Load data awal
  async function loadData() {
    isLoading = true;
    try {
      const [seasonsData, categoriesData, packagesData] = await Promise.all([
        fetchUmrahSeasons(),
        fetchUmrahCategories(),
        fetchUmrahPackages()
      ]);

      // Simpan data asli
      allSeasons = seasonsData;
      allCategories = categoriesData;
      allPackages = packagesData;
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      isLoading = false;
    }
  }

  // Reactive filtering - data akan difilter secara otomatis saat searchTerm berubah
  $: {
    // Filter seasons
    filteredSeasons = allSeasons.filter(season => {
      const matchesSearch = !searchTerm || 
        season.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });

    // Filter categories
    filteredCategories = allCategories.filter(category => {
      const matchesSearch = !searchTerm || 
        category.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });

    // Filter packages
    filteredPackages = allPackages.filter(umrahPackage => {
      const matchesSearch = !searchTerm || 
        (umrahPackage.umrah_seasons?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         umrahPackage.umrah_categories?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         umrahPackage.airlines?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         umrahPackage.sektor?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSearch;
    });
  }

  // Load data on mount
  loadData();

  // Event listener for refresh data from child component
  onMount(() => {
    const handleRefresh = () => {
      loadData();
    };
    
    window.addEventListener('refreshUmrahData', handleRefresh);
    
    return () => {
      window.removeEventListener('refreshUmrahData', handleRefresh);
    };
  });
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
        <div class="grid grid-cols-1 gap-4">
          <!-- Search Input -->
          <div>
            <label for="searchTerm" class="block text-sm font-medium text-slate-700 mb-2">Cari Data</label>
            <div class="relative">
              <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="searchTerm"
                type="text"
                bind:value={searchTerm}
                placeholder="Cari musim, kategori, atau paket umrah..."
                class="w-full pl-12 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>


        </div>

        <!-- Hasil Pencarian -->
        {#if isLoading}
          <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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
