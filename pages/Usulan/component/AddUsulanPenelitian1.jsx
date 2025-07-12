import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView, StyleSheet, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";



import { pick } from '@react-native-documents/picker'



import useGlobalStore from "../../../stores/useGlobalStore";
import { stylex } from "../../assets/css";


const AddUsulanPenelitian1 = () => {

    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);


    const [file, setFile] = useState(null);

    const pickDocument = async () => {
        try {
            const result = await pick();
            if (result) {
                setFile(result);
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

                        <View style={styles.containerUpload}>
                            <View style={styles.containerUploadText}>
                                <Text style={styles.UploadText1}>PILIH FILE KTP (PDF)</Text>
                                <Text style={styles.UploadText2}>di sini</Text>
                            </View>
                        </View>


                        <View style={{ padding: 20 }}>
                            <Button title="Pick Document" onPress={pickDocument} />
                            {file && (
                                <View style={{ marginTop: 20, alignItems: 'center' }}>
                                    {/* <Text>{file[0].name}</Text> */}
                                    <Image
                                        source={{ uri: file[0].uri }}
                                        style={{ width: 200, height: 200, resizeMode: 'contain' }}
                                    />
                                </View>
                            )}
                        </View>


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
                        <TouchableOpacity onPress={() => navigation.navigate("AddUsulanPenelitian2")} style={[stylex.paginTouchBtn, stylex.shaddow, { justifyContent: 'center' }]}>
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
        marginVertical: 50,
        height: 210,
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

})



export default AddUsulanPenelitian1