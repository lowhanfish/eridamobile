import ReactNativeBlobUtil from 'react-native-blob-util';

const RNFS = {
  DocumentDirectoryPath: ReactNativeBlobUtil.fs.dirs.DocumentDir,
  CacheDirectoryPath: ReactNativeBlobUtil.fs.dirs.CacheDir,
  CachesDirectoryPath: ReactNativeBlobUtil.fs.dirs.CacheDir, // Tambahkan ini (dengan 's') karena kodenya memanggil Caches...
  DownloadDirectoryPath: ReactNativeBlobUtil.fs.dirs.DownloadDir,
  MainBundlePath: ReactNativeBlobUtil.fs.dirs.MainBundleDir,
  TemporaryDirectoryPath: ReactNativeBlobUtil.fs.dirs.CacheDir,

  mkdir: (path) => ReactNativeBlobUtil.fs.mkdir(path),
  exists: (path) => ReactNativeBlobUtil.fs.exists(path),
  
  // Perbaikan readFile agar support content:// secara otomatis
  readFile: (path, encoding) => ReactNativeBlobUtil.fs.readFile(path, encoding || 'utf8'),
  writeFile: (path, data, encoding) => ReactNativeBlobUtil.fs.writeFile(path, data, encoding || 'utf8'),
  
  unlink: (path) => ReactNativeBlobUtil.fs.unlink(path),
  
  // FUNGSI KRUSIAL: Memperbaiki copyFile untuk Android Content URI
  copyFile: async (src, dest) => {
    try {
      if (src.startsWith('content://')) {
        // Jika dari picker, baca datanya dulu baru tulis ke tujuan
        const data = await ReactNativeBlobUtil.fs.readFile(src, 'base64');
        return await ReactNativeBlobUtil.fs.writeFile(dest, data, 'base64');
      }
      // Jika file biasa, gunakan copy standar
      return await ReactNativeBlobUtil.fs.cp(src, dest);
    } catch (err) {
      console.error("Bridge Copy Error:", err);
      throw err;
    }
  },

  moveFile: (src, dest) => ReactNativeBlobUtil.fs.mv(src, dest),
  readDir: (path) => ReactNativeBlobUtil.fs.ls(path),
};

export default RNFS;
module.exports = RNFS;