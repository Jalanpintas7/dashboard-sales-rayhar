<script>
  import { getUmrahSeasons, getUmrahCategories, getAirlines, createUmrahPackage } from '../supabase-helpers.js';
  import { onMount } from 'svelte';
  import { Building2, Loader2 } from 'lucide-svelte';

  // Data dari database
  let seasons = [];
  let categories = [];
  let airlines = [];
  let isLoading = true;
  let error = '';

  let packageData = {
    namaPaket: '',
    musimId: '',
    kategoriId: '',
    tanggalBerangkat: '',
    tanggalKembali: '',
    airline: '',
    flightName: '',
    deskripsi: '',
    status: 'aktif',
    // Harga berdasarkan tipe bilik
    hargaDouble: 0,
    hargaTriple: 0,
    hargaQuadruple: 0,
    hargaQuintuple: 0,
    // Harga untuk anak dan infant
    hargaCWB: 0,    // Child With Bed
    hargaCNB: 0,    // Child No Bed
    hargaInfant: 0  // Infant
  };

  // Load data dari database
  async function loadData() {
    try {
      isLoading = true;
      error = '';
      
      // Load musim, kategori, dan airlines secara parallel
      const [seasonsData, categoriesData, airlinesData] = await Promise.all([
        getUmrahSeasons(),
        getUmrahCategories(),
        getAirlines()
      ]);
      
      seasons = seasonsData;
      categories = categoriesData;
      airlines = airlinesData;
      
    } catch (err) {
      console.error('Error loading data:', err);
      error = 'Gagal memuat data musim, kategori, dan airlines';
    } finally {
      isLoading = false;
    }
  }

  // Get selected musim, kategori, dan airline data
  $: selectedMusim = seasons.find(s => s.id === packageData.musimId);
  $: selectedKategori = categories.find(c => c.id === packageData.kategoriId);
  $: selectedAirline = airlines.find(a => a.id === packageData.airline);

  let isSubmitting = false;
  let submitMessage = '';
  let submitMessageType = '';

  async function handleSubmit() {
    if (!packageData.namaPaket.trim()) {
      showMessage('Nama paket harus diisi', 'error');
      return;
    }

    if (!packageData.musimId) {
      showMessage('Pilih musim umrah', 'error');
      return;
    }

    if (!packageData.kategoriId) {
      showMessage('Pilih kategori umrah', 'error');
      return;
    }

    if (!packageData.tanggalBerangkat) {
      showMessage('Tanggal berangkat harus diisi', 'error');
      return;
    }

    if (!packageData.tanggalKembali) {
      showMessage('Tanggal kembali harus diisi', 'error');
      return;
    }

    if (!packageData.airline) {
      showMessage('Pilih maskapai penerbangan', 'error');
      return;
    }

    isSubmitting = true;
    submitMessage = '';

    try {
      // Persiapkan data untuk database
      const packageDataForDB = {
        start_date: packageData.tanggalBerangkat,
        end_date: packageData.tanggalKembali,
        umrah_season_id: packageData.musimId,
        umrah_category_id: packageData.kategoriId,
        airline_id: packageData.airline,
        flight_name: packageData.flightName.trim() || null,
        is_active: packageData.status === 'aktif',
        // Harga berdasarkan tipe bilik
        double: packageData.hargaDouble || 0,
        triple: packageData.hargaTriple || 0,
        quadruple: packageData.hargaQuadruple || 0,
        quintuple: packageData.hargaQuintuple || 0,
        // Harga untuk anak dan infant
        cwb: packageData.hargaCWB || 0,
        cnb: packageData.hargaCNB || 0,
        infant: packageData.hargaInfant || 0
      };

      // Simpan ke database menggunakan Supabase
      const result = await createUmrahPackage(packageDataForDB);

      console.log('Paket umrah berhasil dibuat:', result);
      showMessage('Paket umrah berhasil dibuat!', 'success');

      // Reset form setelah submit berhasil
      packageData = {
        namaPaket: '',
        musimId: '',
        kategoriId: '',
        tanggalBerangkat: '',
        tanggalKembali: '',
        airline: '',
        flightName: '',
        deskripsi: '',
        status: 'aktif',
        // Reset harga bilik
        hargaDouble: 0,
        hargaTriple: 0,
        hargaQuadruple: 0,
        hargaQuintuple: 0,
        // Reset harga anak dan infant
        hargaCWB: 0,
        hargaCNB: 0,
        hargaInfant: 0
      };

    } catch (error) {
      console.error('Error saat membuat paket umrah:', error);
      showMessage('Gagal membuat paket umrah. Silakan coba lagi.', 'error');
    } finally {
      isSubmitting = false;
    }
  }

  function showMessage(text, type) {
    submitMessage = text;
    submitMessageType = type;

    // Auto hide message setelah 5 detik
    setTimeout(() => {
      submitMessage = '';
      submitMessageType = '';
    }, 5000);
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  onMount(() => {
    loadData();
  });
</script>

<div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
  <div class="flex items-center gap-3 mb-4 sm:mb-6">
    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-xl flex items-center justify-center">
      <Building2 class="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
    </div>
    <h2 class="text-lg sm:text-xl font-bold text-slate-800">Buat Paket Umrah Baru</h2>
  </div>

  <!-- Error Display -->
  {#if error}
    <div class="mb-4 p-3 bg-red-100 text-red-800 border border-red-200 rounded-lg">
      {error}
    </div>
  {/if}

  <!-- Submit Message Display -->
  {#if submitMessage}
    <div class="mb-4 p-3 rounded-lg {submitMessageType === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}">
      {submitMessage}
    </div>
  {/if}

  <!-- Loading State -->
  {#if isLoading}
    <div class="flex items-center justify-center py-8">
      <div class="flex items-center gap-2 text-slate-600">
        <Loader2 class="animate-spin h-5 w-5" />
        Memuat data musim, kategori, dan airlines...
      </div>
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4 sm:space-y-6">
      <!-- Nama Paket -->
      <div>
        <label for="namaPaket" class="block text-sm font-medium text-slate-700 mb-2">
          Nama Paket *
        </label>
        <input
          id="namaPaket"
          type="text"
          bind:value={packageData.namaPaket}
          required
          placeholder="Contoh: Paket Umrah Ramadhan Premium 2024"
          class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <!-- Musim dan Kategori -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="musimId" class="block text-sm font-medium text-slate-700 mb-2">
            Pilih Musim *
          </label>
          <select
            id="musimId"
            bind:value={packageData.musimId}
            required
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Pilih Musim</option>
            {#each seasons.filter(s => s.is_active) as season}
              <option value={season.id}>
                {season.name}
              </option>
            {/each}
          </select>
        </div>

        <div>
          <label for="kategoriId" class="block text-sm font-medium text-slate-700 mb-2">
            Pilih Kategori *
          </label>
          <select
            id="kategoriId"
            bind:value={packageData.kategoriId}
            required
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Pilih Kategori</option>
            {#each categories.filter(c => c.is_active) as category}
              <option value={category.id}>
                {category.name}
              </option>
            {/each}
          </select>
        </div>
      </div>

      

      <!-- Tanggal Berangkat dan Kembali -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="tanggalBerangkat" class="block text-sm font-medium text-slate-700 mb-2">
            Tanggal Berangkat *
          </label>
          <input
            id="tanggalBerangkat"
            type="date"
            bind:value={packageData.tanggalBerangkat}
            required
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label for="tanggalKembali" class="block text-sm font-medium text-slate-700 mb-2">
            Tanggal Kembali *
          </label>
          <input
            id="tanggalKembali"
            type="date"
            bind:value={packageData.tanggalKembali}
            required
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <!-- Airline dan Flight Name -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="airline" class="block text-sm font-medium text-slate-700 mb-2">
            Pilih Airline *
          </label>
          <select
            id="airline"
            bind:value={packageData.airline}
            required
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Pilih Airline</option>
            {#each airlines.filter(a => a.is_active) as airline}
              <option value={airline.id}>
                {airline.name}
              </option>
            {/each}
          </select>
        </div>

        <div>
          <label for="flightName" class="block text-sm font-medium text-slate-700 mb-2">
            Nama Penerbangan
          </label>
          <input
            id="flightName"
            type="text"
            bind:value={packageData.flightName}
            placeholder="Contoh: MH1234"
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      

      <!-- Harga Bilik -->
      <div>
        <h4 class="font-medium text-slate-800 mb-4">Harga Berdasarkan Tipe Bilik:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label for="hargaDouble" class="block text-sm font-medium text-slate-700 mb-2">
              Harga Double Room
            </label>
            <input
              id="hargaDouble"
              type="number"
              bind:value={packageData.hargaDouble}
              min="0"
              placeholder="0"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
            {#if packageData.hargaDouble > 0}
              <p class="text-xs text-slate-500 mt-1">{formatCurrency(packageData.hargaDouble)}</p>
            {/if}
          </div>

          <div>
            <label for="hargaTriple" class="block text-sm font-medium text-slate-700 mb-2">
              Harga Triple Room
            </label>
            <input
              id="hargaTriple"
              type="number"
              bind:value={packageData.hargaTriple}
              min="0"
              placeholder="0"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
            {#if packageData.hargaTriple > 0}
              <p class="text-xs text-slate-500 mt-1">{formatCurrency(packageData.hargaTriple)}</p>
            {/if}
          </div>

          <div>
            <label for="hargaQuadruple" class="block text-sm font-medium text-slate-700 mb-2">
              Harga Quadruple Room
            </label>
            <input
              id="hargaQuadruple"
              type="number"
              bind:value={packageData.hargaQuadruple}
              min="0"
              placeholder="0"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
            {#if packageData.hargaQuadruple > 0}
              <p class="text-xs text-slate-500 mt-1">{formatCurrency(packageData.hargaQuadruple)}</p>
            {/if}
          </div>

          <div>
            <label for="hargaQuintuple" class="block text-sm font-medium text-slate-700 mb-2">
              Harga Quintuple Room
            </label>
            <input
              id="hargaQuintuple"
              type="number"
              bind:value={packageData.hargaQuintuple}
              min="0"
              placeholder="0"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
            {#if packageData.hargaQuintuple > 0}
              <p class="text-xs text-slate-500 mt-1">{formatCurrency(packageData.hargaQuintuple)}</p>
            {/if}
                 </div>
     </div>
   </div>
 
   <!-- Harga Anak dan Infant -->
   <div>
     <h4 class="font-medium text-slate-800 mb-4">Harga Anak dan Infant:</h4>
     <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
       <div>
         <label for="hargaCWB" class="block text-sm font-medium text-slate-700 mb-2">
           Harga CWB (Child With Bed)
         </label>
         <input
           id="hargaCWB"
           type="number"
           bind:value={packageData.hargaCWB}
           min="0"
           placeholder="0"
           class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
         />
         {#if packageData.hargaCWB > 0}
           <p class="text-xs text-slate-500 mt-1">{formatCurrency(packageData.hargaCWB)}</p>
         {/if}
       </div>
 
       <div>
         <label for="hargaCNB" class="block text-sm font-medium text-slate-700 mb-2">
           Harga CNB (Child No Bed)
         </label>
         <input
           id="hargaCNB"
           type="number"
           bind:value={packageData.hargaCNB}
           min="0"
           placeholder="0"
           class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
         />
         {#if packageData.hargaCNB > 0}
           <p class="text-xs text-slate-500 mt-1">{formatCurrency(packageData.hargaCNB)}</p>
         {/if}
       </div>
 
       <div>
         <label for="hargaInfant" class="block text-sm font-medium text-slate-700 mb-2">
           Harga Infant
         </label>
         <input
           id="hargaInfant"
           type="number"
           bind:value={packageData.hargaInfant}
           min="0"
           placeholder="0"
           class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
         />
         {#if packageData.hargaInfant > 0}
           <p class="text-xs text-slate-500 mt-1">{formatCurrency(packageData.hargaInfant)}</p>
         {/if}
       </div>
     </div>
   </div>
 
          <!-- Status -->
       <div class="flex items-center gap-3">
         <input
           id="status"
           type="checkbox"
           checked={packageData.status === 'aktif'}
           on:change={(e) => packageData.status = e.target.checked ? 'aktif' : 'nonaktif'}
           class="w-4 h-4 text-green-600 bg-slate-100 border-slate-300 rounded focus:ring-green-500 focus:ring-2"
         />
         <label for="status" class="text-sm font-medium text-slate-700">
           Paket Aktif
         </label>
       </div>

       <!-- Overview Lengkap Paket -->
       {#if packageData.namaPaket || selectedMusim || selectedKategori || selectedAirline || packageData.tanggalBerangkat || packageData.tanggalKembali || packageData.hargaDouble > 0 || packageData.hargaTriple > 0 || packageData.hargaQuadruple > 0 || packageData.hargaQuintuple > 0 || packageData.hargaCWB > 0 || packageData.hargaCNB > 0 || packageData.hargaInfant > 0}
         <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
           <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-green-600">
               <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
             </svg>
             Overview Paket Umrah
           </h3>
           
           <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <!-- Informasi Dasar -->
             <div class="space-y-4">
               <h4 class="font-semibold text-slate-700 border-b border-slate-200 pb-2">Informasi Dasar</h4>
               
               {#if packageData.namaPaket}
                 <div class="flex justify-between">
                   <span class="text-slate-600">Nama Paket:</span>
                   <span class="font-medium text-slate-800">{packageData.namaPaket}</span>
                 </div>
               {/if}
               
               {#if selectedMusim}
                 <div class="flex justify-between">
                   <span class="text-slate-600">Musim:</span>
                   <div class="flex items-center gap-2">
                     <span class="font-medium text-slate-800">{selectedMusim.name}</span>
                     <span class="px-2 py-1 text-xs rounded-full {selectedMusim.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                       {selectedMusim.is_active ? 'Aktif' : 'Non-Aktif'}
                     </span>
                   </div>
                 </div>
               {/if}
               
               {#if selectedKategori}
                 <div class="flex justify-between">
                   <span class="text-slate-600">Kategori:</span>
                   <div class="flex items-center gap-2">
                     <span class="font-medium text-slate-800">{selectedKategori.name}</span>
                     <span class="px-2 py-1 text-xs rounded-full {selectedKategori.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                       {selectedKategori.is_active ? 'Aktif' : 'Non-Aktif'}
                     </span>
                   </div>
                 </div>
               {/if}
               
               {#if selectedAirline}
                 <div class="flex justify-between">
                   <span class="text-slate-600">Maskapai:</span>
                   <div class="flex items-center gap-2">
                     <span class="font-medium text-slate-800">{selectedAirline.name}</span>
                     <span class="px-2 py-1 text-xs rounded-full {selectedAirline.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                       {selectedAirline.is_active ? 'Aktif' : 'Non-Aktif'}
                     </span>
                   </div>
                 </div>
               {/if}
               
               {#if packageData.flightName}
                 <div class="flex justify-between">
                   <span class="text-slate-600">Flight Name:</span>
                   <span class="font-medium text-slate-800">{packageData.flightName}</span>
                 </div>
               {/if}
             </div>
             
             <!-- Tanggal Perjalanan -->
             <div class="space-y-4">
               <h4 class="font-semibold text-slate-700 border-b border-slate-200 pb-2">Tanggal Perjalanan</h4>
               
               {#if packageData.tanggalBerangkat}
                 <div class="flex justify-between">
                   <span class="text-slate-600">Tanggal Berangkat:</span>
                   <span class="font-medium text-slate-800">{new Date(packageData.tanggalBerangkat).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                 </div>
               {/if}
               
               {#if packageData.tanggalKembali}
                 <div class="flex justify-between">
                   <span class="text-slate-600">Tanggal Kembali:</span>
                   <span class="font-medium text-slate-800">{new Date(packageData.tanggalKembali).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                 </div>
               {/if}
               
               {#if packageData.tanggalBerangkat && packageData.tanggalKembali}
                 <div class="flex justify-between">
                   <span class="text-slate-600">Durasi:</span>
                   <span class="font-medium text-slate-800">
                     {Math.ceil((new Date(packageData.tanggalKembali) - new Date(packageData.tanggalBerangkat)) / (1000 * 60 * 60 * 24))} hari
                   </span>
                 </div>
               {/if}
             </div>
           </div>
           
           <!-- Harga Bilik -->
           {#if packageData.hargaDouble > 0 || packageData.hargaTriple > 0 || packageData.hargaQuadruple > 0 || packageData.hargaQuintuple > 0}
             <div class="mt-6">
               <h4 class="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">Harga Berdasarkan Tipe Bilik</h4>
               <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {#if packageData.hargaDouble > 0}
                   <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                     <div class="text-center">
                       <p class="text-sm font-medium text-slate-700 mb-1">Double Room</p>
                       <p class="text-lg font-bold text-green-600">{formatCurrency(packageData.hargaDouble)}</p>
                       <p class="text-xs text-slate-500">per kamar (2 orang)</p>
                     </div>
                   </div>
                 {/if}
                 
                 {#if packageData.hargaTriple > 0}
                   <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                     <div class="text-center">
                       <p class="text-sm font-medium text-slate-700 mb-1">Triple Room</p>
                       <p class="text-lg font-bold text-green-600">{formatCurrency(packageData.hargaTriple)}</p>
                       <p class="text-xs text-slate-500">per kamar (3 orang)</p>
                     </div>
                   </div>
                 {/if}
                 
                 {#if packageData.hargaQuadruple > 0}
                   <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                     <div class="text-center">
                       <p class="text-sm font-medium text-slate-700 mb-1">Quadruple Room</p>
                       <p class="text-lg font-bold text-green-600">{formatCurrency(packageData.hargaQuadruple)}</p>
                       <p class="text-xs text-slate-500">per kamar (4 orang)</p>
                     </div>
                   </div>
                 {/if}
                 
                 {#if packageData.hargaQuintuple > 0}
                   <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                     <div class="text-center">
                       <p class="text-sm font-medium text-slate-700 mb-1">Quintuple Room</p>
                       <p class="text-lg font-bold text-green-600">{formatCurrency(packageData.hargaQuintuple)}</p>
                       <p class="text-xs text-slate-500">per kamar (5 orang)</p>
                     </div>
                   </div>
                 {/if}
               </div>
             </div>
           {/if}
           
           <!-- Harga Anak dan Infant -->
           {#if packageData.hargaCWB > 0 || packageData.hargaCNB > 0 || packageData.hargaInfant > 0}
             <div class="mt-6">
               <h4 class="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">Harga Anak dan Infant</h4>
               <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {#if packageData.hargaCWB > 0}
                   <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                     <div class="text-center">
                       <p class="text-sm font-medium text-slate-700 mb-1">CWB (Child With Bed)</p>
                       <p class="text-lg font-bold text-blue-600">{formatCurrency(packageData.hargaCWB)}</p>
                       <p class="text-xs text-slate-500">anak dengan tempat tidur</p>
                     </div>
                   </div>
                 {/if}
                 
                 {#if packageData.hargaCNB > 0}
                   <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                     <div class="text-center">
                       <p class="text-sm font-medium text-slate-700 mb-1">CNB (Child No Bed)</p>
                       <p class="text-lg font-bold text-blue-600">{formatCurrency(packageData.hargaCNB)}</p>
                       <p class="text-xs text-slate-500">anak tanpa tempat tidur</p>
                     </div>
                   </div>
                 {/if}
                 
                 {#if packageData.hargaInfant > 0}
                   <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                     <div class="text-center">
                       <p class="text-sm font-medium text-slate-700 mb-1">Infant</p>
                       <p class="text-lg font-bold text-blue-600">{formatCurrency(packageData.hargaInfant)}</p>
                       <p class="text-xs text-slate-500">bayi/infant</p>
                     </div>
                   </div>
                 {/if}
               </div>
             </div>
           {/if}
           
           <!-- Status Paket -->
           <div class="mt-6 pt-4 border-t border-slate-200">
             <div class="flex justify-between items-center">
               <span class="text-slate-600">Status Paket:</span>
               <span class="px-3 py-1 rounded-full text-sm font-medium {packageData.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                 {packageData.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}
               </span>
             </div>
           </div>
         </div>
       {/if}

              <!-- Tombol Submit -->
        <button
          type="submit"
          disabled={isSubmitting}
          class="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg disabled:cursor-not-allowed"
        >
          {#if isSubmitting}
            <div class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menyimpan...
            </div>
          {:else}
            Buat Paket Umrah
          {/if}
        </button>
    </form>
  {/if}
</div>
