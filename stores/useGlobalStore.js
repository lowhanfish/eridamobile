import { create } from "zustand";


var URL = 'http://localhost:5070/';

const useGlobalStore = create((state)=>({
    name : "Ini dari store",
    topBar : true,
    bottomBar : true,
    url : {
      URL_APP : URL,
      URL_Beranda : URL + 'api/v1/server_beranda/',
      URL_VerifikasiPenelitian : URL + 'api/v1/server_verifikasi_penelitian/',
      URL_VerifikasiUsulan : URL + 'api/v1/server_verifikasi/',
      URL_VerifikasiSida : URL + 'api/v1/server_verifikasi_sida/',
      URL_Profil : URL + 'api/v1/server_profil/',
      URL_Panduan : URL + 'api/v1/server_panduan/',
      URL_Berita : URL + 'api/v1/web_berita/',
      URL_Usulan : URL + 'api/v1/server_usulan/',
      URL_Penelitian : URL + 'api/v1/server_penelitian/',
      URL_Sida : URL + 'api/v1/server_sida/',
      URL_Artikel : URL + 'api/v1/server_artikel/',
      URL_Pengguna : URL + 'api/v1/server_pengguna/',
      // URL_Kategori : URL + 'api/v1/web_publish_kategori/',
      // URL_Level : URL + 'api/v1/web_publish_kelompok/',
      URL_Tahun : URL + 'api/v1/server_tahun/',
      URL_Foto : URL + 'api/v1/server_foto/',
      URL_Video : URL + 'api/v1/server_video/',
      URL_Riset : URL + 'api/v1/server_riset/',
      URL_Perubahan : URL + 'api/v1/server_perubahan/',
      URL_Teknologi : URL + 'api/v1/server_teknologi/',
      URL_Iid : URL + 'api/v1/server_iid/',
      URL_Ipkd : URL + 'api/v1/server_ipkd/',
      URL_Idsd : URL + 'api/v1/server_idsd/',
      URL_Haki : URL + 'api/v1/server_haki/',
      URL_Ikm : URL + 'api/v1/server_ikm/',
      URL_IKMM : URL + 'api/v1/web_publish_ikm/',
      URL_Tim : URL + 'api/v1/server_tim/',
      URL_Krenova : URL + 'api/v1/server_krenova/',
      URL_Tema : URL + 'api/v1/server_tema/',
      URL_Dokumen : URL + 'api/v1/server_dokumen/',
    
    },





    visibleBar : (topVisible, bottomVisible, back) => state ({topBar:topVisible, bottomBar:bottomVisible}),
    routeBack : "Home",
    setRouteBack : (route) => state ({routeBack: route}),

}))


export default useGlobalStore
