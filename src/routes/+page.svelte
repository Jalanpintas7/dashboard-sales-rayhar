<script>
  import SummaryCards from '$lib/components/SummaryCards.svelte';
  import BookingAnalyticsChart from '$lib/components/BookingAnalyticsChart.svelte';
  import SalesInquiryOverview from '$lib/components/SalesInquiryOverview.svelte';
  import TopSales from '$lib/components/TopSales.svelte';
  import PackageTopSales from '$lib/components/PackageTopSales.svelte';
  import TopInquiry from '$lib/components/TopInquiry.svelte';
  import CustomerTableBranch from '$lib/components/CustomerTableBranch.svelte';
  import LeadTableBranch from '$lib/components/LeadTableBranch.svelte';
  import BranchPerformanceComparison from '$lib/components/BranchPerformanceComparison.svelte';
</script>

<!-- Layout untuk dashboard sales (tanpa sidebar) -->
<div class="min-h-screen bg-white p-2 lg:p-4">
  <!-- Main Application Card -->
  <div class="
    w-full
    min-h-[calc(100vh-1rem)] lg:min-h-[calc(100vh-2rem)]
    rounded-xl
    bg-gray-50
    shadow-sm
    overflow-hidden
  ">
    <!-- Dashboard Content -->
    <div class="p-3 lg:p-4 min-h-full">
      <!-- Page Header -->
      <div class="mb-4 lg:mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Dashboard Sales</h1>
            <p class="text-gray-600">Welcome to your sales dashboard</p>
          </div>
        </div>
      </div>

      <!-- Summary Cards -->
      <SummaryCards />

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-10">
        <!-- Sales & Inquiry Overview - Lebih besar (2 kolom) -->
        <div class="xl:col-span-2">
          <SalesInquiryOverview />
        </div>
        
        <!-- Top Sales - Lebih kecil (1 kolom) -->
        <div class="xl:col-span-1">
          <TopSales />
        </div>
      </div>

      <!-- Branch Performance Comparison -->
      <div class="mb-6 lg:mb-8">
        <BranchPerformanceComparison />
      </div>

      <!-- Booking Analytics Chart -->
      <div class="mb-6 lg:mb-8">
        <BookingAnalyticsChart />
      </div>

      <!-- Bottom Row -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
        <!-- Package Top Sales -->
        <PackageTopSales />
        
        <!-- Top Inquiry -->
        <TopInquiry />
      </div>
    </div>
  </div>
</div>
