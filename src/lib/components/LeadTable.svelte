<script>
  import { onMount } from 'svelte';
  import { getInitials } from '$lib/data/leads.js';
  import { Loader2, AlertTriangle, Users, X, Phone, Mail, MapPin, Calendar, User, Building, Package, Globe, Hash, FileText, TrendingUp, Search, Filter } from 'lucide-svelte';
  import { user } from '$lib/stores/auth.js';
  import { supabase } from '$lib/supabase.js';
  
  let leadsData = [];
  let loading = true;
  let error = null;
  let searchTerm = '';
  let selectedLead = null;
  let showDetailModal = false;
  
  onMount(async () => {
    try {
      loading = true;
      const { leadsData: sampleData } = await import('$lib/data/leads.js');
      leadsData = sampleData;
    } catch (err) {
      error = 'Gagal memuat data lead';
      console.error('Error loading leads:', err);
    } finally {
      loading = false;
    }
  });
  
  function showLeadDetail(lead) {
    selectedLead = lead;
    showDetailModal = true;
  }
  
  function closeDetailModal() {
    showDetailModal = false;
    selectedLead = null;
  }
  
  $: filteredLeads = leadsData.filter(lead => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      lead.name.toLowerCase().includes(term) ||
      lead.email.toLowerCase().includes(term) ||
      lead.phone.includes(term) ||
      lead.branch.toLowerCase().includes(term) ||
      lead.interest.toLowerCase().includes(term)
    );
  });
</script>

<div class="bg-white rounded-xl shadow-soft border border-white/60 overflow-hidden">
  <!-- Header dengan search dan filter -->
  <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Data Lead</h3>
        <p class="text-sm text-gray-600">Kelola data lead dan prospek pelanggan</p>
      </div>
      
      <!-- Search Bar -->
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari lead..."
          bind:value={searchTerm}
          class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
        />
      </div>
    </div>
  </div>

  {#if loading}
    <div class="p-8 text-center">
      <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-purple-500 hover:bg-purple-400 transition ease-in-out duration-150 cursor-not-allowed">
        <Loader2 class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
        Memuat data lead...
      </div>
    </div>
  {:else if error}
    <div class="p-8 text-center">
      <div class="text-red-600 mb-4">
        <AlertTriangle class="mx-auto h-12 w-12 text-red-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Gagal memuat data</h3>
      <p class="text-gray-500 mb-4">{error}</p>
    </div>
  {:else if filteredLeads.length === 0}
    <div class="p-8 text-center">
      <div class="text-gray-400 mb-4">
        <TrendingUp class="mx-auto h-12 w-12" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {searchTerm ? 'Tidak ada hasil pencarian' : 'Tidak ada data lead'}
      </h3>
      <p class="text-gray-500">
        {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Belum ada data lead yang tersedia.'}
      </p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              LEAD
            </th>
            <th class="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CAWANGAN
            </th>
            <th class="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              MINAT
            </th>
            <th class="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              TARIKH
            </th>
            
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          {#each filteredLeads as lead}
            <tr class="hover:bg-gray-50 transition-colors cursor-pointer" on:click={() => showLeadDetail(lead)}>
              <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                    <div class="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span class="text-xs sm:text-sm font-medium text-blue-600">
                        {lead.avatar}
                      </span>
                    </div>
                  </div>
                  <div class="ml-2 sm:ml-4">
                    <div class="text-xs sm:text-sm font-medium text-gray-900">{lead.name}</div>
                    <div class="text-xs text-gray-500">{lead.email}</div>
                  </div>
                </div>
              </td>
              
              <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div class="text-xs sm:text-sm text-gray-900">{lead.branch}</div>
              </td>
              
              <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div class="text-xs sm:text-sm text-gray-900">{lead.interest || '-'}</div>
              </td>
              
              <td class="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <div class="text-xs sm:text-sm text-gray-900">{lead.date}</div>
              </td>
              
              
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <!-- Summary -->
    <div class="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-100">
      <div class="text-sm text-gray-600">
        Menampilkan {filteredLeads.length} dari {leadsData.length} lead
      </div>
    </div>
  {/if}
</div>

<!-- Detail Modal -->
{#if showDetailModal && selectedLead}
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/50">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <span class="text-lg font-bold text-blue-600">
              {selectedLead.avatar}
            </span>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{selectedLead.name}</h2>
            <p class="text-gray-500">Detail Lengkap Lead</p>
          </div>
        </div>
        <button
          on:click={closeDetailModal}
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X class="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User class="w-5 h-5 text-blue-600" />
              Informasi Pribadi
            </h3>
            
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <Mail class="w-4 h-4 text-gray-400" />
                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <p class="text-gray-900">{selectedLead.email || '-'}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <Phone class="w-4 h-4 text-gray-400" />
                <div>
                  <p class="text-sm text-gray-500">Telepon</p>
                  <p class="text-gray-900">{selectedLead.phone || '-'}</p>
                </div>
              </div>
              
              {#if selectedLead.address && selectedLead.address !== '-'}
                <div class="flex items-start gap-3">
                  <MapPin class="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p class="text-sm text-gray-500">Alamat</p>
                    <p class="text-gray-900">{selectedLead.address}</p>
                  </div>
                </div>
              {/if}
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp class="w-5 h-5 text-green-600" />
              Informasi Lead
            </h3>
            
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <Building class="w-4 h-4 text-gray-400" />
                <div>
                  <p class="text-sm text-gray-500">Cawangan</p>
                  <p class="text-gray-900">{selectedLead.branch}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <Package class="w-4 h-4 text-gray-400" />
                <div>
                  <p class="text-sm text-gray-500">Minat</p>
                  <p class="text-gray-900">{selectedLead.interest || '-'}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <Calendar class="w-4 h-4 text-gray-400" />
                <div>
                  <p class="text-sm text-gray-500">Tarikh</p>
                  <p class="text-gray-900">{selectedLead.date}</p>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
        
        
      </div>

      <div class="flex justify-end gap-3 p-6 border-t border-gray-200">
        <button
          on:click={closeDetailModal}
          class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
{/if}
