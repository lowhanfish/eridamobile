import { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";
import ImageLib from "../../components/ImageLib.jsx";



const NewsDetail = () => {

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);

    useFocusEffect(
        useCallback(() => {
            setRouteBack("NewsList");
            visibleBar(true, true)
        }, [visibleBar])
    )

    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View style={{ flex: 1, paddingBottom: 50 }}>

                    <ImageLib
                        urix={"https://server-erida.konaweselatankab.go.id/uploads/1752836088394.jpg"} customWidth={'100%'}
                        style={styles.ImgNews}
                    />

                    <Text style={styles.NewsTitle}>Kopi Tolaki Robusta Belang Wira Konawe Selatan : Dari Tradisi Lokal Menuju Panggung Dunia</Text>
                    <View style={styles.newsAuthorContainer}>
                        <View style={styles.newsAuthorContainerItem}>
                            <Image style={stylex.newsListTitleDescIcon} source={require('../../pages/assets/images/icon/time.png')} />
                            <Text style={stylex.newsListTitleDescText}>20 March 2025</Text>
                        </View>
                        <View style={styles.newsAuthorContainerItem}>
                            <Image style={stylex.newsListTitleDescIcon} source={require('../../pages/assets/images/icon/user.png')} />
                            <Text style={stylex.newsListTitleDescText}>admin_erida</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.newsText}>
                            Sekretaris Daerah (Sekda) Kabupaten Konawe Selatan, Hj. St. Chadidjah, S.Sos., M.Si., mewakili Bupati Konawe Selatan menghadiri kegiatan penerimaan mahasiswa Kuliah Kerja Nyata Pembelajaran Pemberdayaan Masyarakat (KKN-PPM) Universitas Gadjah Mada (UGM) di Kabupaten Konawe Selatan, yang berlangsung pada Minggu, 22 Juni 2025, bertempat di Hotel Zenith Kendari. Sebanyak 30 mahasiswa dari berbagai program studi di UGM secara resmi diterima untuk menjalankan program KKN-PPM di tiga desa yang berada di wilayah Kecamatan Laonti, yakni Desa Namu, Desa Malaringgi, dan Desa Batu Jaya. Dalam sambutannya, Sekda Konawe Selatan menyampaikan apresiasi atas kepercayaan Universitas Gadjah Mada yang kembali menjadikan Konawe Selatan sebagai lokasi pengabdian. Ia berharap, kehadiran para mahasiswa dapat memberikan kontribusi positif bagi pembangunan desa, serta menjadi wadah pembelajaran langsung di tengah masyarakat.“Selamat datang kepada seluruh mahasiswa UGM di Bumi Konawe Selatan. Kami berharap KKN ini bukan hanya menjadi tugas akademik, tetapi juga pengalaman yang membentuk karakter, semangat gotong royong, dan kontribusi nyata bagi masyarakat desa,” ujar Hj. St. Chadidjah dalam sambutannya. Selama menjalankan KKN-PPM, para mahasiswa akan mengembangkan berbagai program kerja sesuai potensi lokal dan kebutuhan masyarakat desa. Kegiatan ini menjadi bagian dari implementasi tridarma perguruan tinggi, khususnya dalam hal pengabdian kepada masyarakat, serta wujud sinergi antara perguruan tinggi dan pemerintah daerah dalam mendorong pembangunan berbasis pemberdayaan masyarakat.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}



const styles = StyleSheet.create({
    ImgNews: {
        borderWidth: 0.2,
        borderRadius: 5
    },
    NewsTitle: {
        color: '#717171',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 18
    },
    newsAuthorContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
    },
    newsAuthorContainerItem: {

        width: 120,
        flexDirection: 'row'
    },
    newsText: {
        textAlign: 'justify',
        marginTop: 13
    },
})


export default NewsDetail