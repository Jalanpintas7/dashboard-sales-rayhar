<script>
  // State untuk form input destinasi
  let destinationData = {
    namaDestinasi: '',
    negara: '',
    deskripsi: '',
    gambar: null,
    aktif: true
  };

  // Handle form submission
  function handleSubmit() {
    // TODO: Implementasi logika untuk menyimpan destinasi
    console.log('Data destinasi:', destinationData);
    
    // Reset form setelah submit
    destinationData = {
      namaDestinasi: '',
      negara: '',
      deskripsi: '',
      gambar: null,
      aktif: true
    };
  }

  // Handle file upload
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      destinationData.gambar = file;
    }
  }
</script>

<div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
  <!-- Header dengan ikon -->
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-yellow-600">
        <path d="M19 10c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 2c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 7.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    </div>
    <h2 class="text-xl font-bold text-slate-800">Tambah Destinasi Baru</h2>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <!-- Nama Destinasi -->
    <div>
      <label for="namaDestinasi" class="block text-sm font-medium text-slate-700 mb-2">
        Nama Destinasi *
      </label>
      <input
        id="namaDestinasi"
        type="text"
        bind:value={destinationData.namaDestinasi}
        required
        placeholder="Contoh: Tokyo, Paris, London"
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
      />
    </div>

    <!-- Negara -->
    <div>
      <label for="negara" class="block text-sm font-medium text-slate-700 mb-2">
        Negara *
      </label>
      <input
        id="negara"
        type="text"
        bind:value={destinationData.negara}
        required
        placeholder="Contoh: Japan, France, England"
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
      />
    </div>

    <!-- Deskripsi -->
    <div>
      <label for="deskripsi" class="block text-sm font-medium text-slate-700 mb-2">
        Deskripsi Destinasi
      </label>
      <textarea
        id="deskripsi"
        bind:value={destinationData.deskripsi}
        rows="4"
        placeholder="Masukkan deskripsi destinasi pelancongan..."
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
      ></textarea>
    </div>

    <!-- Upload Gambar -->
    <div>
      <label for="gambar" class="block text-sm font-medium text-slate-700 mb-2">
        Gambar Destinasi
      </label>
      <div class="flex items-center justify-center w-full">
        <label for="gambar" class="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-slate-500">
              <span class="font-semibold">Klik untuk upload</span> atau drag and drop
            </p>
            <p class="text-xs text-slate-500">PNG, JPG, GIF (MAX. 10MB)</p>
          </div>
          <input 
            id="gambar" 
            type="file" 
            accept="image/*" 
            on:change={handleFileUpload}
            class="hidden" 
          />
        </label>
      </div>
    </div>

    <!-- Status Aktif -->
    <div class="flex items-center gap-3">
      <input
        id="aktif"
        type="checkbox"
        bind:checked={destinationData.aktif}
        class="w-4 h-4 text-yellow-600 bg-slate-100 border-slate-300 rounded focus:ring-yellow-500 focus:ring-2"
      />
      <label for="aktif" class="text-sm font-medium text-slate-700">
        Destinasi Aktif
      </label>
    </div>

    <!-- Tombol Submit -->
    <button
      type="submit"
      class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg"
    >
      Tambah Destinasi
    </button>
  </form>
</div>
