import React, { useCallback, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Switch, ScrollView, Linking, Modal } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { AuthContext } from '../../context/AuthContext';
import Imagex from "../../components/Imagex.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Setting = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore(state => state.visibleBar);
    const { logout, user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);


    // State untuk pengaturan
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const [showAboutModal, setShowAboutModal] = useState(false);


    useFocusEffect(
        useCallback(() => {
            visibleBar(true, true);
        }, [visibleBar])
    );

    const loadUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('userProfile');
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                console.log('[SETTING] USER FROM STORAGE:', parsed);
                setProfile(parsed);
            }
        } catch (err) {
            console.log('Load user error:', err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            visibleBar(true, true);
            loadUser();
        }, [visibleBar])
    );
    

    const handleLogout = () => {
        Alert.alert(
            "Konfirmasi Logout",
            "Apakah Anda yakin ingin keluar dari aplikasi?",
            [
                {
                    text: "Batal",
                    style: "cancel"
                },
                {
                    text: "Ya, Keluar",
                    onPress: async () => {
                        await logout();
                        Alert.alert("Logout Berhasil", "Anda telah keluar dari aplikasi.");
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const handlePrivacyPolicy = () => {
        Linking.openURL('https://www.privacypolicies.com/live/34b08a48-67cd-491e-a126-0ab862b55cc2');
    };

    const openWebsite = (url) => {
        Linking.openURL(url).catch(() => {
            Alert.alert("Gagal Membuka Link", "Tidak dapat membuka website.");
        });
    };
    

    const SettingItem = ({ icon, title, subtitle, onPress, showArrow = true, showSwitch = false, switchValue, onSwitchChange }) => (
        <TouchableOpacity 
            style={styles.settingItem} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.settingItemLeft}>
                <View style={styles.settingIconContainer}>
                    <Image source={icon} style={styles.settingIcon} />
                </View>
                <View style={styles.settingTextContainer}>
                    <Text style={styles.settingItemTitle}>{title}</Text>
                    {subtitle && <Text style={styles.settingItemSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            <View style={styles.settingItemRight}>
                {showSwitch && (
                    <Switch
                        value={switchValue}
                        onValueChange={onSwitchChange}
                        trackColor={{ false: "#767577", true: "#EFD06D" }}
                        thumbColor={switchValue ? "#DB6358" : "#f4f3f4"}
                    />
                )}
                {showArrow && !showSwitch && (
                    // <Image source={require('../../../pages/assets/images/icon/arrow_right.png')} style={styles.arrowIcon} />
                    <Image source={require('../../pages/assets/images/icon/back.png')} style={styles.arrowIcon} />
                )}
            </View>
        </TouchableOpacity>
    );

    const SectionHeader = ({ title }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>PENGATURAN</Text>
                <Text style={styles.headerSubtitle}>Kelola preferensi aplikasi Anda</Text>
            </View>

            <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    showsVerticalScrollIndicator={false}
                >
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileCardLeft}>
                        <View style={styles.avatarContainer}>
                        <Image
                                source={require('../../pages/assets/images/user3d.png')}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>
                                {profile?.profile?.nama || profile?.username || 'Pengguna'}
                            </Text>

                            <Text style={styles.profileEmail}>
                                {profile?.profile?.email || '-'}
                            </Text>

                            <Text style={styles.profileRole}>
                                {profile?.profile?.id_pengguna || 'User'}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.editProfileBtn}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <Text style={styles.editProfileBtnText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {/* Main Settings
                <SectionHeader title="AKUN" />
                <View style={styles.card}>
                    <SettingItem 
                        icon={require('../../pages/assets/images/icon/user.png')}
                        title="Edit Profil"
                        subtitle="Ubah data diri Anda"
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                    <View style={styles.divider} />
                    <SettingItem 
                        // icon={require('../../pages/assets/images/icon/lock.png')}
                        icon={require('../../pages/assets/images/icon/time.png')}
                        title="Ubah Password"
                        subtitle="Amankan akun Anda"
                        onPress={() => navigation.navigate('ChangePassword')}
                    />
                </View>

                <SectionHeader title="PREFERENSI" />
                <View style={styles.card}>
                    <SettingItem 
                        icon={require('../../pages/assets/images/icon/file.png')}
                        title="Notifikasi"
                        subtitle="Terima update terbaru"
                        showSwitch={true}
                        switchValue={notifications}
                        onSwitchChange={setNotifications}
                    />
                    <View style={styles.divider} />
                    <SettingItem 
                        icon={require('../../pages/assets/images/icon/file.png')}
                        title="Mode Gelap"
                        subtitle="Tampilan hemat mata"
                        showSwitch={true}
                        switchValue={darkMode}
                        onSwitchChange={setDarkMode}
                    />
                    <View style={styles.divider} />
                    <SettingItem 
                        icon={require('../../pages/assets/images/icon/file.png')}
                        title="Bahasa"
                        subtitle="Indonesia"
                        onPress={() => navigation.navigate('Language')}
                    />
                </View> */}

                <SectionHeader title="BANTUAN & TENTANG" />
                <View style={styles.card}>
                    {/* <SettingItem 
                        icon={require('../../pages/assets/images/icon/file.png')}
                        title="FAQ"
                        subtitle="Pertanyaan yang sering diajukan"
                        onPress={() => navigation.navigate('FAQ')}
                    /> */}
                    <View style={styles.divider} />
                    <SettingItem 
                        icon={require('../../pages/assets/images/icon/privacy.png')}
                        title="Privasi & Kebijakan"
                        subtitle="Baca kebijakan privasi"
                        onPress={handlePrivacyPolicy}
                    />
                    <View style={styles.divider} />
                    <SettingItem 
                        icon={require('../../pages/assets/images/icon/info.png')}
                        title="Tentang Aplikasi"
                        subtitle="Versi 1.0.0"
                        onPress={() => setShowAboutModal(true)}
                    />

                    {/* <View style={styles.divider} />
                    <SettingItem 
                        icon={require('../../pages/assets/images/icon/call.png')}
                        title="Hubungi Kami"
                        subtitle="Kirim feedback atau keluhan"
                        onPress={() => navigation.navigate('Contact')}
                    /> */}
                </View>

                {/* Logout Button */}
                <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.8}
                >
                    <Image 
                        source={require('../../pages/assets/images/icon/logout.png')}
                        style={styles.logoutIcon}
                    />
                    <Text style={styles.logoutText}>KELUAR</Text>
                </TouchableOpacity>

                {/* Version Info */}
                <Text style={styles.versionText}>E-RIDA Mobile v1.0.0</Text>
                <Text style={styles.copyrightText}>© BRIDA Konawe Selatan</Text>

                <View style={styles.bottomSpacer} />
            </ScrollView>


            <Modal
                    visible={showAboutModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowAboutModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Tentang Aplikasi</Text>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.modalText}>
                                    Aplikasi Elektronik Riset dan Inovasi Daerah Kabupaten Konawe Selatan (E-RIDA)
                                    merupakan aplikasi yang memberikan Layanan Riset Inovasi dan Manajemen Informasi
                                    (LARIS MANIS) serta sebagai media transfer data penelitian dan inovasi daerah
                                    yang dikembangkan oleh Badan Riset dan Inovasi Daerah Kabupaten Konawe Selatan.
                                </Text>

                                {/* Link Website */}
                                <View style={{ marginTop: 16 }}>
                                    <TouchableOpacity
                                        style={styles.linkButton}
                                        onPress={() => openWebsite('https://brida.konaweselatankab.go.id')}
                                    >
                                        <Text style={styles.linkText}>🌐 Website Resmi BRIDA</Text>
                                        <Text style={styles.linkUrl}>https://brida.konaweselatankab.go.id</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.linkButton, { marginTop: 12 }]}
                                        onPress={() => openWebsite('https://e-rida.konaweselatankab.go.id')}
                                    >
                                        <Text style={styles.linkText}>🌐 Website Resmi E-RIDA</Text>
                                        <Text style={styles.linkUrl}>https://e-rida.konaweselatankab.go.id</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>


                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => setShowAboutModal(false)}
                            >
                                <Text style={styles.modalCloseText}>TUTUP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8E8E8',
    },
    headerContainer: {
        backgroundColor: '#DB6358',
        paddingTop: 20,
        paddingBottom: 25,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
    },
    headerSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        marginTop: 5,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    profileCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#EFD06D',
        padding: 3,
        marginRight: 12,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 27,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    profileEmail: {
        fontSize: 12,
        color: '#717171',
        marginTop: 2,
    },
    profileRole: {
        fontSize: 11,
        color: '#EFD06D',
        fontWeight: '600',
        marginTop: 2,
    },
    editProfileBtn: {
        backgroundColor: '#EFD06D',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    editProfileBtnText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#717171',
        marginTop: 15,
        marginBottom: 8,
        marginLeft: 4,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    settingTextContainer: {
        flex: 1,
    },
    settingItemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    settingItemSubtitle: {
        fontSize: 11,
        color: '#8E8E8E',
        marginTop: 2,
    },
    settingItemRight: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        tintColor: '#8E8E8E',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginLeft: 68,
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#FF6B6B',
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    logoutIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#FF6B6B',
        marginRight: 10,
    },
    logoutText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    versionText: {
        fontSize: 11,
        color: '#8E8E8E',
        textAlign: 'center',
        marginTop: 20,
    },
    copyrightText: {
        fontSize: 10,
        color: '#BDBDBD',
        textAlign: 'center',
        marginTop: 4,
    },
    bottomSpacer: {
        height: 30,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 13,
        color: '#555',
        lineHeight: 20,
        textAlign: 'justify',
    },
    modalCloseButton: {
        marginTop: 20,
        backgroundColor: '#DB6358',
        paddingVertical: 10,
        borderRadius: 10,
    },
    modalCloseText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    linkButton: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    linkText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
    },
    linkUrl: {
        fontSize: 11,
        color: '#DB6358',
        marginTop: 4,
    },
    
    
});

export default Setting;