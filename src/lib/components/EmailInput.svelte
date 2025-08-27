<script>
  export let value = '';
  export let placeholder = '';
  export let required = false;
  export let id = '';
  export let label = '';
</script>

<div>
  {#if label}
    <label for={id} class="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
  {/if}
  
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
      </svg>
    </div>
    
    <input
      {id}
      type="email"
      bind:value
      {required}
      class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
      {placeholder}
    />
  </div>
</div>
