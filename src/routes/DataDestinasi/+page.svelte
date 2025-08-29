<script>
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  import { MapPin, X, Check, Trash2, Sun } from 'lucide-svelte';
  import { supabase } from '$lib/supabase.js';
  import { onMount } from 'svelte';
  
  // Data destinasi dari Supabase
  let destinations = [];
  let loading = true;
  let error = null;

  let searchTerm = '';
  let statusFilter = 'all';

  // Load data dari Supabase
  async function loadDestinations() {
    try {
      loading = true;
      const { data, error: fetchError } = await supabase
        .from('destinations')
        .select(`
          *,
          outbound_dates (
            start_date,
            end_date,
            price
          ),
          sales_consultant (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      destinations = data || [];
    } catch (err) {
      error = err.message;
      console.error('Error loading destinations:', err);
    } finally {
      loading = false;
    }
  }

  // Toggle status destinasi
  async function toggleStatus(id, currentStatus) {
    try {
      const newStatus = !currentStatus;
      const { error: updateError } = await supabase
        .from('destinations')
        .update({ is_active: newStatus })
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      // Update local state
      const destination = destinations.find(d => d.id === id);
      if (destination) {
        destination.is_active = newStatus;
      }
    } catch (err) {
      error = err.message;
      console.error('Error updating destination status:', err);
    }
  }

  // Hapus destinasi
  async function deleteDestination(id) {
    if (confirm('Apakah Anda yakin ingin menghapus destinasi ini?')) {
      try {
        const { error: deleteError } = await supabase
          .from('destinations')
          .delete()
          .eq('id', id);

        if (deleteError) {
          throw deleteError;
        }

        // Update local state
        destinations = destinations.filter(d => d.id !== id);
      } catch (err) {
        error = err.message;
        console.error('Error deleting destination:', err);
      }
    }
  }

  // Load data saat komponen mount
  onMount(() => {
    loadDestinations();
  });

  // Hitung statistik
  $: totalDestinations = destinations.length;
  $: activeDestinations = destinations.filter(d => d.is_active).length;
  $: inactiveDestinations = destinations.filter(d => !d.is_active).length;

  // Filter destinations berdasarkan search dan status
  $: filteredDestinations = destinations.filter(destination => {
    const matchesSearch = searchTerm === '' || 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && destination.is_active) ||
      (statusFilter === 'inactive' && !destination.is_active);
    
    return matchesSearch && matchesStatus;
  });
</script>

<RoleGuard allowedRoles={['super_admin', 'admin_branch']}>
  <div class="p-3 sm:p-6 space-y-4 sm:space-y-6">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Data Destinasi</h1>
      <p class="text-sm sm:text-base text-slate-600">Kelola dan lihat semua data destinasi pelancongan</p>
    </div>

    <!-- Error Message -->
    {#if error}
      <div class="bg-red-50 border border-red-200 rounded-xl p-4">
        <p class="text-red-700 text-sm">Error: {error}</p>
      </div>
    {/if}

    <!-- Statistik Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <!-- Total Destinasi -->
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-600">Total Destinasi</p>
            <p class="text-2xl sm:text-3xl font-bold text-slate-800">{totalDestinations}</p>
          </div>
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <MapPin class="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
        </div>
      </div>

      <!-- Destinasi Aktif -->
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-600">Destinasi Aktif</p>
            <p class="text-2xl sm:text-3xl font-bold text-slate-800">{activeDestinations}</p>
          </div>
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Sun class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <!-- Destinasi Non-Aktif -->
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-600">Destinasi Non-Aktif</p>
            <p class="text-2xl sm:text-3xl font-bold text-slate-800">{inactiveDestinations}</p>
          </div>
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <X class="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2">
          <label for="search" class="block text-sm font-medium text-slate-700 mb-2">Cari Destinasi</label>
          <input
            id="search"
            type="text"
            bind:value={searchTerm}
            placeholder="Cari berdasarkan nama destinasi..."
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <div>
          <label for="statusFilter" class="block text-sm font-medium text-slate-700 mb-2">Status</label>
          <select
            id="statusFilter"
            bind:value={statusFilter}
            class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Non-Aktif</option>
          </select>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft border border-white/60 overflow-hidden">
      {#if loading}
        <div class="p-8 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
          <p class="mt-2 text-slate-600">Memuat data destinasi...</p>
        </div>
      {:else}
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Destinasi</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Harga</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sales Consultant</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-slate-100">
              {#each filteredDestinations as destination}
                <tr class="hover:bg-slate-50 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <MapPin class="w-4 h-4 text-slate-600" />
                      </div>
                      <span class="font-medium text-slate-900">{destination.name}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {#if destination.outbound_dates && destination.outbound_dates.length > 0}
                      {#each destination.outbound_dates.slice(0, 1) as date}
                        {date.start_date ? new Date(date.start_date).toLocaleDateString('id-ID') : '-'} - {date.end_date ? new Date(date.end_date).toLocaleDateString('id-ID') : '-'}
                      {/each}
                    {:else}
                      -
                    {/if}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {#if destination.outbound_dates && destination.outbound_dates.length > 0}
                      {#each destination.outbound_dates.slice(0, 1) as date}
                        {date.price || '-'}
                      {/each}
                    {:else}
                      -
                    {/if}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {destination.sales_consultant?.name || '-'}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded-full {destination.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                      {destination.is_active ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center gap-2">
                      <button
                        on:click={() => toggleStatus(destination.id, destination.is_active)}
                        class="text-slate-600 hover:text-slate-800 transition-colors duration-200"
                        title={destination.is_active ? 'Non-aktifkan' : 'Aktifkan'}
                      >
                        {#if destination.is_active}
                          <X class="w-4 h-4" />
                        {:else}
                          <Check class="w-4 h-4" />
                        {/if}
                      </button>
                      <button
                        on:click={() => deleteDestination(destination.id)}
                        class="text-red-600 hover:text-red-800 transition-colors duration-200"
                        title="Hapus"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        
        {#if filteredDestinations.length === 0}
          <div class="p-8 text-center">
            <MapPin class="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p class="text-slate-600">Tidak ada destinasi yang ditemukan</p>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</RoleGuard>
