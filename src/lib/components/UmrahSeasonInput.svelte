<script>
  let seasonData = {
    namaMusim: '',
    deskripsi: '',
    periodeAwal: '',
    periodeAkhir: '',
    status: 'aktif'
  };

  function handleSubmit() {
    console.log('Data musim umrah:', seasonData);
    
    // Reset form setelah submit
    seasonData = {
      namaMusim: '',
      deskripsi: '',
      periodeAwal: '',
      periodeAkhir: '',
      status: 'aktif'
    };
  }
</script>

<div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-purple-600">
        <path d="M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
        <path d="M16 2v4"/>
        <path d="M8 2v4"/>
        <path d="M3 10h18"/>
      </svg>
    </div>
    <h2 class="text-xl font-bold text-slate-800">Tambah Musim Umrah Baru</h2>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
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
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
      />
    </div>

    <div>
      <label for="deskripsi" class="block text-sm font-medium text-slate-700 mb-2">
        Deskripsi Musim
      </label>
      <textarea
        id="deskripsi"
        bind:value={seasonData.deskripsi}
        rows="3"
        placeholder="Deskripsi singkat tentang musim umrah ini..."
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
      ></textarea>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="periodeAwal" class="block text-sm font-medium text-slate-700 mb-2">
          Periode Awal *
        </label>
        <input
          id="periodeAwal"
          type="date"
          bind:value={seasonData.periodeAwal}
          required
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div>
        <label for="periodeAkhir" class="block text-sm font-medium text-slate-700 mb-2">
          Periode Akhir *
        </label>
        <input
          id="periodeAkhir"
          type="date"
          bind:value={seasonData.periodeAkhir}
          required
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>

    <div>
      <label for="status" class="block text-sm font-medium text-slate-700 mb-2">
        Status
      </label>
      <select
        id="status"
        bind:value={seasonData.status}
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
      >
        <option value="aktif">Aktif</option>
        <option value="nonaktif">Non-Aktif</option>
      </select>
    </div>

    <button
      type="submit"
      class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg"
    >
      Tambah Musim Umrah
    </button>
  </form>
</div>
