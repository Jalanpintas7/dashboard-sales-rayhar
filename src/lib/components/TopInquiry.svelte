<script>
  import { onMount } from 'svelte';
  import { getTopInquiriesByBranch, getTopInquiriesForSuperAdmin, getBranchIdByUser } from '../supabase-helpers.js';
  import { user, userRole } from '../stores/auth.js';

  let isMenuOpen = false;
  let selectedFilter = 'keseluruhan';
  let topInquiries = [];
  let loading = true;
  let error = null;
  let branchId = null;
  let isSuperAdmin = false;

  // Load data berdasarkan filter yang dipilih
  async function loadTopInquiries() {
    try {
      loading = true;
      error = null;
      
      // Check if user is super admin
      isSuperAdmin = $userRole === 'super_admin';
      
      if (isSuperAdmin) {
        // Super admin: get data from all branches
        topInquiries = await getTopInquiriesForSuperAdmin(selectedFilter, 5);
      } else {
        // Branch admin: get data from specific branch
        // Get branch ID jika user adalah admin branch
        if ($user) {
          try {
            branchId = await getBranchIdByUser($user.id);
          } catch (err) {
            console.log('User bukan admin branch atau error:', err);
            branchId = null;
          }
        }

        topInquiries = await getTopInquiriesByBranch(branchId, selectedFilter, 5);
      }
    } catch (err) {
      console.error('Error loading top inquiries:', err);
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function selectFilter(filter) {
    selectedFilter = filter;
    isMenuOpen = false;
    loadTopInquiries(); // Reload data ketika filter berubah
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  // Close menu when clicking outside
  function handleClickOutside(event) {
    if (!event.target.closest('.relative')) {
      isMenuOpen = false;
    }
  }

  // Load data saat komponen mount
  onMount(() => {
    loadTopInquiries();
  });
</script>

<svelte:window on:click={handleClickOutside} />

<div class="bg-white/90 backdrop-blur-sm rounded-card shadow-soft border border-white/80 p-3 lg:p-5 xl:p-7">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 gap-3 lg:gap-4">
    <h2 class="text-base lg:text-lg xl:text-xl font-bold text-slate-900">Top Inquiry</h2>
    
    <!-- Dropdown (custom styled) -->
    <div class="relative">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50 active:scale-[0.99] transition"
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        on:click={toggleMenu}
      >
        <span class="truncate">{selectedFilter}</span>
        <svg class="size-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd"/>
        </svg>
      </button>

      <div
        class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5 transition {isMenuOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'}"
        role="menu"
      >
        <!-- menu item -->
        <button 
          class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
          on:click={() => selectFilter('keseluruhan')}
        >
          keseluruhan
        </button>
        <button 
          class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
          on:click={() => selectFilter('Umrah')}
        >
          Umrah
        </button>
        <button 
          class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
          on:click={() => selectFilter('Pelancongan')}
        >
          Pelancongan
        </button>
        
      </div>
    </div>
  </div>

  <!-- Content -->
  <div class="space-y-2 lg:space-y-3 xl:space-y-4">
    {#if loading}
      <!-- Loading state -->
      <div class="flex items-center justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span class="ml-3 text-slate-600">Loading...</span>
      </div>
    {:else if error}
      <!-- Error state -->
      <div class="text-center py-8">
        <p class="text-red-600 text-sm">Error: {error}</p>
        <button 
          class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
          on:click={loadTopInquiries}
        >
          Coba Lagi
        </button>
      </div>
    {:else if topInquiries.length === 0}
      <!-- Empty state -->
      <div class="text-center py-8">
        <p class="text-slate-500 text-sm">Tidak ada data inquiry untuk ditampilkan</p>
      </div>
    {:else}
      <!-- Inquiry list -->
      {#each topInquiries as inquiry}
        <div class="
          bg-section
          p-2 lg:p-3 xl:p-4 
          transition-all duration-200
          rounded-2xl
        ">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
              <div class="
                w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10
                bg-indigo-100 
                rounded-full 
                flex items-center justify-center
                text-indigo-700
                font-semibold
                text-xs lg:text-sm
                flex-shrink-0
              ">
                {inquiry.rank}
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-slate-900 font-medium text-xs lg:text-sm xl:text-base truncate">{inquiry.name}</h3>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              {#if inquiry.conversion === '0.0%' || parseFloat(inquiry.conversion) > 100}
                <p class="text-slate-900 font-bold text-sm lg:text-base">{inquiry.totalInquiries}</p>
                <p class="text-slate-500 text-xs lg:text-sm">leads</p>
              {:else}
                <p class="text-slate-900 font-bold text-sm lg:text-base">{inquiry.conversion}</p>
                <p class="text-slate-500 text-xs lg:text-sm">conversion</p>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>
