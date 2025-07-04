import React, { useCallback, useState, useEffect } from 'react';
import { Dimensions, View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import useGlobalStore from "../../stores/useGlobalStore.js";

import { stylex } from "../../pages/assets/css/index.js";

import Imagex from "../../components/Imagex.jsx";

import RecentNews from "../../components/RecentNews.jsx";



const Home = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar);


    const fontFamilies = [
        'Arial', 'Avenir', 'Courier', 'Courier New', 'Futura',
        'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue',
        'Marker Felt', 'Palatino', 'Times New Roman', 'Trebuchet MS',
        'Verdana', 'Zapfino'
    ];


    useFocusEffect(
        useCallback(() => {
            visibleBar(false, true);
            // return () => {
            //     visibleBar(true, true);
            // }
        }, [visibleBar])
    )

    useEffect(() => {

    }, [])

    return (
        <View style={stylex.container}>
            <Image
                source={require('../../pages/assets/images/homebanner.png')}
                style={[stylex.imageLogo, styles.imagebanner, { width: '100%' }]}
            />
            {/* <AutoHeightImage uri={imageUri} width={displayWidth} /> */}




            <ScrollView style={stylex.scrollPage}>
                <View style={styles.homeLogo}>
                    <Imagex width={121} urix={require('../../pages/assets/images/logo2.png')} />
                </View>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.homeText}>HOME</Text>

                        {/* {fontFamilies.map(f => (
                            <Text key={f} style={{ fontFamily: f, fontSize: 20 }}>{f}</Text>
                        ))} */}
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={{ width: 48, height: 48, borderRadius: 50, opacity: 0.8 }} source={{ uri: "https://smkn1tanjungpinang.sch.id/storage/guru/PRPaFyfrjnsDD919xxuyBXJISTXZFnTsl5Dwg69s.jpeg" }} />
                        <Text style={{ fontSize: 10, fontWeight: 200 }}>Dr. Djarot Melin</Text>
                    </View>
                </View>

                <View>
                    <Text style={[stylex.textTitleList, { marginTop: 15, marginBottom: 12 }]}>LIST LAYANAN</Text>
                </View>


                <View style={styles.menuImage}>
                    <View style={styles.menuImageContainer}>
                        <TouchableOpacity style={[styles.menuImageContainerItem, stylex.shaddow]}>
                            <Image style={styles.imageMenuItemList} source={require('../../pages/assets/images/izin_penelitian.png')} />
                            {/* <Imagex width={65} urix={require('../../pages/assets/images/izin_penelitian.png')} /> */}
                        </TouchableOpacity>
                        <Text style={styles.imageMenuItemListText}>IzinPenelitian</Text>
                    </View>
                    <View style={styles.menuImageContainer}>
                        <TouchableOpacity style={[styles.menuImageContainerItem, stylex.shaddow]}>
                            <Image style={styles.imageMenuItemList} source={require('../../pages/assets/images/inovasi.png')} />
                        </TouchableOpacity>
                        <Text style={styles.imageMenuItemListText}>Kreatifitas/inovasi</Text>
                    </View>
                    <View style={styles.menuImageContainer}>
                        <TouchableOpacity style={[styles.menuImageContainerItem, stylex.shaddow]}>
                            <Image style={styles.imageMenuItemList} source={require('../../pages/assets/images/lomba.png')} />
                        </TouchableOpacity>
                        <Text style={styles.imageMenuItemListText}>Lomba Inovasi Daerah</Text>
                    </View>
                    <View style={styles.menuImageContainer}>
                        <TouchableOpacity style={[styles.menuImageContainerItem, stylex.shaddow]}>
                            <Image style={styles.imageMenuItemList} source={require('../../pages/assets/images/usulan_tema.png')} />
                        </TouchableOpacity>
                        <Text style={styles.imageMenuItemListText}>Usulan tema penelitian</Text>
                    </View>
                </View>
                {/* <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Text>Route Profile</Text>
                </TouchableOpacity> */}
                <View>

                    <View style={[styles.containerContent, { marginTop: 23 }]}>
                        <View style={[styles.containerContentDiv, { justifyContent: 'center', alignItems: 'center', marginTop: -20 }]}>
                            <TouchableOpacity onPress={() => navigation.navigate("ListUsulan")}>
                                <Imagex width={150} urix={require('../../pages/assets/images/list_usulan.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.containerContentDiv]}>
                            <Text style={stylex.textTitleList}>LIST USULAN PENELITIAN</Text>
                            <Text style={styles.textTitleListItem}>
                                Tap gambar untuk melihat alur usulan penelitian pada Badan Riset dan Inovasi Daerah (BRIDA) Kabupaten Konawe Selatan
                            </Text>
                        </View>

                    </View>
                </View>
                <View>

                    <View style={[styles.containerContent, { marginTop: 23 }]}>
                        <View style={[styles.containerContentDiv]}>
                            <Text style={stylex.textTitleList}>DATA DAN INFORMASI</Text>
                            <Text style={styles.textTitleListItem}>
                                Tap gambar untuk melihat data dan informasi pada Badan Riset dan Inovasi Daerah (BRIDA) Kabupaten Konawe Selatan
                            </Text>
                        </View>
                        <View style={[styles.containerContentDiv, { justifyContent: 'center', alignItems: 'center', marginTop: -20 }]}>
                            <TouchableOpacity onPress={() => navigation.navigate("ListUsulan")}>
                                <Imagex width={150} urix={require('../../pages/assets/images/data_informasi.png')} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>


                <RecentNews />




            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    homeLogo: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24
    },
    imagebanner: {
        position: 'absolute',
        right: 0,
        top: -25,
        // backgroundColor: 'pink'

    },
    homeText: {
        fontFamily: 'Marker Felt',
        fontSize: 29,
        color: 'rgba(219, 99, 88, 0.5)',
        fontWeight: 100,
    },
    menuImage: {
        flexDirection: 'row',
        flex: 1
    },
    menuImageContainer: {
        flex: 1,
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 5,
    },
    menuImageContainerItem: {
        width: "100%",
        height: 86,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8E8E8',
        borderRadius: 15,
    },
    imageMenuItemList: {
        width: 61,
        height: 61,
    },
    imageMenuItemListText: {
        fontSize: 8,
        color: '#8E8E8E',
        marginTop: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    containerContent: {
        flex: 1,
        borderStyle: 'solid',
        borderTopWidth: 14,
        borderTopColor: '#D9D9D9',
        flexDirection: 'row',
        paddingTop: 24,
    },

    containerContentDiv: {
        flex: 1,
    },
    textTitleListItem: {
        fontSize: 12,
        fontFamily: 'Courier New',
        marginTop: 5
    }

});


export default Home;