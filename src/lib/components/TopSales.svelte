<script>
  // Data untuk top sales dengan nama saja
  const topSalesData = [
    { 
      name: 'David Millar', 
      amount: 'Rp 2.5M', 
      total: 45,
      profileImage: '/api/placeholder/40/40' // Placeholder untuk profile image
    },
    { 
      name: 'Sarah Johnson', 
      amount: 'Rp 1.8M', 
      total: 32,
      profileImage: '/api/placeholder/40/40'
    },
    { 
      name: 'Michael Chen', 
      amount: 'Rp 1.2M', 
      total: 28,
      profileImage: '/api/placeholder/40/40'
    },
    { 
      name: 'Emily Davis', 
      amount: 'Rp 950K', 
      total: 25,
      profileImage: '/api/placeholder/40/40'
    },
    { 
      name: 'Alex Wilson', 
      amount: 'Rp 800K', 
      total: 22,
      profileImage: '/api/placeholder/40/40'
    }
  ];
</script>

<div class="bg-white/90 backdrop-blur-sm rounded-card shadow-soft border border-white/80 p-3 lg:p-5 xl:p-7 h-[600px] lg:h-[650px]">
  <!-- Header -->
  <div class="flex items-center justify-between mb-4 lg:mb-6">
    <h2 class="text-base lg:text-lg xl:text-xl font-bold text-slate-900">Top Sales Consultant</h2>
    
  </div>
  
  <!-- Content -->
  <div class="space-y-2 lg:space-y-3 xl:space-y-4">
    {#each topSalesData as item, index}
      <div class="
        bg-white
        p-2 lg:p-3 xl:p-4 
        transition-all duration-200
        rounded-lg
      " style="background-color: #ffffff !important;">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
            <!-- Profile Picture - Circular -->
            <div class="
              w-7 h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10
              bg-gradient-to-br from-green-400 to-green-600
              rounded-full
              flex items-center justify-center
              text-white
              font-semibold
              text-xs lg:text-sm
              shadow-md
              overflow-hidden
              flex-shrink-0
            ">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                alt="{item.name}"
                class="w-full h-full object-cover"
                on:error={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div class="w-full h-full flex items-center justify-center" style="display: none;">
                {item.name.charAt(0)}
              </div>
            </div>
            
            <!-- Name Only -->
            <div class="min-w-0 flex-1">
              <h3 class="text-slate-900 font-bold text-xs lg:text-sm xl:text-base truncate">{item.name}</h3>
            </div>
          </div>
          
          <!-- Sales Amount -->
          <div class="text-right flex-shrink-0">
            <p class="text-slate-900 font-bold text-sm lg:text-base xl:text-lg">{item.amount}</p>
            <p class="text-slate-500 text-xs lg:text-sm">Total: {item.total}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
