import { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";
import GetDataToken from "../lib/GetDataToken";
import ImageLib from "../../components/ImageLib.jsx";

const DataIDSD = () => {
    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const urlx = useGlobalStore((state) => state.url);

    const [chartData, setChartData] = useState([]);
    const [chartLoading, setChartLoading] = useState(true);
    const [chartLoaded, setChartLoaded] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    const getData = async () => {
        setChartLoading(true);
        try {
            const token = await GetDataToken();
    
            const firstRes = await axios.post(
                urlx.URL_Idsd + "/view",
                {
                    data_ke: 1,
                    cari_value: "",
                    tahun: null,
                },
                {
                    headers: { Authorization: `kikensbatara ${token}` },
                }
            );
    
            const totalPage = firstRes.data.jml_data || 1;
            let allData = [...(firstRes.data.data || [])];
    
            for (let page = 2; page <= totalPage; page++) {
                const res = await axios.post(
                    urlx.URL_Idsd + "/view",
                    {
                        data_ke: page,
                        cari_value: "",
                        tahun: null,
                    },
                    {
                        headers: { Authorization: `kikensbatara ${token}` },
                    }
                );
    
                if (res.data.data?.length) {
                    allData = allData.concat(res.data.data);
                }
            }
    
            // Group by tahun and get average nilai
            const yearDataMap = {};
            allData.forEach(item => {
                const year = item.tahun ? String(item.tahun) : 'Lainnya';
                if (!yearDataMap[year]) {
                    yearDataMap[year] = { total: 0, count: 0 };
                }
                yearDataMap[year].total += parseFloat(item.nilai) || 0;
                yearDataMap[year].count += 1;
            });
    
            const chartArr = Object.keys(yearDataMap)
                .sort((a, b) => b - a)
                .slice(0, 8)
                .map(year => ({
                    tahun: year,
                    count: parseFloat((yearDataMap[year].total / yearDataMap[year].count).toFixed(2)),
                }));
    
            setChartData(chartArr);
            setChartLoaded(true);
        } catch (err) {
            console.log("Chart IDSD error:", err);
            setChartData([]);
        } finally {
            setChartLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setRouteBack("DataInformation");
            visibleBar(true, true);
            getData();
        }, [visibleBar])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        setChartLoaded(false);
        setChartLoading(true);
    
        try {
            await getData();
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
                                <Text style={stylex.textTitleList}>DATA IDSD</Text>
                                <Text style={stylex.textSubTitleList2}>Indeks Daya Saing Daerah</Text>
                            </View>
                        </View>
                    </View>

                    {/* Chart Section Only */}
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Nilai IDSD per Tahun</Text>
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
                                <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                                    <ImageLib
                                        urix={require('../assets/images/nodata.png')}
                                        customWidth={250}
                                    />
                                    <Text style={{ marginTop: -50, color: '#8A8A8A' }}>TIDAK ADA DATA</Text>
                                </View>
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

                        {chartData.length > 0 && (
                            <View style={styles.legendContainer}>
                                <Text style={styles.legendText}>
                                    * Nilai rata-rata Indeks Daya Saing Daerah per tahun
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Description Card */}
                    <View style={styles.descriptionCard}>
                        <Text style={styles.descriptionTitle}>Tentang IDSD</Text>
                        <Text style={styles.descriptionText}>
                            Indeks Daya Saing Daerah (IDSD) adalah ukuran penilaian kemampuan daerah dalam meningkatkan 
                            kesejahteraan masyarakat melalui pengelolaan sumber daya ekonomi secara efektif dan efisien 
                            untuk menghadapi persaingan antar daerah.
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
        height: 180,
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
        width: 40,
        height: 120,
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
    legendContainer: {
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    legendText: {
        fontSize: 11,
        color: '#999',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    descriptionCard: {
        backgroundColor: '#FFF8E1',
        borderRadius: 11,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#FFB300',
    },
    descriptionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
    },
});

export default DataIDSD;

