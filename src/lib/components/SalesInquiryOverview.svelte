<script>
  // Data untuk diagram batang - tiga card dengan data Pelancongan dan umrah
  const barChartData = [
    {
      pelancongan: { percentage: 70 },
      umrah: { percentage: 30 }
    },
    {
      pelancongan: { percentage: 60 },
      umrah: { percentage: 40 }
    },
    {
      pelancongan: { percentage: 80 },
      umrah: { percentage: 20 }
    }
  ];

  // Filter options
  let isMenuOpen = false;
  let selectedFilter = 'Total Sales';

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function selectFilter(filter) {
    selectedFilter = filter;
    isMenuOpen = false;
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
</script>

<svelte:window on:click={handleClickOutside} />

<!-- CARD WRAPPER -->
<section class="rounded-3xl bg-white/90 border border-white shadow-card p-6 h-[600px] lg:h-[650px]">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-[22px] font-extrabold text-slate-800">Sales & Inquiry Overview</h2>
      <p class="text-slate-500 text-sm mt-1">Total inquiry</p>
    </div>
    
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
          on:click={() => selectFilter('Total Sales')}
        >
          Total Sales
        </button>
        <button 
          class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
          on:click={() => selectFilter('Total Inquiry')}
        >
          Total Inquiry
        </button>
      </div>
    </div>
  </div>

  <!-- UNIFIED CHART AREA -->
  <div class="mt-10 flex justify-center">
    <div class="flex gap-12 items-end">
      <!-- BAR 1 -->
      <div class="flex flex-col items-center">
        <div class="w-44 h-[420px] rounded-2xl overflow-hidden shadow-md flex flex-col">
          <div class="flex-[70%] bg-gradient-to-b from-[#942392] to-[#942392]/80 flex items-center justify-center">
            <span class="text-white text-sm font-semibold">Pelancongan</span>
          </div>
          <div class="flex-[30%] bg-gradient-to-t from-[#FFF212] to-[#FFF212]/80 flex items-center justify-center">
            <span class="text-black text-sm font-semibold">umrah</span>
          </div>
        </div>
        <div class="mt-4 flex gap-3">
          <span class="rounded-full bg-[#942392]/20 text-[#942392] text-xs font-semibold px-3 py-1 shadow-sm">70%</span>
          <span class="rounded-full bg-[#FFF212]/20 text-black text-xs font-semibold px-3 py-1 shadow-sm">30%</span>
        </div>
        <span class="mt-3 rounded-full bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1">Tarikh</span>
      </div>

      <!-- BAR 2 -->
      <div class="flex flex-col items-center">
        <div class="w-44 h-[420px] rounded-2xl overflow-hidden shadow-md flex flex-col">
          <div class="flex-[60%] bg-gradient-to-b from-[#942392] to-[#942392]/80 flex items-center justify-center">
            <span class="text-white text-sm font-semibold">Pelancongan</span>
          </div>
          <div class="flex-[40%] bg-gradient-to-t from-[#FFF212] to-[#FFF212]/80 flex items-center justify-center">
            <span class="text-black text-sm font-semibold">umrah</span>
          </div>
        </div>
        <div class="mt-4 flex gap-3">
          <span class="rounded-full bg-[#942392]/20 text-[#942392] text-xs font-semibold px-3 py-1 shadow-sm">60%</span>
          <span class="rounded-full bg-[#FFF212]/20 text-black text-xs font-semibold px-3 py-1 shadow-sm">40%</span>
        </div>
        <span class="mt-3 rounded-full bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1">Tarikh</span>
      </div>

      <!-- BAR 3 -->
      <div class="flex flex-col items-center">
        <div class="w-44 h-[420px] rounded-2xl overflow-hidden shadow-md flex flex-col">
          <div class="flex-[80%] bg-gradient-to-b from-[#942392] to-[#942392]/80 flex items-center justify-center">
            <span class="text-white text-sm font-semibold">Pelancongan</span>
          </div>
          <div class="flex-[20%] bg-gradient-to-t from-[#FFF212] to-[#FFF212]/80 flex items-center justify-center">
            <span class="text-black text-sm font-semibold">umrah</span>
          </div>
        </div>
        <div class="mt-4 flex gap-3">
          <span class="rounded-full bg-[#942392]/20 text-[#942392] text-xs font-semibold px-3 py-1 shadow-sm">80%</span>
          <span class="rounded-full bg-[#FFF212]/20 text-black text-xs font-semibold px-3 py-1 shadow-sm">20%</span>
        </div>
        <span class="mt-3 rounded-full bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1">Tarikh</span>
      </div>
    </div>
  </div>
</section>
