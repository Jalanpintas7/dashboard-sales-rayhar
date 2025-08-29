<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { signOut, user, userRole } from '$lib/stores/auth.js';
  import { goto } from '$app/navigation';
  import { getBranchIdByUser } from '$lib/supabase-helpers.js';
  import { supabase } from '$lib/supabase.js';
  import { themeColors } from '$lib/theme/colors.js';
  
  // Import Lucide icons
  import { 
    User, 
    Settings, 
    CreditCard, 
    Activity, 
    HelpCircle, 
    LogOut 
  } from 'lucide-svelte';
  
  const dispatch = createEventDispatcher();
  
  let isOpen = false;
  let currentBranch = null;
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  
  function closeDropdown() {
    isOpen = false;
  }
  
  async function handleLogout() {
    try {
      await signOut();
      goto('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  
  // Close dropdown when clicking outside
  function handleClickOutside(event) {
    if (!event.target.closest('.profile-dropdown')) {
      closeDropdown();
    }
  }
  
  // Load branch info when component mounts
  async function loadBranchInfo() {
    try {
      if ($user && $userRole === 'admin_branch') {
        const branchId = await getBranchIdByUser($user.id);
        if (branchId) {
          const { data: branchData, error: branchError } = await supabase
            .from('branches')
            .select('name, state, region')
            .eq('id', branchId)
            .single();
          
          if (!branchError && branchData) {
            currentBranch = branchData;
          }
        }
      }
    } catch (error) {
      console.error('Error loading branch info:', error);
    }
  }
  
  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleClickOutside);
    }
    loadBranchInfo();
  });
  
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<div class="profile-dropdown relative">
  <!-- Profile Button -->
  <button
    on:click={toggleDropdown}
    class="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
    style="background-color: {themeColors.primary};"
    aria-label="Profile menu"
  >
    <User class="w-5 h-5 text-white" />
  </button>
  
  <!-- Dropdown Menu -->
  {#if isOpen}
    <div class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <!-- Profile Header -->
      <div class="p-4 rounded-t-lg" style="background-color: {themeColors.primary};">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: {themeColors.primary};">
            <User class="w-6 h-6 text-white" />
          </div>
          <div>
            <p class="text-sm font-semibold text-white">
              {$user?.email || 'User'}
            </p>
            <p class="text-xs text-white opacity-80">
              {$userRole === 'super_admin' ? 'Super Admin' : $userRole === 'admin_branch' ? (currentBranch ? currentBranch.name : 'Admin Branch') : 'User'}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Menu Items -->
      <div class="py-2">
        <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
          <User class="w-4 h-4 mr-3" style="color: {themeColors.primary};" />
          Profile
        </a>
        
        <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
          <Settings class="w-4 h-4 mr-3" style="color: {themeColors.primary};" />
          Settings
        </a>
        
        <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
          <CreditCard class="w-4 h-4 mr-3" style="color: {themeColors.primary};" />
          Billing
        </a>
        
        <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
          <Activity class="w-4 h-4 mr-3" style="color: {themeColors.primary};" />
          Activity
        </a>
        
        <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
          <HelpCircle class="w-4 h-4 mr-3" style="color: {themeColors.primary};" />
          Help
        </a>
      </div>
      
      <!-- Logout Button -->
      <div class="px-4 py-3 border-t border-gray-200">
        <button
          on:click={handleLogout}
          class="w-full flex items-center justify-center px-4 py-2 text-white rounded-md transition-colors duration-150"
          style="background-color: {themeColors.primary};"
        >
          <LogOut class="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .profile-dropdown {
    position: relative;
  }
</style>
