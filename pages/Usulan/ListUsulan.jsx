import { useState, useEffect, useCallback } from "react";
import { Modal, Button, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

import useGlobalStore from "../../stores/useGlobalStore";

import { stylex } from "../assets/css";

import ModalSetting from "./ModalSetting.jsx";
import GetDataToken from "../lib/GetDataToken.js";



const ListUsulan = () => {
    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const urlx = useGlobalStore((state) => state.url);
    const [isModalVisibleSetting, setisModalVisibleSetting] = useState(false);

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

    // btn_prev: function () {
    //   this.cek_load_data = true;
    //   if (this.page_first > 1) {
    //     this.page_first--;
    //   } else {
    //     this.page_first = 1;
    //   }
    //   this.getView();
    // },

    // btn_next: function () {
    //   if (this.page_first >= this.page_last) {
    //     this.page_first == this.page_last;
    //   } else {
    //     this.page_first++;
    //   }
    //   this.getView();
    // },


    const getData = async () => {
        var tokenz = await GetDataToken();
        setCekLoadData(true);
        // console.log(urlx.URL_Penelitian + "/view")
        axios.post(urlx.URL_Penelitian + "/view", {
            data_ke: page_first,
            cari_value: cari_value,
        }, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `kikensbatara ${tokenz}`,
            }
        }).then(response => {
            const data = response.data;
            setListData(data.data);
            setPageLast(data.jml_data);
            setCekLoadData(false);
            console.log(data);
        }).catch(error => {
            setCekLoadData(false);
            console.log(error)
        })

    }



    useFocusEffect(
        useCallback(() => {
            setRouteBack("Home");
            visibleBar(true, true);
            getData();
        }, [visibleBar])


    )


    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View style={{ flex: 1, paddingBottom: 72 }}>
                    <View style={stylex.pageTitleContainer}>
                        <View style={[stylex.pageTitleItemContainer, { justifyContent: 'center' }]}>
                            <View >
                                <Text style={stylex.textTitleList}>LIST USULAN PENELITIAN</Text>
                                <Text style={stylex.textSubTitleList2}>Izin Penelitian</Text>
                            </View>
                        </View>
                        <View style={[{ alignItems: 'flex-end' }]}>
                            <TouchableOpacity onPress={() => navigation.navigate("AddUsulan")} style={[stylex.btnCornerFlat, stylex.shaddow]}>
                                <View>
                                    <Image style={stylex.btnCornerFlatIcon} source={require('../assets/images/icon/plus.png')} />
                                </View>
                                <View>
                                    <Text style={stylex.btnCornerFlatText}>ADD USULAN</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ModalSetting
                        visible={isModalVisibleSetting} // Teruskan state visibilitas
                        onClose={() => setisModalVisibleSetting(!isModalVisibleSetting)} // Teruskan fungsi untuk menutup modal
                    />

                    <View style={stylex.borderContent}>

                        {list_data.map((data, i) => (
                            <View key={i} style={{ flex: 1, marginTop: 9 }}>

                                <View >
                                    <TouchableOpacity style={[stylex.DataListCont, stylex.shaddow, { backgroundColor: '#FFF3F3' }]} onLongPress={() => setisModalVisibleSetting(true)}>
                                        <View style={stylex.DataListImgCont}>
                                            <Image style={stylex.DataListImg} source={require('../assets/images/izin_penelitian.png')} />
                                        </View>
                                        <View style={stylex.DataListTextCont}>
                                            <Text style={stylex.DataListText1}>{data.nama}</Text>
                                            {
                                                data.judul !== null && data.judul !== "" ? (
                                                    <Text style={stylex.DataListText2}>{data.judul}</Text>
                                                ) : (
                                                    <Text style={stylex.DataListText2}>MOHON LENGKAPI DULU SEMUA TAHAPAN PENGISIAN FORM PENGAJUAN..!</Text>
                                                )
                                            }
                                            <Text style={stylex.DataListText3}>22 Mei 2025</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}



                    </View>

                </View>

                <View style={[stylex.paginContainer, { marginBottom: 18 }]}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-end' }]}>
                            <TouchableOpacity onPress={btn_prev} style={[stylex.paginTouchBtn, stylex.shaddow]}>
                                <Image style={stylex.paginTouchBtnImg} source={require("../assets/images/icon/prev.png")} />
                                <Text style={stylex.paginTouchBtnText}>PREF</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={stylex.paginContainerText}>
                            <Text style={stylex.paginText}>1 - {page_last}</Text>
                        </View>
                        <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-start' }]}>
                            <TouchableOpacity onPress={btn_next} style={[stylex.paginTouchBtn, stylex.shaddow, { justifyContent: 'center' }]}>
                                <Text style={stylex.paginTouchBtnText}>NEXT</Text>
                                <Image style={stylex.paginTouchBtnImg} source={require("../assets/images/icon/next.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default ListUsulan