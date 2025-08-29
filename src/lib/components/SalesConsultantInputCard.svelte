<script>
  import { createEventDispatcher } from 'svelte';
  import { supabase } from '$lib/supabase.js';
  import { Plus, User } from 'lucide-svelte';

  const dispatch = createEventDispatcher();

  let consultantName = '';
  let consultantEmail = '';
  let consultantPhone = '';
  let loading = false;
  let message = '';
  let messageType = '';

  async function handleSubmit() {
    if (!consultantName.trim() || !consultantEmail.trim() || !consultantPhone.trim()) {
      message = 'Mohon isi semua field yang diperlukan';
      messageType = 'error';
      return;
    }

    loading = true;
    message = '';

    try {
      const { data, error } = await supabase
        .from('sales_consultants')
        .insert([
          {
            name: consultantName.trim(),
            email: consultantEmail.trim().toLowerCase(),
            phone: consultantPhone.trim()
          }
        ])
        .select();

      if (error) throw error;

      message = 'Sales Consultant berhasil ditambahkan!';
      messageType = 'success';
      
      // Reset form
      consultantName = '';
      consultantEmail = '';
      consultantPhone = '';
      
      // Dispatch event untuk refresh data
      dispatch('consultantAdded', data[0]);

    } catch (error) {
      console.error('Error adding sales consultant:', error);
      message = 'Gagal menambahkan sales consultant. Silakan coba lagi.';
      messageType = 'error';
    } finally {
      loading = false;
    }
  }
</script>

<div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-white/60">
  <!-- Header dengan ikon -->
  <div class="flex items-center gap-3 mb-4 sm:mb-6">
    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-xl flex items-center justify-center">
      <User class="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
    </div>
    <h2 class="text-lg sm:text-xl font-bold text-slate-800">Input Sales Consultant</h2>
  </div>

  <!-- Message -->
  {#if message}
    <div class="mb-4 p-3 rounded-lg {messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
      {message}
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="space-y-4 sm:space-y-6">
    <div>
      <label for="consultantName" class="block text-sm font-medium text-slate-700 mb-2">
        Nama Sales Consultant
      </label>
      <input
        id="consultantName"
        type="text"
        bind:value={consultantName}
        placeholder="Contoh: Ahmad Rahman"
        class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        required
      />
    </div>

    <div>
      <label for="consultantEmail" class="block text-sm font-medium text-slate-700 mb-2">
        Email
      </label>
      <input
        id="consultantEmail"
        type="email"
        bind:value={consultantEmail}
        placeholder="Contoh: ahmad@rayhar.com"
        class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        required
      />
    </div>

    <div>
      <label for="consultantPhone" class="block text-sm font-medium text-slate-700 mb-2">
        Nomor Telepon
      </label>
      <input
        id="consultantPhone"
        type="tel"
        bind:value={consultantPhone}
        placeholder="Contoh: 081234567890"
        class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        required
      />
    </div>



    <button
      type="submit"
      disabled={loading}
      class="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-soft hover:shadow-lg"
    >
      {loading ? 'Menambahkan...' : 'Tambah Sales Consultant'}
    </button>
  </form>
</div>
