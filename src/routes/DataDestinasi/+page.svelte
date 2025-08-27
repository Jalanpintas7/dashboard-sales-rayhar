<script>
  let destinations = [
    { id: 1, nama: 'Tokyo', negara: 'Japan', aktif: true, tanggalDibuat: '2024-01-15' },
    { id: 2, nama: 'Paris', negara: 'France', aktif: true, tanggalDibuat: '2024-01-10' },
    { id: 3, nama: 'London', negara: 'England', aktif: true, tanggalDibuat: '2024-01-08' },
    { id: 4, nama: 'Seoul', negara: 'South Korea', aktif: true, tanggalDibuat: '2024-01-12' },
    { id: 5, nama: 'Bangkok', negara: 'Thailand', aktif: true, tanggalDibuat: '2024-01-05' }
  ];

  let searchTerm = '';
  let statusFilter = 'all';

  $: filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.negara.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && dest.aktif) ||
                         (statusFilter === 'inactive' && !dest.aktif);
    return matchesSearch && matchesStatus;
  });

  function toggleStatus(id) {
    destinations = destinations.map(dest => 
      dest.id === id ? { ...dest, aktif: !dest.aktif } : dest
    );
  }

  function deleteDestination(id) {
    if (confirm('Apakah Anda yakin ingin menghapus destinasi ini?')) {
      destinations = destinations.filter(dest => dest.id !== id);
    }
  }
</script>

<div class="p-6 space-y-6">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-slate-800 mb-2">Data Destinasi</h1>
    <p class="text-slate-600">Kelola dan lihat semua data destinasi pelancongan</p>
  </div>

  <div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="md:col-span-2">
        <label for="search" class="block text-sm font-medium text-slate-700 mb-2">Cari Destinasi</label>
        <input
          id="search"
          type="text"
          bind:value={searchTerm}
          placeholder="Cari berdasarkan nama atau negara..."
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>
      <div>
        <label for="statusFilter" class="block text-sm font-medium text-slate-700 mb-2">Status</label>
        <select
          id="statusFilter"
          bind:value={statusFilter}
          class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        >
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Non-Aktif</option>
        </select>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-2xl shadow-soft border border-white/60 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Destinasi</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Negara</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-slate-100">
          {#each filteredDestinations as destination}
            <tr class="hover:bg-slate-50 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#{destination.id}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 10c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 2c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 7.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </div>
                  <span class="font-medium text-slate-900">{destination.nama}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{destination.negara}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full {destination.aktif ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                  {destination.aktif ? 'Aktif' : 'Non-Aktif'}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <button
                    on:click={() => toggleStatus(destination.id)}
                    class="text-slate-600 hover:text-slate-800 transition-colors duration-200"
                    title={destination.aktif ? 'Non-aktifkan' : 'Aktifkan'}
                  >
                    {#if destination.aktif}
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"/>
                      </svg>
                    {:else}
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    {/if}
                  </button>
                  <button
                    on:click={() => deleteDestination(destination.id)}
                    class="text-red-600 hover:text-red-800 transition-colors duration-200"
                    title="Hapus"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
