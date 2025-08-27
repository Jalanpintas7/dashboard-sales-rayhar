<script>
  import '../app.css';
  import Sidebar from '$lib/components/Sidebar.svelte';
</script>

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
