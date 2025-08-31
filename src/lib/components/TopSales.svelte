<script>
  import { onMount } from 'svelte';
  import { getTopSalesConsultants, getBranchIdByUser } from '$lib/supabase-helpers.js';
  import { user } from '$lib/stores/auth.js';
  
  let topSalesData = [];
  let loading = true;
  let error = null;
  let selectedConsultant = null;
  let showDetailModal = false;
  
  const loadTopSalesData = async () => {
    try {
      loading = true;
      error = null;
      
      // Get top sales consultants data (global - semua branch)
      const consultants = await getTopSalesConsultants(5);
      
             // Transform data untuk komponen
       topSalesData = consultants.map(consultant => ({
         id: consultant.id,
         name: consultant.name,
         total: consultant.totalBookings,
         recent: consultant.recentBookings,
         email: consultant.email,
         whatsapp: consultant.whatsapp,
         salesConsultantNumber: consultant.salesConsultantNumber,
         branches: consultant.branches,
         profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(consultant.name)}&background=10b981&color=fff&size=40`
       }));
    } catch (err) {
      console.error('Error loading top sales data:', err);
      error = err.message;
             // Fallback ke data dummy jika ada error
       topSalesData = [
         { 
           name: 'Data tidak tersedia', 
           total: 0,
           recent: 0,
           profileImage: '/api/placeholder/40/40'
         }
       ];
    } finally {
      loading = false;
    }
  };
  
  const showConsultantDetail = (consultant) => {
    selectedConsultant = consultant;
    showDetailModal = true;
  };
  
  const closeDetailModal = () => {
    showDetailModal = false;
    selectedConsultant = null;
  };
  
  onMount(() => {
    if ($user) {
      loadTopSalesData();
    }
  });
  
  // Refresh data setiap 5 menit
  let refreshInterval;
  onMount(() => {
    refreshInterval = setInterval(() => {
      if ($user) {
        loadTopSalesData();
      }
    }, 5 * 60 * 1000); // 5 menit
    
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  });
</script>

<div class="bg-white/90 backdrop-blur-sm rounded-card shadow-soft border border-white/80 p-3 sm:p-4 lg:p-5 xl:p-7 h-[500px] sm:h-[550px] lg:h-[650px]">
  <!-- Header -->
  <div class="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
    <h2 class="text-base sm:text-lg lg:text-xl font-bold text-slate-900">Top Sales Consultant</h2>
    

  </div>
  
  <!-- Loading State -->
  {#if loading}
    <div class="flex items-center justify-center h-24 sm:h-32">
      <div class="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-green-500"></div>
    </div>
  {:else if error}
    <div class="text-center p-3 sm:p-4">
      <p class="text-red-500 text-xs sm:text-sm">{error}</p>
      <button 
        on:click={loadTopSalesData}
        class="mt-2 px-2 py-1 sm:px-3 sm:py-1 bg-red-100 text-red-700 rounded-md text-xs sm:text-sm hover:bg-red-200"
      >
        Coba Lagi
      </button>
    </div>
  {:else}
    <!-- Content -->
    <div class="space-y-2 lg:space-y-3 xl:space-y-4">
      {#each topSalesData as item, index}
        <div 
          class="
            bg-white
            p-2 lg:p-3 xl:p-4 
            transition-all duration-200
            rounded-lg
            hover:shadow-md
            cursor-pointer
          " 
          style="background-color: #ffffff !important;"
          on:click={() => showConsultantDetail(item)}
          role="button"
          tabindex="0"
          on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? showConsultantDetail(item) : null}
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
              <!-- Profile Picture - Circular -->
              <div class="
                w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10
                bg-gradient-to-br from-green-400 to-green-600
                rounded-full
                flex items-center justify-center
                text-white
                font-semibold
                text-xs lg:text-sm
                shadow-md
                overflow-hidden
                flex-shrink-0
              ">
                <img 
                  src={item.profileImage}
                  alt="{item.name}"
                  class="w-full h-full object-cover"
                  on:error={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div class="w-full h-full flex items-center justify-center" style="display: none;">
                  {item.salesConsultantNumber || item.name.charAt(0)}
                </div>
              </div>
              
              <!-- Name and Recent Activity -->
              <div class="min-w-0 flex-1">
                <h3 class="text-slate-900 font-bold text-sm sm:text-base lg:text-lg truncate">{item.name}</h3>
                {#if item.recent > 0}
                  <p class="text-green-600 text-xs">+{item.recent} booking 30 hari terakhir</p>
                {/if}
              </div>
            </div>
            
                         <!-- Total Bookings -->
             <div class="text-right flex-shrink-0">
               <p class="text-slate-900 font-bold text-sm sm:text-base lg:text-lg">{item.total}</p>
               <p class="text-slate-500 text-sm sm:text-base">Total Bookings</p>
             </div>
          </div>
        </div>
      {/each}
    </div>
    

  {/if}
</div>

<!-- Detail Modal -->
{#if showDetailModal && selectedConsultant}
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white/95 backdrop-blur-md rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-white/50">
      <!-- Modal Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-slate-900">Detail Sales Consultant</h3>
        <button 
          on:click={closeDetailModal}
          class="text-slate-400 hover:text-slate-600 p-1"
          aria-label="Tutup modal detail"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Consultant Info -->
      <div class="text-center mb-6">
        <div class="w-20 h-20 mx-auto mb-4">
          <img 
            src={selectedConsultant.profileImage}
            alt={selectedConsultant.name}
            class="w-full h-full rounded-full object-cover"
          />
        </div>
        <h4 class="text-xl font-bold text-slate-900 mb-2">{selectedConsultant.name}</h4>
        
        <!-- Sales Consultant Number -->
        {#if selectedConsultant.salesConsultantNumber}
          <p class="text-slate-500 text-sm mb-3">#{selectedConsultant.salesConsultantNumber}</p>
        {/if}
        
        <!-- Contact Information -->
        <div class="space-y-2 mb-4">
          {#if selectedConsultant.email}
            <p class="text-slate-600 text-sm flex items-center justify-center">
              <svg class="w-4 h-4 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              {selectedConsultant.email}
            </p>
          {/if}
          
          {#if selectedConsultant.whatsapp}
            <p class="text-slate-600 text-sm flex items-center justify-center">
              <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              {selectedConsultant.whatsapp}
            </p>
          {/if}
        </div>
      </div>
      
             <!-- Statistics -->
       <div class="bg-green-50 p-4 rounded-lg text-center mb-6">
         <p class="text-2xl font-bold text-green-600">{selectedConsultant.total}</p>
         <p class="text-sm text-green-700">Total Bookings</p>
       </div>
      
      <!-- Recent Activity -->
      {#if selectedConsultant.recent > 0}
        <div class="bg-yellow-50 p-4 rounded-lg text-center">
          <p class="text-lg font-bold text-yellow-700">+{selectedConsultant.recent}</p>
          <p class="text-sm text-yellow-800">Booking 30 Hari Terakhir</p>
        </div>
      {/if}
      
      <!-- Close Button -->
      <div class="mt-6 text-center">
        <button 
          on:click={closeDetailModal}
          class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
{/if}
