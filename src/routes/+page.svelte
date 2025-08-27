<script>
  import SummaryCards from '$lib/components/SummaryCards.svelte';
  import SalesInquiryOverview from '$lib/components/SalesInquiryOverview.svelte';
  import TopSales from '$lib/components/TopSales.svelte';
  import PackageTopSales from '$lib/components/PackageTopSales.svelte';
  import TopInquiry from '$lib/components/TopInquiry.svelte';
</script>

<div class="p-3 lg:p-4 bg-section min-h-full rounded-xl mr-2 lg:mr-4">
  <!-- Page Header -->
  <div class="mb-4 lg:mb-6">
    <h1 class="text-2xl lg:text-3xl font-bold text-dark mb-2">Dashboard</h1>
    <p class="text-grey3">Welcome to your admin dashboard</p>
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
  
  <!-- Bottom Row -->
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-10">
    <!-- Package Top Sales -->
    <PackageTopSales />
    
    <!-- Top Inquiry -->
    <TopInquiry />
  </div>
</div>
