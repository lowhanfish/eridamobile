import { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, Linking } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";
import GetDataToken from "../lib/GetDataToken";
import ImageLib from "../../components/ImageLib.jsx";

const DataList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    
    // Get params passed from DataInformation
    const { 
        title = 'Data', 
        subtitle = '', 
        apiEndpoint = '',
        icon = require('../assets/images/data_informasi.png'),
        fieldMapping = {}
    } = route.params || {};

    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const urlx = useGlobalStore((state) => state.url);

    const [list_data, setListData] = useState([]);
    const [page_first, setPageFirst] = useState(1);
    const [page_last, setPageLast] = useState(0);
    const [cari_value, setCariValue] = useState("");
    const [data_batas, setDataBatas] = useState(8);
    const [cek_load_data, setCekLoadData] = useState(true);

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

    const cariData = () => {
        setPageFirst(1);
        getData();
    };

    const getData = async () => {
        setCekLoadData(true);
        try {
            const token = await GetDataToken();
            
            if (apiEndpoint) {
                const res = await axios.post(
                    apiEndpoint + "/view",
                    {
                        data_ke: page_first,
                        cari_value: cari_value,
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
            } else {
                // Dummy data for demo
                const dummyData = [
                    {
                        id: 1,
                        [fieldMapping.judul || 'judul']: 'Data Sample 1',
                        [fieldMapping.deskripsi || 'deskripsi']: 'Deskripsi data sample 1',
                        [fieldMapping.tanggal || 'createAt']: '2025-05-20',
                    },
                    {
                        id: 2,
                        [fieldMapping.judul || 'judul']: 'Data Sample 2',
                        [fieldMapping.deskripsi || 'deskripsi']: 'Deskripsi data sample 2',
                        [fieldMapping.tanggal || 'createAt']: '2025-05-18',
                    },
                ];
                setListData(dummyData);
                setPageLast(1);
            }
        } catch (err) {
            console.log('Get data error:', err);
        } finally {
            setCekLoadData(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
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

    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View style={{ flex: 1, paddingBottom: 72 }}>
                    <View style={stylex.pageTitleContainer}>
                        <View style={[stylex.pageTitleItemContainer, { justifyContent: 'center' }]}>
                            <View >
                                <Text style={stylex.textTitleList}>{title.toUpperCase()}</Text>
                                <Text style={stylex.textSubTitleList2}>{subtitle}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Search */}
                    <View style={[stylex.InputContainer, styles.searchContainer]}>
                        <Text style={stylex.inputText1}>Cari Data</Text>
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
                                    <View style={[styles.dataCard, stylex.shaddow]}>
                                        <View style={styles.dataIconContainer}>
                                            <Image 
                                                style={{ width: 32, height: 32 }}
                                                source={icon}
                                            />
                                        </View>
                                        
                                        <View style={styles.dataContent}>
                                            <Text style={styles.dataTitle} numberOfLines={2}>
                                                {data[fieldMapping.judul || 'judul'] || data[fieldMapping.title || 'title'] || '-'}
                                            </Text>
                                            
                                            {data[fieldMapping.deskripsi || 'deskripsi'] && (
                                                <Text style={styles.dataDescription} numberOfLines={2}>
                                                    {data[fieldMapping.deskripsi || 'deskripsi']}
                                                </Text>
                                            )}
                                            
                                            <View style={styles.dataMeta}>
                                                <Image 
                                                    style={{ width: 12, height: 12, marginRight: 4 }}
                                                    source={require('../assets/images/icon/date.png')}
                                                />
                                                <Text style={styles.dataMetaText}>
                                                    {formatDate(data[fieldMapping.tanggal || 'createAt'] || data[fieldMapping.date || 'date'])}
                                                </Text>
                                            </View>
                                        </View>
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
    dataCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 11,
        padding: 12,
    },
    dataIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFF3F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    dataContent: {
        flex: 1,
    },
    dataTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    dataDescription: {
        fontSize: 11,
        color: '#666',
        marginBottom: 4,
        lineHeight: 15,
    },
    dataMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dataMetaText: {
        fontSize: 10,
        color: '#8A8A8A',
    },
});

export default DataList;

