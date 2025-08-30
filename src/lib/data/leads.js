// Data sample lead untuk Rayhar Admin Dashboard
export const leadsData = [
  {
    id: 1,
    name: 'Ahmad Zulkarnain bin Razak',
    email: 'ahmad.zulkarnain@contoh.my',
    phone: '+60123456789',
    address: 'No. 123, Jalan Tun Razak, 50000 Kuala Lumpur',
    branch: 'Kuala Lumpur',
    interest: 'Umrah Premium',
    date: '20 Ogos 2025',
    avatar: 'AZ',
    source: 'Website',
    budget: 'RM 8,000 - 10,000',
    timeline: 'Q1 2025',
    consultant: 'Ahmad bin Ismail',
    notes: 'Sangat tertarik dengan paket Umrah Premium, sudah siap dengan dokumen'
  },
  {
    id: 2,
    name: 'Siti Nur Aminah binti Salleh',
    email: 'siti.nur.aminah@contoh.my',
    phone: '+60198765432',
    address: 'No. 45, Taman Johor Jaya, 81100 Johor Bahru',
    branch: 'Johor Bahru',
    interest: 'Turkey Explorer',
    date: '19 Ogos 2025',
    avatar: 'SA',
    source: 'Referral',
    budget: 'RM 4,000 - 6,000',
    timeline: 'Q2 2025',
    consultant: 'Siti Aminah binti Omar',
    notes: 'Minat dengan budaya Turki, perlu follow up minggu depan'
  },
  {
    id: 3,
    name: 'Muhammad Aiman bin Ali',
    email: 'muhammad.aiman@contoh.my',
    phone: '+60187654321',
    address: 'No. 78, Taman Sri Nibong, 11900 Bayan Lepas',
    branch: 'Penang',
    interest: 'Umrah Ekonomi',
    date: '18 Ogos 2025',
    avatar: 'MA',
    source: 'Social Media',
    budget: 'RM 5,000 - 7,000',
    timeline: 'Q3 2025',
    consultant: 'Muhammad bin Hassan',
    notes: 'Masih dalam tahap pertimbangan, perlu nurturing'
  },
  {
    id: 4,
    name: 'Fatimah Zahra binti Ismail',
    email: 'fatimah.zahra@contoh.my',
    phone: '+60176543210',
    address: 'No. 12, Taman Sri Petaling, 57000 Kuala Lumpur',
    branch: 'Kuala Lumpur',
    interest: 'UAE Luxury',
    date: '17 Ogos 2025',
    avatar: 'FZ',
    source: 'Exhibition',
    budget: 'RM 3,000 - 5,000',
    timeline: 'Q4 2025',
    consultant: 'Fatimah binti Ahmad',
    notes: 'Sudah siap booking, menunggu konfirmasi pembayaran'
  },
  {
    id: 5,
    name: 'Hasan bin Ibrahim',
    email: 'hasan.ibrahim@contoh.my',
    phone: '+60165432109',
    address: 'No. 56, Taman Likas, 88400 Kota Kinabalu',
    branch: 'Kota Kinabalu',
    interest: 'Umrah Plus',
    date: '16 Ogos 2025',
    avatar: 'HI',
    source: 'Website',
    budget: 'RM 7,000 - 9,000',
    timeline: 'Q1 2025',
    consultant: 'Hasan bin Omar',
    notes: 'Sangat antusias, sudah ada pengalaman umrah sebelumnya'
  },
  {
    id: 6,
    name: 'Nurul Ain binti Mohd',
    email: 'nurul.ain@contoh.my',
    phone: '+60154321098',
    address: 'No. 89, Taman Sri Muda, 40000 Shah Alam',
    branch: 'Shah Alam',
    interest: 'Japan Cherry Blossom',
    date: '15 Ogos 2025',
    avatar: 'NA',
    source: 'Referral',
    budget: 'RM 5,000 - 8,000',
    timeline: 'Q2 2025',
    consultant: 'Nurul Ain binti Hassan',
    notes: 'Minat dengan musim sakura, perlu info lebih detail'
  },
  {
    id: 7,
    name: 'Khairul Anwar bin Ahmad',
    email: 'khairul.anwar@contoh.my',
    phone: '+60143210987',
    address: 'No. 34, Taman Malim Jaya, 75250 Melaka',
    branch: 'Melaka',
    interest: 'Umrah Standard',
    date: '14 Ogos 2025',
    avatar: 'KA',
    source: 'Social Media',
    budget: 'RM 4,000 - 6,000',
    timeline: 'Q3 2025',
    consultant: 'Khairul bin Ahmad',
    notes: 'Masih dalam tahap riset, perlu follow up berkala'
  },
  {
    id: 8,
    name: 'Aisyah binti Kamal',
    email: 'aisyah.kamal@contoh.my',
    phone: '+60132109876',
    address: 'No. 67, Taman Ipoh Jaya, 31400 Ipoh',
    branch: 'Ipoh',
    interest: 'Singapore-Malaysia',
    date: '13 Ogos 2025',
    avatar: 'AK',
    source: 'Exhibition',
    budget: 'RM 2,000 - 4,000',
    timeline: 'Q4 2025',
    consultant: 'Aisyah binti Kamal',
    notes: 'Sudah siap booking, menunggu konfirmasi jadwal'
  }
];

// Fungsi helper untuk mendapatkan inisial nama
export function getInitials(name) {
  if (!name) return 'NA';
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
}

// Fungsi untuk filter data lead
export function filterLeads(leads, filters) {
  return leads.filter(lead => {
    if (filters.branch && lead.branch !== filters.branch) return false;
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        lead.name.toLowerCase().includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm) ||
        lead.phone.includes(searchTerm)
      );
    }
    return true;
  });
}

// Fungsi untuk mengambil data lead dari Supabase (jika diperlukan)
export async function fetchLeadsData() {
  // Implementasi untuk mengambil data dari Supabase
  // Bisa ditambahkan nanti jika diperlukan
  return leadsData;
}

// Fungsi untuk mengambil data lead berdasarkan branch tertentu
export async function fetchLeadsDataByBranch(branchName) {
  // Implementasi untuk mengambil data dari Supabase berdasarkan branch
  // Bisa ditambahkan nanti jika diperlukan
  return leadsData.filter(lead => lead.branch === branchName);
}
