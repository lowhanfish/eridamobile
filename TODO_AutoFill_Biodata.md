# TODO - Auto-fill Biodata User di AddUsulanPenelitian1

## Task: Auto-fill biodata user yang login di form identitas pengusul

### Langkah Implementasi:
1. ✅ Tambahkan AsyncStorage import
2. ✅ Tambahkan useEffect untuk load profile user dari AsyncStorage  
3. ✅ Auto-fill form nama, hp, email dari biodata user (read-only)
4. ✅ Tambahkan validasi required (alamat, nik, ktp file)
5. ✅ Tombol NEXT hanya aktif jika semua field required terisi
6. ✅ Perbaiki posisi tombol agar tidak melayang (statis di bawah)

### Status: COMPLETED ✅
- File dimodifikasi: `pages/Usulan/component/AddUsulanPenelitian1.jsx`

### Perubahan yang dilakukan:

#### 1. Import AsyncStorage
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
```

#### 2. State baru untuk validasi
```javascript
const [isFormValid, setIsFormValid] = useState(false);
const [loadingProfile, setLoadingProfile] = useState(true);
```

#### 3. Fungsi load user profile
- Load data dari AsyncStorage dengan key `'userProfile'`
- Auto-fill field `nama`, `hp`, dan `email` dari biodata user login

#### 4. Fungsi validasi form
- Cek apakah `nama`, `hp`, `email`, `alamat`, `nik` tidak kosong
- Cek apakah file `ktp` sudah diupload
- Tombol NEXT hanya aktif jika semua kondisi terpenuhi

#### 5. UI Changes
- **Field read-only**: `nama`, `hp`, `email` dengan background abu-abu
- **Required fields**: `alamat`, `nik`, dan `file KTP` ditandai dengan `*` (warna merah)
- **Validation status**: Menampilkan status kelengkapan data di bawah tombol
- **Disabled NEXT button**: Jika validasi belum terpenuhi, tombol NEXT menjadi abu-abu dan tidak bisa diklik
- **Pagination statis**: Tombol NEXT/PREV tidak melayang lagi, posisi tetap di bawah

### Catatan Validasi:
- Tombol NEXT akan enable ketika:
  - ✅ Data nama, hp, email terisi otomatis dari profil
  - ✅ Alamat diisi
  - ✅ NIK diisi
  - ✅ File KTP diupload

