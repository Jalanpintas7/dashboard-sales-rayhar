<script>
  import { onMount } from 'svelte';
  import EmailInput from '$lib/components/EmailInput.svelte';
  import PasswordInput from '$lib/components/PasswordInput.svelte';
  
  let email = '';
  let password = '';
  let rememberMe = false;
  let isLoading = false;
  
  function handleSubmit() {
    isLoading = true;
    // Logic akan diimplementasikan nanti
    setTimeout(() => {
      isLoading = false;
    }, 2000);
  }
</script>

<svelte:head>
  <title>Login - Dashboard Admin Rayhar</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 flex items-center justify-center p-4">
  <div class="max-w-md w-full space-y-8">
    <!-- Logo dan Header -->
    <div class="text-center">
      <div class="mx-auto h-20 w-20 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mb-4">
        <svg class="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h2>
      <p class="text-gray-600">Masuk ke dashboard admin Rayhar</p>
    </div>

    <!-- Form Login -->
    <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
        <!-- Email Input -->
        <EmailInput
          bind:value={email}
          id="email"
          label="Email"
          placeholder="Masukkan email Anda"
          required={true}
        />

        <!-- Password Input -->
        <PasswordInput
          bind:value={password}
          id="password"
          label="Password"
          placeholder="Masukkan password Anda"
          required={true}
        />

        <!-- Remember Me -->
        <div class="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            bind:checked={rememberMe}
            class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-700">
            Ingat saya
          </label>
        </div>

        <!-- Login Button -->
        <div>
          <button
            type="submit"
            disabled={isLoading}
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {#if isLoading}
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            {:else}
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-purple-500 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
              </span>
              Masuk
            {/if}
          </button>
        </div>
      </form>


    </div>
  </div>
</div>

<style>
  /* Custom scrollbar untuk webkit browsers */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
</style>
