<script>
  import { Mail } from 'lucide-svelte';
  
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
      <Mail class="h-5 w-5 text-gray-400" />
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
