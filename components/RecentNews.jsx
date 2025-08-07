import { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import Imagex from "./Imagex";
import { stylex } from "../pages/assets/css/index";
import useGlobalStore from "../stores/useGlobalStore";
import GetDataToken from "../pages/lib/GetDataToken";



const RecentNews = () => {

    const navigation = useNavigation();
    const urlx = useGlobalStore((state) => state.url);

    const [list_data, setListData] = useState([]);
    const [page_first, setPageFirst] = useState(1);
    const [page_last, setPageLast] = useState(0);
    const [cari_value, setCariValue] = useState("");
    const [data_batas, setDataBatas] = useState(8);
    const [cek_load_data, setCekLoadData] = useState(true);
    // const [tokenz, setTokenz] = useState("")

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

    const getData = async () => {
        var tokenz = await GetDataToken();
        setCekLoadData(true);
        axios.post(urlx.URL_Berita + "/view", {
            data_ke: page_first,
            cari_value: cari_value
        }, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `kikensbatara ${tokenz}`,
            }
        }).then(response => {
            const data = response.data;
            setListData(data.data);
            setPageLast(data.jml_data);
            setCekLoadData(false)
            console.log(data)
        }).catch(error => {
            setCekLoadData(false);
            console.log(error)
        })

    }

    useEffect(() => {
        getData();
    }, [])



    return (
        <>
            <View>
                <View style={[styles.containerContent1]}>


                    {list_data.map((data, i) => (

                        <View key={i} style={stylex.newsListContainer}>
                            <View styl={stylex.newsListContainerImg}>
                                <Image style={stylex.ImgNews} source={{ uri: 'https://server-erida.konaweselatankab.go.id/uploads/1750636695002.jpg' }} />
                            </View>
                            <View style={stylex.newsListContainerText}>
                                <View>
                                    <TouchableOpacity onPress={() => navigation.navigate("NewsDetail")}>
                                        <Text style={stylex.newsListTitle}>
                                            {data.judul}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={stylex.newsListTitleDesc}>
                                        <Image style={stylex.newsListTitleDescIcon} source={require('../pages/assets/images/icon/time.png')} />
                                        <Text style={stylex.newsListTitleDescText}>{data.editeAt}</Text>
                                    </View>
                                    <View style={stylex.newsListTitleDesc}>
                                        <Image style={stylex.newsListTitleDescIcon} source={require('../pages/assets/images/icon/user.png')} />
                                        <Text style={stylex.newsListTitleDescText}>{data.createBy}</Text>
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