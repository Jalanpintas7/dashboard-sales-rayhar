<script>
  import DestinationInputCard from '$lib/components/DestinationInputCard.svelte';
  import DestinationList from '$lib/components/DestinationList.svelte';
</script>

<div class="p-6 space-y-6">
  <!-- Header Halaman -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-slate-800 mb-2">Manajemen Destinasi</h1>
    <p class="text-slate-600">Kelola destinasi pelancongan untuk paket perjalanan Anda</p>
  </div>

  <!-- Layout Grid -->
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
    <!-- Form Input Destinasi -->
    <div>
      <DestinationInputCard />
    </div>

    <!-- Daftar Destinasi dan Statistik -->
    <div>
      <DestinationList />
    </div>
  </div>

  <!-- Informasi Tambahan -->
  <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6">
    <div class="flex items-start gap-3">
      <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 text-white">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052c1.994-.049 3.76-.968 5.312-2.513C19.243 3 21.75 5.322 21.75 8.25c0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
        </svg>
      </div>
      <div>
        <h3 class="font-semibold text-blue-900 mb-2">Tips Pengelolaan Destinasi</h3>
        <ul class="text-sm text-blue-800 space-y-1">
          <li>• Pastikan informasi destinasi lengkap dan akurat</li>
          <li>• Upload gambar berkualitas tinggi untuk menarik minat pelanggan</li>
          <li>• Gunakan deskripsi yang informatif dan menarik</li>
          <li>• Aktifkan hanya destinasi yang siap untuk dipasarkan</li>
          <li>• Update status destinasi secara berkala</li>
        </ul>
      </div>
    </div>
  </div>
</div>
