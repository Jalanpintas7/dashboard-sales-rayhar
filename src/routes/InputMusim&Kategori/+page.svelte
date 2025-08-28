<script>
  import UmrahSeasonInput from '$lib/components/UmrahSeasonInput.svelte';
  import UmrahCategoryInput from '$lib/components/UmrahCategoryInput.svelte';
  import UmrahPackageCreator from '$lib/components/UmrahPackageCreator.svelte';
  import AirlineInput from '$lib/components/AirlineInput.svelte';
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  import { user, loading } from '$lib/stores/auth.js';
  import { goto } from '$app/navigation';
  
  // Redirect ke login jika tidak ada user (hanya jika di halaman ini)
  $: if (!$loading && !$user) {
    goto('/login');
  }
</script>

<RoleGuard allowedRoles={['super_admin']} redirectTo="/login">
  <div class="p-6 space-y-6">
    <!-- Header Halaman -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800 mb-2">Manajemen Musim, Kategori & Airline Umrah</h1>
      <p class="text-slate-600">Kelola musim, kategori, airline, dan buat paket umrah baru untuk pelanggan Anda</p>
    </div>

    <!-- Form Input Musim, Kategori & Airline -->
    <div class=" rounded-2xl shadow-soft border border-white/60 p-6">
      <div class="mb-6">
        <h2 class="text-xl font-bold text-slate-800 mb-2">Input Musim, Kategori & Airline Umrah</h2>
        <p class="text-slate-600">Tambahkan musim, kategori, dan airline baru untuk paket umrah</p>
      </div>
      
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Form Input Musim -->
        <div>
          <UmrahSeasonInput />
        </div>

        <!-- Form Input Kategori -->
        <div>
          <UmrahCategoryInput />
        </div>

        <!-- Form Input Airline -->
        <div>
          <AirlineInput />
        </div>
      </div>
    </div>

    <!-- Section: Buat Paket Umrah Baru -->
    <div class="bg-white rounded-2xl shadow-soft border border-white/60 p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-800 mb-2">Buat Paket Umrah Baru</h2>
        <p class="text-slate-600">Gabungkan musim, kategori, dan airline untuk membuat paket umrah yang menarik</p>
      </div>
      <UmrahPackageCreator />
    </div>

    
  </div>
</RoleGuard>
