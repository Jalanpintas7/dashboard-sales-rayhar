import { supabase } from '$lib/supabase.js';

// Fungsi helper untuk mendapatkan inisial nama
export function getInitials(name) {
  if (!name) return 'NA';
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
}

// Fungsi untuk mendapatkan warna package
export function getPackageColor(packageType) {
  switch (packageType?.toLowerCase()) {
    case 'umrah':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'pelancongan':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Fungsi untuk filter data
export function filterCustomers(customers, filters) {
  return customers.filter(customer => {
    if (filters.package && customer.package !== filters.package) return false;
    if (filters.branch && customer.branch !== filters.branch) return false;
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm)
      );
    }
    return true;
  });
}

// Fungsi untuk mengambil data pelanggan dari Supabase
export async function fetchCustomersData() {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        gelaran,
        nama,
        nokp,
        telefon,
        email,
        alamat,
        poskod,
        negeri,
        bandar,
        bilangan,
        jenis_pelancongan,
        age,
        birth_date,
        created_at,
        branches(name),
        destinations(name),
        package_types(name),
        sales_consultant(name),
        umrah_seasons(name),
        umrah_categories(name),
        is_from_inquiry
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching customers:', error);
      return [];
    }

    // Transform data untuk kompatibilitas dengan komponen yang ada
    return data.map(booking => {
      // Tentukan apakah ini paket Umrah atau Pelancongan
      const isUmrah = booking.package_types?.name === 'Umrah' || 
                     booking.destinations?.name?.toLowerCase().includes('makkah') ||
                     booking.destinations?.name?.toLowerCase().includes('madinah');
      
      // Tampilkan musim umrah jika paket umrah, destinasi jika paket pelancongan
      let seasonDestination = '-';
      if (isUmrah) {
        if (booking.umrah_seasons?.name) {
          seasonDestination = booking.umrah_seasons.name;
        } else if (booking.umrah_categories?.name) {
          seasonDestination = booking.umrah_categories.name;
        } else {
          seasonDestination = 'Umrah Standard';
        }
      } else {
        seasonDestination = booking.destinations?.name || '-';
      }

      // Format tanggal lahir
      let formattedBirthDate = '-';
      if (booking.birth_date) {
        formattedBirthDate = new Date(booking.birth_date).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }

      return {
        id: booking.id,
        name: `${booking.gelaran || ''} ${booking.nama}`.trim(),
        email: booking.email,
        phone: booking.telefon,
        branch: booking.branches?.name || '-',
        package: booking.package_types?.name || (isUmrah ? 'Umrah' : 'Pelancongan'),
        category: seasonDestination,
        price: booking.bilangan ? `${booking.bilangan} pax` : '-',
        date: new Date(booking.created_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        avatar: getInitials(booking.nama),
        consultant: booking.sales_consultant?.name || '-',
        address: `${booking.alamat || ''}, ${booking.poskod || ''} ${booking.bandar || ''}, ${booking.negeri || ''}`.replace(/^[, ]+|[, ]+$/g, ''),
        nokp: booking.nokp,
        jenis_pelancongan: booking.jenis_pelancongan,
        age: booking.age || '-',
        birth_date: formattedBirthDate,
        from_inquiry: booking.is_from_inquiry || false,
        // Tambahkan field khusus untuk musim/destinasi
        seasonDestination: seasonDestination
      };
    });
  } catch (error) {
    console.error('Error in fetchCustomersData:', error);
    return [];
  }
}

// Fungsi untuk mengambil data pelanggan berdasarkan branch tertentu
export async function fetchCustomersDataByBranch(branchName) {
  try {
    console.log('Fetching customers for branch:', branchName);
    
    // Coba query dengan cara yang berbeda untuk debugging
    console.log('Trying to fetch bookings with branch filter...');
    
    // Pertama, coba ambil semua data tanpa filter untuk melihat struktur
    const { data: allData, error: allError } = await supabase
      .from('bookings')
      .select(`
        id,
        gelaran,
        nama,
        nokp,
        telefon,
        email,
        alamat,
        poskod,
        negeri,
        bandar,
        bilangan,
        jenis_pelancongan,
        age,
        birth_date,
        created_at,
        branches(name),
        destinations(name),
        package_types(name),
        sales_consultant(name),
        umrah_seasons(name),
        umrah_categories(name),
        is_from_inquiry
      `)
      .limit(5);

    if (allError) {
      console.error('Error fetching all data:', allError);
      return [];
    }

    console.log('Sample of all data:', allData);
    
    // Sekarang coba dengan filter branch
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        gelaran,
        nama,
        nokp,
        telefon,
        email,
        alamat,
        poskod,
        negeri,
        bandar,
        bilangan,
        jenis_pelancongan,
        age,
        birth_date,
        created_at,
        branches(name),
        destinations(name),
        package_types(name),
        sales_consultant(name),
        umrah_seasons(name),
        umrah_categories(name),
        is_from_inquiry
      `)
      .eq('branches.name', branchName)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching customers by branch:', error);
      return [];
    }

    console.log('Raw data from Supabase:', data);
    console.log('Number of bookings found:', data?.length || 0);

    // Transform data untuk kompatibilitas dengan komponen yang ada
    return data.map(booking => {
      // Tentukan apakah ini paket Umrah atau Pelancongan
      const isUmrah = booking.package_types?.name === 'Umrah' || 
                     booking.destinations?.name?.toLowerCase().includes('makkah') ||
                     booking.destinations?.name?.toLowerCase().includes('madinah');
      
      // Tampilkan musim umrah jika paket umrah, destinasi jika paket pelancongan
      let seasonDestination = '-';
      if (isUmrah) {
        if (booking.umrah_seasons?.name) {
          seasonDestination = booking.umrah_seasons.name;
        } else if (booking.umrah_categories?.name) {
          seasonDestination = booking.umrah_categories.name;
        } else {
          seasonDestination = 'Umrah Standard';
        }
      } else {
        seasonDestination = booking.destinations?.name || '-';
      }

      // Format tanggal lahir
      let formattedBirthDate = '-';
      if (booking.birth_date) {
        formattedBirthDate = new Date(booking.birth_date).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }

      return {
        id: booking.id,
        name: `${booking.gelaran || ''} ${booking.nama}`.trim(),
        email: booking.email,
        phone: booking.telefon,
        branch: booking.branches?.name || '-',
        package: booking.package_types?.name || (isUmrah ? 'Umrah' : 'Pelancongan'),
        category: seasonDestination,
        price: booking.bilangan ? `${booking.bilangan} pax` : '-',
        date: new Date(booking.created_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        avatar: getInitials(booking.nama),
        consultant: booking.sales_consultant?.name || '-',
        address: `${booking.alamat || ''}, ${booking.poskod || ''} ${booking.bandar || ''}, ${booking.negeri || ''}`.replace(/^[, ]+|[, ]+$/g, ''),
        nokp: booking.nokp,
        jenis_pelancongan: booking.jenis_pelancongan,
        age: booking.age || '-',
        birth_date: formattedBirthDate,
        from_inquiry: booking.is_from_inquiry || false,
        // Tambahkan field khusus untuk musim/destinasi
        seasonDestination: seasonDestination
      };
    });
  } catch (error) {
    console.error('Error in fetchCustomersDataByBranch:', error);
    return [];
  }
}
