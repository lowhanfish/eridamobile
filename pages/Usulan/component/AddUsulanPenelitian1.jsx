import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView, StyleSheet, TextInput, Dimensions, Linking, Platform, Modal, ActivityIndicator, ToastAndroid } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { pick } from '@react-native-documents/picker'
import { WebView } from 'react-native-webview';

import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useGlobalStore from "../../../stores/useGlobalStore";
import axios from "axios";



import { stylex } from "../../assets/css";
import Imagex from "../../../components/Imagex";
import ImageLib from "../../../components/ImageLib";
import GetDataToken from "../../lib/GetDataToken";






const AddUsulanPenelitian1 = ({ data, updateData, nextStep, routex }) => {

    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;
    const widthx = screenWidth - (screenWidth * 20 / 100)
    const urlx = useGlobalStore((state) => state.url)

    // const [id, setId] = useState(data.id);
    const [nama, setNama] = useState(data.nama);
    const [alamat, setAlamat] = useState(data.alamat);
    const [hp, setHP] = useState(data.hp);
    const [email, setEmail] = useState(data.email);
    const [nik, setNIK] = useState(data.nik);
    const [ktp, setKTP] = useState(data.ktp);
    const [status, setStatus] = useState(data.status);
    const [keterangan, setKeterangan] = useState(data.keterangan);
    
    // Modal state for PDF viewer
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfError, setPdfError] = useState(null);
    const [pdfUri, setPdfUri] = useState(null);
    const [pdfKey, setPdfKey] = useState(0);
    
    // Check if PDF is local file
    const isLocalPdf = typeof pdfUri === 'string' && pdfUri.startsWith('file://');

    const [localId, setLocalId] = useState(data.id);

    const uriToUse = pdfUri || (ktp && ktp.uri);
    const isLocalFile = uriToUse?.startsWith('file://');

    // Fungsi untuk load user profile dari AsyncStorage
    const loadUserProfile = async () => {
        try {
            const profileData = await AsyncStorage.getItem('userProfile');
            if (profileData) {
                const parsedProfile = JSON.parse(profileData);
                const userProfile = parsedProfile.profile || parsedProfile;
                
                console.log('User Profile loaded:', userProfile);
                
                // Auto-fill form dengan data user login
                if (userProfile) {
                    // Auto-fill nama, hp, email dari biodata user
                    if (userProfile.nama) {
                        setNama(userProfile.nama);
                    }
                    if (userProfile.hp) {
                        setHP(userProfile.hp);
                    } else if (userProfile.no_hp) {
                        setHP(userProfile.no_hp);
                    }
                    if (userProfile.email) {
                        setEmail(userProfile.email);
                    }
                }
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    };

    // Load user profile saat component mount
    useEffect(() => {
        loadUserProfile();
    }, []);

    useEffect(() => {
        setLocalId(data.id);
    }, [data.id]);



    // const checkEdit = () => {

    //     if (routex.typex == 'edit') {
    //         // setId(routex.id);
    //         setNama(routex.nama);
    //         setAlamat(routex.alamat);
    //         setHP(routex.hp);
    //         setEmail(routex.email);
    //         setNIK(routex.nik);
    //         setKTP(routex.ktp);
    //         setStatus(routex.status);
    //         setKeterangan(routex.keterangan);
    //     }
    // }


    const addDatax = async (datax) => {
        const tokenz = await GetDataToken();
        const formDatax = new FormData();
    
        // ⬇️ WAJIB: kirim data sebagai JSON string
        formDatax.append('data', JSON.stringify({
            nama: datax.nama,
            alamat: datax.alamat,
            hp: datax.hp,
            email: datax.email,
            nik: datax.nik,
        }));
    
        if (datax.ktp && datax.ktp.uri) {
            formDatax.append('file', {
                uri: datax.ktp.uri,
                name: datax.ktp.name,
                type: datax.ktp.type || 'application/pdf',
            });
        }
    
        // ⬇️ WAJIB return
        return axios.post(
            urlx.URL_Penelitian + "/addDataMobilePengusul",
            formDatax,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `kikensbatara ${tokenz}`,
                },
            }
        );
    };
    

    const editDatax = async (datax) => {
        const tokenz = await GetDataToken();
        const formDatax = new FormData();
    
        formDatax.append(
            'data',
            JSON.stringify({
                id: datax.id,
                nama: datax.nama,
                alamat: datax.alamat,
                hp: datax.hp,
                email: datax.email,
                nik: datax.nik,
                status: datax.status,
                keterangan: datax.keterangan,
            })
        );
    
        if (datax.ktp && datax.ktp.uri) {
            formDatax.append('file', {
                uri: datax.ktp.uri,
                name: datax.ktp.name,
                type: datax.ktp.type || 'application/pdf',
            });
        }
    
        return axios.post(
            urlx.URL_Penelitian + "/editData",
            formDatax,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `kikensbatara ${tokenz}`,
                },
            }
        );
    };
    

    const setAction = async () => {
        if (!isFormValid) {
            ToastAndroid.show(
                "Lengkapi Alamat, NIK, dan Upload KTP terlebih dahulu",
                ToastAndroid.SHORT
            );
            return;
        }
        const payload = {
            id: localId,
            nama,
            alamat,
            hp,
            email,
            nik,
            ktp,
            status,
            keterangan,
        };
    
        try {
            console.log('ID SAAT NEXT STEP-1:', data.id);

            // 🔴 INSERT HANYA SEKALI
            if (localId === null) {

                const res = await addDatax(payload);

                setLocalId(res.data.id);
                    updateData({
                        ...payload,
                        id: res.data.id,
                    });
            } 
            // 🟢 SETELAH ITU SEMUA UPDATE
            else {
                await editDatax(payload);
    
                // pastikan id tetap ikut
                updateData(payload);
            }
    
            nextStep();
        } catch (err) {
            console.log(err);
            ToastAndroid.show("Gagal menyimpan data", ToastAndroid.SHORT);
        }
    };
    
    



    // const handleNext = () => {
    //     const newData = { id, nama, alamat, hp, email, nik, ktp, status, keterangan };
    //     updateData(newData);        // Update state global

    //     if (routex.typex == 'edit') {
    //         console.log("ini edit")
    //         editData(newData);
    //     } else {
    //         console.log("ini add")
    //         excuteData(newData);
    //     }


    //     // nextStep(); // lanjut ke step berikutnya
    // };



    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    // const [file, setKTP] = useState(null);

    const pickDocument = async () => {
        try {
            const res = await pick({
                mode: 'open',
                type: ['application/pdf'],
            });

            const f = Array.isArray(res) ? res[0] : res;
            if (!f?.uri) return;

            const destPath = RNFS.CachesDirectoryPath + `/ktp_${Date.now()}.pdf`;

            const base64 = await RNFS.readFile(f.uri, 'base64');
            await RNFS.writeFile(destPath, base64, 'base64');

            const localUri = 'file://' + destPath;

            setKTP({
                uri: localUri,
                name: f.name || 'KTP.pdf',
                type: 'application/pdf',
            });

            setPdfUri(localUri);
        } catch (e) {
            console.log('pick pdf error:', e);
            ToastAndroid.show('Gagal memilih PDF', ToastAndroid.SHORT);
        }
    };

    const openKtpViewer = () => {
        if (!pdfUri) {
            ToastAndroid.show('Pilih PDF terlebih dahulu', ToastAndroid.SHORT);
            return;
        }
        setPdfError(null);
        setShowPdfModal(true);
    };

    const closePdfModal = () => {
        setShowPdfModal(false);
        setPdfError(null);
    };

    const handlePdfLoadComplete = (numberOfPages, filePath) => {
        console.log(`PDF loaded: ${numberOfPages} pages`);
        setPdfLoading(false);
    };

    const handlePdfError = (error) => {
        setPdfLoading(false);
        setPdfError('Gagal memuat PDF. Silakan pilih file lain.');
        console.error('PDF Error:', error);
    };

    // useEffect(() => {
    //     checkEdit();
    // }, [])

    useEffect(() => {
        setNama(data.nama);
        setAlamat(data.alamat);
        setHP(data.hp);
        setEmail(data.email);
        setNIK(data.nik);
        setKTP(data.ktp);
        setStatus(data.status);
        setKeterangan(data.keterangan);
    }, [data]);
    


    useFocusEffect(
        useCallback(() => {
            setRouteBack("ListUsulan");
            visibleBar(true, true);
        }, [visibleBar])
    )

    const isFormValid =
    alamat?.trim().length > 0 &&
    nik?.trim().length > 0 &&
    ktp !== null;

    const getPdfHtml = (uri) => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
            html, body {
                margin: 0;
                padding: 0;
                height: 100%;
                background: #000;
            }
            embed {
                width: 100%;
                height: 100%;
            }
            </style>
        </head>
        <body>
            <embed src="${uri}" type="application/pdf" />
        </body>
        </html>
        `;



    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage} showsVerticalScrollIndicator={false}>
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

                    <View style={stylex.borderContent}>
                        {/* NAMA - Auto-filled & Read-only */}
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>Nama</Text>
                            <TextInput
                                style={[stylex.inputx1, styles.readOnlyInput]}
                                onChangeText={setNama}
                                value={nama}
                                editable={false}
                                pointerEvents="none"
                            />
                        </View>
                        
                        {/* ALAMAT - Required */}
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>Alamat <Text style={styles.requiredStar}>*</Text></Text>
                            <TextInput
                                style={stylex.inputx1}
                                onChangeText={setAlamat}
                                value={alamat}
                                placeholder="Masukkan alamat lengkap"
                            />
                        </View>
                        
                        {/* NOMOR HP - Auto-filled & Read-only */}
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>Nomor HP</Text>
                            <TextInput
                                style={[stylex.inputx1, styles.readOnlyInput]}
                                onChangeText={setHP}
                                value={hp}
                                editable={false}
                                pointerEvents="none"
                            />
                        </View>
                        
                        {/* EMAIL - Auto-filled & Read-only */}
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>Email</Text>
                            <TextInput
                                style={[stylex.inputx1, styles.readOnlyInput]}
                                onChangeText={setEmail}
                                value={email}
                                editable={false}
                                pointerEvents="none"
                                keyboardType="email-address"
                            />
                        </View>
                        
                        {/* NIK - Required */}
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>NIK <Text style={styles.requiredStar}>*</Text></Text>
                            <TextInput
                                style={stylex.inputx1}
                                onChangeText={setNIK}
                                value={nik}
                                placeholder="Masukkan NIK"
                                keyboardType="numeric"
                            />
                        </View>


                        {/* KTP Upload - Required */}
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>Upload KTP (PDF) <Text style={styles.requiredStar}>*</Text></Text>
                            <TouchableOpacity onPress={pickDocument} style={stylex.inputx1}>
                                <Image style={stylex.iconInputFile} source={require("../../assets/images/icon/file.png")} />
                                {ktp && ktp.name ? (
                                    <Text>{ktp.name}</Text>
                                ) : (
                                    <Text>Cari File KTP (PDF)</Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        
                        {/* PAGINATION BUTTON (DI DALAM CARD) */}
                

                    </View>


                    <View style={{ flex: 1, flexDirection: 'row', marginTop:30, marginBottom:30 }}>

                                {/* PREV (kosong / tidak dipakai di step pertama) */}
                                <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-end' }]}>
                                    <TouchableOpacity
                                        disabled
                                        style={[stylex.paginTouchBtn, { opacity: 0 }]}
                                    />
                                    
                                </View>

                                {/* NEXT */}
                                <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-start' }]}>
                                    <TouchableOpacity
                                        onPress={setAction}
                                        disabled={!isFormValid}
                                        style={[
                                            stylex.paginTouchBtn,
                                            stylex.shaddow,
                                            {
                                                justifyContent: 'center',
                                                opacity: isFormValid ? 1 : 0.5
                                            }
                                        ]}
                                    >
                                        <Text style={stylex.paginTouchBtnText}>NEXT</Text>
                                        <Image
                                            style={stylex.paginTouchBtnImg}
                                            source={require("../../assets/images/icon/next.png")}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>


                </View>

            </ScrollView>

          

            {/* PDF Viewer Modal - DIHAPUS */}
            {/* 
            <Modal visible={showPdfModal} onRequestClose={closePdfModal}>
                <View style={{ flex: 1, backgroundColor: '#000' }}>
                    <View style={{
                        height: 50,
                        backgroundColor: '#DFB11C',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 15
                    }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Preview KTP</Text>
                        <TouchableOpacity onPress={closePdfModal}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    {pdfUri ? (
                        <WebView
                            originWhitelist={['*']}
                            source={
                                isLocalPdf
                                    ? { html: getPdfHtml(pdfUri) }
                                    : {
                                        uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUri)}`
                                    }
                            }
                            startInLoadingState={true}
                            style={{ flex: 1, backgroundColor: '#000' }}
                            renderLoading={() => (
                                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                                    <ActivityIndicator size="large" color="#DFB11C" />
                                    <Text style={{ color: '#fff', marginTop: 10 }}>Memuat PDF...</Text>
                                </View>
                            )}
                        />
                    ) : (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff' }}>PDF tidak tersedia</Text>
                        </View>
                    )}
                </View>
            </Modal>
            */}

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
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '95%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#DFB11C',
    },
    modalTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    pdfContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
    },
    pdfIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    pdfIconText: {
        fontSize: 48,
        marginBottom: 10,
    },
    pdfFileName: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // New styles for auto-fill feature
    infoBanner: {
        backgroundColor: '#E3F2FD',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    infoBannerText: {
        fontSize: 12,
        color: '#1565C0',
        textAlign: 'center',
    },
    readOnlyInput: {
        backgroundColor: '#F5F5F5',
        color: '#666',
    },
    requiredStar: {
        color: 'red',
        fontWeight: 'bold',
    },
    readOnlyInput: {
        backgroundColor: '#F5F5F5',
        color: '#666',
    },
    inputError: {
        borderWidth: 1,
        borderColor: 'red',
    },

    btnNext: {
        marginTop: 30,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#DFB11C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    btnNextDisabled: {
        backgroundColor: '#BDBDBD',
    },
    
    btnNextText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    

})

export default AddUsulanPenelitian1
