<script>
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  import { MapPin, X, Trash2, Edit, Search, ChevronLeft, ChevronRight, Eye, AlertTriangle, CheckCircle } from 'lucide-svelte';
  import { supabase } from '$lib/supabase.js';
  import { onMount } from 'svelte';
  
  // Data destinasi dari Supabase
  let destinations = [];
  let outboundPackages = [];
  let loading = true;
  let error = null;

  let searchTerm = '';
  
  // Tab state
  let activeTab = 'destinations';
  
  // Pagination state
  let currentPage = 1;
  const itemsPerPage = 10;
  
  // Modal edit
  let showEditModal = false;
  let editingDestination = null;
  let editName = '';
  
  // Modal edit outbound package
  let showEditOutboundModal = false;
  let editingOutboundPackage = null;
  let editOutboundForm = {
    start_date: '',
    end_date: '',
    price: ''
  };
  
  // Modal delete confirmation
  let showDeleteModal = false;
  let deletingItem = null;
  let deleteType = ''; // 'destination' or 'outbound'

  // Load data dari Supabase
  async function loadDestinations() {
    try {
      loading = true;
      const [destinationsData, outboundData] = await Promise.all([
        supabase
          .from('destinations')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('outbound_dates')
          .select(`
            *,
            destinations (
              name
            )
          `)
          .order('created_at', { ascending: false })
      ]);

      if (destinationsData.error) {
        throw destinationsData.error;
      }

      if (outboundData.error) {
        throw outboundData.error;
      }

      destinations = destinationsData.data || [];
      outboundPackages = outboundData.data || [];
    } catch (err) {
      error = err.message;
      console.error('Error loading destinations:', err);
    } finally {
      loading = false;
    }
  }

  // Hapus destinasi
  async function deleteDestination(id) {
    try {
      const { error: deleteError } = await supabase
        .from('destinations')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      // Update local state
      destinations = destinations.filter(d => d.id !== id);
      filteredDestinations = filteredDestinations.filter(d => d.id !== id);
      
      // Show success snackbar
      showSnackbarNotification('success', 'Destinasi berhasil dihapus!');
    } catch (err) {
      error = err.message;
      console.error('Error deleting destination:', err);
      
      // Show error snackbar
      showSnackbarNotification('error', 'Gagal menghapus destinasi!');
    }
  }

  // Hapus paket outbound
  async function deleteOutboundPackage(id) {
    try {
      const { error: deleteError } = await supabase
        .from('outbound_dates')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      // Update local state
      outboundPackages = outboundPackages.filter(p => p.id !== id);
      filteredOutboundPackages = filteredOutboundPackages.filter(p => p.id !== id);
      
      // Show success snackbar
      showSnackbarNotification('success', 'Paket outbound berhasil dihapus!');
    } catch (err) {
      error = err.message;
      console.error('Error deleting outbound package:', err);
      
      // Show error snackbar
      showSnackbarNotification('error', 'Gagal menghapus paket outbound!');
    }
  }

  // Buka modal edit
  function openEditModal(destination) {
    editingDestination = destination;
    editName = destination.name;
    showEditModal = true;
  }

  // Tutup modal edit
  function closeEditModal() {
    showEditModal = false;
    editingDestination = null;
    editName = '';
  }

  // Show delete confirmation modal
  function showDeleteConfirmation(type, item) {
    deleteType = type;
    deletingItem = item;
    showDeleteModal = true;
  }

  // Confirm delete action
  async function confirmDelete() {
    try {
      if (deleteType === 'destination') {
        await deleteDestination(deletingItem.id);
      } else if (deleteType === 'outbound') {
        await deleteOutboundPackage(deletingItem.id);
      }
      
      // Close modal after delete
      closeDeleteModal();
    } catch (err) {
      console.error('Error in confirmDelete:', err);
    }
  }

  // Close delete modal
  function closeDeleteModal() {
    showDeleteModal = false;
    deletingItem = null;
    deleteType = '';
  }

  // Update destinasi
  async function updateDestination() {
    try {
      const { error: updateError } = await supabase
        .from('destinations')
        .update({ name: editName })
        .eq('id', editingDestination.id);

      if (updateError) {
        throw updateError;
      }

      // Update local state - update both arrays
      const destination = destinations.find(d => d.id === editingDestination.id);
      if (destination) {
        destination.name = editName;
      }

      // Force reactivity by reassigning the arrays
      destinations = [...destinations];
      filteredDestinations = [...filteredDestinations];

      closeEditModal();
      
      // Show success snackbar
      showSnackbarNotification('success', 'Destinasi berhasil diperbarui!');
    } catch (err) {
      error = err.message;
      console.error('Error updating destination:', err);
      
      // Show error snackbar
      showSnackbarNotification('error', 'Gagal memperbarui destinasi!');
    }
  }

  // Buka modal edit outbound package
  function openEditOutboundModal(outboundPackage) {
    editingOutboundPackage = outboundPackage;
    editOutboundForm = {
      start_date: outboundPackage.start_date || '',
      end_date: outboundPackage.end_date || '',
      price: outboundPackage.price || ''
    };
    showEditOutboundModal = true;
  }

  // Tutup modal edit outbound package
  function closeEditOutboundModal() {
    showEditOutboundModal = false;
    editingOutboundPackage = null;
    editOutboundForm = {
      start_date: '',
      end_date: '',
      price: ''
    };
  }

  // Update outbound package
  async function updateOutboundPackage() {
    try {
      const { error: updateError } = await supabase
        .from('outbound_dates')
        .update({
          start_date: editOutboundForm.start_date,
          end_date: editOutboundForm.end_date,
          price: editOutboundForm.price
        })
        .eq('id', editingOutboundPackage.id);

      if (updateError) {
        throw updateError;
      }

      // Update local state - update both arrays
      const outboundPackage = outboundPackages.find(p => p.id === editingOutboundPackage.id);
      if (outboundPackage) {
        outboundPackage.start_date = editOutboundForm.start_date;
        outboundPackage.end_date = editOutboundForm.end_date;
        outboundPackage.price = editOutboundForm.price;
      }

      // Force reactivity by reassigning the arrays
      outboundPackages = [...outboundPackages];
      filteredOutboundPackages = [...filteredOutboundPackages];

      closeEditOutboundModal();
      
      // Show success snackbar
      showSnackbarNotification('success', 'Paket outbound berhasil diperbarui!');
    } catch (err) {
      error = err.message;
      console.error('Error updating outbound package:', err);
      
      // Show error snackbar
      showSnackbarNotification('error', 'Gagal memperbarui paket outbound!');
    }
  }

  // Load data saat komponen mount
  onMount(() => {
    loadDestinations();
  });

  // Hitung statistik
  $: totalDestinations = destinations.length;
  $: totalOutboundPackages = outboundPackages.length;

  // Filter destinations berdasarkan search
  $: filteredDestinations = destinations.filter(destination => {
    const matchesSearch = searchTerm === '' || 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Filter outbound packages berdasarkan search
  $: filteredOutboundPackages = outboundPackages.filter(outboundPackage => {
    const matchesSearch = searchTerm === '' || 
      outboundPackage.destinations?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outboundPackage.price?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Reset pagination when tab changes
  $: if (activeTab) {
    currentPage = 1;
  }

  // Computed values for pagination
  $: totalPagesDestinations = Math.ceil(filteredDestinations.length / itemsPerPage);
  $: totalPagesOutboundPackages = Math.ceil(filteredOutboundPackages.length / itemsPerPage);
  
  $: startIndexDestinations = (currentPage - 1) * itemsPerPage;
  $: endIndexDestinations = startIndexDestinations + itemsPerPage;
  $: startIndexOutboundPackages = (currentPage - 1) * itemsPerPage;
  $: endIndexOutboundPackages = startIndexOutboundPackages + itemsPerPage;
  
  $: paginatedDestinations = filteredDestinations.slice(startIndexDestinations, endIndexDestinations);
  $: paginatedOutboundPackages = filteredOutboundPackages.slice(startIndexOutboundPackages, endIndexOutboundPackages);

  // Get current total pages based on active tab
  $: currentTotalPages = activeTab === 'destinations' ? totalPagesDestinations : totalPagesOutboundPackages;

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

  // Format date function
  function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID');
  }

  // Snackbar notification system
  let snackbarMessage = '';
  let snackbarType = 'success';
  let showSnackbar = false;

  function showSnackbarNotification(type, message) {
    snackbarType = type;
    snackbarMessage = message;
    showSnackbar = true;
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      showSnackbar = false;
    }, 3000);
  }
</script>

<RoleGuard allowedRoles={['super_admin', 'admin_branch']}>
  <div class="p-3 sm:p-6 space-y-4 sm:space-y-6">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Data Destinasi</h1>
      <p class="text-sm sm:text-base text-slate-600">Kelola dan lihat semua data destinasi pelancongan</p>
    </div>

    <!-- Error Message -->
    {#if error}
      <div class="bg-red-50 border border-red-200 rounded-xl p-4">
        <p class="text-red-700 text-sm">Error: {error}</p>
      </div>
    {/if}

    <!-- Statistik Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <!-- Total Destinasi -->
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-600">Total Destinasi</p>
            <p class="text-2xl sm:text-3xl font-bold text-slate-800">{totalDestinations}</p>
          </div>
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <MapPin class="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
        </div>
      </div>

      <!-- Total Paket Outbound -->
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-600">Total Paket Outbound</p>
            <p class="text-2xl sm:text-3xl font-bold text-slate-800">{totalOutboundPackages}</p>
          </div>
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <MapPin class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
        </div>
      </div>
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
                placeholder="Cari destinasi atau paket outbound..."
                class="w-full pl-12 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <!-- Hasil Pencarian -->
        {#if loading}
          <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p class="text-blue-800 text-sm">Memuat data...</p>
            </div>
          </div>
        {:else if filteredDestinations.length === 0 && filteredOutboundPackages.length === 0}
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

      <!-- Tab Navigation -->
      <div class="border-b border-slate-100">
        <nav class="flex space-x-8 px-6">
          <button
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeTab === 'destinations' ? 'border-green-500 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}"
            on:click={() => activeTab = 'destinations'}
          >
            Destinasi ({filteredDestinations.length})
          </button>
          <button
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeTab === 'outbound' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}"
            on:click={() => activeTab = 'outbound'}
          >
            Paket Outbound ({filteredOutboundPackages.length})
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        {#if loading}
          <div class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <span class="ml-3 text-slate-600">Memuat data...</span>
          </div>
        {:else if activeTab === 'destinations' && filteredDestinations.length === 0}
          <div class="text-center py-12">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin class="w-8 h-8 text-slate-400" />
            </div>
            <h3 class="text-lg font-medium text-slate-900 mb-2">Tidak ada data destinasi</h3>
            <p class="text-slate-500">Coba ubah filter pencarian Anda</p>
          </div>
        {:else if activeTab === 'outbound' && filteredOutboundPackages.length === 0}
          <div class="text-center py-12">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin class="w-8 h-8 text-slate-400" />
            </div>
            <h3 class="text-lg font-medium text-slate-900 mb-2">Tidak ada data paket outbound</h3>
            <p class="text-slate-500">Coba ubah filter pencarian Anda</p>
          </div>
        {:else}
          <!-- Destinations Table -->
          {#if activeTab === 'destinations'}
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200">
                <thead class="bg-slate-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Destinasi</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dibuat</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-200">
                  {#each paginatedDestinations as destination}
                    <tr class="hover:bg-slate-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <MapPin class="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div class="text-sm font-medium text-slate-900">{destination.name}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {formatDate(destination.created_at)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                          <button
                            on:click={() => openEditModal(destination)}
                            class="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <Edit class="w-4 h-4" />
                          </button>
                          <button
                            on:click={() => showDeleteConfirmation('destination', destination)}
                            class="text-red-600 hover:text-red-900"
                            title="Hapus"
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

            <!-- Pagination for Destinations -->
            {#if totalPagesDestinations > 1}
              <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                <div class="flex items-center text-sm text-slate-700">
                  <span>Menampilkan {startIndexDestinations + 1} - {Math.min(endIndexDestinations, filteredDestinations.length)} dari {filteredDestinations.length} data</span>
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
                    disabled={currentPage === totalPagesDestinations}
                    class="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </div>
              </div>
            {/if}
          {/if}

          <!-- Outbound Packages Table -->
          {#if activeTab === 'outbound'}
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200">
                <thead class="bg-slate-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Destinasi</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Periode</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Harga</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-200">
                  {#each paginatedOutboundPackages as outboundPackage}
                    <tr class="hover:bg-slate-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <MapPin class="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div class="text-sm font-medium text-slate-900">
                              {outboundPackage.destinations?.name || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        <div>
                          <div>{formatDate(outboundPackage.start_date)}</div>
                          <div class="text-xs text-slate-400">s/d {formatDate(outboundPackage.end_date)}</div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {outboundPackage.price || '-'}
                      </td>
                                             <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                         <div class="flex space-x-2">
                           <button
                             on:click={() => openEditOutboundModal(outboundPackage)}
                             class="text-blue-600 hover:text-blue-900"
                             title="Edit"
                           >
                             <Edit class="w-4 h-4" />
                           </button>
                           <button
                             on:click={() => showDeleteConfirmation('outbound', outboundPackage)}
                             class="text-red-600 hover:text-red-900"
                             title="Hapus"
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

            <!-- Pagination for Outbound Packages -->
            {#if totalPagesOutboundPackages > 1}
              <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                <div class="flex items-center text-sm text-slate-700">
                  <span>Menampilkan {startIndexOutboundPackages + 1} - {Math.min(endIndexOutboundPackages, filteredOutboundPackages.length)} dari {filteredOutboundPackages.length} data</span>
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
                        class="px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 {currentPage === page ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}"
                      >
                        {page}
                      </button>
                    {/if}
                  {/each}
                  
                  <button
                    on:click={goToNextPage}
                    disabled={currentPage === totalPagesOutboundPackages}
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
  </div>

  <!-- Modal Edit Destinasi -->
  {#if showEditModal}
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 class="text-lg font-semibold text-slate-800">Edit Destinasi</h3>
          <button
            on:click={closeEditModal}
            class="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <X class="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <!-- Content -->
        <div class="p-6 space-y-4">
          <div>
            <label for="editName" class="block text-sm font-medium text-slate-700 mb-2">
              Nama Destinasi
            </label>
            <input
              id="editName"
              type="text"
              bind:value={editName}
              class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-200"
              placeholder="Masukkan nama destinasi"
            />
          </div>
        </div>
        
        <!-- Footer -->
        <div class="flex gap-3 p-6 border-t border-slate-200">
          <button
            on:click={closeEditModal}
            class="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
          >
            Batal
          </button>
          <button
            on:click={updateDestination}
            class="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Modal Edit Outbound Package -->
  {#if showEditOutboundModal}
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 class="text-lg font-semibold text-slate-800">Edit Paket Outbound</h3>
          <button
            on:click={closeEditOutboundModal}
            class="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <X class="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <!-- Content -->
        <div class="p-6 space-y-4">
          <div>
            <label for="editStartDate" class="block text-sm font-medium text-slate-700 mb-2">
              Tanggal Mulai
            </label>
            <input
              id="editStartDate"
              type="date"
              bind:value={editOutboundForm.start_date}
              class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
          
          <div>
            <label for="editEndDate" class="block text-sm font-medium text-slate-700 mb-2">
              Tanggal Selesai
            </label>
            <input
              id="editEndDate"
              type="date"
              bind:value={editOutboundForm.end_date}
              class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
          
          <div>
            <label for="editPrice" class="block text-sm font-medium text-slate-700 mb-2">
              Harga
            </label>
            <input
              id="editPrice"
              type="text"
              bind:value={editOutboundForm.price}
              class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Masukkan harga paket"
            />
          </div>
        </div>
        
        <!-- Footer -->
        <div class="flex gap-3 p-6 border-t border-slate-200">
          <button
            on:click={closeEditOutboundModal}
            class="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
          >
            Batal
          </button>
          <button
            on:click={updateOutboundPackage}
            class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
              Simpan
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Modal Konfirmasi Hapus -->
  {#if showDeleteModal && deletingItem}
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full border border-white/50">
        <!-- Header Modal -->
        <div class="flex items-center justify-center p-6 border-b border-gray-200">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
        </div>

        <!-- Content Modal -->
        <div class="p-6 text-center">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Konfirmasi Hapus
          </h3>
          <p class="text-gray-500 mb-6">
            Apakah Anda yakin ingin menghapus {deleteType === 'destination' ? 'destinasi' : 'paket outbound'} 
            <span class="font-semibold text-gray-900">
              "{deleteType === 'destination' ? deletingItem.name : `${deletingItem.destinations?.name || 'N/A'} - ${formatDate(deletingItem.start_date)}`}"
            </span>?
          </p>
          <p class="text-sm text-red-600 mb-6">
            Tindakan ini tidak dapat dibatalkan dan akan menghapus data secara permanen.
          </p>
        </div>

        <!-- Footer Modal -->
        <div class="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            on:click={closeDeleteModal}
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            on:click={confirmDelete}
            class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Snackbar Notification -->
  {#if showSnackbar}
    <div class="fixed top-4 right-4 z-[60] transition-all duration-300 ease-in-out">
      <div class="flex items-center gap-3 p-4 rounded-lg shadow-lg border max-w-sm {snackbarType === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}">
        {#if snackbarType === 'success'}
          <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        {:else}
          <svg class="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        {/if}
        <span class="font-medium text-sm">{snackbarMessage}</span>
        <button
          on:click={() => showSnackbar = false}
          class="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  {/if}
</RoleGuard>
