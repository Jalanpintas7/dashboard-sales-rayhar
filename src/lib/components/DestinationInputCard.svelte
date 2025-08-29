<script>
  import { MapPin, Search, ChevronDown } from 'lucide-svelte';
  import { supabase } from '$lib/supabase.js';
  import { onMount } from 'svelte';
  
  // State untuk form input paket destinasi
  let packageData = {
    destination_id: null,
    start_date: '',
    end_date: '',
    price: ''
  };

  let loading = false;
  let message = '';
  
  // State untuk dropdown destinasi
  let destinations = [];
  let filteredDestinations = [];
  let searchQuery = '';
  let isDropdownOpen = false;
  let selectedDestination = null;

  // Load destinations saat komponen mount
  onMount(async () => {
    await loadDestinations();
  });

  // Load data destinations dari database
  async function loadDestinations() {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name, created_at')
        .order('name');

      if (error) {
        console.error('Error loading destinations:', error);
        return;
      }

      destinations = data || [];
      filteredDestinations = [...destinations];
    } catch (error) {
      console.error('Error loading destinations:', error);
    }
  }

  // Filter destinations berdasarkan search query
  function filterDestinations() {
    if (!searchQuery.trim()) {
      filteredDestinations = [...destinations];
    } else {
      filteredDestinations = destinations.filter(destination =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }

  // Handle search input
  function handleSearchInput(event) {
    searchQuery = event.target.value;
    filterDestinations();
  }

  // Select destination
  function selectDestination(destination) {
    selectedDestination = destination;
    packageData.destination_id = destination.id;
    searchQuery = destination.name;
    isDropdownOpen = false;
  }

  // Toggle dropdown
  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
      filterDestinations();
    }
  }

  // Handle form submission
  async function handleSubmit() {
    loading = true;
    message = '';
    
    try {
      // Validasi data
      if (!packageData.destination_id) {
        throw new Error('Pilih destinasi terlebih dahulu');
      }
      
      if (!packageData.start_date || !packageData.end_date) {
        throw new Error('Tanggal mulai dan selesai harus diisi');
      }
      
      if (!packageData.price) {
        throw new Error('Harga harus diisi');
      }

      // Insert data ke tabel outbound_dates
      const { data, error } = await supabase
        .from('outbound_dates')
        .insert([
          {
            destination_id: packageData.destination_id,
            start_date: packageData.start_date,
            end_date: packageData.end_date,
            price: packageData.price.toString()
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      message = 'Paket destinasi berhasil dibuat!';
      
      // Reset form setelah submit
      packageData = {
        destination_id: null,
        start_date: '',
        end_date: '',
        price: ''
      };
      selectedDestination = null;
      searchQuery = '';
      
    } catch (error) {
      console.error('Error membuat paket destinasi:', error);
      message = 'Gagal membuat paket destinasi: ' + error.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
  <!-- Header dengan ikon -->
  <div class="flex items-center gap-3 mb-4 sm:mb-6">
    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
      <MapPin class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
    </div>
    <h2 class="text-lg sm:text-xl font-bold text-slate-800">Tambah Paket Destinasi</h2>
  </div>

  <!-- Message -->
  {#if message}
    <div class="mb-4 p-3 rounded-lg {message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
      {message}
    </div>
  {/if}

  <!-- Warning jika tidak ada destinasi -->
  {#if destinations.length === 0}
    <div class="mb-4 p-3 rounded-lg bg-yellow-100 text-yellow-700 border border-yellow-200">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        <span class="text-sm font-medium">
          Belum ada destinasi tersedia. Silakan tambahkan destinasi terlebih dahulu di card sebelah kiri.
        </span>
      </div>
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="space-y-4 sm:space-y-6">
    <!-- Tujuan Destinasi Dropdown -->
    <div class="relative">
      <label class="block text-sm font-medium text-slate-700 mb-2">
        Tujuan Destinasi
      </label>
      <div class="relative">
        <div class="flex items-center border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-yellow-500 focus-within:border-transparent transition-all duration-200">
          <div class="flex items-center px-3">
            <Search class="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            bind:value={searchQuery}
            on:input={handleSearchInput}
            on:focus={() => {
              isDropdownOpen = true;
              filterDestinations();
            }}
            on:click={() => {
              isDropdownOpen = true;
              filterDestinations();
            }}
            placeholder="Cari destinasi..."
            class="flex-1 px-3 py-2 sm:py-3 border-none outline-none bg-transparent cursor-pointer"
            required
          />
          <button
            type="button"
            on:click={toggleDropdown}
            class="px-3 py-2 sm:py-2 sm:py-3 hover:bg-slate-50 transition-colors"
          >
            <ChevronDown class="w-4 h-4 text-slate-400 {isDropdownOpen ? 'rotate-180' : ''}" />
          </button>
        </div>
        
        <!-- Dropdown Menu -->
        {#if isDropdownOpen}
          <div class="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            
            {#if destinations.length === 0}
              <div class="px-4 py-3 text-slate-500 text-sm">
                Belum ada destinasi tersedia. Silakan tambahkan destinasi terlebih dahulu.
              </div>
            {:else if filteredDestinations.length === 0}
              <div class="px-4 py-3 text-slate-500 text-sm">
                Tidak ada destinasi yang cocok dengan pencarian
              </div>
            {:else}
              {#each filteredDestinations as destination}
                <button
                  type="button"
                  on:click={() => selectDestination(destination)}
                  class="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                >
                  <div class="font-medium text-slate-800">{destination.name}</div>
                </button>
              {/each}
            {/if}
          </div>
        {/if}
      </div>
      
      <!-- Selected Destination Display -->
      {#if selectedDestination}
        <div class="mt-2 p-2 bg-yellow-50 rounded-lg">
          <div class="text-sm text-yellow-800">
            <span class="font-medium">Dipilih:</span> {selectedDestination.name}
          </div>
        </div>
      {/if}
    </div>

    <!-- Start Date dan End Date -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="startDate" class="block text-sm font-medium text-slate-700 mb-2">
          Tanggal Mulai
        </label>
        <input
          id="startDate"
          type="date"
          bind:value={packageData.start_date}
          required
          class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div>
        <label for="endDate" class="block text-sm font-medium text-slate-700 mb-2">
          Tanggal Selesai
        </label>
        <input
          id="endDate"
          type="date"
          bind:value={packageData.end_date}
          required
          class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>

    <!-- Price -->
    <div>
      <label for="price" class="block text-sm font-medium text-slate-700 mb-2">
        Harga (RM)
      </label>
      <input
        id="price"
        type="number"
        bind:value={packageData.price}
        required
        placeholder="Contoh: 5000000"
        min="0"
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
      />
    </div>

    <!-- Tombol Submit -->
    <button
      type="submit"
      disabled={loading}
      class="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg"
    >
      {loading ? 'Membuat Paket...' : 'Buat Paket Destinasi'}
    </button>
  </form>
</div>

<!-- Click outside to close dropdown -->
{#if isDropdownOpen}
  <div class="fixed inset-0 z-40" on:click={() => isDropdownOpen = false}></div>
{/if}
