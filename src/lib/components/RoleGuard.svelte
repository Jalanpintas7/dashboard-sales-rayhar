<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user, userRole, loading } from '$lib/stores/auth.js';
  
  export let allowedRoles = [];
  export let redirectTo = '/login';
  export let showLoading = true;
  
  let isAuthorized = false;
  let isChecking = true;
  
  // Check authorization when user or role changes
  $: if ($user !== null && $userRole !== null) {
    checkAuthorization();
  }
  
  function checkAuthorization() {
    // Jika tidak ada user, redirect ke login
    if (!$user) {
      goto(redirectTo);
      return;
    }
    
    // Jika ada user tapi tidak ada role, tunggu sampai role ter-load
    if ($userRole === null) {
      return;
    }
    
    // Check apakah user memiliki role yang diizinkan
    if (allowedRoles.length === 0 || allowedRoles.includes($userRole)) {
      // User authorized
      isAuthorized = true;
    } else {
      // User tidak authorized, redirect berdasarkan role
      if ($userRole === 'super_admin') {
        goto('/');
      } else if ($userRole === 'admin_branch') {
        goto('/DashboardBranch');
      } else {
        goto(redirectTo);
      }
    }
    
    isChecking = false;
  }
  
  onMount(() => {
    // Jika sudah ada user dan role, check authorization
    if ($user && $userRole !== null) {
      checkAuthorization();
    } else if (!$loading && !$user) {
      // Jika tidak ada user dan tidak loading, redirect ke login
      goto(redirectTo);
    }
  });
</script>

{#if $loading || isChecking}
  {#if showLoading}
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Memverifikasi akses...</p>
      </div>
    </div>
  {/if}
{:else if isAuthorized}
  <slot />
{:else}
  <!-- Fallback jika tidak authorized -->
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="text-red-600 text-lg mb-2">Akses Ditolak</div>
      <p class="text-gray-600">Anda tidak memiliki akses ke halaman ini</p>
      <button 
        class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        on:click={() => goto('/login')}
      >
        Kembali ke Login
      </button>
    </div>
  </div>
{/if}
