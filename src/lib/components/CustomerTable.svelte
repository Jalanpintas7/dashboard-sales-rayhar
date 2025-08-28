<script>
  import { onMount } from 'svelte';
  import { fetchCustomersData, getInitials, getStatusColor, getPackageColor } from '$lib/data/customers.js';
  import { Loader2, AlertTriangle, Users } from 'lucide-svelte';
  
  // State untuk data
  let customersData = [];
  let loading = true;
  let error = null;
  
  // State untuk pagination
  let currentPage = 1;
  let itemsPerPage = 10;
  
  // State untuk filter
  let searchTerm = '';
  let statusFilter = '';
  let packageFilter = '';
  let branchFilter = '';
  
  // Load data saat komponen dimount
  onMount(async () => {
    try {
      loading = true;
      customersData = await fetchCustomersData();
    } catch (err) {
      error = 'Gagal memuat data pelanggan';
      console.error('Error loading customers:', err);
    } finally {
      loading = false;
    }
  });
  
  // Data yang sudah difilter
  $: filteredCustomers = customersData.filter(customer => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      if (!customer.name.toLowerCase().includes(search) && 
          !customer.email.toLowerCase().includes(search) && 
          !customer.phone.includes(search)) {
        return false;
      }
    }
    if (statusFilter && customer.status !== statusFilter) return false;
    if (packageFilter && customer.package !== packageFilter) return false;
    if (branchFilter && customer.branch !== branchFilter) return false;
    return true;
  });
  
  // Pagination
  $: totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  $: startIndex = (currentPage - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;
  $: paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);
  
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
  
  // Fungsi untuk reset filter
  function resetFilters() {
    searchTerm = '';
    statusFilter = '';
    packageFilter = '';
    branchFilter = '';
    currentPage = 1;
  }
  
  // Dapatkan daftar unik untuk filter
  $: uniqueStatuses = [...new Set(customersData.map(c => c.status))];
  $: uniquePackages = [...new Set(customersData.map(c => c.package))];
  $: uniqueBranches = [...new Set(customersData.map(c => c.branch))];
  
  // Reset currentPage ketika filter berubah
  $: if (searchTerm || statusFilter || packageFilter || branchFilter) {
    currentPage = 1;
  }
</script>

<div class="bg-white rounded-xl shadow-soft border border-white/60 overflow-hidden">
  <!-- Header Tabel -->
  <div class="px-6 py-4 border-b border-gray-100">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Data Pelanggan</h2>
        <p class="text-sm text-gray-500">Daftar semua pelanggan dan pemesanan paket dari database</p>
      </div>

    </div>
    
    <!-- Filter Bar -->
    <div class="flex flex-wrap gap-4 items-center">
      <!-- Search Input -->
      <div class="flex-1 min-w-64">
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Cari nama, email, atau telefon..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      
      <!-- Status Filter -->
      <select
        bind:value={statusFilter}
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="">Semua Status</option>
        {#each uniqueStatuses as status}
          <option value={status}>{status}</option>
        {/each}
      </select>
      
      <!-- Package Filter -->
      <select
        bind:value={packageFilter}
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="">Semua Paket</option>
        {#each uniquePackages as packageType}
          <option value={packageType}>{packageType}</option>
        {/each}
      </select>
      
      <!-- Branch Filter -->
      <select
        bind:value={branchFilter}
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        <option value="">Semua Cawangan</option>
        {#each uniqueBranches as branch}
          <option value={branch}>{branch}</option>
        {/each}
      </select>
      
      <!-- Reset Button -->
      <button
        on:click={resetFilters}
        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Reset
      </button>
    </div>
  </div>

  <!-- Loading State -->
  {#if loading}
    <div class="p-8 text-center">
      <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-purple-500 hover:bg-purple-400 transition ease-in-out duration-150 cursor-not-allowed">
        <Loader2 class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
        Memuat data pelanggan...
      </div>
    </div>
  {:else if error}
    <div class="p-8 text-center">
      <div class="text-red-600 mb-4">
        <AlertTriangle class="mx-auto h-12 w-12 text-red-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Gagal memuat data</h3>
      <p class="text-gray-500 mb-4">{error}</p>
      <button 
        on:click={() => window.location.reload()}
        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  {:else if customersData.length === 0}
    <div class="p-8 text-center">
      <div class="text-gray-400 mb-4">
        <Users class="mx-auto h-12 w-12" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak ada data pelanggan</h3>
      <p class="text-gray-500">Belum ada data pelanggan yang tersedia.</p>
    </div>
  {:else}
    <!-- Tabel -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              PELANGGAN
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CAWANGAN
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              PAKEJ
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DESTINASI
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              STATUS
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              BILANGAN
            </th>
            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              TARIKH
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          {#each paginatedCustomers as customer}
            <tr class="hover:bg-gray-50 transition-colors cursor-pointer">
              <!-- Kolom PELANGGAN -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <span class="text-sm font-medium text-purple-600">
                        {customer.avatar}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div class="text-sm text-gray-500">{customer.email}</div>
                    <div class="text-sm text-gray-500">{customer.phone}</div>
                  </div>
                </div>
              </td>
              
              <!-- Kolom CAWANGAN -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{customer.branch}</div>
              </td>
              
              <!-- Kolom PAKEJ -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border {getPackageColor(customer.package)}">
                  {customer.package}
                </span>
              </td>
              
              <!-- Kolom DESTINASI -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{customer.destination}</div>
              </td>
              
              <!-- Kolom STATUS -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(customer.status)}">
                  {customer.status}
                </span>
              </td>
              
              <!-- Kolom BILANGAN -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{customer.pax}</div>
              </td>
              
              <!-- Kolom TARIKH -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{customer.date}</div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    {#if totalPages > 1}
      <div class="px-6 py-4 border-t border-gray-100">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Menampilkan {startIndex + 1} sampai {Math.min(endIndex, filteredCustomers.length)} dari {filteredCustomers.length} hasil
          </div>
          <div class="flex items-center space-x-2">
            <button
              on:click={prevPage}
              disabled={currentPage === 1}
              class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            <span class="text-sm text-gray-700">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              on:click={nextPage}
              disabled={currentPage === totalPages}
              class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Seterusnya
            </button>
          </div>
        </div>
      </div>
    {/if}
  {/if}
</div>
