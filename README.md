# 📱 erida – Mobile App for Research Management

#####(Kiken-Batara)

**Erida** is a mobile application developed with React Native.  
It is designed for managing data and submitting research proposals at the **Regional Research and Innovation Agency of South Konawe Regency** _(Badan Riset dan Inovasi Daerah Kabupaten Konawe Selatan)_.

This is the **mobile version**, built with React Native, and may be part of a larger ecosystem that includes web or server components.

---

## 🧪 Testing Environment

- **Node.js version**: `20.10.0`
- **React Native version**: `0.80.1`
- **React version**: `19.0.0`
- **Java version**: `17.0.10`

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

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
     options={{ title: 'New Screen Title' }}
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

## UI/UX Design

The UI/UX design for this project is available in Figma.  
[View UI/UX Design in Figma](https://www.figma.com/design/iUUV9TJsY62VUxx89l0OSk/e-Rida?node-id=0-1&p=f&t=tF85uKzyzlCEzvma-0)

### If you use zulu

```sh
jenv local zulu64-17.0.10
```

### Troubleshooting: Device Connection Error

If you encounter an error message like:

> "the devices must either be USB connected..."

Then, at the root of your project, try running the following commands:

```bash
adb kill-server
adb start-server
```
