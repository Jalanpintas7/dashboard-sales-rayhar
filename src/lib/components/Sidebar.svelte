<script>
  import { page } from '$app/stores';
  
  // Props untuk sidebar
  export let isCollapsed = false;
  
  // Menu items dengan ikon yang tepat sesuai gambar
  const menuItemsData = [
    { name: 'Dashboard', icon: 'home', href: '/', isActive: false },
    { name: 'Pelanggan', icon: 'users', href: '/Pelanggan', isActive: false },
    { name: 'Input Musim & Kategori', icon: 'calendar', href: '/InputMusim&Kategori', isActive: false },
    { name: 'Data Umrah', icon: 'mosque', href: '/DataUmrah', isActive: false },
    { name: 'Input Destinasi', icon: 'map-pin', href: '/InputDestinasi', isActive: false },
    { name: 'Data Destinasi', icon: 'database', href: '/DataDestinasi', isActive: false },
    { name: 'Pengaturan', icon: 'settings', href: '/Pengaturan', isActive: false }

  ];
  
  // Reactive statement untuk menu items dengan status aktif berdasarkan URL
  $: menuItems = menuItemsData.map(item => ({
    ...item,
    isActive: $page.url.pathname === item.href
  }));
  
  // Toggle sidebar untuk mobile
  let isMobileOpen = false;
  
  function toggleMobile() {
    isMobileOpen = !isMobileOpen;
  }
</script>

<!-- Mobile Toggle Button -->
<div class="lg:hidden fixed top-4 left-4 z-50">
  <button 
    on:click={toggleMobile}
    class="p-2 bg-purple-600 text-white rounded-lg shadow-lg"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </button>
</div>

<!-- Desktop Sidebar -->
<aside class="
  hidden lg:block
  w-full max-w-[300px]
  bg-white/80 border border-white 
  rounded-[28px] shadow-soft
  overflow-hidden
  sticky top-4
  max-h-[calc(100vh-2rem)]
">
  <!-- Inner background dengan gradient halus -->
  <div class="bg-gradient-to-b from-white/60 to-white/30 p-6">
    <!-- Logo + Brand -->
    <div class="flex items-center gap-4 mb-8">
      <!-- Logo Rayhar -->
      <img src="/src/lib/assets/logorayharsvg.svg" alt="Rayhar Logo" width="100" />
      <div>
        <div class="text-3xl font-extrabold tracking-tight text-slate-800">Rayhar</div>
        <div class="text-sm -mt-0.5 text-slate-400">Admin Dashboard</div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="space-y-3">
      {#each menuItems as item}
        <a 
          href={item.href}
          class="
            group flex items-center gap-4 rounded-2xl px-5 py-4
            {item.isActive 
              ? 'border border-purple-200 bg-purple-100/70 shadow-innerSoft' 
              : 'text-slate-500 hover:bg-slate-50'
            }
          "
        >
          <span class="
            grid h-8 w-8 place-items-center rounded-full shadow-soft
            {item.isActive 
              ? 'bg-white text-purple-600' 
              : 'border border-slate-200 bg-white'
            }
          ">
            {#if item.icon === 'home'}
              <!-- Heroicon: home -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.25 8.25a.75.75 0 1 1-1.06 1.06l-.47-.47V20.5a1 1 0 0 1-1 1h-3.25a.75.75 0 0 1-.75-.75V16a1.5 1.5 0 0 0-1.5-1.5h-2a1.5 1.5 0 0 0-1.5 1.5v4.75a.75.75 0 0 1-.75.75H5.25a1 1 0 0 1-1-1v-7.82l-.47.47a.75.75 0 1 1-1.06-1.06l8.25-8.25Z" />
              </svg>
            {:else if item.icon === 'users'}
              <!-- users icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                <path d="M12 14a7 7 0 0 0-7 7H2"/>
              </svg>
            {:else if item.icon === 'settings'}
              <!-- settings icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 0 0 2.572-1.065Z"/>
              </svg>
            {:else if item.icon === 'calendar'}
              <!-- calendar icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
                <path d="M16 2v4"/>
                <path d="M8 2v4"/>
                <path d="M3 10h18"/>
              </svg>
            {:else if item.icon === 'mosque'}
              <!-- mosque icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
              </svg>
            {:else if item.icon === 'map-pin'}
              <!-- map-pin icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M19 10c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 2c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 7.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            {:else if item.icon === 'database'}
              <!-- database icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z"/>
                <path d="M16 11a4 4 0 0 1-8 0"/>
              </svg>
            {/if}
          </span>
          <span class="
            text-base font-medium
            {item.isActive ? 'text-purple-700' : ''}
          ">{item.name}</span>
        </a>
      {/each}
    </nav>

    <!-- Spacer -->
    <div class="h-[520px]"></div>

    <!-- Footer -->
    <footer class="pt-3 pb-2">
      <div class="text-sm font-semibold text-slate-700">Rayhar Admin Dashboard</div>
      <div class="text-xs text-slate-400">© 2024 All Rights Reserved</div>
      <div class="mt-3 text-xs text-slate-400">Made with <span class="mx-0.5">❤️</span> by <a href="#" class="font-medium text-slate-500 hover:underline">pixeluniverce</a></div>
    </footer>
  </div>
</aside>

<!-- Mobile Sidebar -->
<aside class="
  lg:hidden
  fixed inset-y-0 left-0 z-40
  w-64 bg-white/80 border border-white
  rounded-r-[28px] shadow-soft
  transform transition-transform duration-300 ease-in-out
  {isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
  overflow-hidden
">
  <!-- Inner background dengan gradient halus -->
  <div class="bg-gradient-to-b from-white/60 to-white/30 p-6 h-full">
    <!-- Logo + Brand -->
    <div class="flex items-center gap-3 mb-6">
      <!-- Logo Rayhar -->
      <img src="/src/lib/assets/logorayharsvg.svg" alt="Rayhar Logo" width="34" height="34" />
      <div>
        <div class="text-2xl font-extrabold tracking-tight text-slate-800">Rayhar</div>
        <div class="text-[11px] -mt-0.5 text-slate-400">Admin Dashboard</div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="space-y-2">
      {#each menuItems as item}
        <a 
          href={item.href}
          class="
            group flex items-center gap-3 rounded-2xl px-4 py-3
            {item.isActive 
              ? 'border border-purple-200 bg-purple-100/70 shadow-innerSoft' 
              : 'text-slate-500 hover:bg-slate-50'
            }
          "
        >
          <span class="
            grid h-6 w-6 place-items-center rounded-full shadow-soft
            {item.isActive 
              ? 'bg-white text-purple-600' 
              : 'border border-slate-200 bg-white'
            }
          ">
            {#if item.icon === 'home'}
              <!-- Heroicon: home -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.25 8.25a.75.75 0 1 1-1.06 1.06l-.47-.47V20.5a1 1 0 0 1-1 1h-3.25a.75.75 0 0 1-.75-.75V16a1.5 1.5 0 0 0-1.5-1.5h-2a1.5 1.5 0 0 0-1.5 1.5v4.75a.75.75 0 0 1-.75.75H5.25a1 1 0 0 1-1-1v-7.82l-.47.47a.75.75 0 1 1-1.06-1.06l8.25-8.25Z" />
              </svg>
            {:else if item.icon === 'users'}
              <!-- users icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                <path d="M12 14a7 7 0 0 0-7 7H2"/>
              </svg>
            {:else if item.icon === 'settings'}
              <!-- settings icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 0 0 2.572-1.065Z"/>
              </svg>
            {:else if item.icon === 'calendar'}
              <!-- calendar icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
                <path d="M16 2v4"/>
                <path d="M8 2v4"/>
                <path d="M3 10h18"/>
              </svg>
            {:else if item.icon === 'mosque'}
              <!-- mosque icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
                <path d="M12 21v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v4"/>
              </svg>
            {:else if item.icon === 'map-pin'}
              <!-- map-pin icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M19 10c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 2c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 7.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            {:else if item.icon === 'database'}
              <!-- database icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-4 w-4">
                <path d="M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z"/>
                <path d="M16 11a4 4 0 0 1-8 0"/>
              </svg>
            {/if}
          </span>
          <span class="
            text-sm font-medium
            {item.isActive ? 'text-purple-700' : ''}
          ">{item.name}</span>
        </a>
      {/each}
    </nav>

    <!-- Footer -->
    <div class="absolute bottom-5 left-5 right-5">
      <footer class="pt-2 pb-1">
        <div class="text-[13px] font-semibold text-slate-700">Rayhar Admin Dashboard</div>
        <div class="text-[11px] text-slate-400">© 2024 All Rights Reserved</div>
        <div class="mt-3 text-[11px] text-slate-400">Made with <span class="mx-0.5">❤️</span> by <a href="#" class="font-medium text-slate-500 hover:underline">pixeluniverce</a></div>
      </footer>
    </div>
  </div>
</aside>

<!-- Mobile Overlay -->
{#if isMobileOpen}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    on:click={toggleMobile}
  ></div>
{/if}

<style>
  /* Custom shadow untuk sidebar */
  :global(.shadow-soft) {
    box-shadow: 0 1px 0 0 rgba(255,255,255,0.6) inset, 0 1px 3px rgba(15,23,42,0.04);
  }
  
  :global(.shadow-innerSoft) {
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.04);
  }
</style>
