<script>
  import { onMount } from 'svelte';
  import { getDashboardStatsAll } from '$lib/supabase-helpers.js';
  
  // Import Lucide icons
  import { 
    Users, 
    MapPin, 
    Plane, 
    TrendingUp, 
    Star, 
    ArrowUp 
  } from 'lucide-svelte';
  
  let summaryData = [
    {
      title: 'Total Bookings',
      value: '0',
      change: '+0',
      subtitle: 'dari 30 hari',
      icon: 'person',
      bgColor: 'bg-primary',
      shadowColor: 'shadow-[0_6px_16px_rgba(148,35,146,0.35)]'
    },
    {
      title: 'Bookings Umrah',
      value: '0',
      change: '0%',
      subtitle: 'dari total',
      icon: 'location',
      bgColor: 'bg-primary',
      shadowColor: 'shadow-[0_6px_16px_rgba(148,35,146,0.35)]'
    },
    {
      title: 'Bookings Outbound',
      value: '0',
      change: '0%',
      subtitle: 'dari total',
      icon: 'airplane',
      bgColor: 'bg-primary',
      shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
    },
    {
      title: 'Total Leads',
      value: '0',
      change: '+0',
      subtitle: 'dari 30 hari',
      icon: 'trending-up',
      bgColor: 'bg-primary',
      shadowColor: 'shadow-[0_6px_16px_rgba(148,35,146,0.35)]'
    }
  ];
  
  let loading = true;
  let error = null;
  let lastUpdated = null;
  
  const loadData = async () => {
    try {
      loading = true;
      error = null;
      
      console.log('Loading dashboard stats...');
      
      // Menggunakan fungsi baru yang mengambil semua data tanpa filter
      const stats = await getDashboardStatsAll();
      console.log('Dashboard stats:', stats);
      
      // Validate stats object
      if (!stats || typeof stats !== 'object') {
        throw new Error('Invalid statistics data received');
      }
      
      // Ensure all required properties exist with fallback values
      const safeStats = {
        totalBookings: stats.totalBookings || 0,
        totalLeads: stats.totalLeads || 0,
        recentBookings: stats.recentBookings || 0,
        recentLeads: stats.recentLeads || 0,
        totalUmrahBookings: stats.totalUmrahBookings || 0,
        totalOutboundBookings: stats.totalOutboundBookings || 0
      };
      
      // Calculate percentages
      const umrahPercentage = safeStats.totalBookings > 0 ? Math.round((safeStats.totalUmrahBookings / safeStats.totalBookings) * 100) : 0;
      const outboundPercentage = safeStats.totalBookings > 0 ? Math.round((safeStats.totalOutboundBookings / safeStats.totalBookings) * 100) : 0;
      
      // Update summary data with real data
      summaryData = [
        {
          title: 'Total Bookings',
          value: safeStats.totalBookings.toString(),
          change: `+${safeStats.recentBookings}`,
          subtitle: 'dari 30 hari',
          icon: 'person',
          bgColor: 'bg-primary',
          shadowColor: 'shadow-[0_6px_16px_rgba(148,35,146,0.35)]'
        },
        {
          title: 'Bookings Umrah',
          value: safeStats.totalUmrahBookings.toString(),
          change: `${umrahPercentage}%`,
          subtitle: 'dari total',
          icon: 'location',
          bgColor: 'bg-primary',
          shadowColor: 'shadow-[0_6px_16px_rgba(148,35,146,0.35)]'
        },
        {
          title: 'Bookings Outbound',
          value: safeStats.totalOutboundBookings.toString(),
          change: `${outboundPercentage}%`,
          subtitle: 'dari total',
          icon: 'airplane',
          bgColor: 'bg-primary',
          shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
        },
        {
          title: 'Total Leads',
          value: safeStats.totalLeads.toString(),
          change: `+${safeStats.recentLeads}`,
          subtitle: 'dari 30 hari',
          icon: 'trending-up',
          bgColor: 'bg-primary',
          shadowColor: 'shadow-[0_6px_16px_rgba(148,35,146,0.35)]'
        }
      ];
      
      lastUpdated = new Date();
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
      error = err.message;
      
      // Fallback ke data dummy jika ada error
      summaryData = [
        { 
          title: 'Total Bookings',
          value: '0',
          change: '+0',
          subtitle: 'dari 30 hari',
          icon: 'person',
          bgColor: 'bg-primary',
          shadowColor: 'shadow-[0_6px_16px_rgba(148,35,146,0.35)]'
        },
        { 
          title: 'Bookings Umrah',
          value: '0',
          change: '0%',
          subtitle: 'dari total',
          icon: 'location',
          bgColor: 'bg-primary',
          shadowColor: 'shadow-[0_6px_16px_rgba(148,35,146,0.35)]'
        },
        { 
          title: 'Bookings Outbound',
          value: '0',
          change: '0%',
          subtitle: 'dari total',
          icon: 'airplane',
          bgColor: 'bg-primary',
          shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
        },
        { 
          title: 'Total Leads',
          value: '0',
          change: '+0',
          subtitle: 'dari 30 hari',
          icon: 'trending-up',
          bgColor: 'bg-primary',
          shadowColor: 'shadow-[0_6px_16px_rgba(148,35,146,0.35)]'
        }
      ];
    } finally {
      loading = false;
    }
  };

  onMount(() => {
    loadData();
  });
</script>

{#if loading}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 mb-6 sm:mb-8 lg:mb-10">
    {#each Array(4) as _, i}
      <div class="relative w-full h-[120px] sm:h-[140px] lg:h-[160px] rounded-card bg-white/90 backdrop-blur-sm shadow-soft border border-white/80 p-3 sm:p-4 lg:p-5 flex items-start justify-between">
        <div class="h-full flex flex-col justify-between w-full">
          <div class="animate-pulse">
            <div class="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 mb-2"></div>
            <div class="h-6 sm:h-8 bg-gray-200 rounded w-12 sm:w-16 mb-2"></div>
          </div>
          <div class="animate-pulse">
            <div class="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20"></div>
          </div>
        </div>
        <div class="animate-pulse">
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    {/each}
  </div>
{:else if error}
  <div class="mb-6 sm:mb-8 lg:mb-10">
    <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading data</h3>
          <p class="text-sm text-red-700 mt-1">{error}</p>
        </div>
      </div>
    </div>
    
    <!-- Fallback cards dengan data default -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
      {#each summaryData as card}
        <div class="relative w-full h-[120px] sm:h-[140px] lg:h-[160px] rounded-card bg-white/90 backdrop-blur-sm shadow-soft border border-white/80 p-3 sm:p-4 lg:p-5 flex items-start justify-between opacity-60">
          <div class="h-full flex flex-col justify-between w-full">
            <div>
              <p class="text-sm sm:text-base text-slate-500">{card.title}</p>
              <p class="mt-1 text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-slate-900">
                {card.value}
                {#if card.title === 'Total Bookings' || card.title === 'Bookings Umrah' || card.title === 'Bookings Outbound'}
                  <span class="text-sm sm:text-base lg:text-lg font-normal text-slate-500 ml-1">Pax</span>
                {/if}
              </p>
            </div>
            <div class="flex items-center gap-1 text-sm sm:text-base font-medium text-emerald-600">
              {#if card.title === 'Bookings Umrah' || card.title === 'Bookings Outbound'}
                <Star class="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                <span class="text-purple-600">{card.change}</span>
                <span class="text-slate-500 font-normal">{card.subtitle}</span>
              {:else}
                <ArrowUp class="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                <span>{card.change}</span>
                <span class="text-slate-500 font-normal">{card.subtitle}</span>
              {/if}
            </div>
          </div>

          <div class="relative flex items-center justify-center h-full">
            <div class="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-soft backdrop-blur-sm" style="background-color: var(--color-primary);">
              {#if card.icon === 'person'}
                <Users class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
              {:else if card.icon === 'location'}
                <MapPin class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
              {:else if card.icon === 'airplane'}
                <Plane class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
              {:else if card.icon === 'trending-up'}
                <TrendingUp class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
              {/if}
            </div>
          </div>

          <div class="pointer-events-none absolute -right-2 sm:-right-3 lg:-right-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-full blur-xl" style="background-color: rgba(148, 35, 146, 0.1);"></div>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <div class="mb-6 sm:mb-8 lg:mb-10">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <h2 class="text-lg font-semibold text-slate-900">Dashboard Overview</h2>
        {#if lastUpdated}
          <span class="text-xs text-slate-500">Last updated: {lastUpdated.toLocaleTimeString('id-ID')}</span>
        {/if}
      </div>
    </div>
    
    <!-- Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
      {#each summaryData as card}
        <!-- Card Wrapper (gaya mengikuti kartu referensi) -->
        <div class="relative w-full h-[120px] sm:h-[140px] lg:h-[160px] rounded-card bg-white/90 backdrop-blur-sm shadow-soft border border-white/80 p-3 sm:p-4 lg:p-5 flex items-start justify-between">
          <!-- Left Text -->
          <div class="h-full flex flex-col justify-between w-full">
            <div>
              <p class="text-sm sm:text-base text-slate-500">{card.title}</p>
              <p class="mt-1 text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-slate-900">
                {card.value}
                {#if card.title === 'Total Bookings' || card.title === 'Bookings Umrah' || card.title === 'Bookings Outbound'}
                  <span class="text-sm sm:text-base lg:text-lg font-normal text-slate-500 ml-1">Pax</span>
                {/if}
              </p>
            </div>
            <div class="flex items-center gap-1 text-sm sm:text-base font-medium text-emerald-600">
              {#if card.title === 'Bookings Umrah' || card.title === 'Bookings Outbound'}
                <!-- Percentage untuk Umrah dan Outbound -->
                <Star class="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                <span class="text-purple-600">{card.change}</span>
                <span class="text-slate-500 font-normal">{card.subtitle}</span>
              {:else}
                <!-- panah naik untuk card lainnya -->
                <ArrowUp class="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                <span>{card.change}</span>
                <span class="text-slate-500 font-normal">{card.subtitle}</span>
              {/if}
            </div>
          </div>

          <!-- Right Graphic -->
          <div class="relative flex items-center justify-center h-full">
            <div class="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-soft backdrop-blur-sm" style="background-color: var(--color-primary);">
              {#if card.icon === 'person'}
                <Users class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
              {:else if card.icon === 'location'}
                <MapPin class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
              {:else if card.icon === 'airplane'}
                <Plane class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
              {:else if card.icon === 'trending-up'}
                <TrendingUp class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
              {/if}
            </div>
          </div>

          <!-- Lingkaran dekor pinggir kanan (opsional, meniru nuansa halus) -->
          <div class="pointer-events-none absolute -right-2 sm:-right-3 lg:-right-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-full blur-xl" style="background-color: rgba(148, 35, 146, 0.1);"></div>
        </div>
      {/each}
    </div>
  </div>
{/if}
