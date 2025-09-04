<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.js';
  import {
    Building2,
    TrendingUp,
    Users,
    DollarSign,
    BarChart3,
    Award,
    Target,
    ChevronLeft,
    ChevronRight
  } from 'lucide-svelte';

  let loading = true;
  let error = null;
  let branchPerformanceData = [];
  let lastUpdated = null;

  // Pagination state
  let currentPage = 1;
  let itemsPerPage = 10;
  let totalPages = 1;

  const loadBranchPerformanceData = async () => {
    try {
      loading = true;
      error = null;

      console.log('Loading branch performance comparison data...');

      // Test koneksi Supabase terlebih dahulu
      console.log('Testing Supabase connection...');
      const { data: testData, error: testError } = await supabase
        .from('branches')
        .select('count')
        .limit(1);

      if (testError) {
        console.error('Supabase connection test failed:', testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }

      console.log('Supabase connection OK');

      // Get all branches
      const { data: branches, error: branchError } = await supabase
        .from('branches')
        .select('id, name, region, state')
        .order('name');

      console.log('Branches fetched:', branches?.length || 0, 'branches');

      if (branchError) {
        console.error('Branch error:', branchError);
        throw branchError;
      }

      if (!branches || branches.length === 0) {
        console.log('No branches found');
        branchPerformanceData = [];
        return;
      }

      // Get bookings data for each branch
      const branchStats = [];
      console.log('Starting to process branches...');

      for (const branch of branches) {
        console.log(`Processing branch: ${branch.name} (ID: ${branch.id})`);

        // Build query for bookings - ambil semua field yang diperlukan termasuk bilangan
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('total_price, created_at, branch_id, umrah_season_id, destination_id, umrah_category_id, outbound_date_id, bilangan, package_id')
          .eq('branch_id', branch.id);

        if (bookingsError) {
          console.error(`Bookings error for ${branch.name}:`, bookingsError);
        }

        // Build query for leads
        const { data: leads, error: leadsError } = await supabase
          .from('leads')
          .select('id, created_at, branch_id, season_id, destination_id, category_id, outbound_date_id')
          .eq('branch_id', branch.id);

        if (leadsError) {
          console.error(`Leads error for ${branch.name}:`, leadsError);
        }

        // Continue processing even if there are errors
        if (bookingsError && leadsError) {
          console.warn(`Skipping branch ${branch.name} due to errors`);
          continue;
        }

        console.log(`Branch ${branch.name} - Bookings: ${bookings?.length || 0}, Leads: ${leads?.length || 0}`);
        console.log(`Branch ${branch.name} - Raw bookings data:`, bookings?.slice(0, 3)); // Log first 3 bookings

        // Calculate metrics
        // Total participants = 1 (main person) + bilangan for each booking
        const totalBookings = bookings?.reduce((total, booking) => {
          return total + 1 + (booking.bilangan || 0); // 1 for main person + bilangan
        }, 0) || 0;
        
        const totalRevenue = bookings?.reduce((sum, booking) => {
          const price = parseFloat(booking.total_price) || 0;
          console.log(`Booking price for ${branch.name}:`, booking.total_price, '->', price);
          return sum + price;
        }, 0) || 0;

        console.log(`Branch ${branch.name} - Total Revenue:`, totalRevenue, 'Total Participants:', totalBookings);

        const totalLeads = leads?.length || 0;
        console.log(`Branch ${branch.name} - Total Leads:`, totalLeads);

        // Calculate conversion rate dengan berbagai opsi
        let conversionRate = 0;
        let conversionType = 'normal'; // 'normal', 'direct', 'infinity', 'none'

        if (totalLeads > 0) {
          // Normal case: ada leads, hitung conversion normal
          conversionRate = (totalBookings / totalLeads) * 100;
          conversionType = 'normal';
          console.log(`Branch ${branch.name} - Conversion Rate (normal):`, conversionRate.toFixed(2) + '%');
        } else if (totalBookings > 0) {
          // Special case: ada booking tapi tidak ada lead tercatat
          conversionRate = 999; // Represent infinity/very high
          conversionType = 'infinity';
          console.log(`Branch ${branch.name} - Conversion Rate: ∞ (direct booking - ${totalBookings} bookings tanpa lead tercatat)`);
        } else {
          // No activity at all
          conversionRate = 0;
          conversionType = 'none';
          console.log(`Branch ${branch.name} - Conversion Rate: 0% (tidak ada aktivitas)`);
        }

        // Calculate Umrah vs Outbound participants berdasarkan package_id
        // Get package types first
        const { data: packageTypes, error: packageError } = await supabase
          .from('package_types')
          .select('id, name');

        if (packageError) {
          console.error(`Package types error for ${branch.name}:`, packageError);
        }

        // Find Umrah and Pelancongan package IDs
        const umrahPackageId = packageTypes?.find(p => p.name === 'Umrah')?.id;
        const pelanconganPackageId = packageTypes?.find(p => p.name === 'Pelancongan')?.id;

        // Calculate Umrah participants (1 + bilangan for each Umrah booking)
        const umrahBookings = bookings?.filter(b => b.package_id === umrahPackageId)
          .reduce((total, booking) => total + 1 + (booking.bilangan || 0), 0) || 0;

        // Calculate Outbound participants (1 + bilangan for each Pelancongan booking)
        const outboundBookings = bookings?.filter(b => b.package_id === pelanconganPackageId)
          .reduce((total, booking) => total + 1 + (booking.bilangan || 0), 0) || 0;

        const umrahRevenue = bookings?.filter(b => b.package_id === umrahPackageId)
          .reduce((sum, b) => sum + (parseFloat(b.total_price) || 0), 0) || 0;

        const outboundRevenue = bookings?.filter(b => b.package_id === pelanconganPackageId)
          .reduce((sum, b) => sum + (parseFloat(b.total_price) || 0), 0) || 0;

        branchStats.push({
          id: branch.id,
          name: branch.name,
          region: branch.region || 'Tidak ada',
          state: branch.state || 'Tidak ada',
          totalBookings,
          totalRevenue: Math.round(totalRevenue),
          totalLeads,
          conversionRate: Math.round(conversionRate * 10) / 10, // Round to 1 decimal
          conversionType, // Tambahkan tipe conversion
          umrahBookings,
          outboundBookings,
          umrahRevenue: Math.round(umrahRevenue),
          outboundRevenue: Math.round(outboundRevenue)
        });
      }

      // Sort by total revenue only (descending) - semua cabang berdasarkan revenue
      branchPerformanceData = branchStats.sort((a, b) => {
        return b.totalRevenue - a.totalRevenue;
      });

      // Calculate total pages for pagination
      totalPages = Math.ceil(branchPerformanceData.length / itemsPerPage);

      // Reset to first page if current page is out of bounds
      if (currentPage > totalPages) {
        currentPage = 1;
      }

      console.log('Sorting logic applied:');
      console.log('- All branches ranked by total revenue only (descending)');
      console.log(`Total branches: ${branchPerformanceData.length}, Total pages: ${totalPages}, Items per page: ${itemsPerPage}`);
      console.log('Final ranking:');
      branchPerformanceData.forEach((branch, index) => {
        console.log(`#${index + 1}: ${branch.name} - Revenue: Rp ${branch.totalRevenue.toLocaleString()} (${branch.conversionType})`);
      });
      console.log(`Current page will show items ${((currentPage - 1) * itemsPerPage) + 1} to ${Math.min(currentPage * itemsPerPage, branchPerformanceData.length)}`);

      lastUpdated = new Date();
      console.log('Branch performance data loaded:', branchPerformanceData.length, 'branches processed');
      console.log('Final data summary:');
      branchPerformanceData.forEach((branch, index) => {
        console.log(`${index + 1}. ${branch.name}: ${branch.totalBookings} bookings, Rp ${branch.totalRevenue.toLocaleString()}`);
      });

    } catch (err) {
      console.error('Error loading branch performance data:', err);
      error = err.message;

      // Set empty data jika error
      branchPerformanceData = [];
    } finally {
      loading = false;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getPerformanceColor = (index) => {
    if (index === 0) return 'text-yellow-600'; // Gold
    if (index === 1) return 'text-gray-500'; // Silver
    if (index === 2) return 'text-amber-600'; // Bronze
    return 'text-slate-600';
  };

  const getPerformanceBadge = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
  };

  // Get paginated data for current page
  $: paginatedData = branchPerformanceData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  };

  const goToPrevious = () => {
    goToPage(currentPage - 1);
  };

  const goToNext = () => {
    goToPage(currentPage + 1);
  };

  // Watch for data changes to recalculate pagination
  $: if (branchPerformanceData.length > 0) {
    totalPages = Math.ceil(branchPerformanceData.length / itemsPerPage);
    if (currentPage > totalPages) {
      currentPage = 1;
    }
  }

  onMount(() => {
    console.log('BranchPerformanceComparison component mounted');
    loadBranchPerformanceData();
  });
</script>

<div class="bg-white/90 backdrop-blur-sm rounded-card shadow-soft border border-white/80 p-6">
  <!-- Header -->
  <div class="flex items-center mb-6">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft backdrop-blur-sm bg-gradient-to-br from-purple-500 to-purple-600">
        <Building2 class="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 class="text-lg font-semibold text-slate-900">Perbandingan Performa Cawangan</h3>
        <p class="text-sm text-slate-500">
          Analisis performa penjualan antar cawangan
          {#if branchPerformanceData.length > 0}
            ({branchPerformanceData.length} cawangan total)
          {/if}
        </p>
        <!-- Legend removed by user request -->
      </div>
    </div>
  </div>

  {#if loading}
    <!-- Loading State -->
    <div class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      <span class="ml-2 text-slate-500">Memuat data performa cabang...</span>
    </div>
  {:else if error}
    <!-- Error State -->
    <div class="flex items-center justify-center h-64">
      <div class="text-center">
        <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p class="text-red-600 font-medium">Gagal memuat data</p>
        <p class="text-slate-500 text-sm mt-1">{error}</p>
      </div>
    </div>
  {:else if branchPerformanceData.length === 0}
    <!-- No Data State -->
    <div class="flex items-center justify-center h-64">
      <div class="text-center">
        <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Building2 class="w-6 h-6 text-slate-400" />
        </div>
        <p class="text-slate-600 font-medium">Belum ada data cawangan</p>
        <p class="text-slate-500 text-sm mt-1">Data akan muncul setelah ada aktivitas di cawangan</p>
      </div>
    </div>
  {:else}
    <!-- Last Updated -->
    {#if lastUpdated}
      <div class="text-xs text-slate-500 mb-4">
        Terakhir diperbarui: {lastUpdated.toLocaleTimeString('id-ID')}
      </div>
    {/if}

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Total Branches -->
      <div class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-slate-500 flex items-center justify-center">
            <Building2 class="w-4 h-4 text-white" />
          </div>
          <div>
            <p class="text-xs text-slate-600 uppercase tracking-wide">Total Cawangan</p>
            <p class="text-lg font-semibold text-slate-900">{branchPerformanceData.length}</p>
          </div>
        </div>
      </div>

      <!-- Average Revenue -->
      <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <DollarSign class="w-4 h-4 text-white" />
          </div>
          <div>
            <p class="text-xs text-green-600 uppercase tracking-wide">Rata-rata Pendapatan</p>
            <p class="text-lg font-semibold text-green-900">
              {formatCurrency(branchPerformanceData.reduce((sum, b) => sum + b.totalRevenue, 0) / branchPerformanceData.length)}
            </p>
          </div>
        </div>
      </div>

      <!-- Top Performer -->
      <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
            <Award class="w-4 h-4 text-white" />
          </div>
          <div>
            <p class="text-xs text-yellow-600 uppercase tracking-wide">Cawangan Terbaik</p>
            <p class="text-sm font-semibold text-yellow-900">{branchPerformanceData[0]?.name || 'N/A'}</p>
            <p class="text-xs text-yellow-600">{formatCurrency(branchPerformanceData[0]?.totalRevenue || 0)}</p>
          </div>
        </div>
      </div>

      <!-- Average Conversion -->
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Target class="w-4 h-4 text-white" />
          </div>
          <div>
            <p class="text-xs text-blue-600 uppercase tracking-wide">Rata-rata Konversi</p>
            <p class="text-lg font-semibold text-blue-900">
              {(() => {
                const validRates = branchPerformanceData.filter(b => b.conversionType === 'normal');
                if (validRates.length === 0) return '0.0%';
                return (validRates.reduce((sum, b) => sum + b.conversionRate, 0) / validRates.length).toFixed(1) + '%';
              })()}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Branch Performance Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Peringkat
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Cawangan
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Booking
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Pendapatan
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Lead
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Konversi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-slate-200">
          {#each paginatedData as branch, pageIndex}
            {@const globalIndex = (currentPage - 1) * itemsPerPage + pageIndex}
            <tr class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <span class="text-lg">{getPerformanceBadge(globalIndex)}</span>
                  <span class="text-sm font-medium {getPerformanceColor(globalIndex)}">
                    #{globalIndex + 1}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-slate-900">{branch.name}</div>
                  <div class="text-xs text-slate-500">{branch.region}, {branch.state}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-slate-900 font-medium">
                  {branch.totalBookings}
                  <span class="text-xs font-normal text-slate-500 ml-1">Pax</span>
                </div>
                <div class="text-xs text-slate-500">
                  Umrah: {branch.umrahBookings} Pax | Outbound: {branch.outboundBookings} Pax
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-slate-900 font-medium">{formatCurrency(branch.totalRevenue)}</div>
                <div class="text-xs text-slate-500">
                  Umrah: {formatCurrency(branch.umrahRevenue)} | Outbound: {formatCurrency(branch.outboundRevenue)}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                {branch.totalLeads}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {#if branch.conversionType === 'infinity'}
                  <!-- Direct booking: tampilkan sebagai infinity atau direct -->
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                        title="Direct Booking: Booking tanpa lead tercatat">
                    ∞ Direct
                  </span>
                {:else if branch.conversionType === 'normal'}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    {branch.conversionRate >= 200 ? 'bg-purple-100 text-purple-800' :
                     branch.conversionRate >= 50 ? 'bg-green-100 text-green-800' :
                     branch.conversionRate >= 25 ? 'bg-yellow-100 text-yellow-800' :
                     'bg-red-100 text-red-800'}">
                    {branch.conversionRate.toFixed(1)}%
                  </span>
                {:else}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    0%
                  </span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    {#if totalPages > 1}
      <div class="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
        <div class="text-sm text-slate-700">
          Menampilkan {(currentPage - 1) * itemsPerPage + 1} sampai {Math.min(currentPage * itemsPerPage, branchPerformanceData.length)} dari {branchPerformanceData.length} cawangan
        </div>

        <div class="flex items-center gap-2">
          <!-- Previous Button -->
          <button
            on:click={goToPrevious}
            disabled={currentPage === 1}
            class="flex items-center gap-1 px-3 py-1 text-sm border border-slate-300 rounded-md bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft class="w-4 h-4" />
            Previous
          </button>

          <!-- Page Numbers -->
          {#each Array(totalPages) as _, index}
            {@const pageNum = index + 1}
            {#if pageNum === currentPage || pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)}
              <button
                on:click={() => goToPage(pageNum)}
                class="px-3 py-1 text-sm border rounded-md {pageNum === currentPage ? 'bg-purple-600 text-white border-purple-600' : 'border-slate-300 bg-white hover:bg-slate-50'}"
              >
                {pageNum}
              </button>
            {:else if pageNum === currentPage - 2 || pageNum === currentPage + 2}
              <span class="px-2 text-slate-500">...</span>
            {/if}
          {/each}

          <!-- Next Button -->
          <button
            on:click={goToNext}
            disabled={currentPage === totalPages}
            class="flex items-center gap-1 px-3 py-1 text-sm border border-slate-300 rounded-md bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    {/if}

    <!-- Performance Insights - Disabled by user request -->
    <!--
    <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
        <h4 class="text-sm font-semibold text-purple-900 mb-3 flex items-center gap-2">
          <TrendingUp class="w-4 h-4" />
          Cabang dengan Pendapatan Tertinggi
        </h4>
        <div class="space-y-2">
          {#each branchPerformanceData.slice(0, 3) as branch, index}
            <div class="flex items-center justify-between">
              <span class="text-sm text-purple-800">{getPerformanceBadge(index)} {branch.name}</span>
              <span class="text-sm font-semibold text-purple-900">{formatCurrency(branch.totalRevenue)}</span>
            </div>
          {/each}
        </div>
      </div>

      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
        <h4 class="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <Target class="w-4 h-4" />
          Top Revenue Performers
        </h4>
        <div class="space-y-2">
          {#each branchPerformanceData.slice(0, 3) as branch, index}
            <div class="flex items-center justify-between">
              <span class="text-sm text-blue-800">{getPerformanceBadge(index)} {branch.name}</span>
              <span class="text-sm font-semibold text-blue-900">{formatCurrency(branch.totalRevenue)}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
    -->
  {/if}
</div>
