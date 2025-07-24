import { useEffect, useCallback, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";

const AddTemaPenelitian = () => {


    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const [text, onChangeText] = useState('');


    useFocusEffect(
        useCallback(() => {
            setRouteBack("ListTemaPenelitian");
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
                                <Text style={stylex.textTitleList}>FORM USULAN TEMA PENELITIAN</Text>
                                <Text style={stylex.textSubTitleList2}>Usulan Tema Penelitian</Text>
                            </View>
                        </View>
                    </View>













                    <View style={stylex.borderContent}>
                        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Asal Organisasi Perangkat Daerah/Instansi</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Usulan Tema Penelitian/Riset/Kajian OPD</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Nama PIC OPD</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Nomor Whatsapp OPD</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>


                            <TouchableOpacity style={{ marginTop: 25 }}>
                                <View style={stylex.btnPickFile}>

                                    <View>
                                        <Image style={stylex.btnCornerFlatIcon} source={require('../assets/images/icon/plus.png')} />
                                    </View>
                                    <View>
                                        <Text style={stylex.btnCornerFlatText}>KIRIM USULAN</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>



                    </View>


                </View>

            </ScrollView>

        </View>
    )

}

export default AddTemaPenelitian