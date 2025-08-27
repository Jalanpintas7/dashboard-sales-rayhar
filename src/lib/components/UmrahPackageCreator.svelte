<script>
  // Data dummy untuk musim dan kategori (nanti bisa diambil dari database)
  let seasons = [
    { id: 1, nama: 'Ramadhan', periodeAwal: '2024-03-10', periodeAkhir: '2024-04-09', status: 'aktif' },
    { id: 2, nama: 'Syawal', periodeAwal: '2024-04-10', periodeAkhir: '2024-05-09', status: 'aktif' },
    { id: 3, nama: 'Dzulhijjah', periodeAwal: '2024-06-15', periodeAkhir: '2024-07-14', status: 'aktif' }
  ];

  let categories = [
    { id: 1, nama: 'Premium', levelLayanan: 'premium', status: 'aktif' },
    { id: 2, nama: 'Standard', levelLayanan: 'standard', status: 'aktif' },
    { id: 3, nama: 'Ekonomi', levelLayanan: 'ekonomi', status: 'aktif' },
    { id: 4, nama: 'VIP', levelLayanan: 'vip', status: 'aktif' }
  ];

  let airlines = [
    'Saudi Airlines',
    'Emirates',
    'Qatar Airways',
    'Turkish Airlines',
    'Malaysia Airlines',
    'Garuda Indonesia',
    'Lion Air',
    'AirAsia'
  ];

  let packageData = {
    namaPaket: '',
    musimId: '',
    kategoriId: '',
    tanggalBerangkat: '',
    tanggalKembali: '',
    airline: '',
    hargaPerPax: 0,
    kuota: 0,
    deskripsi: '',
    status: 'aktif'
  };

  // Get selected musim and kategori data
  $: selectedMusim = seasons.find(s => s.id == packageData.musimId);
  $: selectedKategori = categories.find(c => c.id == packageData.kategoriId);

  function handleSubmit() {
    console.log('Data paket umrah:', {
      ...packageData,
      musim: selectedMusim,
      kategori: selectedKategori
    });
    
    // Reset form setelah submit
    packageData = {
      namaPaket: '',
      musimId: '',
      kategoriId: '',
      tanggalBerangkat: '',
      tanggalKembali: '',
      airline: '',
      hargaPerPax: 0,
      kuota: 0,
      deskripsi: '',
      status: 'aktif'
    };
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }
</script>

<div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-green-600">
        <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
        <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
        <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
        <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
      </svg>
    </div>
    <h2 class="text-xl font-bold text-slate-800">Buat Paket Umrah Baru</h2>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
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
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
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
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Pilih Musim</option>
          {#each seasons.filter(s => s.status === 'aktif') as season}
            <option value={season.id}>
              {season.nama} ({season.periodeAwal} - {season.periodeAkhir})
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
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Pilih Kategori</option>
          {#each categories.filter(c => c.status === 'aktif') as category}
            <option value={category.id}>
              {category.nama} ({category.levelLayanan})
            </option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Preview Musim dan Kategori -->
    {#if selectedMusim && selectedKategori}
      <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h4 class="font-medium text-slate-800 mb-2">Detail Paket yang Dipilih:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-slate-600"><span class="font-medium">Musim:</span> {selectedMusim.nama}</p>
            <p class="text-slate-600"><span class="font-medium">Periode:</span> {selectedMusim.periodeAwal} - {selectedMusim.periodeAkhir}</p>
          </div>
          <div>
            <p class="text-slate-600"><span class="font-medium">Kategori:</span> {selectedKategori.nama}</p>
            <p class="text-slate-600"><span class="font-medium">Level:</span> {selectedKategori.levelLayanan}</p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Tanggal Perjalanan -->
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
          min={selectedMusim?.periodeAwal}
          max={selectedMusim?.periodeAkhir}
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
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
          min={packageData.tanggalBerangkat}
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>

    <!-- Airline dan Harga -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="airline" class="block text-sm font-medium text-slate-700 mb-2">
          Maskapai Penerbangan *
        </label>
        <select
          id="airline"
          bind:value={packageData.airline}
          required
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="">Pilih Maskapai</option>
          {#each airlines as airline}
            <option value={airline}>{airline}</option>
          {/each}
        </select>
      </div>

      <div>
        <label for="hargaPerPax" class="block text-sm font-medium text-slate-700 mb-2">
          Harga per Pax *
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">Rp</span>
          <input
            id="hargaPerPax"
            type="number"
            bind:value={packageData.hargaPerPax}
            required
            min="0"
            step="100000"
            placeholder="0"
            class="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        {#if packageData.hargaPerPax > 0}
          <p class="text-sm text-slate-600 mt-1">
            {formatCurrency(packageData.hargaPerPax)}
          </p>
        {/if}
      </div>
    </div>

    <!-- Kuota dan Status -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="kuota" class="block text-sm font-medium text-slate-700 mb-2">
          Kuota Tersedia *
        </label>
        <input
          id="kuota"
          type="number"
          bind:value={packageData.kuota}
          required
          min="1"
          placeholder="Jumlah peserta maksimal"
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-slate-700 mb-2">
          Status Paket
        </label>
        <select
          id="status"
          bind:value={packageData.status}
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Non-Aktif</option>
          <option value="draft">Draft</option>
        </select>
      </div>
    </div>

    <!-- Deskripsi -->
    <div>
      <label for="deskripsi" class="block text-sm font-medium text-slate-700 mb-2">
        Deskripsi Paket
      </label>
      <textarea
        id="deskripsi"
        bind:value={packageData.deskripsi}
        rows="4"
        placeholder="Deskripsi lengkap paket umrah ini..."
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
      ></textarea>
    </div>

    <!-- Tombol Submit -->
    <button
      type="submit"
      class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg"
    >
      Buat Paket Umrah
    </button>
  </form>
</div>
