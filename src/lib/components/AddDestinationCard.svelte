<script>
  import { MapPin } from 'lucide-svelte';
  import { supabase } from '$lib/supabase.js';
  
  // State untuk form input destinasi
  let destinationData = {
    name: ''
  };

  let loading = false;
  let message = '';

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
            name: destinationData.name
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      message = 'Destinasi berhasil ditambahkan!';
      
      // Reset form setelah submit
      destinationData = {
        name: ''
      };
      
    } catch (error) {
      console.error('Error menambahkan destinasi:', error);
      message = 'Gagal menambahkan destinasi: ' + error.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-3 sm:p-4 lg:p-6 border border-white/60">
  <!-- Header dengan ikon -->
  <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
    <div class="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
      <MapPin class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600" />
    </div>
    <h2 class="text-base sm:text-lg lg:text-xl font-bold text-slate-800">Tambah Destinasi</h2>
  </div>

  <!-- Message -->
  {#if message}
    <div class="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm {message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
      {message}
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="space-y-3 sm:space-y-4 lg:space-y-6">
    <!-- Nama Destinasi -->
    <div>
      <label for="namaDestinasi" class="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
        Nama Destinasi
      </label>
      <input
        id="namaDestinasi"
        type="text"
        bind:value={destinationData.name}
        required
        placeholder="Masukkan nama destinasi"
        class="w-full px-3 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>

    <!-- Tombol Submit -->
    <button
      type="submit"
      disabled={loading}
      class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg sm:rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg"
    >
      {#if loading}
        <div class="flex items-center justify-center gap-1.5 sm:gap-2">
          <div class="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs sm:text-sm">Menambahkan...</span>
        </div>
      {:else}
        <span class="text-xs sm:text-sm">Tambah Destinasi</span>
      {/if}
    </button>
  </form>
</div>
