import { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import Imagex from "./Imagex";
import { stylex } from "../pages/assets/css/index";
import useGlobalStore from "../stores/useGlobalStore";
import GetDataToken from "../pages/lib/GetDataToken";



const RecentNews = () => {

    const navigation = useNavigation()

    const [list_data, setListData] = useState([]);
    const [page_first, setPageFirst] = useState(1);
    const [page_last, setPageLast] = useState(0);
    const [cari_value, setCariValue] = useState("");
    const [data_batas, setDataBatas] = useState(8);
    const [cek_load_data, setCekLoadData] = useState(true);

    const btn_prev = () => {
        if (page_first > 1) {
            setPageFirst(page_first--)
        } else {
            setPageFirst(1)
        }
        getData();
    };

    const btn_next = () => {
        if (page_first >= page_last) {
            setPageFirst(page_last)
        } else {
            setPageFirst(page_first++);
        }
        getData();
    }

    return (
        <>
            <View>
                <View style={[styles.containerContent1]}>


                    {[...Array(8)].map((_, i) => (

                        <View key={i} style={stylex.newsListContainer}>
                            <View styl={stylex.newsListContainerImg}>
                                <Image style={stylex.ImgNews} source={{ uri: 'https://server-erida.konaweselatankab.go.id/uploads/1750636695002.jpg' }} />
                            </View>
                            <View style={stylex.newsListContainerText}>
                                <View>
                                    <TouchableOpacity onPress={() => navigation.navigate("NewsDetail")}>
                                        <Text style={stylex.newsListTitle}>
                                            Sekda Konsel Terima 30 Mahasiswa KKN-PPM UGM
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={stylex.newsListTitleDesc}>
                                        <Image style={stylex.newsListTitleDescIcon} source={require('../pages/assets/images/icon/time.png')} />
                                        <Text style={stylex.newsListTitleDescText}>20 March 2025</Text>
                                    </View>
                                    <View style={stylex.newsListTitleDesc}>
                                        <Image style={stylex.newsListTitleDescIcon} source={require('../pages/assets/images/icon/user.png')} />
                                        <Text style={stylex.newsListTitleDescText}>admin_erida</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                    ))}




                </View>
            </View>
        </>
    )
}



const styles = StyleSheet.create({


    containerContent1: {
        flex: 1,
        // borderStyle: 'solid',
        // borderTopWidth: 14,
        // borderTopColor: '#D9D9D9',
        // flexDirection: 'row',
        paddingTop: 10,
    },


});

export default RecentNews