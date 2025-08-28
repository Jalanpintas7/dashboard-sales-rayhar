<script>
  import { formatCurrency, formatDate } from '$lib/umrah-data-helpers.js';
  import { Edit, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-svelte';

  export let seasons = [];
  export let categories = [];
  export let packages = [];
  export let isLoading = false;

  // Tab state
  let activeTab = 'seasons';

  // Pagination state
  let currentPage = 1;
  const itemsPerPage = 10;

  // Computed values for pagination
  $: totalSeasons = seasons.length;
  $: totalCategories = categories.length;
  $: totalPackages = packages.length;
  
  $: totalPagesSeasons = Math.ceil(totalSeasons / itemsPerPage);
  $: totalPagesCategories = Math.ceil(totalCategories / itemsPerPage);
  $: totalPagesPackages = Math.ceil(totalPackages / itemsPerPage);
  
  $: startIndexSeasons = (currentPage - 1) * itemsPerPage;
  $: endIndexSeasons = startIndexSeasons + itemsPerPage;
  $: startIndexCategories = (currentPage - 1) * itemsPerPage;
  $: endIndexCategories = startIndexCategories + itemsPerPage;
  $: startIndexPackages = (currentPage - 1) * itemsPerPage;
  $: endIndexPackages = startIndexPackages + itemsPerPage;
  
  $: paginatedSeasons = seasons.slice(startIndexSeasons, endIndexSeasons);
  $: paginatedCategories = categories.slice(startIndexCategories, endIndexCategories);
  $: paginatedPackages = packages.slice(startIndexPackages, endIndexPackages);

  // Reset pagination when tab changes
  $: if (activeTab) {
    currentPage = 1;
  }

  // Get current total pages based on active tab
  $: currentTotalPages = activeTab === 'seasons' ? totalPagesSeasons : 
                        activeTab === 'categories' ? totalPagesCategories : 
                        totalPagesPackages;

  // Function to handle edit
  function handleEdit(type, id) {
    console.log(`Edit ${type} with id:`, id);
    // TODO: Implement edit functionality
  }

  // Function to handle view
  function handleView(type, id) {
    console.log(`View ${type} with id:`, id);
    // TODO: Implement view functionality
  }

  // Function to handle delete
  function handleDelete(type, id) {
    console.log(`Delete ${type} with id:`, id);
    // TODO: Implement delete functionality
  }

  // Pagination functions
  function goToPage(page) {
    if (page >= 1 && page <= currentTotalPages) {
      currentPage = page;
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }

  function goToNextPage() {
    if (currentPage < currentTotalPages) {
      currentPage++;
    }
  }

  // Generate page numbers for pagination
  function getPageNumbers() {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (currentTotalPages <= maxVisiblePages) {
      for (let i = 1; i <= currentTotalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(currentTotalPages);
      } else if (currentPage >= currentTotalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = currentTotalPages - 3; i <= currentTotalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(currentTotalPages);
      }
    }
    
    return pages;
  }
</script>

<div class="bg-white rounded-2xl shadow-soft border border-white/60 overflow-hidden">
  <!-- Tab Navigation -->
  <div class="border-b border-slate-100">
    <nav class="flex space-x-8 px-6">
      <button
        class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeTab === 'seasons' ? 'border-purple-500 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}"
        on:click={() => activeTab = 'seasons'}
      >
        Musim ({seasons.length})
      </button>
      <button
        class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeTab === 'categories' ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}"
        on:click={() => activeTab = 'categories'}
      >
        Kategori ({categories.length})
      </button>
      <button
        class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeTab === 'packages' ? 'border-green-500 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}"
        on:click={() => activeTab = 'packages'}
      >
        Paket ({packages.length})
      </button>
    </nav>
  </div>

  <!-- Tab Content -->
  <div class="p-6">
    {#if isLoading}
      <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-slate-600">Memuat data...</span>
      </div>
    {:else if activeTab === 'seasons' && seasons.length === 0}
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-slate-900 mb-2">Tidak ada data musim</h3>
        <p class="text-slate-500">Coba ubah filter pencarian Anda</p>
      </div>
    {:else if activeTab === 'categories' && categories.length === 0}
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-slate-900 mb-2">Tidak ada data kategori</h3>
        <p class="text-slate-500">Coba ubah filter pencarian Anda</p>
      </div>
    {:else if activeTab === 'packages' && packages.length === 0}
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-slate-900 mb-2">Tidak ada data paket</h3>
        <p class="text-slate-500">Coba ubah filter pencarian Anda</p>
      </div>
    {:else}
      <!-- Seasons Table -->
      {#if activeTab === 'seasons'}
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Musim</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dibuat</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              {#each paginatedSeasons as season}
                <tr class="hover:bg-slate-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-slate-900">{season.name}</div>
                        <div class="text-sm text-slate-500">ID: {season.id}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded-full {season.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                      {season.is_active ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {formatDate(season.created_at)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button
                        on:click={() => handleView('season', season.id)}
                        class="text-blue-600 hover:text-blue-900"
                      >
                        <Eye class="w-4 h-4" />
                      </button>
                      <button
                        on:click={() => handleEdit('season', season.id)}
                        class="text-green-600 hover:text-green-900"
                      >
                        <Edit class="w-4 h-4" />
                      </button>
                      <button
                        on:click={() => handleDelete('season', season.id)}
                        class="text-red-600 hover:text-red-900"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <!-- Pagination for Seasons -->
        {#if totalPagesSeasons > 1}
          <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <div class="flex items-center text-sm text-slate-700">
              <span>Menampilkan {startIndexSeasons + 1} - {Math.min(endIndexSeasons, totalSeasons)} dari {totalSeasons} data</span>
            </div>
            <div class="flex items-center space-x-2">
              <button
                on:click={goToPreviousPage}
                disabled={currentPage === 1}
                class="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              
              {#each getPageNumbers() as page}
                {#if page === '...'}
                  <span class="px-3 py-2 text-slate-400">...</span>
                {:else}
                  <button
                    on:click={() => goToPage(page)}
                    class="px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 {currentPage === page ? 'bg-purple-600 text-white' : 'text-slate-700 hover:bg-slate-100'}"
                  >
                    {page}
                  </button>
                {/if}
              {/each}
              
              <button
                on:click={goToNextPage}
                disabled={currentPage === totalPagesSeasons}
                class="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        {/if}
      {/if}

      <!-- Categories Table -->
      {#if activeTab === 'categories'}
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Kategori</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dibuat</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              {#each paginatedCategories as category}
                <tr class="hover:bg-slate-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-slate-900">{category.name}</div>
                        <div class="text-sm text-slate-500">ID: {category.id}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded-full {category.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                      {category.is_active ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {formatDate(category.created_at)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button
                        on:click={() => handleView('category', category.id)}
                        class="text-blue-600 hover:text-blue-900"
                      >
                        <Eye class="w-4 h-4" />
                      </button>
                      <button
                        on:click={() => handleEdit('category', category.id)}
                        class="text-green-600 hover:text-green-900"
                      >
                        <Edit class="w-4 h-4" />
                      </button>
                      <button
                        on:click={() => handleDelete('category', category.id)}
                        class="text-red-600 hover:text-red-900"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <!-- Pagination for Categories -->
        {#if totalPagesCategories > 1}
          <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <div class="flex items-center text-sm text-slate-700">
              <span>Menampilkan {startIndexCategories + 1} - {Math.min(endIndexCategories, totalCategories)} dari {totalCategories} data</span>
            </div>
            <div class="flex items-center space-x-2">
              <button
                on:click={goToPreviousPage}
                disabled={currentPage === 1}
                class="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              
              {#each getPageNumbers() as page}
                {#if page === '...'}
                  <span class="px-3 py-2 text-slate-400">...</span>
                {:else}
                  <button
                    on:click={() => goToPage(page)}
                    class="px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 {currentPage === page ? 'bg-yellow-600 text-white' : 'text-slate-700 hover:bg-slate-100'}"
                  >
                    {page}
                  </button>
                {/if}
              {/each}
              
              <button
                on:click={goToNextPage}
                disabled={currentPage === totalPagesCategories}
                class="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        {/if}
      {/if}

      <!-- Packages Table -->
      {#if activeTab === 'packages'}
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Paket</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Periode</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Harga</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-200">
              {#each paginatedPackages as umrahPackage}
                <tr class="hover:bg-slate-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-slate-900">
                          {umrahPackage.umrah_seasons?.name || 'N/A'} - {umrahPackage.umrah_categories?.name || 'N/A'}
                        </div>
                        <div class="text-sm text-slate-500">
                          {umrahPackage.airlines?.name || 'N/A'} • {umrahPackage.sektor || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div>
                      <div>{formatDate(umrahPackage.start_date)}</div>
                      <div class="text-xs text-slate-400">s/d {formatDate(umrahPackage.end_date)}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {formatCurrency(umrahPackage.quintuple || umrahPackage.quadruple || umrahPackage.triple || umrahPackage.double)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded-full {umrahPackage.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                      {umrahPackage.is_active ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button
                        on:click={() => handleView('package', umrahPackage.id)}
                        class="text-blue-600 hover:text-blue-900"
                      >
                        <Eye class="w-4 h-4" />
                      </button>
                      <button
                        on:click={() => handleEdit('package', umrahPackage.id)}
                        class="text-green-600 hover:text-green-900"
                      >
                        <Edit class="w-4 h-4" />
                      </button>
                      <button
                        on:click={() => handleDelete('package', umrahPackage.id)}
                        class="text-red-600 hover:text-red-900"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <!-- Pagination for Packages -->
        {#if totalPagesPackages > 1}
          <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <div class="flex items-center text-sm text-slate-700">
              <span>Menampilkan {startIndexPackages + 1} - {Math.min(endIndexPackages, totalPackages)} dari {totalPackages} data</span>
            </div>
            <div class="flex items-center space-x-2">
              <button
                on:click={goToPreviousPage}
                disabled={currentPage === 1}
                class="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              
              {#each getPageNumbers() as page}
                {#if page === '...'}
                  <span class="px-3 py-2 text-slate-400">...</span>
                {:else}
                  <button
                    on:click={() => goToPage(page)}
                    class="px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 {currentPage === page ? 'bg-green-600 text-white' : 'text-slate-700 hover:bg-slate-100'}"
                  >
                    {page}
                  </button>
                {/if}
              {/each}
              
              <button
                on:click={goToNextPage}
                disabled={currentPage === totalPagesPackages}
                class="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        {/if}
      {/if}
    {/if}
  </div>
</div>
