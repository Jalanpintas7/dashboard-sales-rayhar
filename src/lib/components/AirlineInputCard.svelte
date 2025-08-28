<script>
  import { createEventDispatcher } from 'svelte';
  import { supabase } from '$lib/supabase.js';
  import { Plus, Plane } from 'lucide-svelte';

  const dispatch = createEventDispatcher();

  let airlineName = '';
  let airlineCode = '';
  let loading = false;
  let message = '';
  let messageType = '';

  async function handleSubmit() {
    if (!airlineName.trim() || !airlineCode.trim()) {
      message = 'Mohon isi semua field yang diperlukan';
      messageType = 'error';
      return;
    }

    loading = true;
    message = '';

    try {
      const { data, error } = await supabase
        .from('airlines')
        .insert([
          {
            name: airlineName.trim(),
            code: airlineCode.trim().toUpperCase()
          }
        ])
        .select();

      if (error) throw error;

      message = 'Airline berhasil ditambahkan!';
      messageType = 'success';
      
      // Reset form
      airlineName = '';
      airlineCode = '';
      
      // Dispatch event untuk refresh data
      dispatch('airlineAdded', data[0]);

    } catch (error) {
      console.error('Error adding airline:', error);
      message = 'Gagal menambahkan airline. Silakan coba lagi.';
      messageType = 'error';
    } finally {
      loading = false;
    }
  }
</script>

<div class="bg-white rounded-2xl shadow-soft p-6 border border-white/60">
  <!-- Header dengan ikon -->
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
      <Plane class="w-5 h-5 text-blue-600" />
    </div>
    <h2 class="text-xl font-bold text-slate-800">Input Airline</h2>
  </div>

  <!-- Message -->
  {#if message}
    <div class="mb-4 p-3 rounded-lg {messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
      {message}
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div>
      <label for="airlineName" class="block text-sm font-medium text-slate-700 mb-2">
        Nama Airline
      </label>
      <input
        id="airlineName"
        type="text"
        bind:value={airlineName}
        placeholder="Contoh: Garuda Indonesia"
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        required
      />
    </div>

    <div>
      <label for="airlineCode" class="block text-sm font-medium text-slate-700 mb-2">
        Kode Airline
      </label>
      <input
        id="airlineCode"
        type="text"
        bind:value={airlineCode}
        placeholder="Contoh: GA"
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 uppercase"
        required
        maxlength="3"
      />
    </div>



    <button
      type="submit"
      disabled={loading}
      class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg"
    >
      {loading ? 'Menambahkan...' : 'Tambah Airline'}
    </button>
  </form>
</div>
