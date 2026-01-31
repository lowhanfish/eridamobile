import { useCallback, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import useGlobalStore from "../../stores/useGlobalStore.js";
import { stylex } from "../assets/css/index.js";

const DATA_CATEGORIES = [
{
        id: 'riset',
        title: 'Data Riset',
        description: 'Data hasil riset dan penelitian',
        icon: require('../assets/images/izin_penelitian.png'),
        color: '#E3F2FD',
        route: 'DataRiset',
    },
    {
        id: 'krenova',
        title: 'Data Krenova',
        description: 'Data kreativitas dan inovasi daerah',
        icon: require('../assets/images/inovasi.png'),
        color: '#FFF3E0',
        route: 'DataKrenova',
    },
    {
        id: 'aksi_perubahan',
        title: 'Data Aksi Perubahan',
        description: 'Data aksi perubahan daerah',
        icon: require('../assets/images/lomba.png'),
        color: '#E8F5E9',
        route: 'DataAksiPerubahan',
    },
    {
        id: 'teknologi',
        title: 'Data Teknologi Tepat Guna',
        description: 'Data teknologi tepat guna',
        icon: require('../assets/images/usulan_tema.png'),
        color: '#F3E5F5',
        route: 'DataTeknologi',
    },
    {
        id: 'izin_penelitian',
        title: 'Data Izin Penelitian',
        description: 'Data izin penelitian',
        icon: require('../assets/images/izin_penelitian.png'),
        color: '#FFEBEE',
        route: 'DataIzinPenelitian',
    },
    {
        id: 'iid',
        title: 'Data IID',
        description: 'Data inovasi dan indikator daerah',
        icon: require('../assets/images/inovasi.png'),
        color: '#E0F7FA',
        route: 'DataIID',
    },
    {
        id: 'ipkd',
        title: 'Data IPKD',
        description: 'Data indikator kinerja daerah',
        icon: require('../assets/images/data_informasi.png'),
        color: '#ECEFF1',
        route: 'DataIPKD',
    },
    {
        id: 'idsd',
        title: 'Data IDSD',
        description: 'Data indeks daya saing daerah',
        icon: require('../assets/images/data_informasi.png'),
        color: '#FFF8E1',
        route: 'DataIDSD',
    },
    {
        id: 'haki',
        title: 'Data HaKI',
        description: 'Data hak kekayaan intelektual',
        icon: require('../assets/images/inovasi.png'),
        color: '#FBE9E7',
        route: 'DataHaKI',
    },
    {
        id: 'ikm',
        title: 'Data IKM',
        description: 'Data indeks kepuasan masyarakat',
        icon: require('../assets/images/data_informasi.png'),
        color: '#F1F8E9',
        route: 'DataIKM',
    },
    {
        id: 'usulan_penelitian',
        title: 'Data Usulan Penelitian',
        description: 'Data usulan penelitian',
        icon: require('../assets/images/usulan_tema.png'),
        color: '#E8EAF6',
        route: 'DataUsulanPenelitian',
    },
];

const DataInformation = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);

    useFocusEffect(
        useCallback(() => {
            setRouteBack("Home");
            visibleBar(true, true);
        }, [visibleBar])
    );

    const handleCategoryPress = (category) => {
        navigation.navigate(category.route);
    };

    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View style={{ flex: 1, paddingBottom: 72 }}>
                    <View style={stylex.pageTitleContainer}>
                        <View style={[stylex.pageTitleItemContainer, { justifyContent: 'center' }]}>
                            <View >
                                <Text style={stylex.textTitleList}>DATA DAN INFORMASI</Text>
                                <Text style={stylex.textSubTitleList2}>Badan Riset dan Inovasi Daerah</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.descriptionCard}>
                        <Text style={styles.descriptionText}>
                            Pilih kategori data yang ingin Anda lihat. Tersedia berbagai kategori data riset dan inovasi daerah.
                        </Text>
                    </View>

                    <View style={styles.categoryGrid}>
                        {DATA_CATEGORIES.map((category, index) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[styles.categoryCard, { backgroundColor: category.color }]}
                                onPress={() => handleCategoryPress(category)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.categoryIconContainer}>
                                    <Image 
                                        style={{ width: 40, height: 40, resizeMode: 'contain' }}
                                        source={category.icon}
                                    />
                                </View>
                                <Text style={styles.categoryTitle}>{category.title}</Text>
                                <Text style={styles.categoryDescription} numberOfLines={2}>
                                    {category.description}
                                </Text>
                                <View style={styles.categoryFooter}>
                                    <Text style={styles.categoryLink}>Lihat Data</Text>
                                    <Image 
                                        style={{ width: 16, height: 16 }}
                                        source={require('../assets/images/icon/next.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    descriptionCard: {
        backgroundColor: '#FFF8E1',
        borderRadius: 11,
        padding: 16,
        marginTop: 10,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#EFD06D',
    },
    descriptionText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '48%',
        borderRadius: 11,
        padding: 16,
        marginBottom: 16,
        ...stylex.shaddow,
    },
    categoryIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        ...stylex.shaddow,
    },
    categoryTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#333',
        marginBottom: 6,
    },
    categoryDescription: {
        fontSize: 10,
        color: '#666',
        lineHeight: 14,
        marginBottom: 10,
    },
    categoryFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    categoryLink: {
        fontSize: 11,
        fontWeight: '600',
        color: '#EFD06D',
        marginRight: 4,
    },
});

export default DataInformation;

