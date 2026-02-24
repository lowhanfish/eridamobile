// pages/Auth/Register.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';

import Joi from 'joi';
import { useNavigation } from "@react-navigation/native";

import { stylex } from "../../pages/assets/css/index.js";
import axios from "axios";
import useGlobalStore from "../../stores/useGlobalStore";


const registerSchema = Joi.object({
    nama: Joi.string()
        .required()
        .messages({
            'string.empty': `Nama tidak boleh kosong.`,
            'any.required': `Nama wajib diisi.`
        }),
    nomorHP: Joi.string()
        .required()
        .messages({
            'string.empty': `Nomor HP tidak boleh kosong.`,
            'any.required': `Nomor HP wajib diisi.`
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': `Email tidak boleh kosong.`,
            'string.email': `Format email tidak valid.`,
            'any.required': `Email wajib diisi.`
        }),
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
        .max(12)
        .required()
        .messages({
            'string.empty': `Password tidak boleh kosong.`,
            'string.min': `Password minimal {#limit} karakter.`,
            'string.max': `Password maksimal {#limit} karakter.`,
            'any.required': `Password wajib diisi.`
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'string.empty': `Konfirmasi password tidak boleh kosong.`,
            'any.only': `Password tidak cocok.`,
            'any.required': `Konfirmasi password wajib diisi.`
        }),
});

// create a component
const Register = () => {
    const navigation = useNavigation();

    const [nama, setNama] = useState('');
    const [nomorHP, setNomorHP] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const statex = useGlobalStore(state => state.url);

    const RequestRegister = async (payload) => {
        try {
            const url = statex.URL_APP + "auth/regis";
            console.log("[REGISTER] Request payload:", payload);
            console.log("[REGISTER] Endpoint:", url);
            const response = await axios.post(url, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            // backend pakai message
            const msg =
                error.response?.data?.message ||
                error.response?.data ||
                "Registrasi gagal. Silakan coba lagi.";
            throw new Error(msg);
        }
    };
    


    const handleRegister = async () => {
        setErrors("");
        console.log("[REGISTER] Mulai proses registrasi");
    
        // 1. Validasi Joi
        const { error } = registerSchema.validate(
            { nama, nomorHP, email, username, password, confirmPassword },
            { abortEarly: false }
        );
    
        if (error) {
            let joiErrorMessage = "";
            error.details.forEach(detail => {
                joiErrorMessage += `${detail.message}\n`;
            });
            setErrors(joiErrorMessage.trim());
            return;
        }
    
        setLoading(true);
    
        try {
            // 2. Payload sesuai backend
            const payload = {
                username: username.trim(),
                password: password,
                nama: nama.trim(),
                hp: nomorHP.trim(),
                email: email.trim(),
            };
    
            const result = await RequestRegister(payload);

            console.log("[REGISTER] Registrasi sukses:", result);

    
            Alert.alert(
                "Registrasi Berhasil",
                "Akun Anda berhasil dibuat. Silakan login."
            );
    
            navigation.navigate("Login");
        } catch (err) {
            setErrors(err.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <View style={stylex.container}>
            <ScrollView
                    style={stylex.scrollPage}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    showsVerticalScrollIndicator={false}
                >
                <Image
                    source={require('../../pages/assets/images/logo1.png')}
                    style={[stylex.imageLogo, { width: 200, marginTop: 10 }]}
                />

                <View style={{ marginTop: 10, marginBottom: 20 }}>
                    <Text style={[stylex.inputText, { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#5F5F5F' }]}>
                        Buat Akun Baru
                    </Text>
                </View>

                {errors ? (
                    <View style={stylex.ErrorAlert}>
                        <Text style={stylex.ErrorAlertText}>{errors}</Text>
                    </View>
                ) : null}

                <View>
                    {/* Nama */}
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>Nama Lengkap</Text>
                        <TextInput
                            onFocus={() => setErrors("")}
                            value={nama}
                            onChangeText={setNama}
                            style={stylex.inputx}
                            placeholder="Masukkan nama lengkap Anda"
                            placeholderTextColor="#C4C4C4"
                        />
                    </View>

                    {/* Nomor HP */}
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>Nomor HP</Text>
                        <TextInput
                            onFocus={() => setErrors("")}
                            value={nomorHP}
                            onChangeText={setNomorHP}
                            style={stylex.inputx}
                            placeholder="Masukkan nomor HP Anda"
                            placeholderTextColor="#C4C4C4"
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Email */}
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>Email</Text>
                        <TextInput
                            onFocus={() => setErrors("")}
                            value={email}
                            onChangeText={setEmail}
                            style={stylex.inputx}
                            placeholder="Masukkan email Anda"
                            placeholderTextColor="#C4C4C4"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Username */}
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>Username</Text>
                        <TextInput
                            onFocus={() => setErrors("")}
                            value={username}
                            onChangeText={setUsername}
                            style={stylex.inputx}
                            placeholder="Minimal 6, maksimal 12 karakter"
                            placeholderTextColor="#C4C4C4"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password */}
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>Password</Text>
                        <TextInput
                            onFocus={() => setErrors("")}
                            value={password}
                            onChangeText={setPassword}
                            style={[stylex.inputx, { paddingRight: 45 }]}
                            placeholder="Minimal 6, maksimal 12 karakter"
                            placeholderTextColor="#C4C4C4"
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            disabled={loading}
                            onPress={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: 14,
                                top: '80%',
                                transform: [{ translateY: -12 }],
                            }}
                        >
                            <Image
                                source={
                                    showPassword
                                        ? require('../../pages/assets/images/icon/eye-off.png')
                                        : require('../../pages/assets/images/icon/eye.png')
                                }
                                style={{ width: 22, height: 22, opacity: 0.6 }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Confirm Password */}
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>Konfirmasi Password</Text>
                        <TextInput
                            onFocus={() => setErrors("")}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={[stylex.inputx, { paddingRight: 45 }]}
                            placeholder="Masukkan kembali password Anda"
                            placeholderTextColor="#C4C4C4"
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity
                            disabled={loading}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                                position: 'absolute',
                                right: 14,
                                top: '80%',
                                transform: [{ translateY: -12 }],
                            }}
                        >
                            <Image
                                source={
                                    showConfirmPassword
                                        ? require('../../pages/assets/images/icon/eye-off.png')
                                        : require('../../pages/assets/images/icon/eye.png')
                                }
                                style={{ width: 22, height: 22, opacity: 0.6 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    {/* Button Register */}
                    <TouchableOpacity
                        onPress={handleRegister}
                        disabled={loading}
                        style={[
                            stylex.btnRegisx,
                            stylex.margintop22,
                            loading && { opacity: 0.7 }
                        ]}
                    >
                        {loading ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[stylex.btnText, { marginRight: 8 }]}>
                                    Memproses...
                                </Text>
                                <Image
                                    source={require('../../pages/assets/images/loading2.gif')}
                                    style={{ width: 22, height: 22 }}
                                />
                            </View>
                        ) : (
                            <Text style={[stylex.btnText, stylex.shaddowText]}>DAFTAR</Text>
                        )}
                    </TouchableOpacity>

                    {/* Link ke Login */}
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={[stylex.btnTextAccount, stylex.margintop10, { textAlign: 'center' }]}>
                            Sudah punya akun? Login di sini
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Version Info */}
                <View style={{ marginTop: 25 }}>
                    <Text style={{ fontSize: 11, color: '#8E8E8E', textAlign: 'center' }}>
                        E-RIDA Mobile v1.0.3
                    </Text>
                    <Text style={{ fontSize: 10, color: '#BDBDBD', marginTop: 4, textAlign: 'center' }}>
                        © BRIDA Konawe Selatan
                    </Text>
                </View>


            </ScrollView>
        </View>
    );
};

export default Register;

