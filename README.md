# 📱 erida – Mobile App for Research Management

#####(Kiken-Batara)

**Erida** is a mobile application developed with React Native.  
It is designed for managing data and submitting research proposals at the **Regional Research and Innovation Agency of South Konawe Regency** _(Badan Riset dan Inovasi Daerah Kabupaten Konawe Selatan)_.

This is the **mobile version**, built with React Native, and may be part of a larger ecosystem that includes web or server components.

---

## 🧪 Testing Environment

- **Node.js version**: `20.10.0`
- **React Native version**: `0.79.2`
- **React version**: `19.0.0`

---

## 🚀 Running the Application

Follow these steps to get the application running locally:

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the Metro bundler**:

   ```bash
   npm start
   ```

3. **Run the app on Android** (Make sure your emulator or physical device is connected):

   ```bash
   npm run android
   ```

4. **Run the app on iOS** (macOS only, with Xcode installed):

   ```bash
   npm run ios
   ```

---

## ➕ How to Add a New Screen with Navigation

To add a new screen to the navigation stack:

1. Open the file where you define your navigation routes (e.g., `App.tsx`).
2. Import your new screen component at the top of the file:

   ```tsx
   import NewScreen from './pages/NewScreen';
   ```

3. Add the screen to your stack navigator:

   ```tsx
   <Stack.Screen
     name="NewScreen"
     component={NewScreen}
     options={{title: 'New Screen Title'}}
   />
   ```

4. To navigate to this screen from another component:

   ```tsx
   navigation.navigate('NewScreen');
   ```

Make sure your screen component is properly exported and wrapped with necessary providers (like navigation or context).

---

## 📝 Notes

- Ensure that your development environment is configured properly with Android Studio and/or Xcode.
- You may need to configure environment variables like `JAVA_HOME`, `ANDROID_HOME`, and set up an emulator or connect a physical device.
