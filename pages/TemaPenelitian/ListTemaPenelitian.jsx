import { useState, useCallback, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";
import ModalSetting from "../Usulan/ModalSetting";




const ListTemaPenelitian = () => {

    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const [isModalVisibleSetting, setisModalVisibleSetting] = useState(false)



    useFocusEffect(
        useCallback(() => {
            setRouteBack("Home");
            visibleBar(true, true)
        }, [visibleBar])
    )


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
                        <View style={[{ alignItems: 'flex-end' }]}>
                            <TouchableOpacity onPress={() => navigation.navigate("AddTemaPenelitian")} style={[stylex.btnCornerFlat, stylex.shaddow]}>
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
                                    {/*FFF3F3 F3FFFD FFFFF3*/}
                                    <TouchableOpacity style={[stylex.DataListCont, stylex.shaddow, { backgroundColor: '#FFFFF3' }]} onLongPress={() => setisModalVisibleSetting(true)}>
                                        <View style={stylex.DataListImgCont}>
                                            <Image style={stylex.DataListImg} source={require('../assets/images/izin_penelitian.png')} />
                                        </View>
                                        <View style={stylex.DataListTextCont}>
                                            <Text style={stylex.DataListText1}>UNIVERSITAS HALUOLEO</Text>
                                            <Text style={stylex.DataListText2}>IMPLEMENTASI METODE SIMPLE ADDITIVE WEIGHTING BERBASIS WEB UNTUK MENENTUKAN PENERIMA BANTUAN RUMAH LAYAK HUNI PADA KECAMATAN ANGATA</Text>
                                            <View style={stylex.DataListContainerBottom}>
                                                <Text style={stylex.DataListText4}>Djarot. ST.,MT (+6285241766456)</Text>
                                                <Text style={stylex.DataListText5}>22 Mei 2025</Text>
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

export default ListTemaPenelitian



