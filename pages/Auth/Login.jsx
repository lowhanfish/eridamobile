// pages/Auth/Login.js
import React, { useState, useContext } from 'react'; // Tambahkan useContext
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'; // Tambahkan Alert

import axios from "axios";
import Joi from 'joi';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native"; // Ini sebenarnya tidak perlu lagi untuk navigasi setelah login
import useGlobalStore from "../../stores/useGlobalStore.js";

import { stylex } from "../../pages/assets/css/index.js";
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext Anda


const loginSchema = Joi.object({
    username: Joi.string()
        .min(6)
        .max(12)
        .required()
        .messages({
            'string.empty': `Username tidak boleh kosong.`,
            'string.min': `Username minimal {#limit} karakter.`,
            'string.max': `Username maksimal {#limit} karakter.`,
            'any.required': `Username wajib diisi.`
        }),
    password: Joi.string()
        .min(6)
        .max(12) // Perbaikan: Batasan max 12 karakter
        .required()
        .messages({
            'string.empty': `Password tidak boleh kosong.`, // Duplikat ini dihapus
            'string.min': `Password minimal {#limit} karakter.`,
            'string.max': `Password maksimal {#limit} karakter.`, // Pesan ini sebelumnya salah
            'any.required': `Password wajib diisi.`
        }),
});


// create a component
const Login = () => {
    // var navigation = useNavigation() // TIDAK DIGUNAKAN UNTUK NAVIGASI LOGIN SUKSES
    var statex = useGlobalStore((state) => state.url)
    const { login } = useContext(AuthContext); // Dapatkan fungsi login dari AuthContext

    var [username, setUsername] = useState('monkeydluffy');
    var [password, setPassword] = useState('monkeydluffy');
    var [errors, setErrors] = useState(""); // Satu string untuk semua error Joi

    const RequestLogin = async (data) => {
        // console.log("Hy saya login");
        try {
            const url = statex.URL_APP + "auth/login"; // Pastikan URL ini benar
            const response = await axios.post(url, data);
            return response.data; // Mengembalikan data dari server, termasuk token dan profile

        } catch (error) {
            console.error("Error login API:", error.response ? error.response.data : error.message);
            // Menampilkan error dari server, biasanya di field 'message' atau 'errors'
            setErrors(error.response?.data?.message || "Terjadi kesalahan saat menghubungi server.");
            throw error // Penting untuk melempar error agar ditangkap di LoginAccount
        }
    }

    const LoginAccount = async () => {
        // Clear error sebelumnya
        setErrors("");

        // 1. Validasi input menggunakan Joi
        const { error } = loginSchema.validate({ username, password }, { abortEarly: false });
        if (error) {
            let joiErrorMessage = "";
            error.details.forEach(detail => {
                // Kumpulkan semua pesan error Joi ke dalam satu string
                joiErrorMessage += `${detail.message}\n`;
            });
            setErrors(joiErrorMessage.trim()); // Atur semua error Joi
            return; // Berhenti eksekusi jika ada error validasi
        }

        // 2. Jika validasi Joi sukses, lakukan request login ke API
        try {
            const data = { username, password };
            const result = await RequestLogin(data); // Panggil fungsi RequestLogin

            const { token, profile } = result;

            // 3. Simpan token dan profil ke AsyncStorage dan update state otentikasi via Context
            await login(token); // <--- INI PENTING! Memanggil fungsi login dari AuthContext

            // Profile juga bisa disimpan jika diperlukan
            await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
            // await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
            console.log('Token dan profil berhasil disimpan dan state otentikasi diperbarui.');

            Alert.alert("Login Berhasil", "Anda berhasil masuk!");
            // TIDAK PERLU navigation.navigate("MainPage") di sini!
            // AuthContext akan menanganinya dengan mengalihkan ke AppStack
        } catch (e) {
            // Error dari RequestLogin sudah di-setErrors di dalam RequestLogin
            // Atau jika ada error lain saat menyimpan ke AsyncStorage
            console.error('Gagal menyimpan data atau ada masalah lain setelah login API:', e);
            // Pesan error sudah di-set di catch RequestLogin, jadi tidak perlu lagi di sini unless beda jenis error
        }
    }

    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <Image
                    source={require('../../pages/assets/images/logo1.png')}
                    style={[stylex.imageLogo, { width: 272, marginTop: 137 }]}
                />

                {errors ? ( // Gunakan conditional rendering untuk error
                    <View style={stylex.ErrorAlert}>
                        <Text style={stylex.ErrorAlertText}>{errors}</Text>
                    </View>
                ) : null}

                <View>
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>username</Text>
                        <TextInput
                            onFocus={() => setErrors("")} // Bersihkan error saat input difokuskan
                            value={username}
                            onChangeText={setUsername}
                            style={stylex.inputx}
                            autoCapitalize="none" // Penting untuk username
                        />
                    </View>

                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>Password</Text>
                        <TextInput
                            onFocus={() => setErrors("")} // Bersihkan error saat input difokuskan
                            value={password}
                            onChangeText={setPassword}
                            style={stylex.inputx}
                            secureTextEntry
                        />
                    </View>
                </View>

                <View>
                    <TouchableOpacity onPress={LoginAccount} style={[stylex.btnLogin, stylex.margintop22]}>
                        <Text style={[stylex.btnText, stylex.shaddowText]}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[stylex.btnTextAccount, stylex.margintop10]}>Belum punya akun? registrasi di bawah</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylex.btnRegis, stylex.margintop10]}>
                        <Text style={[stylex.btnText, stylex.shaddowText]}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Login;