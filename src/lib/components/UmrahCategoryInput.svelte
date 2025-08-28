<script>
  import { createUmrahCategory } from '../supabase-helpers.js';

  let categoryData = {
    namaKategori: '',
    status: 'aktif'
  };

  let isLoading = false;
  let message = '';
  let messageType = '';

  async function handleSubmit() {
    if (!categoryData.namaKategori.trim()) {
      showMessage('Nama kategori harus diisi', 'error');
      return;
    }

    isLoading = true;
    message = '';
    
    try {
      // Persiapkan data untuk database
      const categoryDataForDB = {
        name: categoryData.namaKategori.trim(),
        is_active: categoryData.status === 'aktif'
      };

      // Simpan ke database menggunakan Supabase
      const result = await createUmrahCategory(categoryDataForDB);
      
      console.log('Kategori umrah berhasil ditambahkan:', result);
      showMessage('Kategori umrah berhasil ditambahkan!', 'success');
      
      // Reset form setelah submit berhasil
      categoryData = {
        namaKategori: '',
        status: 'aktif'
      };
      
    } catch (error) {
      console.error('Error saat menambahkan kategori umrah:', error);
      showMessage('Gagal menambahkan kategori umrah. Silakan coba lagi.', 'error');
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

<div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-yellow-600">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
    <h2 class="text-xl font-bold text-slate-800">Tambah Kategori Umrah Baru</h2>
  </div>

  <!-- Message Display -->
  {#if message}
    <div class="mb-4 p-3 rounded-lg {messageType === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}">
      {message}
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div>
      <label for="namaKategori" class="block text-sm font-medium text-slate-700 mb-2">
        Nama Kategori *
      </label>
      <input
        id="namaKategori"
        type="text"
        bind:value={categoryData.namaKategori}
        required
        placeholder="Contoh: Premium, Standard, Ekonomi, VIP"
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
        disabled={isLoading}
      />
    </div>

    <div>
      <label for="status" class="block text-sm font-medium text-slate-700 mb-2">
        Status
      </label>
      <select
        id="status"
        bind:value={categoryData.status}
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
        disabled={isLoading}
      >
        <option value="aktif">Aktif</option>
        <option value="nonaktif">Non-Aktif</option>
      </select>
    </div>

    <button
      type="submit"
      disabled={isLoading}
      class="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg disabled:cursor-not-allowed"
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
        Tambah Kategori Umrah
      {/if}
    </button>
  </form>
</div>
