<script>
  import DestinationInputCard from "$lib/components/DestinationInputCard.svelte";
  import AddDestinationCard from "$lib/components/AddDestinationCard.svelte";
  import DestinationList from "$lib/components/DestinationList.svelte";
  import RoleGuard from "$lib/components/RoleGuard.svelte";
  import { user, loading } from "$lib/stores/auth.js";
  import { goto } from "$app/navigation";
  import { Heart } from "lucide-svelte";

  // Redirect ke login jika tidak ada user (hanya jika di halaman ini)
  $: if (!$loading && !$user) {
    goto("/login");
  }
</script>

<RoleGuard allowedRoles={["super_admin"]} redirectTo="/login">
  <div class="p-3 sm:p-6 space-y-4 sm:space-y-6">
    <!-- Header Halaman -->
    <div class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
        Manajemen Destinasi
      </h1>
      <p class="text-sm sm:text-base text-slate-600">
        Kelola destinasi pelancongan untuk paket perjalanan Anda
      </p>
    </div>

    <!-- Layout Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
            <!-- Add Destination Card -->
            <AddDestinationCard />
      <!-- Form Input Destinasi -->
      <DestinationInputCard />
      

    </div>
  </div>
</RoleGuard>
