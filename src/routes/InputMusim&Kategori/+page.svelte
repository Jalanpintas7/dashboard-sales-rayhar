<script>
  import UmrahSeasonInput from '$lib/components/UmrahSeasonInput.svelte';
  import UmrahCategoryInput from '$lib/components/UmrahCategoryInput.svelte';
  import UmrahPackageCreator from '$lib/components/UmrahPackageCreator.svelte';
</script>

<div class="p-6 space-y-6">
  <!-- Header Halaman -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-slate-800 mb-2">Manajemen Musim & Kategori Umrah</h1>
    <p class="text-slate-600">Kelola musim, kategori, dan buat paket umrah baru untuk pelanggan Anda</p>
  </div>

  <!-- Form Input Musim & Kategori -->
  <div class="bg-white rounded-2xl shadow-soft border border-white/60 p-6">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-slate-800 mb-2">Input Musim & Kategori Umrah</h2>
      <p class="text-slate-600">Tambahkan musim dan kategori baru untuk paket umrah</p>
    </div>
    
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <!-- Form Input Musim -->
      <div>
        <UmrahSeasonInput />
      </div>

      <!-- Form Input Kategori -->
      <div>
        <UmrahCategoryInput />
      </div>
    </div>
  </div>

  <!-- Section: Buat Paket Umrah Baru -->
  <div class="bg-white rounded-2xl shadow-soft border border-white/60 p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Buat Paket Umrah Baru</h2>
      <p class="text-slate-600">Gabungkan musim dan kategori untuk membuat paket umrah yang menarik</p>
    </div>
    <UmrahPackageCreator />
  </div>



  <!-- Informasi Tambahan -->
  <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6">
    <div class="flex items-start gap-3">
      <div class="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 text-white">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052c1.994-.049 3.76-.968 5.312-2.513C19.243 3 21.75 5.322 21.75 8.25c0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
        </svg>
      </div>
      <div>
        <h3 class="font-semibold text-amber-900 mb-2">Tips Pengelolaan Paket Umrah</h3>
        <ul class="text-sm text-amber-800 space-y-1">
          <li>• Buat musim umrah sesuai dengan kalender Hijriyah yang populer</li>
          <li>• Kategorikan paket berdasarkan level layanan dan fasilitas</li>
          <li>• Kombinasikan musim dan kategori untuk variasi paket yang menarik</li>
          <li>• Tentukan harga yang kompetitif sesuai dengan fasilitas yang ditawarkan</li>
          <li>• Update status paket secara berkala untuk manajemen yang efektif</li>
          <li>• Monitor kuota dan ketersediaan paket untuk pelanggan</li>
        </ul>
      </div>
    </div>
  </div>
</div>
