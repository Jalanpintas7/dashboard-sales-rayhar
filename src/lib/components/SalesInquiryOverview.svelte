<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.js';

  // Data untuk diagram batang - akan diisi dari Supabase
  let barChartData = [];
  let isLoading = true;

  // Filter options
  let isMenuOpen = false;
  let selectedFilter = 'Total Sales';

  // Fungsi untuk mendapatkan tanggal dinamis
  function getDateLabels() {
    const today = new Date();
    const dates = [];
    
    // Hari ini
    dates.push(formatDate(today));
    
    // 1 hari yang lalu
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    dates.push(formatDate(yesterday));
    
    // 2 hari yang lalu
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    dates.push(formatDate(twoDaysAgo));
    
    return dates;
  }

  // Fungsi untuk format tanggal
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Fungsi untuk mengambil data dari Supabase
  async function fetchData() {
    try {
      isLoading = true;
      
      let data, error;
      
      if (selectedFilter === 'Total Sales') {
        // Query untuk data bookings
        const result = await supabase
          .from('bookings')
          .select('created_at, umrah_category_id')
          .gte('created_at', new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString());
        data = result.data;
        error = result.error;
      } else {
        // Query untuk data leads
        const result = await supabase
          .from('leads')
          .select('created_at, category_id')
          .gte('created_at', new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString());
        data = result.data;
        error = result.error;
      }

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      // Proses data untuk mendapatkan statistik harian
      const dailyStats = processData(data);
      
      // Buat data untuk chart
      barChartData = dailyStats.map(stat => ({
        pelancongan: { percentage: stat.pelanconganPercentage },
        umrah: { percentage: stat.umrahPercentage },
        date: stat.date,
        pelanconganCount: stat.pelanconganCount,
        umrahCount: stat.umrahCount
      }));

    } catch (error) {
      console.error('Error:', error);
      // Jika error, gunakan data test 50%
      barChartData = getTestData();
    } finally {
      isLoading = false;
    }
  }

  // Fungsi untuk data test 50%
  function getTestData() {
    const today = new Date();
    const testData = [];
    
    for (let i = 0; i < 3; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - i);
      
      testData.push({
        pelancongan: { percentage: 50 },
        umrah: { percentage: 50 },
        date: formatDate(targetDate),
        pelanconganCount: 5,
        umrahCount: 5
      });
    }
    
    return testData.reverse();
  }

  // Fungsi untuk memproses data
  function processData(data) {
    const today = new Date();
    const stats = [];

    // Loop untuk 3 hari terakhir
    for (let i = 0; i < 3; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - i);
      const dateStr = targetDate.toISOString().split('T')[0];

      // Filter data untuk tanggal tertentu
      const dayData = data.filter(item => {
        const itemDate = new Date(item.created_at).toISOString().split('T')[0];
        return itemDate === dateStr;
      });

      let pelanconganCount, umrahCount;
      
      if (selectedFilter === 'Total Sales') {
        // Untuk bookings: umrah_category_id ada = umrah, null = pelancongan
        pelanconganCount = dayData.filter(item => !item.umrah_category_id).length;
        umrahCount = dayData.filter(item => item.umrah_category_id).length;
      } else {
        // Untuk leads: category_id ada = umrah, null = pelancongan
        pelanconganCount = dayData.filter(item => !item.category_id).length;
        umrahCount = dayData.filter(item => item.category_id).length;
      }

      const totalCount = pelanconganCount + umrahCount;

      // Hitung persentase
      const pelanconganPercentage = totalCount > 0 ? Math.round((pelanconganCount / totalCount) * 100) : 0;
      const umrahPercentage = totalCount > 0 ? Math.round((umrahCount / totalCount) * 100) : 0;

      stats.push({
        date: formatDate(targetDate),
        pelanconganCount,
        umrahCount,
        pelanconganPercentage,
        umrahPercentage
      });
    }

    return stats.reverse(); // Reverse agar urutan dari lama ke baru
  }

  const dateLabels = getDateLabels();

  // Reactive statement untuk memantau perubahan filter
  $: if (selectedFilter) {
    fetchData();
  }

  // Load data saat component mount
  onMount(() => {
    fetchData();
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function selectFilter(filter) {
    selectedFilter = filter;
    isMenuOpen = false;
    // Refresh data berdasarkan filter yang dipilih
    fetchData();
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  // Close menu when clicking outside
  function handleClickOutside(event) {
    if (!event.target.closest('.relative')) {
      isMenuOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<!-- CARD WRAPPER -->
<section class="rounded-3xl bg-white/90 border border-white shadow-card p-6 h-[600px] lg:h-[650px]">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-[22px] font-extrabold text-slate-800">Sales & Inquiry Overview</h2>
    </div>
    
    <!-- Dropdown (custom styled) -->
    <div class="relative">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50 active:scale-[0.99] transition"
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        on:click={toggleMenu}
      >
        <span class="truncate">{selectedFilter}</span>
        <svg class="size-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd"/>
        </svg>
      </button>

      <div
        class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5 transition {isMenuOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'}"
        role="menu"
      >
        <!-- menu item -->
        <button 
          class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
          on:click={() => selectFilter('Total Sales')}
        >
          Total Sales
        </button>
        <button 
          class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
          on:click={() => selectFilter('Total Inquiry')}
        >
          Total Inquiry
        </button>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  {#if isLoading}
    <div class="mt-10 flex justify-center items-center h-[420px]">
      <div class="text-slate-500">Loading data...</div>
    </div>
  {:else}
    <!-- UNIFIED CHART AREA -->
    <div class="mt-10 flex justify-center">
      <div class="flex gap-12 items-end">
        {#each barChartData as bar, index}
          <!-- BAR {index + 1} -->
          <div class="flex flex-col items-center">
            <div class="w-44 h-[420px] rounded-2xl overflow-hidden shadow-md flex flex-col">
              {#if bar.pelancongan.percentage > 0}
                <div 
                  class="bg-gradient-to-b from-[#942392] to-[#942392]/80 flex items-center justify-center"
                  style="height: {(bar.pelancongan.percentage / 100) * 420}px;"
                >
                  <span class="text-white text-sm font-semibold">Pelancongan</span>
                </div>
              {/if}
              {#if bar.umrah.percentage > 0}
                <div 
                  class="bg-gradient-to-t from-[#FFF212] to-[#FFF212]/80 flex items-center justify-center"
                  style="height: {(bar.umrah.percentage / 100) * 420}px;"
                >
                  <span class="text-black text-sm font-semibold">umrah</span>
                </div>
              {/if}
              {#if bar.pelancongan.percentage === 0 && bar.umrah.percentage === 0}
                <div class="flex-1 flex items-center justify-center bg-gray-100">
                  <span class="text-gray-400 text-sm">No Data</span>
                </div>
              {/if}
            </div>
            <div class="mt-4 flex gap-3">
              <span class="rounded-full bg-[#942392]/20 text-[#942392] text-xs font-semibold px-3 py-1 shadow-sm">{bar.pelancongan.percentage}%</span>
              <span class="rounded-full bg-[#FFF212]/20 text-black text-xs font-semibold px-3 py-1 shadow-sm">{bar.umrah.percentage}%</span>
            </div>
            <span class="mt-3 rounded-full bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1">{bar.date}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</section>
