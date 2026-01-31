import { useState, useEffect, useCallback } from "react";
import { Modal, Button, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

import useGlobalStore from "../../stores/useGlobalStore";

import { stylex } from "../assets/css";

import ImageLib from "../../components/ImageLib.jsx";
import GetDataToken from "../lib/GetDataToken"; // pastikan ada
import RNFS from 'react-native-fs';
import { Linking, ToastAndroid } from 'react-native';




const ListKrenova = () => {
    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const user = useGlobalStore((state) => state.user);

    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const urlx = useGlobalStore((state) => state.url);

    const [list_data, setListData] = useState([]);
    const [page_first, setPageFirst] = useState(1);
    const [page_last, setPageLast] = useState(0);
    const [cari_value, setCariValue] = useState("");
    const [data_batas, setDataBatas] = useState(8);
    const [cek_load_data, setCekLoadData] = useState(true);

    const [datax, setDatax] = useState(null)
    const downloadFile = async (data) => {
        if (!data.file) {
            ToastAndroid.show('File tidak tersedia', ToastAndroid.SHORT);
            return;
        }
    
        const fileUrl = urlx.URL_APP + 'uploads/' + data.file;
        const fileName = data.file;
    
        // Cara paling aman & simpel → buka di browser / PDF viewer
        try {
            await Linking.openURL(fileUrl);
        } catch (err) {
            console.log('Download error:', err);
            ToastAndroid.show('Gagal membuka file', ToastAndroid.SHORT);
        }
    };
    




    const btn_prev = () => {
        if (page_first > 1) {
            setPageFirst(page_first - 1);
        }
    };

    const btn_next = () => {
        if (page_first < page_last) {
            setPageFirst(page_first + 1);
        }
    };

    const isMyData = (data) => {
        if (!user || !user.nama) return false;
        return data.createBy === user.nama;
    };
    
    
    


    const getData = async () => {
        setCekLoadData(true);
    
        try {
            const token = await GetDataToken();
    
            const res = await axios.get(
                urlx.URL_Krenova,
                {
                    headers: {
                        Authorization: `kikensbatara ${token}`,
                    },
                }
            );
    
            console.log('DATA KRENOVA:', res.data);
    
            // setListData(res.data || []);
            const sortedData = (res.data || []).sort(
                (a, b) => new Date(b.createAt) - new Date(a.createAt)
            );
            
            setListData(sortedData);
            
            setPageLast(1);
        } catch (err) {
            console.log(
                'Get Krenova error:',
                err.response?.status,
                err.response?.data || err.message
            );
        } finally {
            setCekLoadData(false);
        }
    };
    
    

    const removeData = async (data) => {
        Alert.alert(
            "Konfirmasi",
            "Yakin ingin menghapus data ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await axios.post(
                                urlx.URL_Krenova + 'removeData',
                                {
                                    id: data.id,
                                    file: data.file,
                                }
                            );
    
                            getData();
                        } catch (err) {
                            console.log('Remove error:', err);
                        }
                    },
                },
            ]
        );
    };
    


    const selectData = (data) => {
        setDatax(data)
    }

    useEffect(() => {
        getData();
    }, [page_first])


    useFocusEffect(
        useCallback(() => {
            setRouteBack("Home");
            visibleBar(true, true);
        }, [visibleBar])

    )

    const getBgColorByStatus = (status) => {
        return '#FFFFFF'; // normal
    };

    


    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View style={{ flex: 1, paddingBottom: 72 }}>
                    <View style={stylex.pageTitleContainer}>
                        <View style={[stylex.pageTitleItemContainer, { justifyContent: 'center' }]}>
                            <View >
                                <Text style={stylex.textTitleList}>LIST KREATIVITAS/INOVASI</Text>
                                <Text style={stylex.textSubTitleList2}>Krenova</Text>
                            </View>
                        </View>
                        <View style={[{ alignItems: 'flex-end' }]}>
                            <TouchableOpacity onPress={() => navigation.navigate("AddKrenova", { typex: 'add' })} style={[stylex.btnCornerFlat, stylex.shaddow]}>
                                <View>
                                    <Image style={stylex.btnCornerFlatIcon} source={require('../assets/images/icon/plus.png')} />
                                </View>
                                <View>
                                    <Text style={stylex.btnCornerFlatText}>ADD KRENOVA</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={stylex.borderContent}>

                        {

                            cek_load_data ? (
                                <View style={[stylex.loading_container, { paddingTop: -10 }]}>
                                    <ImageLib style={{ width: 200 }} urix={require('../assets/images/loading2.gif')} />
                                    <Text style={stylex.loading_text}>Memuat Data...</Text>
                                </View>
                            ) : (

                                list_data.length <= 0 ? (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <ImageLib
                                            urix={require('../assets/images/nodata.png')} customWidth={250}
                                        />
                                        <Text style={{ marginTop: -50 }}>DATA KOSONG..!</Text>
                                    </View>
                                ) : (

                                    list_data.map((data, i) => (
                                        <View key={i} style={{ flex: 1, marginTop: 9 }}>
                                    
                                            <View
                                                style={[
                                                    stylex.DataListCont,
                                                    stylex.shaddow,
                                                    {
                                                        backgroundColor: '#fff',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    },
                                                ]}
                                            >
                                    
                                                {/* ===== KLIK CARD (DETAIL / EDIT) ===== */}
                                                <TouchableOpacity
                                                    style={{ flex: 1, flexDirection: 'row' }}
                                                    activeOpacity={0.7}
                                                    onPress={() => {
                                                        if (isMyData(data)) {
                                                            navigation.navigate("AddKrenova", {
                                                                typex: "edit",
                                                                id: data.id,
                                                            });
                                                        } else {
                                                            navigation.navigate("DetailKrenova", {
                                                                id: data.id,
                                                            });
                                                        }
                                                    }}
                                                >
                                                    {/* IMAGE */}
                                                    <View style={stylex.DataListImgCont}>
                                                        <Image
                                                            style={stylex.DataListImg}
                                                            source={require('../assets/images/inovasi.png')}
                                                        />
                                                    </View>
                                    
                                                    {/* TEXT */}
                                                    <View style={stylex.DataListTextCont}>
                                                        <Text style={stylex.DataListText1}>
                                                            {data.penulis}
                                                        </Text>
                                    
                                                        <Text style={stylex.DataListText2}>
                                                            {data.judul || 'MOHON LENGKAPI DULU..!'}
                                                        </Text>
                                    
                                                        {/* DOWNLOAD PDF */}
                                                        {data.file && (
                                                            <TouchableOpacity
                                                                onPress={() => downloadFile(data)}
                                                                style={{
                                                                    marginTop: 6,
                                                                    alignSelf: 'flex-start',
                                                                    backgroundColor: '#E9BC41',
                                                                    paddingHorizontal: 10,
                                                                    paddingVertical: 4,
                                                                    borderRadius: 6,
                                                                }}
                                                            >
                                                                <Text style={{ color: '#fff', fontSize: 12 }}>
                                                                    ⬇ Download PDF
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    </View>
                                                </TouchableOpacity>
                                    
                                                {/* ===== TOMBOL HAPUS (KANAN) ===== */}
                                                {isMyData(data) && (
                                                    <TouchableOpacity
                                                        onPress={() => removeData(data)}
                                                        style={{
                                                            paddingHorizontal: 12,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <Text style={{ fontSize: 20, color: '#D32F2F' }}>
                                                            🗑
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        </View>
                                    ))
                                    
                                )
                            )

                        }





                    </View>

                </View>

                <View style={[stylex.paginContainer, { marginBottom: 18 }]}>

                    {list_data.length >= data_batas && (
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-end' }]}>
                                <TouchableOpacity onPress={btn_prev} style={[stylex.paginTouchBtn, stylex.shaddow]}>
                                    <Image style={stylex.paginTouchBtnImg} source={require("../assets/images/icon/prev.png")} />
                                    <Text style={stylex.paginTouchBtnText}>PREF</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stylex.paginContainerText}>
                                <Text style={stylex.paginText}>1 - {page_last}</Text>
                            </View>
                            <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-start' }]}>
                                <TouchableOpacity onPress={btn_next} style={[stylex.paginTouchBtn, stylex.shaddow, { justifyContent: 'center' }]}>
                                    <Text style={stylex.paginTouchBtnText}>NEXT</Text>
                                    <Image style={stylex.paginTouchBtnImg} source={require("../assets/images/icon/next.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                </View>

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default ListKrenova

