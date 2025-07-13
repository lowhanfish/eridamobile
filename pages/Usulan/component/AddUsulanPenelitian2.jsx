import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView, TextInput, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { pick } from '@react-native-documents/picker'
import DateTimePicker from '@react-native-community/datetimepicker';



import useGlobalStore from "../../../stores/useGlobalStore";
import { stylex } from "../../assets/css";


const AddUsulanPenelitian2 = () => {
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
                                <Text style={stylex.textTitleList}>FORM USULAN PENELITIAN</Text>
                                <Text style={stylex.textSubTitleList2}>Identitas pengusul </Text>
                            </View>
                        </View>
                    </View>





                    <View style={stylex.IndicatorContainer}>
                        <View style={stylex.IndicatorContainer1}>

                            <View style={stylex.IndicatorListContainer}>
                                <View style={[stylex.IndicatorLamp, { backgroundColor: '#E9BC41' }]}>
                                    <Image style={stylex.IndicatorImg} source={require("../../assets/images/icon/check.png")} />
                                </View>
                                <Text style={stylex.IndicatorText}>KTP</Text>
                            </View>
                            <View style={stylex.IndicatorListContainer}>
                                <View style={[stylex.IndicatorLamp, { backgroundColor: '#E9BC41' }]}>
                                    <Image style={stylex.IndicatorImg} source={require("../../assets/images/icon/check.png")} />
                                </View>
                                <Text style={stylex.IndicatorText}>Pengantar</Text>
                            </View>
                            <View style={stylex.IndicatorListContainer}>
                                <View style={[stylex.IndicatorLamp, { backgroundColor: '#D9D9D9' }]}>
                                    <Image style={stylex.IndicatorImg} source={require("../../assets/images/icon/check.png")} />
                                </View>
                                <Text style={stylex.IndicatorText}>Rekomendasi</Text>
                            </View>
                            <View style={stylex.IndicatorListContainer}>
                                <View style={[stylex.IndicatorLamp, { backgroundColor: '#D9D9D9' }]}>
                                    <Image style={stylex.IndicatorImg} source={require("../../assets/images/icon/check.png")} />
                                </View>
                                <Text style={stylex.IndicatorText}>Penelitian</Text>
                            </View>
                        </View>
                        <View style={stylex.IndicatorContainer2}>

                        </View>
                    </View>






                    {/* <View style={{ padding: 16 }}>
                        <Text>Tanggal: {date.toLocaleString()}</Text>
                        <Button onPress={() => showMode('date')} title="Pilih Tanggal" />
                        <Button onPress={() => showMode('time')} title="Pilih Jam" />

                        {show ? (
                            <Text>Tanggal: {date.toLocaleString()}</Text>
                        ) : (
                            <Text>Tanggal: {date.toLocaleString()}</Text>
                        )}
                    </View> */}




                    <View style={stylex.borderContent}>
                        <View style={{ paddingTop: 26, paddingBottom: 36 }}>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Nomor Surat Pengantar</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Tanggal Surat Pengantar</Text>
                                <TouchableOpacity onPress={() => showMode('date')} style={stylex.inputx1}>
                                    <Image style={stylex.iconInput} source={require("../../assets/images/icon/date.png")} />
                                    <Text>Tgl : {date.toLocaleDateString()}</Text>
                                    {show && (
                                        <DateTimePicker
                                            value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Nama Penandatangan Surat Pengantar</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Jabatan Penandatangan Surat Pengantar</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Surat Pengantar (PDF)</Text>
                                <TouchableOpacity onPress={pickDocument} style={stylex.inputx1}>
                                    <Image style={stylex.iconInputFile} source={require("../../assets/images/icon/file.png")} />
                                    {file && file[0] ? (
                                        <Text>{file[0].name}</Text>
                                    ) : (
                                        <Text>Cari Surat Pengantar (PDF)</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>



                    </View>


                </View>

            </ScrollView>
            <View style={stylex.paginContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-end' }]}>
                        <TouchableOpacity onPress={() => navigation.navigate("AddUsulanPenelitian1")} style={[stylex.paginTouchBtn, stylex.shaddow]}>
                            <Image style={stylex.paginTouchBtnImg} source={require("../../assets/images/icon/prev.png")} />
                            <Text style={stylex.paginTouchBtnText}>PREF</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-start' }]}>
                        <TouchableOpacity onPress={() => navigation.navigate("AddUsulanPenelitian3")} style={[stylex.paginTouchBtn, stylex.shaddow, { justifyContent: 'center' }]}>
                            <Text style={stylex.paginTouchBtnText}>NEXT</Text>
                            <Image style={stylex.paginTouchBtnImg} source={require("../../assets/images/icon/next.png")} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )

}


export default AddUsulanPenelitian2