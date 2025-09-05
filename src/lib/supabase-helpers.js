import { supabase } from './supabase.js'

// Helper functions untuk operasi database

// ===== BRANCHES =====
export const getBranches = async () => {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

// ===== DESTINATIONS =====
export const getDestinations = async () => {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

export const createDestination = async (destinationData) => {
  const { data, error } = await supabase
    .from('destinations')
    .insert([destinationData])
    .select()
  
  if (error) throw error
  return data[0]
}

// ===== UMRAH SEASONS =====
export const getUmrahSeasons = async () => {
  const { data, error } = await supabase
    .from('umrah_seasons')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

export const createUmrahSeason = async (seasonData) => {
  const { data, error } = await supabase
    .from('umrah_seasons')
    .insert([seasonData])
    .select()
  
  if (error) throw error
  return data[0]
}

// ===== UMRAH CATEGORIES =====
export const getUmrahCategories = async () => {
  const { data, error } = await supabase
    .from('umrah_categories')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

export const createUmrahCategory = async (categoryData) => {
  const { data, error } = await supabase
    .from('umrah_categories')
    .insert([categoryData])
    .select()
  
  if (error) throw error
  return data[0]
}

// ===== LEADS =====
export const getLeads = async (limit = 50) => {
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      branches(name),
      destinations(name),
      umrah_seasons(name),
      umrah_categories(name),
      package_types(name),
      outbound_dates(start_date, end_date)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

// ===== BOOKINGS =====
export const getBookings = async (limit = 50) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      branches(name),
      destinations(name),
      umrah_seasons(name),
      umrah_categories(name),
      package_types(name),
      outbound_dates(start_date, end_date),
      umrah_dates(start_date, end_date),
      airlines(name),
      sales_consultant(name)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

// ===== SALES CONSULTANTS =====
export const getSalesConsultants = async () => {
  const { data, error } = await supabase
    .from('sales_consultant')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

// ===== PACKAGE TYPES =====
export const getPackageTypes = async () => {
  const { data, error } = await supabase
    .from('package_types')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

// ===== AIRLINES =====
export const getAirlines = async () => {
  const { data, error } = await supabase
    .from('airlines')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

export const createAirline = async (airlineData) => {
  const { data, error } = await supabase
    .from('airlines')
    .insert([airlineData])
    .select()

  if (error) throw error
  return data[0]
}

export const createUmrahPackage = async (packageData) => {
  const { data, error } = await supabase
    .from('umrah_dates')
    .insert([packageData])
    .select()

  if (error) throw error
  return data[0]
}

// ===== STATISTICS =====
export const getDashboardStats = async () => {
  // Get total leads
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
  
  // Get total bookings
  const { count: totalBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
  
  // Get recent leads (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const { count: recentLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString())
  
  // Get recent bookings (last 7 days)
  const { count: recentBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString())
  
  return {
    totalLeads: totalLeads || 0,
    totalBookings: totalBookings || 0,
    recentLeads: recentLeads || 0,
    recentBookings: recentBookings || 0
  }
}

// ===== BRANCH-SPECIFIC STATISTICS =====
export const getDashboardStatsByBranch = async (branchId) => {
  if (!branchId) {
    throw new Error('Branch ID is required')
  }

  // Get total leads for specific branch
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('branch_id', branchId)
  
  // Get total bookings for specific branch
  const { count: totalBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('branch_id', branchId)
  
  // Get recent leads for specific branch (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const { count: recentLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('branch_id', branchId)
    .gte('created_at', sevenDaysAgo.toISOString())
  
  // Get recent bookings for specific branch (last 7 days)
  const { count: recentBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('branch_id', branchId)
    .gte('created_at', sevenDaysAgo.toISOString())

  // Get total Umrah bookings for specific branch
  const { count: totalUmrahBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('branch_id', branchId)
    .eq('jenis_pelancongan', 'umrah')
  
  // Get total Outbound bookings for specific branch
  const { count: totalOutboundBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('branch_id', branchId)
    .eq('jenis_pelancongan', 'outbound')
  
  return {
    totalLeads: totalLeads || 0,
    totalBookings: totalBookings || 0,
    recentLeads: recentLeads || 0,
    recentBookings: recentBookings || 0,
    totalUmrahBookings: totalUmrahBookings || 0,
    totalOutboundBookings: totalOutboundBookings || 0
  }
}

// ===== TOP SALES CONSULTANT STATISTICS =====
export const getTopSalesConsultants = async (limit = 5) => {
  try {
    console.log('getTopSalesConsultants: Starting...');
    
    // Langsung gunakan query manual yang sudah terbukti berfungsi
    return await getTopSalesConsultantsManual(limit);

  } catch (error) {
    console.error('getTopSalesConsultants: Error:', error);
    throw error;
  }
};

// Fallback function menggunakan query manual
const getTopSalesConsultantsManual = async (limit = 5) => {
  try {
    console.log('getTopSalesConsultantsManual: Starting...');
    
    // Test 1: Cek koneksi Supabase
    console.log('getTopSalesConsultantsManual: Testing Supabase connection...');
    const { data: testData, error: testError } = await supabase
      .from('bookings')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('getTopSalesConsultantsManual: Supabase connection error:', testError);
      throw new Error(`Supabase connection failed: ${testError.message}`);
    }
    
    console.log('getTopSalesConsultantsManual: Supabase connection OK');
    
    // Test 2: Get all bookings
    console.log('getTopSalesConsultantsManual: Getting bookings...');
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('consultant_id, branch_id, created_at, total_price')
      .not('consultant_id', 'is', null);

    if (bookingsError) {
      console.error('getTopSalesConsultantsManual: Bookings error:', bookingsError);
      throw bookingsError;
    }

    console.log('getTopSalesConsultantsManual: Bookings count:', bookings?.length || 0);

    if (!bookings || bookings.length === 0) {
      console.log('getTopSalesConsultantsManual: No bookings found');
      return [];
    }

    // Get unique consultant IDs
    const consultantIds = [...new Set(bookings.map(b => b.consultant_id))];
    console.log('getTopSalesConsultantsManual: Unique consultant IDs:', consultantIds.length);
    
    // Get consultant details
    console.log('getTopSalesConsultantsManual: Getting consultant details...');
    const { data: consultants, error: consultantError } = await supabase
      .from('sales_consultant')
      .select('id, name, email, whatsapp_number, sales_consultant_number')
      .in('id', consultantIds);

    if (consultantError) {
      console.error('getTopSalesConsultantsManual: Consultant error:', consultantError);
      throw consultantError;
    }

    console.log('getTopSalesConsultantsManual: Consultants count:', consultants?.length || 0);

    // Get branch details
    console.log('getTopSalesConsultantsManual: Getting branch details...');
    const branchIds = [...new Set(bookings.map(b => b.branch_id).filter(id => id))];
    const { data: branches, error: branchError } = await supabase
      .from('branches')
      .select('id, name')
      .in('id', branchIds);

    if (branchError) {
      console.error('getTopSalesConsultantsManual: Branch error:', branchError);
      throw branchError;
    }

    console.log('getTopSalesConsultantsManual: Branches count:', branches?.length || 0);

    // Create lookups
    const consultantLookup = {};
    consultants.forEach(c => consultantLookup[c.id] = c);
    
    const branchLookup = {};
    branches.forEach(b => branchLookup[b.id] = b.name);

    // Calculate statistics
    const consultantStats = {};
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    bookings.forEach(booking => {
      const consultantId = booking.consultant_id;
      const consultant = consultantLookup[consultantId];
      
      if (!consultant) return;
      
      if (!consultantStats[consultantId]) {
        consultantStats[consultantId] = {
          id: consultantId,
          name: consultant.name,
          email: consultant.email || '',
          whatsapp: consultant.whatsapp_number || '',
          salesConsultantNumber: consultant.sales_consultant_number || '',
          totalBookings: 0,
          totalRevenue: 0,
          recentBookings: 0,
          recentRevenue: 0,
          branches: new Set()
        };
      }
      
      consultantStats[consultantId].totalBookings += 1;
      consultantStats[consultantId].totalRevenue += parseFloat(booking.total_price || 0);
      
      if (booking.branch_id && branchLookup[booking.branch_id]) {
        consultantStats[consultantId].branches.add(branchLookup[booking.branch_id]);
      }
      
      const bookingDate = new Date(booking.created_at);
      if (bookingDate >= thirtyDaysAgo) {
        consultantStats[consultantId].recentBookings += 1;
        consultantStats[consultantId].recentRevenue += parseFloat(booking.total_price || 0);
      }
    });

    console.log('getTopSalesConsultantsManual: Consultant stats calculated:', Object.keys(consultantStats).length);

    // Convert to array and sort by total revenue
    const topConsultants = Object.values(consultantStats)
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, limit)
      .map(consultant => ({
        ...consultant,
        branches: Array.from(consultant.branches).join(', '),
        totalBookings: consultant.totalBookings, // Keep for reference
        totalRevenue: Math.round(consultant.totalRevenue), // Round to nearest integer
        recentRevenue: Math.round(consultant.recentRevenue) // Round to nearest integer
      }));

    console.log('getTopSalesConsultantsManual: Final result:', topConsultants);
    return topConsultants;

  } catch (error) {
    console.error('getTopSalesConsultantsManual: Error:', error);
    throw error;
  }
};

// ===== TOP PACKAGES BY BRANCH =====
export const getTopPackagesByBranch = async (branchId, filter = 'keseluruhan', limit = 5) => {
  let query = supabase
    .from('bookings')
    .select(`
      *,
      umrah_seasons(name),
      destinations(name)
    `)
    .not('branch_id', 'is', null);

  // Filter berdasarkan branch jika ada
  if (branchId) {
    query = query.eq('branch_id', branchId);
  }

  // Filter berdasarkan jenis pelancongan
  if (filter === 'Umrah') {
    query = query.eq('jenis_pelancongan', 'umrah');
  } else if (filter === 'Pelancongan') {
    query = query.eq('jenis_pelancongan', 'outbound');
  }

  const { data: bookings, error } = await query;

  if (error) throw error;

  // Group by package dan hitung total sales
  const packageStats = {};

  bookings.forEach(booking => {
    let packageName = '';
    let packageId = '';

    if (booking.jenis_pelancongan === 'umrah') {
      // Untuk umrah, gunakan umrah_season_id
      packageId = booking.umrah_season_id;
      packageName = booking.umrah_seasons?.name || 'Umrah Package';
    } else if (booking.jenis_pelancongan === 'outbound') {
      // Untuk pelancongan, gunakan destination_id
      packageId = booking.destination_id;
      packageName = booking.destinations?.name || 'Tour Package';
    }

    if (!packageId) return; // Skip jika tidak ada package ID

    if (!packageStats[packageId]) {
      packageStats[packageId] = {
        id: packageId,
        name: packageName,
        totalSales: 0,
        type: booking.jenis_pelancongan
      };
    }

    // Perhitungan baru: total peserta = jumlah booking + bilangan
    // Formula: total peserta = 1 (booking record) + bilangan (jumlah peserta dalam booking)
    const totalPax = 1 + (booking.bilangan || 0);
    packageStats[packageId].totalSales += totalPax;
  });

  // Convert to array dan sort by total sales
  const topPackages = Object.values(packageStats)
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, limit)
    .map((pkg, index) => ({
      ...pkg,
      rank: index + 1
    }));

  return topPackages;
};

// ===== TOP INQUIRIES BY BRANCH =====
export const getTopInquiriesByBranch = async (branchId, filter = 'keseluruhan', limit = 5) => {
  let query = supabase
    .from('leads')
    .select(`
      *,
      umrah_seasons(name),
      destinations(name)
    `)
    .not('branch_id', 'is', null);

  // Filter berdasarkan branch jika ada
  if (branchId) {
    query = query.eq('branch_id', branchId);
  }

  // Filter berdasarkan jenis pelancongan
  if (filter === 'Umrah') {
    query = query.not('season_id', 'is', null).not('category_id', 'is', null);
  } else if (filter === 'Pelancongan') {
    query = query.not('destination_id', 'is', null).not('outbound_date_id', 'is', null);
  }

  const { data: leads, error } = await query;

  if (error) throw error;

  // Group by package dan hitung total inquiry
  const inquiryStats = {};

  leads.forEach(lead => {
    let packageName = '';
    let packageId = '';
    let packageType = '';

    // Tentukan jenis pelancongan berdasarkan data yang ada
    if (lead.season_id && lead.category_id) {
      // Umrah: ada season_id dan category_id
      packageId = lead.season_id;
      packageName = lead.umrah_seasons?.name || 'Umrah Package';
      packageType = 'umrah';
    } else if (lead.destination_id && lead.outbound_date_id) {
      // Pelancongan: ada destination_id dan outbound_date_id
      packageId = lead.destination_id;
      packageName = lead.destinations?.name || 'Tour Package';
      packageType = 'outbound';
    }

    if (!packageId) return; // Skip jika tidak ada package ID

    if (!inquiryStats[packageId]) {
      inquiryStats[packageId] = {
        id: packageId,
        name: packageName,
        totalInquiries: 0,
        totalBookings: 0,
        type: packageType
      };
    }

    inquiryStats[packageId].totalInquiries += 1;
  });

  // Hitung conversion rate dengan mengambil data booking
  const packageIds = Object.keys(inquiryStats);
  
  if (packageIds.length > 0) {
    // Get booking data untuk menghitung conversion
    let bookingQuery = supabase
      .from('bookings')
      .select('umrah_season_id, destination_id, jenis_pelancongan')
      .not('branch_id', 'is', null);

    if (branchId) {
      bookingQuery = bookingQuery.eq('branch_id', branchId);
    }

    if (filter === 'Umrah') {
      bookingQuery = bookingQuery.eq('jenis_pelancongan', 'umrah');
    } else if (filter === 'Pelancongan') {
      bookingQuery = bookingQuery.eq('jenis_pelancongan', 'outbound');
    }

    const { data: bookings, error: bookingError } = await bookingQuery;

    if (!bookingError && bookings) {
      // Hitung booking untuk setiap package
      bookings.forEach(booking => {
        let packageId = '';
        
        if (booking.jenis_pelancongan === 'umrah') {
          packageId = booking.umrah_season_id;
        } else if (booking.jenis_pelancongan === 'outbound') {
          packageId = booking.destination_id;
        }

        if (packageId && inquiryStats[packageId]) {
          inquiryStats[packageId].totalBookings += 1;
        }
      });
    }
  }

  // Convert to array, hitung conversion rate, dan sort
  const topInquiries = Object.values(inquiryStats)
    .map(pkg => {
      const conversionRate = pkg.totalInquiries > 0 
        ? ((pkg.totalBookings / pkg.totalInquiries) * 100).toFixed(1)
        : '0.0';
      
      return {
        ...pkg,
        conversion: `${conversionRate}%`
      };
    })
    .sort((a, b) => b.totalInquiries - a.totalInquiries)
    .slice(0, limit)
    .map((pkg, index) => ({
      ...pkg,
      rank: index + 1
    }));

  return topInquiries;
};

// ===== GET BRANCH ID BY USER =====
export const getBranchIdByUser = async (userId) => {
  const { data, error } = await supabase
    .from('admin_role')
    .select('branch_id')
    .eq('user_id', userId)
    .eq('role', 'admin_branch')
    .single()
  
  if (error) throw error
  return data?.branch_id
}

// ===== AUTH HELPERS =====
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// ===== SUPER ADMIN DASHBOARD STATISTICS =====
export const getDashboardStatsForSuperAdmin = async () => {
  // Get total leads from all branches
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
  
  // Get total bookings from all branches
  const { count: totalBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
  
  // Get recent leads (last 7 days) from all branches
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const { count: recentLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString())
  
  // Get recent bookings (last 7 days) from all branches
  const { count: recentBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString())

  // Get total Umrah bookings from all branches
  const { count: totalUmrahBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('jenis_pelancongan', 'umrah')
  
  // Get total Outbound bookings from all branches
  const { count: totalOutboundBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('jenis_pelancongan', 'outbound')
  
  return {
    totalLeads: totalLeads || 0,
    totalBookings: totalBookings || 0,
    recentLeads: recentLeads || 0,
    recentBookings: recentBookings || 0,
    totalUmrahBookings: totalUmrahBookings || 0,
    totalOutboundBookings: totalOutboundBookings || 0
  }
}

// ===== TOP PACKAGES FOR SUPER ADMIN =====
export const getTopPackagesForSuperAdmin = async (filter = 'keseluruhan', limit = 5) => {
  try {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        umrah_seasons(name),
        destinations(name)
      `)
      .not('branch_id', 'is', null);

    // Filter berdasarkan jenis pelancongan menggunakan field yang tersedia
    if (filter === 'Umrah') {
      // Umrah bookings have umrah_season_id and umrah_category_id filled
      query = query.not('umrah_season_id', 'is', null).not('umrah_category_id', 'is', null);
    } else if (filter === 'Pelancongan') {
      // Outbound bookings have destination_id and outbound_date_id filled
      query = query.not('destination_id', 'is', null).not('outbound_date_id', 'is', null);
    }

    const { data: bookings, error } = await query;

    if (error) throw error;

    if (!bookings || bookings.length === 0) {
      return [];
    }

    // Group by package dan hitung total sales
    const packageStats = {};

    bookings.forEach(booking => {
      let packageName = '';
      let packageId = '';
      let packageType = '';

      // Tentukan jenis pelancongan berdasarkan data yang ada
      if (booking.umrah_season_id && booking.umrah_category_id) {
        // Umrah: ada umrah_season_id dan umrah_category_id
        packageId = booking.umrah_season_id;
        packageName = booking.umrah_seasons?.name || 'Umrah Package';
        packageType = 'umrah';
      } else if (booking.destination_id && booking.outbound_date_id) {
        // Pelancongan: ada destination_id dan outbound_date_id
        packageId = booking.destination_id;
        packageName = booking.destinations?.name || 'Tour Package';
        packageType = 'outbound';
      }

      if (!packageId) return; // Skip jika tidak ada package ID

      if (!packageStats[packageId]) {
        packageStats[packageId] = {
          id: packageId,
          name: packageName,
          totalSales: 0,
          type: packageType
        };
      }

      // Perhitungan baru: total peserta = jumlah booking + bilangan
      // Formula: total peserta = 1 (booking record) + bilangan (jumlah peserta dalam booking)
      const totalPax = 1 + (booking.bilangan || 0);
      packageStats[packageId].totalSales += totalPax;
    });

    // Convert to array dan sort by total sales
    const topPackages = Object.values(packageStats)
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, limit)
      .map((pkg, index) => ({
        ...pkg,
        rank: index + 1
      }));

    return topPackages;
  } catch (error) {
    console.error('Error in getTopPackagesForSuperAdmin:', error);
    throw error;
  }
};

// ===== TOP INQUIRIES FOR SUPER ADMIN =====
export const getTopInquiriesForSuperAdmin = async (filter = 'keseluruhan', limit = 5) => {
  let query = supabase
    .from('leads')
    .select(`
      *,
      umrah_seasons(name),
      destinations(name)
    `)
    .not('branch_id', 'is', null);

  // Filter berdasarkan jenis pelancongan
  if (filter === 'Umrah') {
    query = query.not('season_id', 'is', null).not('category_id', 'is', null);
  } else if (filter === 'Pelancongan') {
    query = query.not('destination_id', 'is', null).not('outbound_date_id', 'is', null);
  }

  const { data: leads, error } = await query;

  if (error) throw error;

  // Group by package dan hitung total inquiry
  const inquiryStats = {};

  leads.forEach(lead => {
    let packageName = '';
    let packageId = '';
    let packageType = '';

    // Tentukan jenis pelancongan berdasarkan data yang ada
    if (lead.season_id && lead.category_id) {
      // Umrah: ada season_id dan category_id
      packageId = lead.season_id;
      packageName = lead.umrah_seasons?.name || 'Umrah Package';
      packageType = 'umrah';
    } else if (lead.destination_id && lead.outbound_date_id) {
      // Pelancongan: ada destination_id dan outbound_date_id
      packageId = lead.destination_id;
      packageName = lead.destinations?.name || 'Tour Package';
      packageType = 'outbound';
    }

    if (!packageId) return; // Skip jika tidak ada package ID

    if (!inquiryStats[packageId]) {
      inquiryStats[packageId] = {
        id: packageId,
        name: packageName,
        totalInquiries: 0,
        totalBookings: 0,
        type: packageType
      };
    }

    inquiryStats[packageId].totalInquiries += 1;
  });

  // Hitung conversion rate dengan mengambil data booking
  const packageIds = Object.keys(inquiryStats);
  
  if (packageIds.length > 0) {
    // Get booking data untuk menghitung conversion
    let bookingQuery = supabase
      .from('bookings')
      .select('umrah_season_id, destination_id, jenis_pelancongan')
      .not('branch_id', 'is', null);

    if (filter === 'Umrah') {
      bookingQuery = bookingQuery.eq('jenis_pelancongan', 'umrah');
    } else if (filter === 'Pelancongan') {
      bookingQuery = bookingQuery.eq('jenis_pelancongan', 'outbound');
    }

    const { data: bookings, error: bookingError } = await bookingQuery;

    if (!bookingError && bookings) {
      // Hitung booking untuk setiap package
      bookings.forEach(booking => {
        let packageId = '';
        
        if (booking.jenis_pelancongan === 'umrah') {
          packageId = booking.umrah_season_id;
        } else if (booking.jenis_pelancongan === 'outbound') {
          packageId = booking.destination_id;
        }

        if (packageId && inquiryStats[packageId]) {
          inquiryStats[packageId].totalBookings += 1;
        }
      });
    }
  }

  // Convert to array, hitung conversion rate, dan sort
  const topInquiries = Object.values(inquiryStats)
    .map(pkg => {
      const conversionRate = pkg.totalInquiries > 0 
        ? ((pkg.totalBookings / pkg.totalInquiries) * 100).toFixed(1)
        : '0.0';
      
      return {
        ...pkg,
        conversion: `${conversionRate}%`
      };
    })
    .sort((a, b) => b.totalInquiries - a.totalInquiries)
    .slice(0, limit)
    .map((pkg, index) => ({
      ...pkg,
      rank: index + 1
    }));

  return topInquiries;
};

// ===== SALES INQUIRY OVERVIEW FOR SUPER ADMIN =====
export const getSalesInquiryOverviewForSuperAdmin = async (type = 'sales') => {
  if (type === 'sales') {
    // Get booking data for last 3 months
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('jenis_pelancongan, created_at')
      .gte('created_at', threeMonthsAgo.toISOString())
      .not('jenis_pelancongan', 'is', null);

    if (error) throw error;

    // Group by month and calculate percentages
    const monthlyStats = {};
    
    bookings.forEach(booking => {
      const date = new Date(booking.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          umrah: 0,
          outbound: 0,
          total: 0
        };
      }
      
      if (booking.jenis_pelancongan === 'umrah') {
        monthlyStats[monthKey].umrah += 1;
      } else if (booking.jenis_pelancongan === 'outbound') {
        monthlyStats[monthKey].outbound += 1;
      }
      
      monthlyStats[monthKey].total += 1;
    });

    // Convert to array and calculate percentages
    const overviewData = Object.entries(monthlyStats)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-3) // Get last 3 months
      .map(([month, stats]) => {
        const umrahPercentage = stats.total > 0 ? Math.round((stats.umrah / stats.total) * 100) : 0;
        const outboundPercentage = stats.total > 0 ? Math.round((stats.outbound / stats.total) * 100) : 0;
        
        return {
          pelancongan: { percentage: outboundPercentage },
          umrah: { percentage: umrahPercentage },
          month: month
        };
      });

    return overviewData;
  } else {
    // Get leads data for last 3 months
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const { data: leads, error } = await supabase
      .from('leads')
      .select('season_id, destination_id, created_at')
      .gte('created_at', threeMonthsAgo.toISOString());

    if (error) throw error;

    // Group by month and calculate percentages
    const monthlyStats = {};
    
    leads.forEach(lead => {
      const date = new Date(lead.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          umrah: 0,
          outbound: 0,
          total: 0
        };
      }
      
      // Determine type based on data
      if (lead.season_id && lead.category_id) {
        monthlyStats[monthKey].umrah += 1;
      } else if (lead.destination_id && lead.outbound_date_id) {
        monthlyStats[monthKey].outbound += 1;
      }
      
      monthlyStats[monthKey].total += 1;
    });

    // Convert to array and calculate percentages
    const overviewData = Object.entries(monthlyStats)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-3) // Get last 3 months
      .map(([month, stats]) => {
        const umrahPercentage = stats.total > 0 ? Math.round((stats.umrah / stats.total) * 100) : 0;
        const outboundPercentage = stats.total > 0 ? Math.round((stats.outbound / stats.total) * 100) : 0;
        
        return {
          pelancongan: { percentage: outboundPercentage },
          umrah: { percentage: umrahPercentage },
          month: month
        };
      });

    return overviewData;
  }
};

// ===== TOP SALES CONSULTANTS BY CATEGORY =====
export const getTopSalesConsultantsByCategory = async (category, limit = 5) => {
  try {
    console.log('getTopSalesConsultantsByCategory: Starting for category:', category);

    // Test 1: Cek koneksi Supabase
    console.log('getTopSalesConsultantsByCategory: Testing Supabase connection...');
    const { data: testData, error: testError } = await supabase
      .from('bookings')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('getTopSalesConsultantsByCategory: Supabase connection error:', testError);
      throw new Error(`Supabase connection failed: ${testError.message}`);
    }

    console.log('getTopSalesConsultantsByCategory: Supabase connection OK');

    // Test 2: Get bookings filtered by category
    console.log('getTopSalesConsultantsByCategory: Getting bookings for category:', category);

    // Build query based on category - include bilangan field for proper calculation
    let query = supabase
      .from('bookings')
      .select('consultant_id, branch_id, created_at, total_price, bilangan, package_types(name)')
      .not('consultant_id', 'is', null);

    // Add category-specific filters
    if (category === 'umrah') {
      query = query
        .not('umrah_season_id', 'is', null)
        .not('umrah_category_id', 'is', null)
        .eq('package_types.name', 'Umrah');
    } else if (category === 'pelancongan') {
      query = query
        .not('destination_id', 'is', null)
        .not('outbound_date_id', 'is', null)
        .eq('package_types.name', 'Pelancongan');
    }

    const { data: bookings, error: bookingsError } = await query;

    if (bookingsError) {
      console.error('getTopSalesConsultantsByCategory: Bookings error:', bookingsError);
      throw bookingsError;
    }

    console.log('getTopSalesConsultantsByCategory: Bookings count:', bookings?.length || 0);

    if (!bookings || bookings.length === 0) {
      console.log('getTopSalesConsultantsByCategory: No bookings found for category:', category);
      return [];
    }

    // Get unique consultant IDs
    const consultantIds = [...new Set(bookings.map(b => b.consultant_id))];
    console.log('getTopSalesConsultantsByCategory: Unique consultant IDs:', consultantIds.length);

    // Get consultant details
    console.log('getTopSalesConsultantsByCategory: Getting consultant details...');
    const { data: consultants, error: consultantError } = await supabase
      .from('sales_consultant')
      .select('id, name, email, whatsapp_number, sales_consultant_number')
      .in('id', consultantIds);

    if (consultantError) {
      console.error('getTopSalesConsultantsByCategory: Consultant error:', consultantError);
      throw consultantError;
    }

    console.log('getTopSalesConsultantsByCategory: Consultants count:', consultants?.length || 0);

    // Get branch details
    console.log('getTopSalesConsultantsByCategory: Getting branch details...');
    const branchIds = [...new Set(bookings.map(b => b.branch_id).filter(id => id))];
    const { data: branches, error: branchError } = await supabase
      .from('branches')
      .select('id, name')
      .in('id', branchIds);

    if (branchError) {
      console.error('getTopSalesConsultantsByCategory: Branch error:', branchError);
      throw branchError;
    }

    console.log('getTopSalesConsultantsByCategory: Branches count:', branches?.length || 0);

    // Create lookups
    const consultantLookup = {};
    consultants.forEach(c => consultantLookup[c.id] = c);

    const branchLookup = {};
    branches.forEach(b => branchLookup[b.id] = b.name);

    // Calculate statistics
    const consultantStats = {};
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    bookings.forEach(booking => {
      const consultantId = booking.consultant_id;
      const consultant = consultantLookup[consultantId];

      if (!consultant) return;

      if (!consultantStats[consultantId]) {
        consultantStats[consultantId] = {
          id: consultantId,
          name: consultant.name,
          email: consultant.email || '',
          whatsapp: consultant.whatsapp_number || '',
          salesConsultantNumber: consultant.sales_consultant_number || '',
          totalBookings: 0,
          totalRevenue: 0,
          recentBookings: 0,
          recentRevenue: 0,
          branches: new Set(),
          categoryBookings: 0 // Track category-specific bookings
        };
      }

      consultantStats[consultantId].totalBookings += 1;
      consultantStats[consultantId].totalRevenue += parseFloat(booking.total_price || 0);
      
      // Calculate category bookings: 1 (main person) + bilangan (additional participants)
      const totalPax = 1 + (booking.bilangan || 0);
      consultantStats[consultantId].categoryBookings += totalPax;

      if (booking.branch_id && branchLookup[booking.branch_id]) {
        consultantStats[consultantId].branches.add(branchLookup[booking.branch_id]);
      }

      const bookingDate = new Date(booking.created_at);
      if (bookingDate >= thirtyDaysAgo) {
        consultantStats[consultantId].recentBookings += 1;
        consultantStats[consultantId].recentRevenue += parseFloat(booking.total_price || 0);
      }
    });

    console.log('getTopSalesConsultantsByCategory: Consultant stats calculated:', Object.keys(consultantStats).length);

    // Convert to array and sort by category bookings (total participants)
    const topConsultants = Object.values(consultantStats)
      .sort((a, b) => b.categoryBookings - a.categoryBookings)
      .slice(0, limit)
      .map(consultant => ({
        ...consultant,
        branches: Array.from(consultant.branches).join(', '),
        totalBookings: consultant.totalBookings, // Keep for reference
        totalRevenue: Math.round(consultant.totalRevenue), // Round to nearest integer
        recentRevenue: Math.round(consultant.recentRevenue) // Round to nearest integer
      }));

    console.log('getTopSalesConsultantsByCategory: Final result for category', category, ':', topConsultants);
    return topConsultants;

  } catch (error) {
    console.error('getTopSalesConsultantsByCategory: Error:', error);
    throw error;
  }
};

// ===== DASHBOARD STATISTICS FOR ALL DATA (NO FILTER) =====
export const getDashboardStatsAll = async () => {
  try {
    // Get total leads from all branches
    const { count: totalLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    // Get total bookings count from all branches
    const { count: totalBookingsCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })

    // Get total participants from members_booking table only
    // This counts all participants including the main booking person
    const { count: totalBookings, error: membersError } = await supabase
      .from('members_booking')
      .select('*', { count: 'exact', head: true })

    if (membersError) {
      console.error('Error fetching members_booking count:', membersError)
      throw membersError
    }

    // Get recent leads (last 30 days) from all branches
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { count: recentLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString())

    // Get recent bookings (last 30 days) from members_booking table
    const { count: recentBookings } = await supabase
      .from('members_booking')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString())

    // Get total Umrah participants from all branches
    // Umrah bookings have package_id = 'Umrah'
    // Calculate: 1 (main person) + bilangan (additional participants)
    const { data: umrahBookings, error: umrahError } = await supabase
      .from('bookings')
      .select(`
        bilangan,
        package_types!inner(name)
      `)
      .eq('package_types.name', 'Umrah')

    if (umrahError) {
      console.error('Error fetching Umrah bookings:', umrahError)
      throw umrahError
    }

    const totalUmrahBookings = umrahBookings ? umrahBookings.reduce((total, booking) => {
      return total + 1 + (booking.bilangan || 0) // 1 for main person + bilangan
    }, 0) : 0

    // Get total Outbound participants from all branches
    // Outbound bookings have package_id = 'Pelancongan'
    // Calculate: 1 (main person) + bilangan (additional participants)
    const { data: outboundBookings, error: outboundError } = await supabase
      .from('bookings')
      .select(`
        bilangan,
        package_types!inner(name)
      `)
      .eq('package_types.name', 'Pelancongan')

    if (outboundError) {
      console.error('Error fetching Outbound bookings:', outboundError)
      throw outboundError
    }

    const totalOutboundBookings = outboundBookings ? outboundBookings.reduce((total, booking) => {
      return total + 1 + (booking.bilangan || 0) // 1 for main person + bilangan
    }, 0) : 0

    return {
      totalLeads: totalLeads || 0,
      totalBookings: totalBookings || 0,
      recentLeads: recentLeads || 0,
      recentBookings: recentBookings || 0,
      totalUmrahBookings: totalUmrahBookings || 0,
      totalOutboundBookings: totalOutboundBookings || 0
    }
  } catch (error) {
    console.error('Error in getDashboardStatsAll:', error)
    throw error
  }
}
