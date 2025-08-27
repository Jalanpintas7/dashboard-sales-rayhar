<script>
  import '../app.css';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { page } from '$app/stores';
  
  // Daftar halaman yang tidak perlu sidebar (halaman auth)
  const authPages = ['/login', '/register', '/forgot-password', '/reset-password'];
  
  $: isAuthPage = authPages.includes($page.url.pathname);
</script>

{#if isAuthPage}
  <!-- Layout untuk halaman auth (tanpa sidebar) -->
  <slot />
{:else}
  <!-- Layout untuk dashboard (dengan sidebar) -->
  <div class="min-h-screen bg-section p-2 lg:p-4">
    <!-- Main Application Card -->
    <div class="
      w-full
      min-h-[calc(100vh-1rem)] lg:min-h-[calc(100vh-2rem)]
      flex
    ">
      <!-- Sidebar - Fixed/Sticky -->
      <div class="hidden lg:block w-[320px] flex-shrink-0">
        <Sidebar />
      </div>
      
      <!-- Main Content Area - Scrollable -->
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
{/if}
