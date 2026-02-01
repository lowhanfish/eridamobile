import { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput, RefreshControl, Linking } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";
import GetDataToken from "../lib/GetDataToken";
import ImageLib from "../../components/ImageLib.jsx";

const DataTeknologi = () => {
    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const urlx = useGlobalStore((state) => state.url);

    const [list_data, setListData] = useState([]);
    const [page_first, setPageFirst] = useState(1);
    const [page_last, setPageLast] = useState(0);
    const [cari_value, setCariValue] = useState("");
    const [tahun_filter, setTahunFilter] = useState("");
    const [data_batas, setDataBatas] = useState(8);
    const [cek_load_data, setCekLoadData] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [chartLoading, setChartLoading] = useState(true);
    const [chartLoaded, setChartLoaded] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    // Generate tahun options (5 tahun terakhir)
    const currentYear = new Date().getFullYear();
    const tahunOptions = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

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

    const downloadFile = (data) => {
        if (!data.file) {
            Alert.alert("Info", "File tidak tersedia");
            return;
        }
    
        const fileUrl = urlx.URL_APP + 'uploads/' + data.file;
        const namaDokumen = data.judul || 'Dokumen Teknologi';
    
        Alert.alert(
            "Unduh Dokumen",
            `Nama Dokumen:\n${namaDokumen}\n\nApakah Anda ingin mengunduh dokumen ini?`,
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Unduh",
                    onPress: () => {
                        Linking.openURL(fileUrl).catch(() => {
                            Alert.alert("Error", "Tidak dapat membuka dokumen");
                        });
                    }
                }
            ]
        );
    };

    const cariData = () => {
        setChartLoaded(false);
        setChartLoading(true);
        setPageFirst(1);
        getChartData();
        getData();
    };

    const getData = async () => {
        setCekLoadData(true);
        try {
            const token = await GetDataToken();
            const res = await axios.post(
                urlx.URL_Teknologi + "/view",
                {
                    data_ke: page_first,
                    cari_value: cari_value,
                    tahun: tahun_filter || null,
                },
                {
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `kikensbatara ${token}`,
                    },
                }
            );

            setListData(res.data.data || []);
            setPageLast(res.data.jml_data || 1);
        } catch (err) {
            console.log('Get data teknologi error:', err);
        } finally {
            setCekLoadData(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    };

    useEffect(() => {
        getData();
    }, [page_first]);

    useFocusEffect(
        useCallback(() => {
            setRouteBack("DataInformation");
            visibleBar(true, true);
        }, [visibleBar])
    );

    const getChartData = async () => {
        setChartLoading(true);
        try {
            const token = await GetDataToken();
    
            const firstRes = await axios.post(
                urlx.URL_Teknologi + "/view",
                {
                    data_ke: 1,
                    cari_value,
                    tahun: tahun_filter || null,
                },
                {
                    headers: { Authorization: `kikensbatara ${token}` },
                }
            );
    
            const totalPage = firstRes.data.jml_data || 1;
            let allData = [...(firstRes.data.data || [])];
    
            for (let page = 2; page <= totalPage; page++) {
                const res = await axios.post(
                    urlx.URL_Teknologi + "/view",
                    {
                        data_ke: page,
                        cari_value,
                        tahun: tahun_filter || null,
                    },
                    {
                        headers: { Authorization: `kikensbatara ${token}` },
                    }
                );
    
                if (res.data.data?.length) {
                    allData = allData.concat(res.data.data);
                }
            }
    
            const yearMap = {};
            allData.forEach(item => {
                const year = item.tahun ? String(item.tahun) : 'Lainnya';
                yearMap[year] = (yearMap[year] || 0) + 1;
            });
    
            const chartArr = Object.keys(yearMap)
                .sort((a, b) => b - a)
                .slice(0, 8)
                .map(year => ({
                    tahun: year,
                    count: yearMap[year],
                }));
    
            setChartData(chartArr);
            setChartLoaded(true);
        } catch (err) {
            console.log("Chart teknologi error:", err);
            setChartData([]);
        } finally {
            setChartLoading(false);
        }
    };

    useEffect(() => {
        getChartData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        setChartLoaded(false);
        setChartLoading(true);
    
        try {
            await Promise.all([
                getChartData(),
                getData(),
            ]);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <View style={stylex.container}>
            <ScrollView
                    style={stylex.scrollPage}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#EFD06D']}
                            tintColor="#EFD06D"
                        />
                    }
                >
                <View style={{ flex: 1, paddingBottom: 72 }}>
                    <View style={stylex.pageTitleContainer}>
                        <View style={[stylex.pageTitleItemContainer, { justifyContent: 'center' }]}>
                            <View >
                                <Text style={stylex.textTitleList}>DATA TEKNOLOGI</Text>
                                <Text style={stylex.textSubTitleList2}>Badan Riset dan Inovasi Daerah</Text>
                            </View>
                        </View>
                    </View>

                    {/* Search */}
                    <View style={[stylex.InputContainer, styles.searchContainer]}>
                        <Text style={stylex.inputText1}>Cari Data Teknologi</Text>
                        <View style={stylex.inputWithButtonContainer}>
                            <TextInput
                                style={stylex.inputx2}
                                onChangeText={setCariValue}
                                value={cari_value}
                                placeholder="Masukkan kata kunci..."
                                placeholderTextColor="#9D9D9D"
                            />
                            <TouchableOpacity onPress={() => cariData()} style={stylex.inputIcon2}>
                                <Image style={stylex.inputIconImg} source={require("../assets/images/icon/search.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Chart Section */}
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Jumlah Data Teknologi per Tahun</Text>
                        <View style={styles.chartWrapper}>
                            {chartLoading ? (
                                <View style={{ alignItems: 'center', width: '100%' }}>
                                    <ImageLib
                                        urix={require('../assets/images/loading2.gif')}
                                        customWidth={120}
                                    />
                                    <Text style={{ fontSize: 12, color: '#999', marginTop: 6 }}>
                                        Memuat data chart...
                                    </Text>
                                </View>
                            ) : chartData.length === 0 ? (
                                <Text style={{ color: '#999', fontSize: 12 }}>
                                    Data chart belum tersedia
                                </Text>
                            ) : (
                                chartData.map((item, index) => {
                                    const maxCount = Math.max(...chartData.map(d => d.count), 1);
                                    const barHeight = (item.count / maxCount) * 100;

                                    return (
                                        <View key={index} style={styles.chartBarContainer}>
                                            <Text style={styles.chartBarValueText}>{item.count}</Text>
                                            <View style={styles.chartBarMain}>
                                                <View style={[styles.chartBar, { height: barHeight }]} />
                                            </View>
                                            <Text style={styles.chartBarLabel}>{item.tahun}</Text>
                                        </View>
                                    );
                                })
                            )}
                        </View>
                    </View>

                    <View style={stylex.borderContent}>

                        {cek_load_data ? (
                            <View style={[stylex.loading_container, { paddingTop: -10 }]}>
                                <ImageLib style={{ width: 200 }} urix={require('../assets/images/loading2.gif')} />
                                <Text style={stylex.loading_text}>Memuat Data...</Text>
                            </View>
                        ) : list_data.length <= 0 ? (
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
                                <ImageLib
                                    urix={require('../assets/images/nodata.png')} customWidth={250}
                                />
                                <Text style={{ marginTop: -50, color: '#8A8A8A' }}>TIDAK ADA DATA</Text>
                            </View>
                        ) : (
                            list_data.map((data, i) => (
                                <View key={i} style={{ flex: 1, marginTop: 9 }}>
                                    <View style={[styles.docCard, stylex.shaddow]}>
                                        <View style={styles.docIconContainer}>
                                            <Image 
                                                style={{ width: 32, height: 32 }}
                                                source={require('../assets/images/teknologi.png')}
                                            />
                                        </View>
                                        
                                        <View style={styles.docContent}>
                                            <Text style={styles.docTitle} numberOfLines={2}>
                                                {data.judul || '-'}
                                            </Text>
                                            
                                            <View style={styles.docMeta}>
                                                <View style={styles.docMetaItem}>
                                                    <Text style={styles.docMetaText}>
                                                    👤 {data.penulis || '-'}
                                                    </Text>
                                                </View>
                                            </View>
                                            
                                            <View style={styles.docMeta}>
                                                <View style={styles.docMetaItem}>
                                                    <Text style={styles.docMetaText}>
                                                    📅 {data.tahun || '-'}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        <TouchableOpacity 
                                            style={styles.downloadButton}
                                            onPress={() => downloadFile(data)}
                                        >
                                            <Image 
                                                style={{ width: 20, height: 20, marginRight: 6 }}
                                                source={require('../assets/images/icon/download.png')}
                                            />
                                            <Text style={styles.downloadButtonText}>Unduh</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )}

                    </View>

                </View>

                {/* Pagination */}
                <View style={[stylex.paginContainer, { marginBottom: 18 }]}>
                    {list_data.length >= data_batas && (
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-end' }]}>
                                <TouchableOpacity onPress={btn_prev} style={[stylex.paginTouchBtn, stylex.shaddow]}>
                                    <Image style={stylex.paginTouchBtnImg} source={require("../assets/images/icon/prev.png")} />
                                    <Text style={stylex.paginTouchBtnText}>PREV</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stylex.paginContainerText}>
                                <Text style={stylex.paginText}>{page_first} - {page_last}</Text>
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
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        borderStyle: 'solid',
        borderBottomColor: '#DFDDDD',
        borderBottomWidth: 5,
        paddingBottom: 10,
        marginTop: 10,
    },
    chartContainer: {
        backgroundColor: 'white',
        borderRadius: 11,
        padding: 16,
        marginTop: 10,
        marginBottom: 16,
        ...stylex.shaddow,
    },
    chartTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    chartWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 150,
        paddingHorizontal: 10,
    },
    chartBarContainer: {
        alignItems: 'center',
        flex: 1,
    },
    chartBarValue: {
        marginBottom: 4,
    },
    chartBarValueText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#EFD06D',
    },
    chartBarMain: {
        width: 30,
        height: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    chartBar: {
        width: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    chartBarLabel: {
        fontSize: 11,
        color: '#666',
        marginTop: 6,
        fontWeight: '500',
    },
    docCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 11,
        padding: 12,
    },
    docIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    docContent: {
        flex: 1,
    },
    docTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    docMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    docMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    docMetaText: {
        fontSize: 9,
        color: '#8A8A8A',
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
});

export default DataTeknologi;

