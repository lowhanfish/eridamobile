// pages/Profile/Profile.jsx
import React, { useCallback, useContext } from 'react'; // Tambahkan useContext
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // Tambahkan Alert
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext Anda

const Profile = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore(state => state.visibleBar);

    // Ambil fungsi logout dari AuthContext
    const { logout } = useContext(AuthContext);

    useFocusEffect(
        useCallback(() => {
            visibleBar(true, true); // Sembunyikan Top Bar & Bottom Bar
            // Jika ada logika cleanup, masukkan di return
            // return () => { /* cleanup logic */ };
        }, [visibleBar])
    );

    // Fungsi untuk menangani proses logout
    const handleLogout = () => {
        Alert.alert(
            "Konfirmasi Logout",
            "Apakah Anda yakin ingin keluar?",
            [
                {
                    text: "Batal",
                    onPress: () => console.log("Logout dibatalkan"),
                    style: "cancel"
                },
                {
                    text: "Ya",
                    onPress: async () => {
                        // Panggil fungsi logout dari AuthContext
                        await logout();
                        Alert.alert("Logout", "Anda telah berhasil keluar.");
                        // Tidak perlu navigasi manual ke 'Login', AuthContext akan menanganinya
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Navigasi ke Home (jika Home berada dalam AppStack) */}
            <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
                <Text style={{ color: 'white' }}>Ke Halaman Utama (MainPage)</Text>
            </TouchableOpacity>

            {/* Tombol Logout */}
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{ color: 'red', marginTop: 20 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Profile;