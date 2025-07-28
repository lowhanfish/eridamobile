import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView, StyleSheet, TextInput, Dimensions } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { pick } from '@react-native-documents/picker'


import useGlobalStore from "../../../stores/useGlobalStore";
import axios from "axios";



import { stylex } from "../../assets/css";
import Imagex from "../../../components/Imagex";


const AddUsulanPenelitian1 = ({ data, updateData, nextStep, excuteData }) => {


    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;
    const widthx = screenWidth - (screenWidth * 20 / 100)

    const [text, onChangeText] = useState('');

    const [id, setId] = useState(data.id);
    const [nama, setNama] = useState(data.nama);
    const [alamat, setAlamat] = useState(data.alamat);
    const [hp, setHP] = useState(data.hp);
    const [email, setEmail] = useState(data.email);
    const [nik, setNIK] = useState(data.nik);
    const [ktp, setKTP] = useState(data.ktp);
    const [status, setStatus] = useState(data.status);
    const [keterangan, setKeterangan] = useState(data.keterangan);

    const handleNext = () => {
        const newData = { id, nama, alamat, hp, email, nik, ktp, status, keterangan };
        updateData(newData);        // Update state global
        excuteData(newData);
        nextStep(); // lanjut ke step berikutnya
    };

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    // const [file, setKTP] = useState(null);

    const pickDocument = async () => {
        try {
            const result = await pick();
            if (result) {
                setKTP(result);
                console.log('File pickedx :', result);
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };



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
                                <View style={[stylex.IndicatorLamp, { backgroundColor: '#D9D9D9' }]}>
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

                    <View style={[stylex.borderContent, { marginBottom: 75 }]}>
                        {/* source={{ uri: file[0].uri }} */}

                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>Nama</Text>
                            <TextInput
                                style={stylex.inputx1}
                                onChangeText={setNama}
                                value={nama}
                            />
                        </View>
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>Alamat</Text>
                            <TextInput
                                style={stylex.inputx1}
                                onChangeText={setAlamat}
                                value={alamat}
                            />
                        </View>
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>Nomor HP</Text>
                            <TextInput
                                style={stylex.inputx1}
                                onChangeText={setHP}
                                value={hp}
                            />
                        </View>
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>Email</Text>
                            <TextInput
                                style={stylex.inputx1}
                                onChangeText={setEmail}
                                value={email}
                            />
                        </View>
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>NIK</Text>
                            <TextInput
                                style={stylex.inputx1}
                                onChangeText={setNIK}
                                value={nik}
                            />
                        </View>


                        {ktp && ktp[0] ? (
                            <View style={styles.containerUpload1}>
                                <View style={styles.containerUploadText}>
                                    <Imagex
                                        width={widthx}
                                        urix={ktp[0].uri}
                                    />
                                </View>
                            </View>
                        ) : (

                            <View style={styles.containerUpload}>
                                <View style={styles.containerUploadText}>
                                    <Text style={styles.UploadText1}>FILE KTP MASIH KOSONG</Text>
                                    <Text style={styles.UploadText2}>(PDF)</Text>
                                </View>
                            </View>
                        )}


                        {/* <Button style={styles.btnPickFile} title="Pilih Foto KTP" onPress={pickDocument} /> */}

                        <TouchableOpacity onPress={pickDocument}>
                            <View style={styles.btnPickFile}>

                                {ktp && ktp[0] ? (
                                    <Text style={styles.btnPickFileText}>Ganti Foto KTP</Text>
                                ) : (
                                    <Text style={styles.btnPickFileText}>Cari Foto KTP</Text>
                                )}

                            </View>
                        </TouchableOpacity>

                        {/* {file && (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={{ uri: file[0].uri }}
                                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                                />
                            </View>
                        )} */}









                    </View>


                </View>

            </ScrollView>
            <View style={stylex.paginContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-end' }]}>
                        <TouchableOpacity style={[stylex.paginTouchBtn, stylex.shaddow]}>
                            {/* <Image style={stylex.paginTouchBtnImg} source={require("../../assets/images/icon/prev.png")} />
                            <Text style={stylex.paginTouchBtnText}>PREF</Text> */}
                        </TouchableOpacity>
                    </View>
                    <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-start' }]}>
                        <TouchableOpacity onPress={handleNext} style={[stylex.paginTouchBtn, stylex.shaddow, { justifyContent: 'center' }]}>
                            <Text style={stylex.paginTouchBtnText}>NEXT</Text>
                            <Image style={stylex.paginTouchBtnImg} source={require("../../assets/images/icon/next.png")} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    containerUpload: {
        backgroundColor: '#D9D9D9',
        marginVertical: 25,
        height: 210,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
        // paddingHorizontal: 50,
    },
    containerUpload1: {
        backgroundColor: '#D9D9D9',
        marginVertical: 25,
        // height: 210,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
        // paddingHorizontal: 50,
    },
    containerUploadText: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'


    },
    UploadText1: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    UploadText2: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnPickFile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderRadius: 6,
        backgroundColor: '#DFB11C',
        marginTop: -5,

    },
    btnPickFileText: {
        color: 'white',
        fontWeight: '700'
    }

})



export default AddUsulanPenelitian1