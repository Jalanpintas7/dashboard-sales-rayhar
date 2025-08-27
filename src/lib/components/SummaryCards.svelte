<script>
  // Data untuk summary cards sesuai referensi
  const summaryData = [
    {
      title: 'Total Bookings',
      value: '0',
      change: '+0%',
      subtitle: 'dari 30 hari',
      icon: 'person',
      bgColor: 'bg-[#8E24AA]',
      shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
    },
    {
      title: 'Bookings Umrah',
      value: '0',
      change: '+0%',
      subtitle: 'dari total',
      icon: 'location',
      bgColor: 'bg-[#8E24AA]',
      shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
    },
    {
      title: 'Bookings Outbound',
      value: '0',
      change: '+0%',
      subtitle: 'dari total',
      icon: 'airplane',
      bgColor: 'bg-[#8E24AA]',
      shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
    },
    {
      title: 'Destinasi Aktif',
      value: '33',
      change: 'Active',
      subtitle: 'Destinations',
      icon: 'trending-up',
      bgColor: 'bg-[#8E24AA]',
      shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
    }
  ];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8 lg:mb-10">
  {#each summaryData as card}
    <!-- Card Wrapper (gaya mengikuti kartu referensi) -->
    <div class="relative w-full h-[140px] lg:h-[160px] rounded-card bg-white/90 backdrop-blur-sm shadow-soft border border-white/80 p-4 lg:p-5 flex items-start justify-between">
      <!-- Left Text -->
      <div class="h-full flex flex-col justify-between">
        <div>
          <p class="text-xs lg:text-sm text-slate-500">{card.title}</p>
          <p class="mt-1 text-lg lg:text-xl xl:text-2xl font-semibold tracking-tight text-slate-900">{card.value}</p>
        </div>
        <div class="flex items-center gap-1 text-xs lg:text-sm font-medium text-emerald-600">
          {#if card.title === 'Destinasi Aktif'}
            <!-- Star icon untuk Destinasi Aktif -->
            <svg xmlns="http://http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span class="text-purple-600">{card.change}</span>
            <span class="text-slate-500 font-normal">{card.subtitle}</span>
          {:else}
            <!-- panah naik untuk card lainnya -->
            <svg xmlns="http://http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 11l5-5 5 5"/>
              <path d="M12 6v12"/>
            </svg>
            <span>{card.change}</span>
            <span class="text-slate-500 font-normal">{card.subtitle}</span>
          {/if}
        </div>
      </div>

      <!-- Right Graphic -->
      <div class="relative flex items-center justify-center h-full">
        <div class="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-xl lg:rounded-2xl {card.bgColor} flex items-center justify-center shadow-soft backdrop-blur-sm">
          {#if card.icon === 'person'}
            <svg xmlns="http://http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21a8 8 0 10-16 0"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          {:else if card.icon === 'location'}
            <svg xmlns="http://http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          {:else if card.icon === 'airplane'}
            <svg xmlns="http://http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          {:else if card.icon === 'trending-up'}
            <svg xmlns="http://http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          {/if}
        </div>
      </div>

      <!-- Lingkaran dekor pinggir kanan (opsional, meniru nuansa halus) -->
      <div class="pointer-events-none absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-purple-500/10 blur-xl"></div>
    </div>
  {/each}
</div>
