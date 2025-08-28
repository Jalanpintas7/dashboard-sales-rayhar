<script>
  import { MapPin, MoreVertical } from 'lucide-svelte';
  
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
</script>

<div class="space-y-6">
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
                <MapPin class="w-4 h-4 text-slate-600" />
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
                <MoreVertical class="w-4 h-4 text-slate-400" />
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
