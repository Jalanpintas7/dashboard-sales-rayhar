<script>
  import { Lock, Eye, EyeOff } from 'lucide-svelte';
  
  export let value = '';
  export let placeholder = '';
  export let required = false;
  export let id = '';
  export let label = '';
  
  let showPassword = false;
  
  function togglePassword() {
    showPassword = !showPassword;
  }
</script>

<div>
  {#if label}
    <label for={id} class="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
  {/if}
  
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Lock class="h-5 w-5 text-gray-400" />
    </div>
    
    <input
      {id}
      type={showPassword ? 'text' : 'password'}
      bind:value
      {required}
      class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
      {placeholder}
    />
    
    <button
      type="button"
      on:click={togglePassword}
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
    >
      {#if showPassword}
        <EyeOff class="h-5 w-5" />
      {:else}
        <Eye class="h-5 w-5" />
      {/if}
    </button>
  </div>
</div>
