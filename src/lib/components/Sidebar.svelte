<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { user, userRole, signOut } from '$lib/stores/auth.js';
  
  // Import Lucide icons
  import { 
    Home, 
    Users, 
    Calendar, 
    Building2, 
    MapPin, 
    Database, 
    Settings, 
    User, 
    LogOut, 
    Menu,
    Plane,
    UserCheck
  } from 'lucide-svelte';
  
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
    { name: 'Input Airline', icon: 'plane', href: '/InputAirline', isActive: false }

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
  
  // Handle logout
  async function handleLogout() {
    try {
      await signOut();
      goto('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  // Get role display name
  $: roleDisplayName = $userRole === 'super_admin' ? 'Super Admin' : 
                       $userRole === 'admin_branch' ? 'Admin Branch' : 'User';
</script>

<!-- Mobile Toggle Button -->
<div class="lg:hidden fixed top-4 left-4 z-50">
  <button 
    on:click={toggleMobile}
    class="p-2 bg-purple-600 text-white rounded-lg shadow-lg"
  >
    <Menu class="w-6 h-6" />
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
              <Home class="h-4 w-4" />
            {:else if item.icon === 'users'}
              <Users class="h-4 w-4" />
            {:else if item.icon === 'settings'}
              <Settings class="h-4 w-4" />
            {:else if item.icon === 'calendar'}
              <Calendar class="h-4 w-4" />
            {:else if item.icon === 'mosque'}
              <Building2 class="h-4 w-4" />
            {:else if item.icon === 'map-pin'}
              <MapPin class="h-4 w-4" />
            {:else if item.icon === 'database'}
              <Database class="h-4 w-4" />
            {:else if item.icon === 'plane'}
              <Plane class="h-4 w-4" />
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

    <!-- User Info & Logout -->
    {#if $user}
      <div class="border-t border-slate-200 pt-4 mb-4">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <User class="w-4 h-4 text-purple-600" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-slate-700 truncate">{$user.email}</div>
            <div class="text-xs text-slate-500">{roleDisplayName}</div>
          </div>
        </div>
        <button
          on:click={handleLogout}
          class="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut class="w-4 h-4" />
          Logout
        </button>
      </div>
    {/if}

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
              <Home class="h-4 w-4" />
            {:else if item.icon === 'users'}
              <Users class="h-4 w-4" />
            {:else if item.icon === 'settings'}
              <Settings class="h-4 w-4" />
            {:else if item.icon === 'calendar'}
              <Calendar class="h-4 w-4" />
            {:else if item.icon === 'mosque'}
              <Building2 class="h-4 w-4" />
            {:else if item.icon === 'map-pin'}
              <MapPin class="h-4 w-4" />
            {:else if item.icon === 'database'}
              <Database class="h-4 w-4" />
            {:else if item.icon === 'plane'}
              <Plane class="h-4 w-4" />
            {/if}
          </span>
          <span class="
            text-sm font-medium
            {item.isActive ? 'text-purple-700' : ''}
          ">{item.name}</span>
        </a>
      {/each}
    </nav>

    <!-- User Info & Logout -->
    {#if $user}
      <div class="border-t border-slate-200 pt-3 mb-3">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
            <User class="w-3 h-3 text-purple-600" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-medium text-slate-700 truncate">{$user.email}</div>
            <div class="text-[10px] text-slate-500">{roleDisplayName}</div>
          </div>
        </div>
        <button
          on:click={handleLogout}
          class="w-full flex items-center justify-center gap-2 px-2 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut class="w-3 h-3" />
          Logout
        </button>
      </div>
    {/if}

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
