import { useCallback, useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, Alert, Linking } from "react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import GetDataToken from "../lib/GetDataToken";



const DetailDataUsulan = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { data } = route.params || {};   // ✅ SATU-SATUNYA SUMBER DATA

    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const urlx = useGlobalStore((state) => state.url);
    const [localUser, setLocalUser] = useState(null);

    const currentUserId =
    localUser?._id ||
    localUser?.id ||
    localUser?.profile?.id_pengguna ||
    "";




    useFocusEffect(
        useCallback(() => {
            setRouteBack("ListUsulan");
            visibleBar(true, true);
        }, [visibleBar])
    );

    if (!data) {
        return (
            <View style={stylex.container}>
                <Text>Data tidak ditemukan</Text>
            </View>
        );
    }

    const isOwner = data?.userId === currentUserId;


    console.log("LOGIN USER ID :", currentUserId);
    console.log("DATA USER ID  :", data?.userId);
    console.log("IS OWNER ?", isOwner);

    
    const handleDelete = () => {
        Alert.alert(
            "Konfirmasi Hapus",
            "Yakin ingin menghapus data ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await GetDataToken();
    
                            await axios.post(
                                urlx.URL_Penelitian + 'removeData',
                                {
                                    id: data.id,
                                    ktp: data.ktp || '',
                                    rekomendasi: data.rekomendasi || '',
                                    suratP: data.suratP || '',
                                    suratR: data.suratR || '',
                                    proposal: data.proposal || '',
                                    laporan: data.laporan || ''
                                },
                                {
                                    headers: {
                                        Authorization: `kikensbatara ${token}`,
                                    },
                                }
                            );
    
                            Alert.alert(
                                "Sukses",
                                "Data berhasil dihapus",
                                [
                                    {
                                        text: "OK",
                                        onPress: () =>
                                            navigation.reset({
                                                index: 0,
                                                routes: [{ name: "ListUsulan" }],
                                            }),
                                    },
                                ]
                            );
                        } catch (err) {
                            console.log("DELETE ERROR:", err.response?.data || err.message);
                            Alert.alert("Gagal", "Data tidak berhasil dihapus");
                        }
                    },
                },
            ]
        );
    };
    

    const handleDownload = (filename, label) => {
        if (!filename) return;
        Linking.openURL(urlx.URL_FILE + filename);
    };

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('userProfile');
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                console.log('DETAIL USER FROM STORAGE:', parsed);
                setLocalUser(parsed);
            }
        };
        loadUser();
    }, []);
    

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    };

    const renderInfoRow = (label, value) => {
        return (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value || '-'}</Text>
            </View>
        );
    };

    const renderSuratSection = (title, dataSurat, filename, icon) => {
        const hasSurat = dataSurat && (dataSurat.nomor || dataSurat.tanggal || dataSurat.nama || dataSurat.jabatan);
        
        return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{icon} {title}</Text>
                <View style={styles.divider} />
                
                {hasSurat ? (
                    <>
                        {renderInfoRow('Nomor Surat', dataSurat.nomor)}
                        {renderInfoRow('Tanggal', formatDate(dataSurat.tanggal))}
                        {renderInfoRow('Nama Penanggung Jawab', dataSurat.nama)}
                        {renderInfoRow('Jabatan', dataSurat.jabatan)}
                        
                        {filename && (
                            <TouchableOpacity
                                style={styles.downloadBtn}
                                onPress={() => handleDownload(filename, title)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.downloadIcon}>📄</Text>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.downloadTitle}>Unduh Dokumen</Text>
                                    <Text style={styles.downloadSub}>File {title}</Text>
                                </View>
                                <Text style={styles.downloadArrow}>›</Text>
                            </TouchableOpacity>
                        )}
                    </>
                ) : (
                    <Text style={styles.noDataText}>Data {title} belum tersedia</Text>
                )}
            </View>
        );
    };

    return (
        <View style={stylex.container}>
    <ScrollView style={stylex.scrollPage}>
        <View style={{ paddingBottom: 72 }}>

            {/* HEADER */}
            <View style={stylex.pageTitleContainer}>
                <View
                    style={[
                        stylex.pageTitleItemContainer,
                        { justifyContent: 'center' }
                    ]}
                >
                    <View>
                        <Text style={stylex.textTitleList}>
                            DETAIL USULAN PENELITIAN
                        </Text>
                        <Text style={stylex.textSubTitleList2}>
                            Izin Penelitian
                        </Text>
                    </View>
                </View>

                {/* SENGAJA DIKOSONGKAN BIAR ALIGN SAMA LIST */}
                <View style={{ width: 80 }} />
            </View>


            {/* MAIN CARD - DATA PRIBADI */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>📋 Data Pengusul</Text>
                <View style={styles.divider} />
                
                {renderInfoRow('Nama Lengkap', data.nama)}
                {renderInfoRow('Alamat', data.alamat)}
                {renderInfoRow('No. HP', data.hp)}
                {renderInfoRow('Email', data.email)}
                {renderInfoRow('NIK', data.nik)}
                
                {/* File KTP */}
                {data.ktp && (
                    <TouchableOpacity
                        style={styles.downloadBtn}
                        onPress={() => handleDownload(data.ktp, 'KTP')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.downloadIcon}>📄</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.downloadTitle}>Unduh Dokumen</Text>
                            <Text style={styles.downloadSub}>KTP Pengusul</Text>
                        </View>
                        <Text style={styles.downloadArrow}>›</Text>
                    </TouchableOpacity>
                )}
            </View>


            {/* MAIN CARD - DATA PENELITIAN */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>🔬 Data Penelitian</Text>
                <View style={styles.divider} />
                
                {renderInfoRow('Judul Penelitian', data.judul || '-')}
                {renderInfoRow('Lokasi', data.lokasi || '-')}
                {renderInfoRow('Tujuan', data.tujuan || '-')}
                {renderInfoRow('Lingkup', data.lingkup || '-')}
                {renderInfoRow('Tanggal Mulai', formatDate(data.tgl_mulai))}
                {renderInfoRow('Tanggal Selesai', formatDate(data.tgl_selesai))}
                {renderInfoRow('Kategori', data.kategori_uraian || '-')}
                {renderInfoRow('Status', data.status || '-')}
                {renderInfoRow('Tanggal Pengajuan', formatDate(data.createAt))}
                
                {/* File Proposal */}
                {data.proposal && (
                    <TouchableOpacity
                        style={styles.downloadBtn}
                        onPress={() => handleDownload(data.proposal, 'Proposal')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.downloadIcon}>📄</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.downloadTitle}>Unduh Dokumen</Text>
                            <Text style={styles.downloadSub}>Proposal Penelitian</Text>
                        </View>
                        <Text style={styles.downloadArrow}>›</Text>
                    </TouchableOpacity>
                )}
            </View>


            {/* DATA SURAT PENGANTAR */}
            {renderSuratSection(
                'Surat Pengantar', 
                {
                    nomor: data.nomorP,
                    tanggal: data.tanggalP,
                    nama: data.namaP,
                    jabatan: data.jabatanP
                },
                data.suratP,
                '📨'
            )}


            {/* DATA SURAT REKOMENDASI */}
            {renderSuratSection(
                'Surat Rekomendasi', 
                {
                    nomor: data.nomorR,
                    tanggal: data.tanggalR,
                    nama: data.namaR,
                    jabatan: data.jabatanR
                },
                data.suratR,
                '✅'
            )}


            {/* OWNER ACTION */}
            {isOwner && (
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() =>
                            navigation.navigate("AddUsulan", {
                                typex: "edit",
                                id: data.id,
                                data: data,
                            })
                        }
                    >
                        <Text style={styles.actionText}>✏️ Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={handleDelete}
                    >
                        <Text style={styles.actionText}>🗑 Hapus</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    </ScrollView>
</View>

    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 18,
        marginTop: 12,
        ...stylex.shaddow,
    },

    cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },

    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 12,
    },

    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    infoLabel: {
        width: 130,
        fontSize: 12,
        color: '#888',
    },

    infoValue: {
        flex: 1,
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },

    downloadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 14,
        marginTop: 12,
    },

    downloadIcon: {
        fontSize: 22,
        marginRight: 12,
    },

    downloadTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },

    downloadSub: {
        fontSize: 11,
        color: '#888',
        marginTop: 2,
    },

    downloadArrow: {
        fontSize: 20,
        color: '#999',
    },

    noDataText: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: 10,
    },

    actionRow: {
        flexDirection: 'row',
        marginTop: 20,
    },

    editBtn: {
        flex: 1,
        backgroundColor: '#F0C94D',
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },

    deleteBtn: {
        flex: 1,
        backgroundColor: '#E05A5A',
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },

    actionText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default DetailDataUsulan;

