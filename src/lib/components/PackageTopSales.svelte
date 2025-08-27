<script>
  let isMenuOpen = false;
  let selectedFilter = 'keseluruhan';

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

<div class="bg-white/90 backdrop-blur-sm rounded-card shadow-soft border border-white/80 p-3 lg:p-5 xl:p-7">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 gap-3 lg:gap-4">
    <h2 class="text-base lg:text-lg xl:text-xl font-bold text-slate-900">Package Top Sales</h2>
    
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
    <!-- Row component with name next to number -->
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
            1
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-slate-900 font-medium text-xs lg:text-sm xl:text-base truncate">Paket Umrah Premium</h3>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-slate-900 font-bold text-sm lg:text-base">45</p>
          <p class="text-slate-500 text-xs lg:text-sm">sales</p>
        </div>
      </div>
    </div>

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
            2
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-slate-900 font-medium text-xs lg:text-sm xl:text-base truncate">Paket Umrah Reguler</h3>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-slate-900 font-bold text-sm lg:text-base">32</p>
          <p class="text-slate-500 text-xs lg:text-sm">sales</p>
        </div>
      </div>
    </div>

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
            3
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-slate-900 font-medium text-xs lg:text-sm xl:text-base truncate">Paket Umrah Ekonomi</h3>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-slate-900 font-bold text-sm lg:text-base">28</p>
          <p class="text-slate-500 text-xs lg:text-sm">sales</p>
        </div>
      </div>
    </div>

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
            4
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-slate-900 font-medium text-xs lg:text-sm xl:text-base truncate">Tour Bali 5D4N</h3>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-slate-900 font-bold text-sm lg:text-base">25</p>
          <p class="text-slate-500 text-xs lg:text-sm">sales</p>
        </div>
      </div>
    </div>

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
            5
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-slate-900 font-medium text-xs lg:text-sm xl:text-base truncate">Tour Lombok 4D3N</h3>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-slate-900 font-bold text-sm lg:text-base">22</p>
          <p class="text-slate-500 text-xs lg:text-sm">sales</p>
        </div>
      </div>
    </div>
  </div>
</div>
