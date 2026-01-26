import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView, TextInput, Button, StyleSheet, Platform, Modal, ToastAndroid } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { pick } from '@react-native-documents/picker'
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

import DateTimePicker from '@react-native-community/datetimepicker';



import useGlobalStore from "../../../stores/useGlobalStore";
import { stylex } from "../../assets/css";


const AddUsulanPenelitian4 = ({ data, updateData, nextStep, prevStep, addData }) => {
    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);


    const [text, onChangeText] = useState('');

    // ===== LIFTING_STATE_UP =====
    const [name, setName] = useState(data.name);
    const handleAddData = () => {
        updateData({ name }); // simpan data
        addData(); // lanjut ke step berikutnya
    };
    const handlePrev = () => {
        updateData({ name }); // simpan data
        prevStep(); // lanjut ke step berikutnya
    };
    // ===== LIFTING_STATE_UP =====


    // ===== PICKFILE =====

    const [file, setFile] = useState(null);
    
    // Modal state for PDF viewer
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfError, setPdfError] = useState(null);
    const [pdfUri, setPdfUri] = useState(null);
    const [pdfKey, setPdfKey] = useState(0);

    const pickDocument = async () => {
        try {
            const result = await pick({
                mode: 'open',
                type: ['application/pdf'],
            });
            if (result) {
                const fileData = Array.isArray(result) ? result[0] : result;
                console.log('File picked:', fileData);
                
                // Copy file to app's internal storage for PDF viewer
                if (fileData.uri && (fileData.uri.startsWith('content://') || fileData.uri.startsWith('file://'))) {
                    const destPath = `${RNFS.CachesDirectoryPath}/proposal_${Date.now()}.pdf`;
                    try {
                        await RNFS.copyFile(fileData.uri, destPath);
                        setPdfUri('file://' + destPath);
                        setFile({
                            ...fileData,
                            uri: 'file://' + destPath
                        });
                        console.log('File copied to:', destPath);
                    } catch (copyError) {
                        console.error('Error copying file:', copyError);
                        setPdfUri(fileData.uri);
                        setFile(fileData);
                    }
                } else {
                    setPdfUri(fileData.uri);
                    setFile(fileData);
                }
            }
        } catch (err) {
            console.error('Error picking document:', err);
            ToastAndroid.show('Gagal memilih file', ToastAndroid.SHORT);
        }
    };

    const openPdfViewer = async () => {
        const uriToUse = pdfUri || (file && file.uri);
        if (uriToUse) {
            setPdfError(null);
            setPdfLoading(true);
            setPdfKey(prev => prev + 1);
            setTimeout(() => {
                setShowPdfModal(true);
                console.log('Opening PDF from:', uriToUse);
            }, 100);
        } else {
            ToastAndroid.show('Pilih file PDF terlebih dahulu', ToastAndroid.SHORT);
        }
    };

    const closePdfModal = () => {
        setShowPdfModal(false);
        setPdfError(null);
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
                                <Text style={stylex.textSubTitleList2}>Data Usulan Penelitian</Text>
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
                                <View style={[stylex.IndicatorLamp, { backgroundColor: '#E9BC41' }]}>
                                    <Image style={stylex.IndicatorImg} source={require("../../assets/images/icon/check.png")} />
                                </View>
                                <Text style={stylex.IndicatorText}>Rekomendasi</Text>
                            </View>
                            <View style={stylex.IndicatorListContainer}>
                                <View style={[stylex.IndicatorLamp, { backgroundColor: '#E9BC41' }]}>
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




                    <View style={[stylex.borderContent, { marginBottom: 150 }]}>
                        <View style={{ paddingTop: 26 }}>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Kategori</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Judul Penelitian</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Lokasi Penelitian</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Maksud & Tujuan Penelitian</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Ruang Lingkup Penelitian</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Tanggal Mulai</Text>
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
                                <Text style={stylex.inputText1}>Tanggal Selesai</Text>
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
                                <Text style={stylex.inputText1}>Unggah Proposal Penelitian (PDF)</Text>
                                <TouchableOpacity onPress={pickDocument} style={stylex.inputx1}>
                                    <Image style={stylex.iconInputFile} source={require("../../assets/images/icon/file.png")} />
                                    {file && file.name ? (
                                        <Text>{file.name}</Text>
                                    ) : (
                                        <Text>Cari Proposal Penelitian (PDF)</Text>
                                    )}
                                </TouchableOpacity>
                                {file && file.uri && (
                                    <TouchableOpacity onPress={openPdfViewer}>
                                        <View style={styles.btnPickFile}>
                                            <Text style={styles.btnPickFileText}>👁 Lihat PDF</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>



                    </View>


                </View>

            </ScrollView>

            {/* PDF Viewer Modal */}
            <Modal
                visible={showPdfModal}
                animationType="slide"
                transparent={false}
                onRequestClose={closePdfModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Modal Header */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Preview Proposal Penelitian</Text>
                            <TouchableOpacity onPress={closePdfModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* PDF Viewer */}
                        <View style={styles.pdfContainer} key={pdfKey}>
                            {pdfError ? (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{pdfError}</Text>
                                    <TouchableOpacity onPress={closePdfModal} style={[styles.btnPickFile, { marginTop: 20, width: 200 }]}>
                                        <Text style={styles.btnPickFileText}>Tutup</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (pdfUri || (file && file.uri)) ? (
                                <Pdf
                                    source={{ uri: pdfUri || file.uri }}
                                    style={{ flex: 1 }}
                                    onLoadComplete={(numberOfPages, filePath) => {
                                        console.log(`PDF loaded: ${numberOfPages} pages`);
                                        setPdfLoading(false);
                                    }}
                                    onError={(error) => {
                                        setPdfLoading(false);
                                        setPdfError('Gagal memuat PDF. Silakan pilih file lain.');
                                        console.error('PDF Error:', error);
                                    }}
                                    onPageChanged={(page, numberOfPages) => {
                                        console.log(`Page: ${page}/${numberOfPages}`);
                                        setPdfLoading(false);
                                    }}
                                    enablePaging={true}
                                    horizontal={false}
                                />
                            ) : (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>File tidak ditemukan</Text>
                                    <TouchableOpacity onPress={closePdfModal} style={[styles.btnPickFile, { marginTop: 20, width: 200 }]}>
                                        <Text style={styles.btnPickFileText}>Tutup</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={stylex.paginContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-end' }]}>
                        <TouchableOpacity onPress={handlePrev} style={[stylex.paginTouchBtn, stylex.shaddow]}>
                            <Image style={stylex.paginTouchBtnImg} source={require("../../assets/images/icon/prev.png")} />
                            <Text style={stylex.paginTouchBtnText}>PREV</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[stylex.paginContainerBtn, { justifyContent: 'flex-start' }]}>
                        <TouchableOpacity onPress={handleAddData} style={[stylex.paginTouchBtn, stylex.shaddow, { justifyContent: 'center' }]}>
                            <Text style={stylex.paginTouchBtnText}>SAVE</Text>
                            <Image style={stylex.paginTouchBtnImg} source={require("../../assets/images/icon/next.png")} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    btnPickFile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderRadius: 6,
        backgroundColor: '#E9BC41',
        marginTop: 5,
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
});


export default AddUsulanPenelitian4
