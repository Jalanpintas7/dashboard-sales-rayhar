<script>
  let categoryData = {
    namaKategori: '',
    deskripsi: '',
    levelLayanan: 'standard',
    fasilitas: [],
    status: 'aktif'
  };

  const fasilitasOptions = [
    'Hotel 5 Bintang',
    'Hotel 4 Bintang', 
    'Hotel 3 Bintang',
    'Makan 3x Sehari',
    'Makan 2x Sehari',
    'Transport AC',
    'Transport Non-AC',
    'Guide Bahasa Indonesia',
    'Guide Bahasa Arab',
    'Visa Processing',
    'Asuransi Perjalanan',
    'Buku Panduan',
    'Tas Umrah',
    'Pakaian Ihram'
  ];

  function toggleFasilitas(fasilitas) {
    if (categoryData.fasilitas.includes(fasilitas)) {
      categoryData.fasilitas = categoryData.fasilitas.filter(f => f !== fasilitas);
    } else {
      categoryData.fasilitas = [...categoryData.fasilitas, fasilitas];
    }
  }

  function handleSubmit() {
    console.log('Data kategori umrah:', categoryData);
    
    // Reset form setelah submit
    categoryData = {
      namaKategori: '',
      deskripsi: '',
      levelLayanan: 'standard',
      fasilitas: [],
      status: 'aktif'
    };
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
      />
    </div>

    <div>
      <label for="deskripsi" class="block text-sm font-medium text-slate-700 mb-2">
        Deskripsi Kategori
      </label>
      <textarea
        id="deskripsi"
        bind:value={categoryData.deskripsi}
        rows="3"
        placeholder="Deskripsi tentang kategori umrah ini..."
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
      ></textarea>
    </div>

    <div>
      <label for="levelLayanan" class="block text-sm font-medium text-slate-700 mb-2">
        Level Layanan
      </label>
      <select
        id="levelLayanan"
        bind:value={categoryData.levelLayanan}
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
      >
        <option value="standard">Standard</option>
        <option value="premium">Premium</option>
        <option value="vip">VIP</option>
        <option value="ekonomi">Ekonomi</option>
        <option value="luxury">Luxury</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-3">
        Fasilitas yang Tersedia
      </label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-3 border border-slate-200 rounded-xl">
        {#each fasilitasOptions as fasilitas}
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={categoryData.fasilitas.includes(fasilitas)}
              on:change={() => toggleFasilitas(fasilitas)}
              class="w-4 h-4 text-yellow-600 bg-slate-100 border-slate-300 rounded focus:ring-yellow-500 focus:ring-2"
            />
            <span class="text-sm text-slate-700">{fasilitas}</span>
          </label>
        {/each}
      </div>
    </div>

    <div>
      <label for="status" class="block text-sm font-medium text-slate-700 mb-2">
        Status
      </label>
      <select
        id="status"
        bind:value={categoryData.status}
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
      >
        <option value="aktif">Aktif</option>
        <option value="nonaktif">Non-Aktif</option>
      </select>
    </div>

    <button
      type="submit"
      class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg"
    >
      Tambah Kategori Umrah
    </button>
  </form>
</div>
