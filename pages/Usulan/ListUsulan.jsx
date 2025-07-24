import { useState, useEffect, useCallback } from "react";
import { Modal, Button, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useGlobalStore from "../../stores/useGlobalStore";

import { stylex } from "../assets/css";

import ModalSetting from "./ModalSetting.jsx";



const ListUsulan = () => {
    const navigation = useNavigation();




    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const [isModalVisibleSetting, setisModalVisibleSetting] = useState(false);






    useFocusEffect(
        useCallback(() => {
            setRouteBack("Home");
            visibleBar(true, true)
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
                            <TouchableOpacity onPress={() => navigation.navigate("AddUsulanPenelitian1")} style={[stylex.btnCornerFlat, stylex.shaddow]}>
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

                        {[...Array(10)].map((_, i) => (
                            <View key={i} style={{ flex: 1, marginTop: 9 }}>

                                <View >
                                    <TouchableOpacity style={[stylex.DataListCont, stylex.shaddow, { backgroundColor: '#FFF3F3' }]} onLongPress={() => setisModalVisibleSetting(true)}>
                                        <View style={stylex.DataListImgCont}>
                                            <Image style={stylex.DataListImg} source={require('../assets/images/izin_penelitian.png')} />
                                        </View>
                                        <View style={stylex.DataListTextCont}>
                                            <Text style={stylex.DataListText1}>Dr. Djarot Melin</Text>
                                            <Text style={stylex.DataListText2}>IMPLEMENTASI METODE SIMPLE ADDITIVE WEIGHTING BERBASIS WEB UNTUK MENENTUKAN PENERIMA BANTUAN RUMAH LAYAK HUNI PADA KECAMATAN ANGATA</Text>
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
                            <TouchableOpacity style={[stylex.paginTouchBtn, stylex.shaddow]}>
                                <Image style={stylex.paginTouchBtnImg} source={require("../assets/images/icon/prev.png")} />
                                <Text style={stylex.paginTouchBtnText}>PREF</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={stylex.paginContainerText}>
                            <Text style={stylex.paginText}>1 - 12</Text>
                        </View>
                        <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-start' }]}>
                            <TouchableOpacity style={[stylex.paginTouchBtn, stylex.shaddow, { justifyContent: 'center' }]}>
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