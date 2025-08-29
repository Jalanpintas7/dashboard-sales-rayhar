<script>
  import { MapPin, Search, ChevronDown } from 'lucide-svelte';
  import { supabase } from '$lib/supabase.js';
  import { onMount } from 'svelte';
  
  // State untuk form input destinasi
  let destinationData = {
    name: '',
    sales_consultant_id: null,
    is_active: true
  };

  let loading = false;
  let message = '';
  
  // State untuk dropdown sales consultant
  let salesConsultants = [];
  let filteredConsultants = [];
  let searchQuery = '';
  let isDropdownOpen = false;
  let selectedConsultant = null;

  // Load sales consultants saat komponen mount
  onMount(async () => {
    await loadSalesConsultants();
  });

  // Load data sales consultant dari database
  async function loadSalesConsultants() {
    try {
      const { data, error } = await supabase
        .from('sales_consultant')
        .select('id, name, email, whatsapp_number')
        .order('name');

      if (error) {
        console.error('Error loading sales consultants:', error);
        return;
      }

      salesConsultants = data || [];
      filteredConsultants = [...salesConsultants];
    } catch (error) {
      console.error('Error loading sales consultants:', error);
    }
  }

  // Filter consultants berdasarkan search query
  function filterConsultants() {
    if (!searchQuery.trim()) {
      filteredConsultants = [...salesConsultants];
    } else {
      filteredConsultants = salesConsultants.filter(consultant =>
        consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }

  // Handle search input
  function handleSearchInput(event) {
    searchQuery = event.target.value;
    filterConsultants();
  }

  // Select consultant
  function selectConsultant(consultant) {
    selectedConsultant = consultant;
    destinationData.sales_consultant_id = consultant.id;
    searchQuery = consultant.name;
    isDropdownOpen = false;
  }

  // Toggle dropdown
  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
      filterConsultants();
    }
  }

  // Handle form submission
  async function handleSubmit() {
    loading = true;
    message = '';
    
    try {
      // Insert data ke tabel destinations
      const { data, error } = await supabase
        .from('destinations')
        .insert([
          {
            name: destinationData.name,
            sales_consultant_id: destinationData.sales_consultant_id,
            is_active: destinationData.is_active
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      message = 'Destinasi berhasil ditambahkan!';
      
      // Reset form setelah submit
      destinationData = {
        name: '',
        sales_consultant_id: null,
        is_active: true
      };
      selectedConsultant = null;
      searchQuery = '';
      
    } catch (error) {
      console.error('Error menambahkan destinasi:', error);
      message = 'Gagal menambahkan destinasi: ' + error.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
  <!-- Header dengan ikon -->
  <div class="flex items-center gap-3 mb-4 sm:mb-6">
    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
      <MapPin class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
    </div>
    <h2 class="text-lg sm:text-xl font-bold text-slate-800">Tambah Destinasi</h2>
  </div>

  <!-- Message -->
  {#if message}
    <div class="mb-4 p-3 rounded-lg {message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
      {message}
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="space-y-4 sm:space-y-6">
    <!-- Nama Destinasi -->
    <div>
      <label for="namaDestinasi" class="block text-sm font-medium text-slate-700 mb-2">
        Nama Destinasi
      </label>
      <input
        id="namaDestinasi"
        type="text"
        bind:value={destinationData.name}
        required
        placeholder="Masukkan nama destinasi"
        class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>

    <!-- Sales Consultant Dropdown -->
    <div class="relative">
      <label class="block text-sm font-medium text-slate-700 mb-2">
        Sales Consultant (Opsional)
      </label>
      <div class="relative">
        <div class="flex items-center border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
          <div class="flex items-center px-3">
            <Search class="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            bind:value={searchQuery}
            on:input={handleSearchInput}
            on:focus={() => isDropdownOpen = true}
            placeholder="Cari sales consultant..."
            class="flex-1 px-3 py-2 sm:py-3 border-none outline-none bg-transparent"
          />
          <button
            type="button"
            on:click={toggleDropdown}
            class="px-3 py-2 sm:py-3 hover:bg-slate-50 transition-colors"
          >
            <ChevronDown class="w-4 h-4 text-slate-400 {isDropdownOpen ? 'rotate-180' : ''}" />
          </button>
        </div>
        
        <!-- Dropdown Menu -->
        {#if isDropdownOpen}
          <div class="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {#if filteredConsultants.length === 0}
              <div class="px-4 py-3 text-slate-500 text-sm">
                Tidak ada sales consultant ditemukan
              </div>
            {:else}
              {#each filteredConsultants as consultant}
                <button
                  type="button"
                  on:click={() => selectConsultant(consultant)}
                  class="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                >
                  <div class="font-medium text-slate-800">{consultant.name}</div>
                  <div class="text-sm text-slate-500">{consultant.email}</div>
                  {#if consultant.whatsapp_number}
                    <div class="text-xs text-slate-400">WhatsApp: {consultant.whatsapp_number}</div>
                  {/if}
                </button>
              {/each}
            {/if}
          </div>
        {/if}
      </div>
      
      <!-- Selected Consultant Display -->
      {#if selectedConsultant}
        <div class="mt-2 p-2 bg-blue-50 rounded-lg">
          <div class="text-sm text-blue-800">
            <span class="font-medium">Dipilih:</span> {selectedConsultant.name} ({selectedConsultant.email})
          </div>
        </div>
      {/if}
    </div>

    <!-- Status Aktif -->
    <div class="flex items-center gap-3">
      <input
        id="aktif"
        type="checkbox"
        bind:checked={destinationData.is_active}
        class="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      <label for="aktif" class="text-sm font-medium text-slate-700">
        Destinasi Aktif
      </label>
    </div>

    <!-- Tombol Submit -->
    <button
      type="submit"
      disabled={loading}
      class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg"
    >
      {loading ? 'Menambahkan...' : 'Tambah Destinasi'}
    </button>
  </form>
</div>

<!-- Click outside to close dropdown -->
{#if isDropdownOpen}
  <div class="fixed inset-0 z-40" on:click={() => isDropdownOpen = false}></div>
{/if}
