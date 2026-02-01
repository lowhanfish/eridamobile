import { useState, useEffect, useCallback } from "react";
import { Modal, Button, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

import useGlobalStore from "../../stores/useGlobalStore";

import { stylex } from "../assets/css";

import ModalSetting from "./ModalSetting.jsx";
import GetDataToken from "../lib/GetDataToken.js";
import ImageLib from "../../components/ImageLib.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalSurvey from "./ModalSurvey";
import ModalUploadLaporan from "./ModalUploadLaporan";
import { pick } from '@react-native-documents/picker'





const ListUsulan = () => {
    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const urlx = useGlobalStore((state) => state.url);
    const [isModalVisibleSetting, setisModalVisibleSetting] = useState(false);

    const [list_data, setListData] = useState([]);
    const [page_first, setPageFirst] = useState(1);
    const [page_last, setPageLast] = useState(0);
    const [cari_value, setCariValue] = useState("");
    const [data_batas, setDataBatas] = useState(8);
    const [cek_load_data, setCekLoadData] = useState(true);

    const [datax, setDatax] = useState(null)
    const [isSurveyVisible, setIsSurveyVisible] = useState(false);
    const [selectedUsulan, setSelectedUsulan] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await getData();
        } finally {
            setRefreshing(false);
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


    const getData = async () => {
        var tokenz = await GetDataToken();
        setCekLoadData(true);
        // console.log(urlx.URL_Penelitian + "/view")
        axios.post(urlx.URL_Penelitian + "/view", {
            data_ke: page_first,
            cari_value: cari_value,
        }, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `kikensbatara ${tokenz}`,
            }
        }).then(response => {
            const data = response.data;
            setListData(data.data);
            setPageLast(data.jml_data);
            setCekLoadData(false);
            // console.log(data);
        }).catch(error => {
            setCekLoadData(false);
            console.log(error)
        })

    }

    const removeData = async (data) => {
        var tokenz = await GetDataToken();
        setCekLoadData(true);
        axios.post(urlx.URL_Penelitian + '/removeData', {
            id: data.id,
            ktp: data.ktp || '',
            rekomendasi: data.rekomendasi || '',
            suratP: data.suratP || '',
            suratR: data.suratR || '',
            proposal: data.proposal || '',
            laporan: data.laporan || ''
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `kikensbatara ${tokenz}`,
            }
        }).then(response => {
            console.log(response);
            setisModalVisibleSetting(!isModalVisibleSetting)
            getData();
        }).catch(error => {
            setisModalVisibleSetting(!isModalVisibleSetting)
            setCekLoadData(false);
            console.log(error)
        })
    }


    const selectData = (data) => {
        setDatax(data)
        setisModalVisibleSetting(true)
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
        if (status === 'publish') {
            return '#E8F5E9'; // hijau muda (published)
        }
    
        if (status === 'verifikasi') {
            return '#FFF8E1'; // kuning muda (sedang diperiksa)
        }
    
        if (status === 'diterima') {
            return '#FFFFFF'; // normal
        }
    
        return '#FFF3F3'; // merah muda (belum lengkap)
    };
    
    const [isUploadVisible, setIsUploadVisible] = useState(false);


   
    


    return (
        <View style={stylex.container}>
            <ScrollView
                    style={stylex.scrollPage}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#4CAF50']}      // Android
                            tintColor="#4CAF50"       // iOS
                        />
                    }
                >

                <View style={{ flex: 1, paddingBottom: 72 }}>
                    <View style={stylex.pageTitleContainer}>
                        <View style={[stylex.pageTitleItemContainer, { justifyContent: 'center' }]}>
                            <View >
                                <Text style={stylex.textTitleList}>LIST USULAN PENELITIAN</Text>
                                <Text style={stylex.textSubTitleList2}>Izin Penelitian</Text>
                            </View>
                        </View>
                        <View style={[{ alignItems: 'flex-end' }]}>
                            <TouchableOpacity onPress={() => navigation.navigate("AddUsulan", { typex: 'add' })} style={[stylex.btnCornerFlat, stylex.shaddow]}>
                                <View>
                                    <Image style={stylex.btnCornerFlatIcon} source={require('../assets/images/icon/plus.png')} />
                                </View>
                                <View>
                                    <Text style={stylex.btnCornerFlatText}>ADD USULAN</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ModalSetting
                        visible={isModalVisibleSetting} // Teruskan state visibilitas
                        onClose={() => setisModalVisibleSetting(!isModalVisibleSetting)} // Teruskan fungsi untuk menutup modal
                        datax={datax}
                        removeData={removeData}
                    />

                    <ModalSurvey
                        visible={isSurveyVisible}
                        onClose={() => setIsSurveyVisible(false)}
                        data={selectedUsulan}
                    />

                    <ModalUploadLaporan
                        visible={isUploadVisible}
                        onClose={() => setIsUploadVisible(false)}
                        data={selectedUsulan}
                        onSuccess={() => {
                            setIsUploadVisible(false);
                            getData(); // refresh list
                        }}
                    />


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

                                            <View >
                                            <TouchableOpacity
                                                    style={[stylex.DataListCont, stylex.shaddow, { backgroundColor: getBgColorByStatus(data.status) }]}
                                                    onPress={() => selectData(data)}
                                                    >
                                                    <View style={stylex.DataListImgCont}>
                                                        <Image style={stylex.DataListImg} source={require('../assets/images/izin_penelitian.png')} />
                                                    </View>
                                                    <View style={stylex.DataListTextCont}>
                                                        <Text style={stylex.DataListText1}>{data.nama}</Text>

                                                        {/* JUDUL / PESAN */}
                                                        {data.status === 'publish' ? (
                                                            <Text style={[stylex.DataListText2, { color: '#4CAF50', fontWeight: '600' }]}>
                                                                Data Penelitian Telah Terpublish
                                                            </Text>

                                                        ) : data.status === 'verifikasi' ? (
                                                            <Text style={[stylex.DataListText2, { color: '#FF9800' }]}>
                                                                Proses Pemeriksaan Laporan Akhir
                                                            </Text>

                                                        ) : data.judul && data.judul !== "" ? (
                                                            <Text style={stylex.DataListText2}>{data.judul}</Text>

                                                        ) : (
                                                            <Text style={stylex.DataListText2}>
                                                                Mohon lengkapi dulu semua tahapan pengisian form pengajuan
                                                            </Text>
                                                        )}

                                                        <Text style={stylex.DataListText3}>
                                                            {formatDate(data.createAt)}
                                                        </Text>

                                                        {/* BUTTON SURVEY (HANYA JIKA DITERIMA) */}
                                                        {data.status === 'diterima' && (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setSelectedUsulan(data);
                                                                    setIsSurveyVisible(true);
                                                                }}
                                                                style={[
                                                                    stylex.btnCornerFlat,
                                                                    { marginTop: 8, alignSelf: 'flex-start' }
                                                                ]}
                                                            >
                                                                <Text style={stylex.btnCornerFlatText}>
                                                                    ISI SURVEY
                                                                </Text>
                                                                
                                                            </TouchableOpacity>
                                                        )}
                                                        {data.status === 'survey' && (
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                                                <Text style={{ color: 'green', marginRight: 8, fontSize:8 }}>
                                                                    ✔ Survey sudah diisi
                                                                </Text>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        console.log("DATA USULAN:", data);
                                                                        setSelectedUsulan(data);
                                                                        setIsUploadVisible(true);
                                                                    }}
                                                                    style={{
                                                                        backgroundColor: '#6DA3EF',
                                                                        paddingHorizontal: 10,
                                                                        paddingVertical: 4,
                                                                        borderRadius: 6,
                                                                    }}
                                                                >
                                                                    <Text style={{ color: '#fff', fontSize: 9 }}>
                                                                        Unggah Laporan Akhir
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )}


                                                        
                                                    </View>

                                                </TouchableOpacity>
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

export default ListUsulan