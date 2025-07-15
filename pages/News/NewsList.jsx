import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView, TextInput, Button, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { pick } from '@react-native-documents/picker'
import DateTimePicker from '@react-native-community/datetimepicker';


import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";

import RecentNews from "../../components/RecentNews";
import ModalSetting from "./ModalSetting";





const NewsList = () => {
    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);

    const [isModalVisibleSetting, setisModalVisibleSetting] = useState(false);

    const [text, onChangeText] = useState('');





    // ===== PICKDATE =====
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date'); // or 'time'


    const onChange = (event, selectedDate) => {
        console.log(selectedDate)
        const currentDate = selectedDate || date;
        // console.log(currentDate)
        setShow(Platform.OS === 'ios'); // untuk iOS tetap tampil, Android hilang
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    // ===== PICKDATE =====



    useFocusEffect(
        useCallback(() => {
            setRouteBack("ListUsulan");
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









                    <View style={[stylex.borderContent, { marginBottom: 150 }]}>
                        <View style={{ paddingTop: 5 }}>


                            <View style={[stylex.InputContainer, styles.filterContainer]}>
                                <Text style={stylex.inputText1}>Cari Berita</Text>
                                <View style={stylex.inputWithButtonContainer}>

                                    <TextInput
                                        style={stylex.inputx2}
                                        onChangeText={onChangeText}
                                        value={text}
                                    />
                                    <TouchableOpacity onPress={() => setisModalVisibleSetting(true)} style={stylex.inputIcon2}>
                                        <Image style={stylex.inputIconImg} source={require("../assets/images/icon/filter.png")} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <RecentNews />

                            <ModalSetting
                                visible={isModalVisibleSetting} // Teruskan state visibilitas
                                onClose={() => setisModalVisibleSetting(!isModalVisibleSetting)} // Teruskan fungsi untuk menutup modal
                            />

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
    }
})


export default NewsList