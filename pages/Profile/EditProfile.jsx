// pages/Profile/EditProfile.jsx
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../../pages/assets/css/index.js";
import axios from "axios";
import GetDataToken from "../lib/GetDataToken";
import { AuthContext } from '../../context/AuthContext';



const EditProfile = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore(state => state.visibleBar);
    const statex = useGlobalStore(state => state.url);
    const [oldUsername, setOldUsername] = useState('');
    const { logout } = useContext(AuthContext);





    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        nomorHP: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');

    const requestEditProfile = async () => {
        
        try {
            console.log('==============================');
            console.log('[EDITPROFILE] START SAVE');
            setLoading(true);
            const token = await GetDataToken();
            console.log('[EDITPROFILE] TOKEN:', token);

            const isUsernameChanged =
            formData.username.trim() !== profile.username;

            const isPasswordChanged =
                !!formData.password; // true jika diisi

            console.log('[EDITPROFILE] Username changed:', isUsernameChanged);
            console.log('[EDITPROFILE] Password changed:', isPasswordChanged);
    
            // ===============================
            // 1. UPDATE PROFIL
            // ===============================
            const payload = {
                id: profile._id,
                nama: formData.nama.trim(),
                username: formData.username.trim(),
                email: formData.email.trim(),
                hp: formData.nomorHP.trim(),
            };
            console.log('[EDITPROFILE] Payload editProfil:', payload); // 🔎 LOG
    
            await axios.post(
                statex.URL_Pengguna + "editProfil",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "kikensbatara " + token,
                    },
                }
            );
            
    
            // ===============================
            // 2. UPDATE PASSWORD (JIKA ADA)
            // ===============================
            if (formData.password) {
                await axios.post(
                    statex.URL_Pengguna + "editPass",
                    {
                        id: profile._id,
                        password: formData.password,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: "kikensbatara " + token,
                        },
                    }
                );
            }
    
            // ===============================
            // 3. UPDATE STORAGE
            // ===============================
            const updatedProfile = {
                ...profile,
                username: payload.username,
                profile: {
                    ...profile.profile,
                    nama: payload.nama,
                    email: payload.email,
                    hp: payload.hp,
                }
            };
    
            await AsyncStorage.setItem(
                'userProfile',
                JSON.stringify(updatedProfile)
            );
    
           // ===============================
            // STEP 3️⃣ AUTO LOGOUT JIKA PERLU
            // ===============================
            if (isUsernameChanged || isPasswordChanged) {
                console.log('[EDITPROFILE] AUTO LOGOUT TRIGGERED');

                await AsyncStorage.multiRemove([
                    'token',
                    'userProfile',
                ]);

                Alert.alert(
                    "Perubahan Disimpan",
                    "Username atau password berubah. Silakan login kembali.",
                    [
                        {
                            text: "OK",
                            onPress: async () => {
                                console.log('[EDITPROFILE] LOGOUT VIA AUTH CONTEXT');
                                await logout(); // 🔥 INI KUNCI UTAMANYA
                            },
                        },
                    ]
                );
                return;
                
            }

            // ===============================
            // JIKA HANYA BIODATA
            // ===============================
            Alert.alert(
                "Berhasil",
                "Profil Anda berhasil diperbarui",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );

    
        } catch (err) {
            console.log('[EDITPROFILE] Error:', err.response || err);
            Alert.alert(
                "Gagal",
                err.response?.data?.message || "Gagal memperbarui profil"
            );
        } finally {
            setLoading(false);
        }
    };
    
    

    // Load user profile from AsyncStorage
    const loadUserProfile = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('userProfile');
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                console.log('[EDITPROFILE] User from storage:', parsed);
                setProfile(parsed);
                setOldUsername(parsed.username);
                
                // Set form data
                setFormData({
                    nama: parsed.profile?.nama || '',
                    email: parsed.profile?.email || '',
                    nomorHP: parsed.profile?.hp || '',
                    username: parsed.profile?.username || parsed.username || ''
                });
            }
        } catch (err) {
            console.log('Load user error:', err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            visibleBar(true, true);
            loadUserProfile();
        }, [visibleBar])
    );

    const handleSave = () => {
        console.log('[EDITPROFILE] Klik Simpan'); // 🔎 LOG
        setErrors('');
    
        if (!formData.nama.trim()) {
            setErrors('Nama tidak boleh kosong.');
            return;
        }
        if (!formData.email.trim()) {
            setErrors('Email tidak boleh kosong.');
            return;
        }
        if (!formData.nomorHP.trim()) {
            setErrors('Nomor HP tidak boleh kosong.');
            return;
        }
        // validasi password jika diisi
        if (formData.password || formData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                setErrors("Password dan Konfirmasi Password harus sama");
                return;
            }
            if (formData.password.length < 6) {
                setErrors("Password minimal 6 karakter");
                return;
            }
        }
    
        requestEditProfile();
    };
    

    const handleCancel = () => {
        navigation.goBack();
    };

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors) setErrors('');
    };

    return (
        <View style={stylex.container}>
            <ScrollView
                style={stylex.scrollPage}
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ flex: 1, paddingBottom: 72 }}>
                    
                    {/* Page Title */}
                    <View style={stylex.pageTitleContainer}>
                        <View style={[stylex.pageTitleItemContainer, { justifyContent: 'center' }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity 
                                    onPress={handleCancel}
                                    activeOpacity={0.7}
                                    style={{ marginRight: 12 }}
                                >
                                    <Image 
                                        source={require('../../pages/assets/images/icon/prev.png')}
                                        style={{ width: 20, height: 20, tintColor: '#EFD06D' }}
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text style={stylex.textTitleList}>EDIT PROFIL</Text>
                                    <Text style={stylex.textSubTitleList2}>Perbarui data diri Anda</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Avatar Section */}
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={require('../../pages/assets/images/user3d.png')}
                                style={styles.avatar}
                            />
                        </View>
                        <Text style={styles.avatarLabel}>Foto Profil</Text>
                        <TouchableOpacity style={styles.changePhotoBtn}>
                            <Text style={styles.changePhotoBtnText}>Ganti Foto</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Error Alert */}
                    {errors ? (
                        <View style={stylex.ErrorAlert}>
                            <Text style={stylex.ErrorAlertText}>{errors}</Text>
                        </View>
                    ) : null}

                    {/* Form Section */}
                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>DATA PRIBADI</Text>

                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText}>Nama Lengkap</Text>
                            <TextInput
                                value={formData.nama}
                                onChangeText={(v) => updateField('nama', v)}
                                style={stylex.inputx}
                                placeholder="Masukkan nama lengkap"
                            />
                        </View>

                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText}>Email</Text>
                            <TextInput
                                value={formData.email}
                                onChangeText={(v) => updateField('email', v)}
                                style={stylex.inputx}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText}>Nomor HP</Text>
                            <TextInput
                                value={formData.nomorHP}
                                onChangeText={(v) => updateField('nomorHP', v)}
                                style={stylex.inputx}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    <View style={[styles.formSection, { marginTop: 20 }]}>
                        <Text style={styles.sectionTitle}>AKUN & KEAMANAN</Text>

                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText}>Username</Text>
                            <TextInput
                                value={formData.username}
                                onChangeText={(v) => updateField('username', v)}
                                style={stylex.inputx}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText}>Password Baru</Text>
                            <TextInput
                                value={formData.password}
                                onChangeText={(v) => updateField('password', v)}
                                style={stylex.inputx}
                                secureTextEntry
                                placeholder="Kosongkan jika tidak diubah"
                            />
                        </View>

                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText}>Konfirmasi Password</Text>
                            <TextInput
                                value={formData.confirmPassword}
                                onChangeText={(v) => updateField('confirmPassword', v)}
                                style={stylex.inputx}
                                secureTextEntry
                            />
                        </View>

                        {/* ⚠️ WARNING */}
                        <View style={styles.warningBox}>
                            <Text style={styles.warningText}>
                                ⚠️ Mengubah username atau password akan mengeluarkan Anda dari aplikasi dan
                                mengharuskan login ulang.
                            </Text>
                        </View>
                    </View>



                    {/* Action Buttons */}
                    <View style={styles.buttonSection}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancel}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.cancelButtonText}>Batal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.saveButtonText, { marginRight: 8 }]}>
                                        Menyimpan...
                                    </Text>
                                    <Image
                                        source={require('../../pages/assets/images/loading2.gif')}
                                        style={{ width: 18, height: 18 }}
                                    />
                                </View>
                            ) : (
                                <Text style={styles.saveButtonText}>Simpan</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Version Info */}
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 11, color: '#8E8E8E', textAlign: 'center' }}>
                            E-RIDA Mobile v1.0.0
                        </Text>
                        <Text style={{ fontSize: 10, color: '#BDBDBD', marginTop: 4, textAlign: 'center' }}>
                            © BRIDA Konawe Selatan
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarSection: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#EFD06D',
        padding: 4,
        marginBottom: 12,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 48,
    },
    avatarLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    changePhotoBtn: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    changePhotoBtnText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
    },
    formSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        marginTop: 10,
    },
    readOnlyInput: {
        backgroundColor: '#F5F5F5',
        color: '#666',
    },
    helperText: {
        fontSize: 10,
        color: '#8E8E8E',
        marginTop: 4,
        fontStyle: 'italic',
    },
    buttonSection: {
        flexDirection: 'row',
        marginTop: 24,
        justifyContent: 'space-between',
    },
    cancelButton: {
        flex: 1,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    saveButton: {
        flex: 2,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#EFD06D',
    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    
    warningBox: {
        backgroundColor: '#FFF3CD',
        borderRadius: 8,
        padding: 10,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#FFE69C',
    },
    
    warningText: {
        fontSize: 11,
        color: '#856404',
        lineHeight: 16,
    },
    
});

export default EditProfile;

