<script>
  import { customersData, getInitials, getStatusColor, getPackageColor } from '$lib/data/customers.js';
  
  // State untuk pagination
  let currentPage = 1;
  let itemsPerPage = 5;
  
  // State untuk filter
  let searchTerm = '';
  let statusFilter = '';
  let packageFilter = '';
  let branchFilter = '';
  
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
        <p class="text-sm text-gray-500">Daftar semua pelanggan dan pemesanan paket</p>
      </div>
      <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        + Tambah Pelanggan
      </button>
    </div>
    
    <!-- Filter Bar -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
      <!-- Search -->
      <div>
        <input
          type="text"
          placeholder="Cari pelanggan..."
          bind:value={searchTerm}
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      
      <!-- Status Filter -->
      <div>
        <select
          bind:value={statusFilter}
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Semua Status</option>
          {#each uniqueStatuses as status}
            <option value={status}>{status}</option>
          {/each}
        </select>
      </div>
      
      <!-- Package Filter -->
      <div>
        <select
          bind:value={packageFilter}
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Semua Paket</option>
          {#each uniquePackages as packageType}
            <option value={packageType}>{packageType}</option>
          {/each}
        </select>
      </div>
      
      <!-- Branch Filter -->
      <div>
        <select
          bind:value={branchFilter}
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Semua Cabang</option>
          {#each uniqueBranches as branch}
            <option value={branch}>{branch}</option>
          {/each}
        </select>
      </div>
      
      <!-- Reset Button -->
      <div>
        <button
          on:click={resetFilters}
          class="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  </div>

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
            KATEGORI
          </th>
          <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            STATUS
          </th>
          <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            HARGA
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
                      {getInitials(customer.name)}
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
            
            <!-- Kolom KATEGORI -->
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900 max-w-xs">{customer.category}</div>
            </td>
            
            <!-- Kolom STATUS -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border {getStatusColor(customer.status)}">
                {customer.status}
              </span>
            </td>
            
            <!-- Kolom HARGA -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{customer.price}</div>
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
  <div class="px-6 py-4 border-t border-gray-100">
    <div class="flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Menampilkan <span class="font-medium">{startIndex + 1}</span> sampai <span class="font-medium">{Math.min(endIndex, filteredCustomers.length)}</span> dari <span class="font-medium">{filteredCustomers.length}</span> hasil
      </div>
      <div class="flex items-center space-x-2">
        <button 
          on:click={prevPage}
          disabled={currentPage === 1}
          class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sebelumnya
        </button>
        
        <!-- Page Numbers -->
        {#each Array.from({length: totalPages}, (_, i) => i + 1) as pageNum}
          <button 
            on:click={() => currentPage = pageNum}
            class="px-3 py-1 text-sm border rounded-md {currentPage === pageNum ? 'text-white bg-purple-600 border-purple-600' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'}"
          >
            {pageNum}
          </button>
        {/each}
        
        <button 
          on:click={nextPage}
          disabled={currentPage === totalPages}
          class="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </div>
</div>
