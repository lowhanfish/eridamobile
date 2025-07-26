/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext } from 'react';
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import MainPage from "./pages/MainPage";

const Stack = createNativeStackNavigator();


import { AuthContext, AuthProvider } from './context/AuthContext';




function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}


function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* MainPage akan menjadi layar utama setelah login */}
      <Stack.Screen name="MainPage" component={MainPage} />
      {/* Tambahkan layar lain yang hanya bisa diakses setelah login */}
      {/* <Stack.Screen name="Home" component={Home} /> */}
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
    </Stack.Navigator>
  );
}




export default function App() {
  return (
    // Wrap seluruh aplikasi dengan AuthProvider
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// Komponen terpisah untuk menangani logika navigasi berdasarkan status otentikasi
function AppContent() {
  const { userToken, isLoading } = useContext(AuthContext); // Ambil userToken dan isLoading dari context

  if (isLoading) {
    // Tampilkan loading screen saat memeriksa token di AsyncStorage
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Jika userToken ada, tampilkan AppStack (halaman terproteksi) */}
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Gaya Anda di sini
});




// function RootStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="MainPage" component={MainPage} />
//       <Stack.Screen name="Register" component={Register} />
//     </Stack.Navigator>
//   );
// }


// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootStack />
//     </NavigationContainer>
//   );
// }

