# Fitur Login dengan Role-Based Access Control

## Overview
Fitur login ini telah diimplementasikan dengan sistem role-based access control yang membedakan akses antara `super_admin` dan `admin_branch`.

## Fitur Utama

### 1. Role-Based Authentication
- **Super Admin**: Akses penuh ke Dashboard Utama dengan semua fitur
- **Admin Branch**: Akses terbatas ke Dashboard Branch

### 2. Auto-Redirect
- Setelah login berhasil, user akan otomatis diarahkan ke dashboard yang sesuai dengan rolenya
- Super Admin → Dashboard Utama (`/`)
- Admin Branch → Dashboard Branch (`/DashboardBranch`)

### 3. Route Protection
- Dashboard Utama hanya bisa diakses oleh Super Admin
- Dashboard Branch hanya bisa diakses oleh Admin Branch
- Halaman login dilindungi dari akses user yang sudah login

## Struktur File

### Stores
- `src/lib/stores/auth.js` - Store utama untuk authentication dan role management

### Components
- `src/lib/components/RoleGuard.svelte` - Komponen untuk melindungi route berdasarkan role
- `src/routes/login/+page.svelte` - Halaman login dengan validasi role

### Routes
- `src/routes/+page.svelte` - Dashboard Utama (Super Admin only)
- `src/routes/DashboardBranch/+page.svelte` - Dashboard Branch (Admin Branch only)

## Cara Penggunaan

### 1. Login
1. Buka halaman `/login`
2. Masukkan email dan password
3. Sistem akan otomatis mengarahkan ke dashboard yang sesuai

### 2. Logout
- Klik tombol logout di sidebar (Dashboard Utama)
- Klik tombol logout di header (Dashboard Branch)

### 3. Role Management
Role user disimpan di tabel `admin_role` dengan struktur:
```sql
CREATE TABLE admin_role (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  role TEXT CHECK (role IN ('super_admin', 'admin_branch')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Keamanan

### 1. Route Protection
- Setiap route dilindungi dengan `RoleGuard` component
- Redirect otomatis jika user tidak memiliki akses

### 2. Session Management
- Session dikelola oleh Supabase Auth
- Auto-logout jika session expired

### 3. Role Validation
- Role divalidasi dari database setiap kali user login
- Tidak ada hardcoded role di frontend

## Troubleshooting

### 1. User tidak bisa login
- Pastikan user ada di tabel `admin_role`
- Pastikan role sesuai dengan yang diharapkan

### 2. Redirect tidak berfungsi
- Pastikan tabel `admin_role` memiliki data yang benar
- Check console untuk error

### 3. Role tidak terdeteksi
- Pastikan user_id di tabel `admin_role` sesuai dengan auth.users.id
- Restart aplikasi jika diperlukan

## Development Notes

### 1. Menambah Role Baru
1. Update enum di database
2. Update logic di `getUserRole()` function
3. Update `RoleGuard` component

### 2. Menambah Route Baru
1. Wrap dengan `RoleGuard` component
2. Set `allowedRoles` sesuai kebutuhan

### 3. Testing
- Test login dengan Super Admin
- Test login dengan Admin Branch
- Test akses ke route yang tidak diizinkan
- Test logout functionality

## Dependencies
- `@supabase/supabase-js` - Supabase client
- `svelte` - Svelte framework
- `@sveltejs/kit` - SvelteKit framework
