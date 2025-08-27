<script>
  // Data dummy untuk destinasi (nanti bisa diambil dari API/database)
  let destinations = [
    { id: 1, nama: 'Tokyo', negara: 'Japan', aktif: true },
    { id: 2, nama: 'Paris', negara: 'France', aktif: true },
    { id: 3, nama: 'London', negara: 'England', aktif: true },
    { id: 4, nama: 'Seoul', negara: 'South Korea', aktif: true },
    { id: 5, nama: 'Bangkok', negara: 'Thailand', aktif: true },
    { id: 6, nama: 'Singapore', negara: 'Singapore', aktif: false },
    { id: 7, nama: 'Dubai', negara: 'UAE', aktif: true },
    { id: 8, nama: 'New York', negara: 'USA', aktif: false },
    { id: 9, nama: 'Sydney', negara: 'Australia', aktif: true },
    { id: 10, nama: 'Hong Kong', negara: 'China', aktif: true }
  ];

  // Hitung statistik
  $: totalDestinations = destinations.length;
  $: activeDestinations = destinations.filter(d => d.aktif).length;
  $: inactiveDestinations = totalDestinations - activeDestinations;
</script>

<div class="space-y-6">
  <!-- Statistik Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Total Destinasi -->
    <div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-slate-600">Total Destinasi</p>
          <p class="text-3xl font-bold text-slate-800">{totalDestinations}</p>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-green-600">
            <path d="M19 10c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 2c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 7.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Destinasi Aktif -->
    <div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-slate-600">Destinasi Aktif</p>
          <p class="text-3xl font-bold text-slate-800">{activeDestinations}</p>
        </div>
        <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-yellow-600">
            <path d="M3 13a9 9 0 0 1 9 9"/>
            <path d="M3 13a9 9 0 0 0 6.5-6.5"/>
            <path d="M3 13a9 9 0 0 1 0-9"/>
            <path d="M3 13a9 9 0 0 0 6.5 6.5"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Destinasi Non-Aktif -->
    <div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-slate-600">Destinasi Non-Aktif</p>
          <p class="text-3xl font-bold text-slate-800">{inactiveDestinations}</p>
        </div>
        <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-red-600">
            <path d="M18.364 18.364A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Daftar Destinasi -->
  <div class="bg-white rounded-2xl shadow-soft border border-white/60 overflow-hidden">
    <div class="px-6 py-4 border-b border-slate-100">
      <h3 class="text-lg font-semibold text-slate-800">Daftar Destinasi Tersedia</h3>
    </div>
    
    <div class="divide-y divide-slate-100">
      {#each destinations.slice(0, 5) as destination}
        <div class="px-6 py-4 hover:bg-slate-50 transition-colors duration-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-slate-600">
                  <path d="M19 10c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 2c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 7.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-slate-800">{destination.nama}</p>
                <p class="text-sm text-slate-500">{destination.negara}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-xs font-medium rounded-full {destination.aktif ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                {destination.aktif ? 'Aktif' : 'Non-Aktif'}
              </span>
              <button class="p-1 hover:bg-slate-100 rounded-lg transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-slate-400">
                  <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    {#if destinations.length > 5}
      <div class="px-6 py-4 bg-slate-50 text-center">
        <p class="text-sm text-slate-600">
          Dan {destinations.length - 5} destinasi lainnya...
        </p>
      </div>
    {/if}
  </div>
</div>
