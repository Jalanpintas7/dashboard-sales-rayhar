<script>
  import CustomerTable from '$lib/components/CustomerTable.svelte';
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  import { user, loading } from '$lib/stores/auth.js';
  import { goto } from '$app/navigation';
  
  // Redirect ke login jika tidak ada user (hanya jika di halaman ini)
  $: if (!$loading && !$user) {
    goto('/login');
  }
</script>

<RoleGuard allowedRoles={['super_admin']} redirectTo="/login">
  <div class="p-3 lg:p-4 bg-gray-50 min-h-full rounded-xl mr-2 lg:mr-4">
    <!-- Page Header -->
    <div class="mb-4 lg:mb-6">
      <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Pelanggan</h1>
      <p class="text-gray-600">Kelola data pelanggan dan pemesanan paket</p>
    </div>

    <!-- Customer Table -->
    <CustomerTable />
  </div>
</RoleGuard>
