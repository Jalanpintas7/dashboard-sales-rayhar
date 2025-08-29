<script>
  import { createUmrahSeason } from '../supabase-helpers.js';
  import { onMount } from 'svelte';

  let seasonData = {
    namaMusim: ''
  };

  let isLoading = false;
  let message = '';
  let messageType = '';

  async function handleSubmit() {
    if (!seasonData.namaMusim.trim()) {
      showMessage('Nama musim harus diisi', 'error');
      return;
    }

    isLoading = true;
    message = '';
    
    try {
      // Persiapkan data untuk database
      const seasonDataForDB = {
        name: seasonData.namaMusim.trim()
      };

      // Simpan ke database menggunakan Supabase
      const result = await createUmrahSeason(seasonDataForDB);
      
      console.log('Musim umrah berhasil ditambahkan:', result);
      showMessage('Musim umrah berhasil ditambahkan!', 'success');
      
      // Reset form setelah submit berhasil
      seasonData = {
        namaMusim: ''
      };
      
    } catch (error) {
      console.error('Error saat menambahkan musim umrah:', error);
      showMessage('Gagal menambahkan musim umrah. Silakan coba lagi.', 'error');
    } finally {
      isLoading = false;
    }
  }

  function showMessage(text, type) {
    message = text;
    messageType = type;
    
    // Auto hide message setelah 5 detik
    setTimeout(() => {
      message = '';
      messageType = '';
    }, 5000);
  }
</script>

<div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
  <div class="flex items-center gap-3 mb-4 sm:mb-6">
    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-xl flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 sm:w-5 sm:h-5 text-purple-600">
        <path d="M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
        <path d="M16 2v4"/>
        <path d="M8 2v4"/>
        <path d="M3 10h18"/>
      </svg>
    </div>
    <h2 class="text-lg sm:text-xl font-bold text-slate-800">Tambah Musim Umrah Baru</h2>
  </div>

  <!-- Message Display -->
  {#if message}
    <div class="mb-4 p-3 rounded-lg {messageType === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}">
      {message}
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="space-y-4 sm:space-y-6">
    <div>
      <label for="namaMusim" class="block text-sm font-medium text-slate-700 mb-2">
        Nama Musim *
      </label>
      <input
        id="namaMusim"
        type="text"
        bind:value={seasonData.namaMusim}
        required
        placeholder="Contoh: Ramadhan, Syawal, Dzulhijjah"
        class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        disabled={isLoading}
      />
    </div>

    <button
      type="submit"
      disabled={isLoading}
      class="w-full bg-[#942392] hover:bg-[#7a1d7a] disabled:bg-[#b84bb8] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg disabled:cursor-not-allowed"
    >
      {#if isLoading}
        <div class="flex items-center justify-center gap-2">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Menyimpan...
        </div>
      {:else}
        Tambah Musim Umrah
      {/if}
    </button>
  </form>
</div>
