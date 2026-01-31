import React, { useState, useCallback } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Modal, Image, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../../assets/css";

const { width } = Dimensions.get('window');

const alurData = [
    {
        id: 1,
        title: 'Register Akun',
        description: 'Pertama anda harus mendaftarkan akun untuk masuk ke sistem Erida sebagai pengguna.',
        icon: require("../assets/images/icon/user.png"),
        color: '#E9BC41',
    },
    {
        id: 2,
        title: 'Input Form Usulan Penelitian',
        description: 'Kedua silakan pilih menu usulan kemudian isi dan upload data yang diperlukan.',
        icon: require("../assets/images/icon/data.png"),
        color: '#4CAF50',
    },
    {
        id: 3,
        title: 'Status Pengusulan',
        description: 'Ketiga lihat status pengajuan usulan melalui menu reporting atau email pengusul.',
        icon: require("../assets/images/icon/check.png"),
        color: '#2196F3',
    },
    {
        id: 4,
        title: 'Mengisi Survey IKM',
        description: 'Keempat jika status usulan sudah terverifikasi anda akan diminta untuk mengisi survey.',
        icon: require("../assets/images/icon/filter.png"),
        color: '#9C27B0',
    },
    {
        id: 5,
        title: 'Unduh Surat Rekomendasi',
        description: 'Kelima yaitu surat rekomendasi hanya bisa diunduh setelah pengusul mengisi survey.',
        icon: require("../assets/images/icon/file.png"),
        color: '#FF9800',
    },
    {
        id: 6,
        title: 'Unggah Laporan Akhir',
        description: 'Keenam yaitu laporan akhir perlu diunggah agar penelitian dapat dipublish pada aplikasi Erida.',
        icon: require("../assets/images/icon/documents.png"),
        color: '#F44336',
    },
];

const AlurUsulanPenelitian = ({ navigation }) => {
    const [selectedAlur, setSelectedAlur] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);

    useFocusEffect(
        useCallback(() => {
            setRouteBack("ListUsulan");
            visibleBar(true, true);
        }, [visibleBar])
    );

    const handleAlurPress = (alur) => {
        setSelectedAlur(alur);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedAlur(null);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollPage}>
                <View style={styles.content}>
                    {/* Header Section */}
                    <View style={styles.headerContainer}>
                        <View style={styles.headerIconContainer}>
                            <Image 
                                source={require("../assets/images/icon/alur.png")} 
                                style={styles.headerIcon}
                            />
                        </View>
                        <Text style={styles.headerTitle}>Alur Usulan Penelitian</Text>
                        <Text style={styles.headerSubtitle}>
                            Pahami langkah-langkah untuk mengajukan penelitian di aplikasi Erida
                        </Text>
                    </View>

                    {/* Alur List */}
                    <View style={styles.alurContainer}>
                        {alurData.map((alur, index) => (
                            <TouchableOpacity
                                key={alur.id}
                                style={styles.alurCard}
                                onPress={() => handleAlurPress(alur)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.alurLeft}>
                                    <View style={[styles.stepBadge, { backgroundColor: alur.color }]}>
                                        <Text style={styles.stepText}>{alur.id}</Text>
                                    </View>
                                    <View style={styles.lineContainer}>
                                        {index < alurData.length - 1 && (
                                            <View style={[styles.line, { backgroundColor: alur.color }]} />
                                        )}
                                    </View>
                                </View>
                                <View style={styles.alurContent}>
                                    <View style={styles.alurHeader}>
                                        <View style={[styles.iconContainer, { backgroundColor: alur.color + '20' }]}>
                                            <Image 
                                                source={alur.icon} 
                                                style={[styles.alurIcon, { tintColor: alur.color }]}
                                            />
                                        </View>
                                        <Text style={styles.alurTitle}>{alur.title}</Text>
                                    </View>
                                    <Text style={styles.alurDescription} numberOfLines={2}>
                                        {alur.description}
                                    </Text>
                                    <View style={styles.tapHint}>
                                        <Text style={styles.tapHintText}>Tap untuk detail</Text>
                                        <Image 
                                            source={require("../assets/images/icon/next.png")} 
                                            style={styles.arrowIcon}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <Image 
                            source={require("../assets/images/icon/call.png")} 
                            style={styles.infoIcon}
                        />
                        <Text style={styles.infoText}>
                            Jika mengalami kesulitan, silakan hubungi administrator
                        </Text>
                    </View>

                    {/* Bottom Spacing */}
                    <View style={styles.bottomSpacing} />
                </View>
            </ScrollView>

            {/* Detail Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <View style={[styles.modalIconContainer, { backgroundColor: selectedAlur?.color + '20' }]}>
                                <Image 
                                    source={selectedAlur?.icon} 
                                    style={[styles.modalIcon, { tintColor: selectedAlur?.color }]}
                                />
                            </View>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.modalBody}>
                            <View style={[styles.stepBadgeLarge, { backgroundColor: selectedAlur?.color }]}>
                                <Text style={styles.stepTextLarge}>{selectedAlur?.id}</Text>
                            </View>
                            <Text style={styles.modalTitle}>{selectedAlur?.title}</Text>
                            <View style={styles.modalDivider} />
                            <Text style={styles.modalDescription}>{selectedAlur?.description}</Text>
                        </View>

                        <TouchableOpacity style={[styles.modalButton, { backgroundColor: selectedAlur?.color }]} onPress={closeModal}>
                            <Text style={styles.modalButtonText}>Tutup</Text>
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
        backgroundColor: '#F5F5F5',
    },
    scrollPage: {
        flex: 1,
        width: '100%',
    },
    content: {
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    headerIconContainer: {
        width: 160,
        height: 160,
        borderRadius: 80,
        // backgroundColor: '#E9BC41',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#E9BC41',
        // shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    headerIcon: {
        width: 100,
        height: 100,
        // tintColor: 'white',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 30,
    },
    alurContainer: {
        marginBottom: 20,
    },
    alurCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    alurLeft: {
        alignItems: 'center',
        marginRight: 12,
    },
    stepBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    lineContainer: {
        width: 2,
        height: 60, // sesuaikan tinggi antar step
        alignItems: 'center',
    },
    
    
    line: {
        width: 2,
        flex: 1,
        marginTop: 4,
    },
    alurContent: {
        flex: 1,
    },
    alurHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    alurIcon: {
        width: 22,
        height: 22,
    },
    alurTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    alurDescription: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
        marginBottom: 10,
    },
    tapHint: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    tapHintText: {
        fontSize: 11,
        color: '#E9BC41',
        fontWeight: '600',
        marginRight: 4,
    },
    arrowIcon: {
        width: 16,
        height: 16,
        tintColor: '#E9BC41',
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF8E1',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: '#E9BC41',
    },
    infoIcon: {
        width: 24,
        height: 24,
        tintColor: '#E9BC41',
        marginRight: 12,
    },
    infoText: {
        fontSize: 13,
        color: '#666',
        flex: 1,
    },
    bottomSpacing: {
        height: 40,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        maxWidth: 400,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 20,
        position: 'relative',
    },
    modalIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalIcon: {
        width: 40,
        height: 40,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#666',
        fontWeight: 'bold',
    },
    modalBody: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    stepBadgeLarge: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepTextLarge: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 16,
    },
    modalDivider: {
        width: 60,
        height: 3,
        backgroundColor: '#E9BC41',
        borderRadius: 2,
        marginBottom: 16,
    },
    modalDescription: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    modalButton: {
        width: '100%',
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AlurUsulanPenelitian;

