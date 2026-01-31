import { useCallback, useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, Alert, Linking } from "react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import GetDataToken from "../lib/GetDataToken";



const DetailKrenova = () => {
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
            setRouteBack("ListKrenova");
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
                                urlx.URL_Krenova + 'removeData',
                                {
                                    id: data.id,
                                    file: data.file,
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
                                                routes: [{ name: "ListKrenova" }],
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
    

    const handleDownload = () => {
        if (!data.file) return;
        Linking.openURL(urlx.URL_APP + 'uploads/' + data.file);
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
                            DETAIL KREATIVITAS / INOVASI
                        </Text>
                        <Text style={stylex.textSubTitleList2}>
                            Krenova
                        </Text>
                    </View>
                </View>

                {/* SENGAJA DIKOSONGKAN BIAR ALIGN SAMA LIST */}
                <View style={{ width: 80 }} />
            </View>


            {/* MAIN CARD */}
            <View style={styles.card}>

                {/* JUDUL */}
                <Text style={styles.title}>{data.judul}</Text>

                {/* META */}
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>✍ {data.penulis}</Text>
                    <Text style={styles.metaText}>📅 {data.tahun}</Text>
                </View>

                <View style={styles.divider} />

                {/* DESKRIPSI */}
                <Text style={styles.sectionLabel}>Deskripsi</Text>
                <Text style={styles.description}>
                    {data.isi}
                </Text>

                {/* FILE */}
                {data.file && (
                    <TouchableOpacity
                        style={styles.downloadBtn}
                        onPress={handleDownload}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.downloadIcon}>📄</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.downloadTitle}>Unduh Dokumen</Text>
                            <Text style={styles.downloadSub}>
                                File PDF Krenova
                            </Text>
                        </View>
                        <Text style={styles.downloadArrow}>›</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* OWNER ACTION */}
            {isOwner && (
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() =>
                            navigation.navigate("AddKrenova", {
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
    subTitle: {
        fontSize: 12,
        color: '#8A8A8A',
        marginTop: 4,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 18,
        marginTop: 12,
        ...stylex.shaddow,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
        marginBottom: 8,
    },

    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    metaText: {
        fontSize: 12,
        color: '#777',
    },

    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 12,
    },

    sectionLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 6,
    },

    description: {
        fontSize: 14,
        lineHeight: 22,
        color: '#333',
    },

    downloadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 14,
        marginTop: 18,
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

export default DetailKrenova;

