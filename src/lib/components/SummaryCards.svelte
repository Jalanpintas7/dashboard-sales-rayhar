<script>
  import { onMount } from 'svelte';
  import { getDashboardStatsByBranch, getDashboardStatsForSuperAdmin, getBranchIdByUser } from '$lib/supabase-helpers.js';
  import { supabase } from '$lib/supabase.js';
  import { user, userRole } from '$lib/stores/auth.js';
  
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
      title: 'Total Leads',
      value: '0',
      change: '+0%',
      subtitle: 'dari 30 hari',
      icon: 'trending-up',
      bgColor: 'bg-[#8E24AA]',
      shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
    }
  ];
  
  let loading = true;
  let error = null;
  let lastUpdated = null;
  let currentBranch = null;
  let isSuperAdmin = false;
  
  const loadData = async () => {
    try {
      loading = true;
      error = null;
      
      // Check if user is super admin
      isSuperAdmin = $userRole === 'super_admin';
      
      let stats;
      
      if (isSuperAdmin) {
        // Super admin: get data from all branches
        console.log('Loading super admin stats...');
        try {
          stats = await getDashboardStatsForSuperAdmin();
          console.log('Super admin stats:', stats);
        } catch (statsError) {
          console.error('Super admin stats error:', statsError);
          throw new Error('Failed to load dashboard statistics');
        }
        currentBranch = { name: 'All Branches', state: 'All States', region: 'All Regions' };
      } else {
        // Branch admin: get data from specific branch
        console.log('User ID:', $user.id);
        console.log('User Role:', $userRole);
        
        const branchId = await getBranchIdByUser($user.id);
        console.log('Branch ID:', branchId);
        
        if (!branchId) {
          throw new Error('Branch ID not found for current user');
        }
        
        // Get branch info
        const { data: branchData, error: branchError } = await supabase
          .from('branches')
          .select('name, state, region')
          .eq('id', branchId)
          .single();
        
        if (branchError) {
          console.error('Branch error:', branchError);
          throw new Error('Failed to get branch information');
        }
        
        currentBranch = branchData;
        
        // Fetch dashboard statistics for specific branch
        try {
          stats = await getDashboardStatsByBranch(branchId);
        } catch (statsError) {
          console.error('Stats error:', statsError);
          throw new Error('Failed to load dashboard statistics');
        }
      }
      
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
          bgColor: 'bg-[#8E24AA]',
          shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
        },
        {
          title: 'Bookings Umrah',
          value: safeStats.totalUmrahBookings.toString(),
          change: `${umrahPercentage}%`,
          subtitle: 'dari total',
          icon: 'location',
          bgColor: 'bg-[#8E24AA]',
          shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
        },
        {
          title: 'Bookings Outbound',
          value: safeStats.totalOutboundBookings.toString(),
          change: `${outboundPercentage}%`,
          subtitle: 'dari total',
          icon: 'airplane',
          bgColor: 'bg-[#8E24AA]',
          shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
        },
        {
          title: 'Total Leads',
          value: safeStats.totalLeads.toString(),
          change: `+${safeStats.recentLeads}`,
          subtitle: 'dari 30 hari',
          icon: 'trending-up',
          bgColor: 'bg-[#8E24AA]',
          shadowColor: 'shadow-[0_6px_16px_rgba(142,36,170,0.35)]'
        }
      ];
      
      lastUpdated = new Date();
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
      error = err.message;
    } finally {
      loading = false;
    }
  };

  onMount(() => {
    loadData();
  });

  const handleRefresh = () => {
    loadData();
  };
</script>

{#if loading}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8 lg:mb-10">
    {#each Array(4) as _, i}
      <div class="relative w-full h-[140px] lg:h-[160px] rounded-card bg-white/90 backdrop-blur-sm shadow-soft border border-white/80 p-4 lg:p-5 flex items-start justify-between">
        <div class="h-full flex flex-col justify-between w-full">
          <div class="animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div class="h-8 bg-gray-200 rounded w-16 mb-2"></div>
          </div>
          <div class="animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
        <div class="animate-pulse">
          <div class="w-10 h-10 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    {/each}
  </div>
{:else if error}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8 lg:mb-10">
    {#each Array(4) as _, i}
      <div class="relative w-full h-[140px] lg:h-[160px] rounded-card bg-white/90 backdrop-blur-sm shadow-soft border border-white/80 p-4 lg:p-5 flex items-center justify-center">
        <div class="text-center text-red-500">
          <p class="text-sm">Error loading data</p>
          <p class="text-xs mt-1">{error}</p>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8 lg:mb-10">
    {#each summaryData as card}
      <!-- Card Wrapper (gaya mengikuti kartu referensi) -->
      <div class="relative w-full h-[140px] lg:h-[160px] rounded-card bg-white/90 backdrop-blur-sm shadow-soft border border-white/80 p-4 lg:p-5 flex items-start justify-between">
        <!-- Left Text -->
        <div class="h-full flex flex-col justify-between w-full">
          <div>
            <p class="text-xs lg:text-sm text-slate-500">{card.title}</p>
            <p class="mt-1 text-lg lg:text-xl xl:text-2xl font-semibold tracking-tight text-slate-900">{card.value}</p>
          </div>
          <div class="flex items-center gap-1 text-xs lg:text-sm font-medium text-emerald-600">
            {#if card.title === 'Bookings Umrah' || card.title === 'Bookings Outbound'}
              <!-- Percentage untuk Umrah dan Outbound -->
              <Star class="w-3 h-3 lg:w-4 lg:h-4" />
              <span class="text-purple-600">{card.change}</span>
              <span class="text-slate-500 font-normal">{card.subtitle}</span>
            {:else}
              <!-- panah naik untuk card lainnya -->
              <ArrowUp class="w-3 h-3 lg:w-4 lg:h-4" />
              <span>{card.change}</span>
              <span class="text-slate-500 font-normal">{card.subtitle}</span>
            {/if}
          </div>
        </div>

        <!-- Right Graphic -->
        <div class="relative flex items-center justify-center h-full">
          <div class="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-xl lg:rounded-2xl {card.bgColor} flex items-center justify-center shadow-soft backdrop-blur-sm">
            {#if card.icon === 'person'}
              <Users class="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
            {:else if card.icon === 'location'}
              <MapPin class="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
            {:else if card.icon === 'airplane'}
              <Plane class="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
            {:else if card.icon === 'trending-up'}
              <TrendingUp class="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" />
            {/if}
          </div>
        </div>

        <!-- Lingkaran dekor pinggir kanan (opsional, meniru nuansa halus) -->
        <div class="pointer-events-none absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-purple-500/10 blur-xl"></div>
      </div>
    {/each}
  </div>
{/if}
