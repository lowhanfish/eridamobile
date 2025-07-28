import AsyncStorage from '@react-native-async-storage/async-storage';


const GetDataToken = async () => {

    return new Promise(async (resolve, reject) => {
        try {
          const value = await AsyncStorage.getItem('userToken'); // ganti 'token' sesuai key kamu
          // console.log(value)
          if (value !== null) {
            // console.log('Data ditemukan:', value);
            resolve(value)
          } else {
            console.log('Data tidak ditemukan');
            resolve("")
          }
        } catch (e) {
          console.error('Gagal mengambil data:', e);
          resolve("")
        }
        
    })
};


export default GetDataToken