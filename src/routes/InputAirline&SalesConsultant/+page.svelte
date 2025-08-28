<script>
  import AirlineInputCard from "$lib/components/AirlineInputCard.svelte";
  import SalesConsultantInputCard from "$lib/components/SalesConsultantInputCard.svelte";
  import RoleGuard from "$lib/components/RoleGuard.svelte";
  import { user, loading } from "$lib/stores/auth.js";
  import { goto } from "$app/navigation";

  // Redirect ke login jika tidak ada user (hanya jika di halaman ini)
  $: if (!$loading && !$user) {
    goto("/login");
  }
</script>

<RoleGuard allowedRoles={["super_admin"]} redirectTo="/login">
  <div class="p-6 space-y-6">
    <!-- Header Halaman -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">
        Manajemen Airline & Sales Consultant
      </h1>
      <p class="text-slate-600">
        Kelola data airline dan sales consultant untuk paket perjalanan Anda
      </p>
    </div>

    <!-- Layout Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <!-- Form Input Airline -->
      <AirlineInputCard />
      
      <!-- Form Input Sales Consultant -->
      <SalesConsultantInputCard />
    </div>
  </div>
</RoleGuard>
