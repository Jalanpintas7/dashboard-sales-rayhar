<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.js';
  import { Users, TrendingUp, BarChart3 } from 'lucide-svelte';

  let loading = true;
  let error = null;
  let analyticsData = {
    fromLead: 0,
    directBooking: 0,
    total: 0,
    fromLeadPercentage: 0,
    directBookingPercentage: 0
  };

  const loadAnalyticsData = async () => {
    try {
      loading = true;
      error = null;

      console.log('Loading booking analytics data...');

      // Query untuk mendapatkan data booking analytics dengan bilangan
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('is_from_inquiry, lead_reference_id, bilangan');

      if (bookingError) {
        throw new Error(`Error fetching booking data: ${bookingError.message}`);
      }

      if (!bookingData) {
        throw new Error('No booking data received');
      }

      // Hitung total peserta (1 + bilangan) untuk booking dari lead vs direct
      const fromLead = bookingData.filter(booking =>
        booking.is_from_inquiry === true || booking.lead_reference_id !== null
      ).reduce((total, booking) => total + 1 + (booking.bilangan || 0), 0);

      const directBooking = bookingData.filter(booking =>
        booking.is_from_inquiry === false && booking.lead_reference_id === null
      ).reduce((total, booking) => total + 1 + (booking.bilangan || 0), 0);

      const total = fromLead + directBooking;

      // Hitung persentase
      const fromLeadPercentage = total > 0 ? Math.round((fromLead / total) * 100) : 0;
      const directBookingPercentage = total > 0 ? Math.round((directBooking / total) * 100) : 0;

      analyticsData = {
        fromLead,
        directBooking,
        total,
        fromLeadPercentage,
        directBookingPercentage
      };

      console.log('Analytics data:', analyticsData);

    } catch (err) {
      console.error('Error loading analytics data:', err);
      error = err.message;
    } finally {
      loading = false;
    }
  };

  onMount(() => {
    loadAnalyticsData();
  });
</script>

<div class="bg-white/90 backdrop-blur-sm rounded-card shadow-soft border border-white/80 p-6">
  <!-- Header -->
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft backdrop-blur-sm bg-gradient-to-br from-purple-500 to-purple-600">
      <BarChart3 class="w-5 h-5 text-white" />
    </div>
    <div>
      <h3 class="text-lg font-semibold text-slate-900">Analitik Penjualan</h3>
      <p class="text-sm text-slate-500">Persentase booking dari lead vs langsung</p>
    </div>
  </div>

  {#if loading}
    <!-- Loading State -->
    <div class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      <span class="ml-2 text-slate-500">Memuat data analitik...</span>
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
  {:else if analyticsData.total === 0}
    <!-- No Data State -->
    <div class="flex items-center justify-center h-64">
      <div class="text-center">
        <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <BarChart3 class="w-6 h-6 text-slate-400" />
        </div>
        <p class="text-slate-600 font-medium">Belum ada data booking</p>
        <p class="text-slate-500 text-sm mt-1">Data akan muncul setelah ada booking</p>
      </div>
    </div>
  {:else}
    <!-- Simple CSS Pie Chart -->
    <div class="relative flex justify-center mb-6">
      <div class="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
        <!-- Pie Chart using CSS -->
        <div class="absolute inset-0 rounded-full border-8 border-blue-200"
             style="background: conic-gradient(#22c55e 0% {analyticsData.fromLeadPercentage}%, #3b82f6 {analyticsData.fromLeadPercentage}% 100%)">
        </div>
        <!-- Center circle to make it look like a pie -->
        <div class="absolute inset-4 bg-white rounded-full flex items-center justify-center">
          <div class="text-center">
            <div class="text-lg font-bold text-gray-900">{analyticsData.total}</div>
            <div class="text-xs text-gray-500">Total Booking</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex justify-center gap-6 mb-6">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-green-500 rounded"></div>
        <span class="text-sm text-gray-700">Dari Lead ({analyticsData.fromLeadPercentage}%)</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-blue-500 rounded"></div>
        <span class="text-sm text-gray-700">Booking Langsung ({analyticsData.directBookingPercentage}%)</span>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <!-- Total Bookings -->
      <div class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-slate-500 flex items-center justify-center">
            <Users class="w-4 h-4 text-white" />
          </div>
          <div>
            <p class="text-xs text-slate-600 uppercase tracking-wide">Total Booking</p>
            <p class="text-lg font-semibold text-slate-900">{analyticsData.total}</p>
          </div>
        </div>
      </div>

      <!-- From Lead -->
      <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <TrendingUp class="w-4 h-4 text-white" />
          </div>
          <div>
            <p class="text-xs text-green-600 uppercase tracking-wide">Dari Lead</p>
            <p class="text-lg font-semibold text-green-900">{analyticsData.fromLead}</p>
            <p class="text-xs text-green-600">{analyticsData.fromLeadPercentage}% dari total</p>
          </div>
        </div>
      </div>

      <!-- Direct Booking -->
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
            <Users class="w-4 h-4 text-white" />
          </div>
          <div>
            <p class="text-xs text-blue-600 uppercase tracking-wide">Booking Langsung</p>
            <p class="text-lg font-semibold text-blue-900">{analyticsData.directBooking}</p>
            <p class="text-xs text-blue-600">{analyticsData.directBookingPercentage}% dari total</p>
          </div>
        </div>
      </div>
    </div>


  {/if}
</div>
