import { useEffect, useState, useCallback } from "react";
import { View, useWindowDimensions, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import useGlobalStore from "../stores/useGlobalStore.js";
import { stylex } from "../pages/assets/css/index.js";
import ImageLib from "./ImageLib.jsx";
import axios from "axios";
import GetDataToken from "../pages/lib/GetDataToken.js";

import RenderHTML from 'react-native-render-html';
import { realDate } from "../pages/lib/Umum.js";


const NewsDetail = () => {
    const { width } = useWindowDimensions();

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const urlx = useGlobalStore(state => state.url)
    const navigation = useNavigation();


    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const route = useRoute();
    const { id } = route.params || {};

    const getData = async () => {
        if (!id) {
            setLoading(false);
            return;
        }
    
        setLoading(true);
        try {
            const tokenz = await GetDataToken();
    
            const response = await axios.post(
                urlx.URL_Berita + "/view",
                {
                    data_ke: 1,
                    cari_value: "", // kosongkan pencarian
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `kikensbatara ${tokenz}`,
                    },
                }
            );
    
            if (response.data?.data?.length) {
                const found = response.data.data.find(
                    (item) => String(item.id) === String(id)
                );
    
                setData(found || null);
            } else {
                setData(null);
            }
        } catch (err) {
            console.log(
                "Error fetching news detail:",
                err.response?.status,
                err.response?.data || err.message
            );
            setData(null);
        } finally {
            setLoading(false);
        }
    };
    

    useFocusEffect(
        useCallback(() => {
            setRouteBack("NewsList");
            visibleBar(true, true);
            getData();
        }, [visibleBar, id])
    );

    if (loading) {
        return (
            <View style={stylex.container}>
                <View style={styles.loadingContainer}>
                    <ImageLib style={{ width: 200 }} urix={require('../pages/assets/images/loading2.gif')} />
                    <Text style={stylex.loading_text}>Memuat Data...</Text>
                </View>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={stylex.container}>
                <View style={styles.emptyContainer}>
                    <ImageLib urix={require('../pages/assets/images/nodata.png')} customWidth={200} />
                    <Text style={styles.emptyText}>Data tidak ditemukan</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View style={{ flex: 1, paddingBottom: 50 }}>
                    
                    {/* Header Section */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>BERITA</Text>
                        <Text style={styles.headerSubTitle}>e-Rida News</Text>
                    </View>

                    {/* Image */}
                    <View style={styles.imageContainer}>
                        {data.foto ? (
                            <ImageLib
                                urix={urlx.URL_FILE + data.foto}
                                customWidth={'100%'}
                                style={styles.newsImage}
                            />
                        ) : (
                            <View style={styles.noImageContainer}>
                                <Image 
                                    style={{ width: 60, height: 60, opacity: 0.5 }}
                                    source={require('../pages/assets/images/icon/news.png')}
                                />
                            </View>
                        )}
                    </View>

                    {/* Content Card */}
                    <View style={styles.contentCard}>
                        
                        {/* Title */}
                        <Text style={styles.newsTitle}>{data.judul}</Text>
                        
                        {/* Meta Info */}
                        <View style={styles.metaContainer}>
                            <View style={styles.metaItem}>
                                <Image 
                                    style={{ width: 14, height: 14, marginRight: 6 }}
                                    source={require('../pages/assets/images/icon/time.png')}
                                />
                                <Text style={styles.metaText}>{realDate(data.editeAt || data.createAt)}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Image 
                                    style={{ width: 14, height: 14, marginRight: 6 }}
                                    source={require('../pages/assets/images/icon/user.png')}
                                />
                                <Text style={styles.metaText}>{data.createBy}</Text>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* Content */}
                        <View style={styles.contentContainer}>
                            <RenderHTML 
                                contentWidth={width - 40} 
                                source={{ html: data.isi || '' }} 
                                tagsStyles={{
                                    p: {
                                        fontSize: 14,
                                        color: '#555',
                                        lineHeight: 22,
                                        textAlign: 'justify',
                                    },
                                    h1: {
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: '#333',
                                        marginBottom: 10,
                                    },
                                    h2: {
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: '#333',
                                        marginBottom: 8,
                                    },
                                    h3: {
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: '#333',
                                        marginBottom: 6,
                                    },
                                    ul: {
                                        marginLeft: 20,
                                    },
                                    li: {
                                        fontSize: 14,
                                        color: '#555',
                                        lineHeight: 20,
                                    },
                                    strong: {
                                        fontWeight: 'bold',
                                    },
                                    em: {
                                        fontStyle: 'italic',
                                    },
                                }}
                            />
                        </View>

                    </View>

                    {/* Back Button */}
                    <TouchableOpacity 
                        style={styles.backButton}
                        activeOpacity={0.7}
                        onPress={() => navigation.goBack()}
                    >
                        <Image 
                            style={{ width: 20, height: 20, marginRight: 8 }}
                            source={require('../pages/assets/images/icon/prev.png')}
                        />
                        <Text style={styles.backButtonText}>Kembali</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: -10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        marginTop: 16,
        fontSize: 14,
        color: '#8A8A8A',
    },
    headerContainer: {
        marginTop: 10,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#717171',
        fontFamily: 'Helvetica',
    },
    headerSubTitle: {
        fontSize: 10,
        color: '#717171',
    },
    imageContainer: {
        width: '100%',
        borderRadius: 11,
        overflow: 'hidden',
        marginBottom: 16,
        ...stylex.shaddow,
    },
    newsImage: {
        borderRadius: 11,
    },
    noImageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentCard: {
        backgroundColor: 'white',
        borderRadius: 11,
        padding: 16,
        ...stylex.shaddow,
    },
    newsTitle: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        lineHeight: 24,
    },
    metaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 8,
    },
    metaText: {
        fontSize: 12,
        color: '#8A8A8A',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 12,
    },
    contentContainer: {
        minHeight: 100,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 30,
    },
    backButtonText: {
        color: '#717171',
        fontSize: 14,
        fontWeight: '600',
    },
});


export default NewsDetail;

