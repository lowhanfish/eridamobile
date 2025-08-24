import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView, TextInput, Button, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// import { pick } from '@react-native-documents/picker'
// import DateTimePicker from '@react-native-community/datetimepicker';

import useGlobalStore from "../../stores/useGlobalStore";
import GetDataToken from "../lib/GetDataToken";
import axios from "axios";
import { realDate } from "../lib/Umum";
import { stylex } from "../assets/css";

import RecentNews from "../../components/RecentNews";
import ModalSetting from "./ModalSetting";
import ImageLib from "../../components/ImageLib";

// import axios from "axios";
// import GetDataToken from "../lib/GetDataToken";






const NewsList = () => {
    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const [isModalVisibleSetting, setisModalVisibleSetting] = useState(false);


    const urlx = useGlobalStore((state) => state.url);

    const [list_data, setListData] = useState([]);
    const [page_first, setPageFirst] = useState(1);
    const [page_last, setPageLast] = useState(1);
    const [cari_value, setCariValue] = useState("");
    const [data_batas, setDataBatas] = useState(8);
    const [cek_load_data, setCekLoadData] = useState(true);


    const [text, onChangeText] = useState('');

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
        setPageFirst(1); // Reset halaman ke 1 saat pencarian baru
        getData();
    };



    const getData = async () => {
        var tokenz = await GetDataToken();
        console.log(page_first)
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
            // console.log(data)
        }).catch(error => {
            setCekLoadData(false);
            console.log(error)
        })

    }

    const test = () => {
        console.log(cari_value)
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

    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View style={{ flex: 1 }}>
                    <View style={stylex.pageTitleContainer}>
                        <View style={[stylex.pageTitleItemContainer, { justifyContent: 'center' }]}>
                            <View >
                                <Text style={stylex.textTitleList}>NEWS LIST</Text>
                                <Text style={stylex.textSubTitleList2}>e-Rida News</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[stylex.borderContent, { marginBottom: 80 }]}>
                        <View style={{ paddingTop: 5 }}>

                            <View style={[stylex.InputContainer, styles.filterContainer]}>
                                <Text style={stylex.inputText1}>Cari Berita</Text>
                                <View style={stylex.inputWithButtonContainer}>

                                    <TextInput
                                        style={stylex.inputx2}
                                        onChangeText={setCariValue}
                                        value={cari_value}
                                    />
                                    <TouchableOpacity onPress={() => cariData()} style={stylex.inputIcon2}>
                                        <Image style={stylex.inputIconImg} source={require("../assets/images/icon/search.png")} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <View style={[styles.containerContent1]}>


                                    {cek_load_data ? (
                                        <View style={[stylex.loading_container, { paddingTop: -10 }]}>
                                            <ImageLib style={{ width: 200 }} urix={require('../assets/images/loading2.gif')} />
                                            <Text style={stylex.loading_text}>Memuat Data...</Text>
                                        </View>
                                    ) : (
                                        // Kode untuk menampilkan daftar berita

                                        list_data.map((data, i) => (

                                            <View key={i} style={stylex.newsListContainer}>
                                                <View styl={stylex.newsListContainerImg}>
                                                    {/* <Image style={stylex.ImgNews} source={{ uri: urlx.URL_APP+'https://server-erida.konaweselatankab.go.id/uploads/1750636695002.jpg' }} /> */}
                                                    <Image style={stylex.ImgNews} source={{ uri: urlx.URL_FILE + data.foto }} />
                                                </View>
                                                <View style={stylex.newsListContainerText}>
                                                    <View>
                                                        <TouchableOpacity onPress={() => navigation.navigate("NewsDetail", { id: data.id })}>
                                                            <Text style={stylex.newsListTitle}>
                                                                {data.judul}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <View style={stylex.newsListTitleDesc}>
                                                            <Image style={stylex.newsListTitleDescIcon} source={require('../assets/images/icon/time.png')} />
                                                            <Text style={stylex.newsListTitleDescText}>{realDate(data.editeAt)}</Text>
                                                        </View>
                                                        <View style={stylex.newsListTitleDesc}>
                                                            <Image style={stylex.newsListTitleDescIcon} source={require('../assets/images/icon/user.png')} />
                                                            <Text style={stylex.newsListTitleDescText}>{data.createBy}</Text>
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>

                                        ))
                                    )}



                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={stylex.paginContainer}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-end' }]}>
                                <TouchableOpacity onPress={() => btn_prev()} style={[stylex.paginTouchBtn, stylex.shaddow]}>
                                    <Image style={stylex.paginTouchBtnImg} source={require("../assets/images/icon/prev.png")} />
                                    <Text style={stylex.paginTouchBtnText}>PREF</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stylex.paginContainerText}>
                                <Text style={stylex.paginText}>{page_first} - {page_last}</Text>
                            </View>
                            <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-start' }]}>
                                <TouchableOpacity onPress={() => btn_next()} style={[stylex.paginTouchBtn, stylex.shaddow, { justifyContent: 'center' }]}>
                                    <Text style={stylex.paginTouchBtnText}>NEXT</Text>
                                    <Image style={stylex.paginTouchBtnImg} source={require("../assets/images/icon/next.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>


            </ScrollView>

        </View>
    )

}


const styles = StyleSheet.create({
    filterContainer: {
        borderStyle: 'solid',
        borderBottomColor: '#DFDDDD',
        borderBottomWidth: 5,
        paddingBottom: 10,
    },
    containerContent1: {
        flex: 1,
        // borderStyle: 'solid',
        // borderTopWidth: 14,
        // borderTopColor: '#D9D9D9',
        // flexDirection: 'row',
        paddingTop: 10,
    },
})


export default NewsList