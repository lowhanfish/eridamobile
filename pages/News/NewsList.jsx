import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView, TextInput, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { pick } from '@react-native-documents/picker'
import DateTimePicker from '@react-native-community/datetimepicker';



import useGlobalStore from "../../../stores/useGlobalStore";
import { stylex } from "../../assets/css";


const NewsList = () => {
    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);


    const [text, onChangeText] = useState('');


    // ===== PICKFILE =====

    const [file, setFile] = useState(null);

    const pickDocument = async () => {
        try {
            const result = await pick({
                type: ['application/pdf']
                // type: ['image/*']
            });
            if (result) {
                setFile(result);
                console.log('File pickedx :', result);
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };
    // ===== PICKFILE =====


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
                        <View style={{ paddingTop: 26 }}>

                        </View>
                    </View>


                </View>

            </ScrollView>

        </View>
    )

}


export default NewsList