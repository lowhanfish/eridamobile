import { useState, useCallback, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";
import ModalSetting from "../Usulan/ModalSetting";
import axios from "axios";
import GetDataToken from "../lib/GetDataToken";





const ListTemaPenelitian = () => {

    const urlx = useGlobalStore((state) => state.url);


    const [listTema, setListTema] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const [isModalVisibleSetting, setisModalVisibleSetting] = useState(false)


    const getTema = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const token = await GetDataToken();
    
            const res = await axios.post(
                urlx.URL_Tema + "view",
                {
                    data_ke: pageNumber,
                    cari_value: ""
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `kikensbatara ${token}`
                    }
                }
            );
    
            if (res.data?.data) {
                setListTema(res.data.data);
                setTotalPage(res.data.jml_data);
                setPage(pageNumber);
            }
        } catch (err) {
            console.log("Gagal ambil tema", err);
        } finally {
            setLoading(false);
        }
    };
    



    useFocusEffect(
        useCallback(() => {
            setRouteBack("Home");
            visibleBar(true, true);
            getTema(1);
        }, [])
    );
    


    return (
        <View style={stylex.container}>
            <ScrollView style={[stylex.scrollPage]}>

                <View style={{ flex: 1, paddingBottom: 72 }}>
                    <View style={stylex.pageTitleContainer}>
                        <View style={[stylex.pageTitleItemContainer, { justifyContent: 'center' }]}>
                            <View >
                                <Text style={stylex.textTitleList}>LIST USULAN TEMA PENELITIAN</Text>
                                <Text style={stylex.textSubTitleList2}>Izin Penelitian</Text>
                            </View>
                        </View>
                        {/* <View style={[{ alignItems: 'flex-end' }]}>
                            <TouchableOpacity onPress={() => navigation.navigate("AddTemaPenelitian")} style={[stylex.btnCornerFlat, stylex.shaddow]}>
                                <View>
                                    <Image style={stylex.btnCornerFlatIcon} source={require('../assets/images/icon/plus.png')} />
                                </View>
                                <View>
                                    <Text style={stylex.btnCornerFlatText}>ADD USULAN</Text>
                                </View>
                            </TouchableOpacity>
                        </View> */}
                    </View>

                    <ModalSetting
                        visible={isModalVisibleSetting} // Teruskan state visibilitas
                        onClose={() => setisModalVisibleSetting(!isModalVisibleSetting)} // Teruskan fungsi untuk menutup modal
                    />

                    <View style={stylex.borderContent}>

                    {listTema.map((item, i) => (
                            <View key={i} style={{ flex: 1, marginTop: 9 }}>

                                <View >
                                    {/*FFF3F3 F3FFFD FFFFF3*/}
                                    <TouchableOpacity
                                        style={[stylex.DataListCont, stylex.shaddow, { backgroundColor: '#FFFFF3' }]}
                                        onLongPress={() => setisModalVisibleSetting(true)}
                                    >
                                        <View style={stylex.DataListImgCont}>
                                            <Image
                                                style={stylex.DataListImg}
                                                source={require('../assets/images/izin_penelitian.png')}
                                            />
                                        </View>

                                        <View style={stylex.DataListTextCont}>
                                            <Text style={stylex.DataListText1}>
                                                {item.opd}
                                            </Text>

                                            <Text style={stylex.DataListText2}>
                                                {item.tema}
                                            </Text>

                                            <View style={stylex.DataListContainerBottom}>
                                                <Text style={stylex.DataListText4}>
                                                    {item.nama} ({item.nomor})
                                                </Text>
                                                {/* <Text style={stylex.DataListText5}>
                                                    {item.createAt}
                                                </Text> */}
                                            </View>
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
                        <TouchableOpacity
                                        disabled={page <= 1}
                                        onPress={() => getTema(page - 1)}
                                        style={[stylex.paginTouchBtn, stylex.shaddow]}
                                    >
                                <Image style={stylex.paginTouchBtnImg} source={require("../assets/images/icon/prev.png")} />
                                <Text style={stylex.paginTouchBtnText}>PREV</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={stylex.paginContainerText}>
                        <Text style={stylex.paginText}>
                            {page} / {totalPage}
                        </Text>
                        </View>
                        <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-start' }]}>
                        <TouchableOpacity
                            disabled={page >= totalPage}
                            onPress={() => getTema(page + 1)}
                            style={[stylex.paginTouchBtn, stylex.shaddow]}
                        >
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

export default ListTemaPenelitian



