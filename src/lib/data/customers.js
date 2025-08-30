import { supabase } from '$lib/supabase.js';

// Data sample pelanggan untuk Rayhar Admin Dashboard
export const customersData = [
  {
    id: 1,
    name: 'Ahmad Zulkarnain bin Razak',
    email: 'ahmad.zulkarnain@contoh.my',
    phone: '+60123456789',
    nokp: '850820-01-1234',
    age: 35,
    birth_date: '20 Ogos 1985',
    address: 'No. 123, Jalan Tun Razak, 50000 Kuala Lumpur',
    branch: 'Kuala Lumpur',
    package: 'Umrah',
    category: 'Umrah Premium 14 Hari (Makkah - Madinah)',
    price: 'RM 8,500.00',
    date: '20 Ogos 2025',
    avatar: 'AZ',
    consultant: 'Ahmad bin Ismail',
    jenis_pelancongan: 'Umrah Premium',
    poskod: '50000',
    negeri: 'Kuala Lumpur',
    bandar: 'Kuala Lumpur',
    from_inquiry: true
  },
  {
    id: 2,
    name: 'Siti Nur Aminah binti Salleh',
    email: 'siti.nur.aminah@contoh.my',
    phone: '+60198765432',
    nokp: '920315-02-5678',
    age: 28,
    birth_date: '15 Mac 1992',
    address: 'No. 45, Taman Johor Jaya, 81100 Johor Bahru',
    branch: 'Johor Bahru',
    package: 'Pelancongan',
    category: 'Turkey Explorer 7 Hari (Istanbul - Cappadocia)',
    price: 'RM 4,200.00',
    date: '19 Ogos 2025',
    avatar: 'SA',
    consultant: 'Siti Aminah binti Omar',
    jenis_pelancongan: 'Cultural Tour',
    poskod: '81100',
    negeri: 'Johor',
    bandar: 'Johor Bahru',
    from_inquiry: false
  },
  {
    id: 3,
    name: 'Muhammad Aiman bin Ali',
    email: 'muhammad.aiman@contoh.my',
    phone: '+60187654321',
    nokp: '880912-03-9012',
    age: 32,
    birth_date: '12 September 1988',
    address: 'No. 78, Taman Sri Nibong, 11900 Bayan Lepas',
    branch: 'Penang',
    package: 'Umrah',
    category: 'Umrah Ekonomi 10 Hari (Makkah - Madinah)',
    price: 'RM 6,800.00',
    date: '18 Ogos 2025',
    avatar: 'MA',
    consultant: 'Muhammad bin Hassan',
    jenis_pelancongan: 'Umrah Ekonomi',
    poskod: '11900',
    negeri: 'Pulau Pinang',
    bandar: 'Bayan Lepas',
    from_inquiry: true
  },
  {
    id: 4,
    name: 'Fatimah Zahra binti Ismail',
    email: 'fatimah.zahra@contoh.my',
    phone: '+60176543210',
    nokp: '940521-04-3456',
    age: 26,
    birth_date: '21 Mei 1994',
    address: 'No. 12, Taman Sri Petaling, 57000 Kuala Lumpur',
    branch: 'Kuala Lumpur',
    package: 'Pelancongan',
    category: 'UAE Luxury 5 Hari (Dubai - Abu Dhabi)',
    price: 'RM 3,500.00',
    date: '17 Ogos 2025',
    avatar: 'FZ',
    consultant: 'Fatimah binti Ahmad',
    jenis_pelancongan: 'Luxury Tour',
    poskod: '57000',
    negeri: 'Kuala Lumpur',
    bandar: 'Kuala Lumpur',
    from_inquiry: false
  },
  {
    id: 5,
    name: 'Hasan bin Ibrahim',
    email: 'hasan.ibrahim@contoh.my',
    phone: '+60165432109',
    nokp: '870630-05-7890',
    age: 33,
    birth_date: '30 Jun 1987',
    address: 'No. 56, Taman Likas, 88400 Kota Kinabalu',
    branch: 'Kota Kinabalu',
    package: 'Umrah',
    category: 'Umrah Plus 12 Hari (Makkah - Madinah)',
    price: 'RM 7,200.00',
    date: '16 Ogos 2025',
    avatar: 'HI',
    consultant: 'Hasan bin Omar',
    jenis_pelancongan: 'Umrah Plus',
    poskod: '88400',
    negeri: 'Sabah',
    bandar: 'Kota Kinabalu',
    from_inquiry: true
  },
  {
    id: 6,
    name: 'Nurul Ain binti Mohd',
    email: 'nurul.ain@contoh.my',
    phone: '+60154321098',
    nokp: '910812-06-2345',
    age: 29,
    birth_date: '12 Ogos 1991',
    address: 'No. 89, Taman Sri Muda, 40000 Shah Alam',
    branch: 'Shah Alam',
    package: 'Pelancongan',
    category: 'Japan Cherry Blossom 8 Hari (Tokyo - Kyoto)',
    price: 'RM 5,800.00',
    date: '15 Ogos 2025',
    avatar: 'NA',
    consultant: 'Nurul Ain binti Hassan',
    jenis_pelancongan: 'Cultural Tour',
    poskod: '40000',
    negeri: 'Selangor',
    bandar: 'Shah Alam',
    from_inquiry: false
  },
  {
    id: 7,
    name: 'Khairul Anwar bin Ahmad',
    email: 'khairul.anwar@contoh.my',
    phone: '+60143210987',
    nokp: '860425-07-6789',
    age: 34,
    birth_date: '25 April 1986',
    address: 'No. 34, Taman Malim Jaya, 75250 Melaka',
    branch: 'Melaka',
    package: 'Umrah',
    category: 'Umrah Standard 9 Hari (Makkah - Madinah)',
    price: 'RM 5,500.00',
    date: '14 Ogos 2025',
    avatar: 'KA',
    consultant: 'Khairul bin Ahmad',
    jenis_pelancongan: 'Umrah Standard',
    poskod: '75250',
    negeri: 'Melaka',
    bandar: 'Melaka',
    from_inquiry: true
  },
  {
    id: 8,
    name: 'Aisyah binti Kamal',
    email: 'aisyah.kamal@contoh.my',
    phone: '+60132109876',
    nokp: '930718-08-0123',
    age: 27,
    birth_date: '18 Julai 1993',
    address: 'No. 67, Taman Ipoh Jaya, 31400 Ipoh',
    branch: 'Ipoh',
    package: 'Pelancongan',
    category: 'Singapore-Malaysia 4 Hari (Singapore - KL)',
    price: 'RM 2,800.00',
    date: '13 Ogos 2025',
    avatar: 'AK',
    consultant: 'Aisyah binti Kamal',
    jenis_pelancongan: 'Regional Tour',
    poskod: '31400',
    negeri: 'Perak',
    bandar: 'Ipoh',
    from_inquiry: false
  }
];

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
        umrah_categories(name)
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
        from_inquiry
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
        from_inquiry
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
        from_inquiry: booking.from_inquiry || false,
        // Tambahkan field khusus untuk musim/destinasi
        seasonDestination: seasonDestination
      };
    });
  } catch (error) {
    console.error('Error in fetchCustomersDataByBranch:', error);
    return [];
  }
}
