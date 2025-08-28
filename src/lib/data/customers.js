import { supabase } from '$lib/supabase.js';

// Data sample pelanggan untuk Rayhar Admin Dashboard
export const customersData = [
  {
    id: 1,
    name: 'Ahmad Zulkarnain bin Razak',
    email: 'ahmad.zulkarnain@contoh.my',
    phone: '+60123456789',
    branch: 'Kuala Lumpur',
    package: 'Umrah',
    category: 'Umrah Premium 14 Hari (Makkah - Madinah)',
    status: 'Confirmed',
    price: 'RM 8,500.00',
    date: '20 Ogos 2025',
    avatar: 'AZ'
  },
  {
    id: 2,
    name: 'Siti Nur Aminah binti Salleh',
    email: 'siti.nur.aminah@contoh.my',
    phone: '+60198765432',
    branch: 'Johor Bahru',
    package: 'Pelancongan',
    category: 'Turkey Explorer 7 Hari (Istanbul - Cappadocia)',
    status: 'Pending',
    price: 'RM 4,200.00',
    date: '19 Ogos 2025',
    avatar: 'SA'
  },
  {
    id: 3,
    name: 'Muhammad Aiman bin Ali',
    email: 'muhammad.aiman@contoh.my',
    phone: '+60187654321',
    branch: 'Penang',
    package: 'Umrah',
    category: 'Umrah Ekonomi 10 Hari (Makkah - Madinah)',
    status: 'Confirmed',
    price: 'RM 6,800.00',
    date: '18 Ogos 2025',
    avatar: 'MA'
  },
  {
    id: 4,
    name: 'Fatimah Zahra binti Ismail',
    email: 'fatimah.zahra@contoh.my',
    phone: '+60176543210',
    branch: 'Kuala Lumpur',
    package: 'Pelancongan',
    category: 'UAE Luxury 5 Hari (Dubai - Abu Dhabi)',
    status: 'Cancelled',
    price: 'RM 3,500.00',
    date: '17 Ogos 2025',
    avatar: 'FZ'
  },
  {
    id: 5,
    name: 'Hasan bin Ibrahim',
    email: 'hasan.ibrahim@contoh.my',
    phone: '+60165432109',
    branch: 'Kota Kinabalu',
    package: 'Umrah',
    category: 'Umrah Plus 12 Hari (Makkah - Madinah)',
    status: 'Pending',
    price: 'RM 7,200.00',
    date: '16 Ogos 2025',
    avatar: 'HI'
  },
  {
    id: 6,
    name: 'Nurul Ain binti Mohd',
    email: 'nurul.ain@contoh.my',
    phone: '+60154321098',
    branch: 'Shah Alam',
    package: 'Pelancongan',
    category: 'Japan Cherry Blossom 8 Hari (Tokyo - Kyoto)',
    status: 'Confirmed',
    price: 'RM 5,800.00',
    date: '15 Ogos 2025',
    avatar: 'NA'
  },
  {
    id: 7,
    name: 'Khairul Anwar bin Ahmad',
    email: 'khairul.anwar@contoh.my',
    phone: '+60143210987',
    branch: 'Melaka',
    package: 'Umrah',
    category: 'Umrah Standard 9 Hari (Makkah - Madinah)',
    status: 'Confirmed',
    price: 'RM 5,500.00',
    date: '14 Ogos 2025',
    avatar: 'KA'
  },
  {
    id: 8,
    name: 'Aisyah binti Kamal',
    email: 'aisyah.kamal@contoh.my',
    phone: '+60132109876',
    branch: 'Ipoh',
    package: 'Pelancongan',
    category: 'Singapore-Malaysia 4 Hari (Singapore - KL)',
    status: 'Pending',
    price: 'RM 2,800.00',
    date: '13 Ogos 2025',
    avatar: 'AK'
  }
];

// Fungsi helper untuk mendapatkan inisial nama
export function getInitials(name) {
  if (!name) return 'NA';
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
}

// Fungsi untuk mendapatkan warna status
export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
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
    if (filters.status && customer.status !== filters.status) return false;
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
        status,
        jenis_pelancongan,
        created_at,
        branches(name),
        destinations(name),
        package_types(name),
        sales_consultant(name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching customers:', error);
      return [];
    }

    // Transform data untuk kompatibilitas dengan komponen yang ada
    return data.map(booking => ({
      id: booking.id,
      name: `${booking.gelaran} ${booking.nama}`,
      email: booking.email,
      phone: booking.telefon,
      branch: booking.branches?.name || '-',
      package: booking.package_types?.name || booking.jenis_pelancongan || '-',
      category: booking.destinations?.name || '-',
      status: booking.status || 'pending',
      price: booking.bilangan ? `${booking.bilangan} pax` : '-',
      date: new Date(booking.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      avatar: getInitials(booking.nama),
      consultant: booking.sales_consultant?.name || '-',
      address: `${booking.alamat}, ${booking.poskod} ${booking.bandar}, ${booking.negeri}`,
      nokp: booking.nokp,
      jenis_pelancongan: booking.jenis_pelancongan
    }));
  } catch (error) {
    console.error('Error in fetchCustomersData:', error);
    return [];
  }
}
