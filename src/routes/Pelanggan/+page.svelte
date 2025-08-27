<script>
  import CustomerTable from '$lib/components/CustomerTable.svelte';
</script>

<div class="p-3 lg:p-4 bg-section min-h-full rounded-xl mr-2 lg:mr-4">
  <!-- Page Header -->
  <div class="mb-4 lg:mb-6">
    <h1 class="text-2xl lg:text-3xl font-bold text-dark mb-2">Pelanggan</h1>
    <p class="text-grey3">Kelola data pelanggan dan pemesanan paket</p>
  </div>

  <!-- Customer Table -->
  <CustomerTable />
</div>
