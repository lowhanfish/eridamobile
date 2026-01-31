import { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import { pick } from '@react-native-documents/picker';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import { Modal, ToastAndroid } from 'react-native';
import axios from "axios";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";
import GetDataToken from "../lib/GetDataToken";
import ImageLib from "../../components/ImageLib.jsx";

const AddKrenova = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    const urlx = useGlobalStore((state) => state.url);

    const route = useRoute();
    const { typex, id } = route.params || {};

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // ===== PICKFILE PDF =====
    const [file, setFile] = useState(null);

    // Modal PDF
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfError, setPdfError] = useState(null);
    const [pdfUri, setPdfUri] = useState(null);
    const [pdfKey, setPdfKey] = useState(0);
    // ===== PICKFILE PDF =====


    // Form data state
    const [formData, setFormData] = useState({
        tahun: "",
        author: "",
        judul: "",
        deskripsi: "",
        file: null,
        fileName: "",
    });

    // Generate tahun options (5 tahun terakhir)
    const currentYear = new Date().getFullYear();
    const tahunOptions = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

    const updateData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setErrorMessage("");
    };

    const addDataKrenova = async () => {
        const token = await GetDataToken();
        const formDataSend = new FormData();
    
        formDataSend.append(
            'data',
            JSON.stringify({
                penulis: formData.author,
                judul: formData.judul,
                isi: formData.deskripsi,
                tahun: {
                    id: formData.tahun,
                },
            })
        );
    
        if (file && file.uri && !file.uri.startsWith('http')) {
            formDataSend.append('file', {
                uri: file.uri,
                name: file.name || 'krenova.pdf',
                type: 'application/pdf',
            });
        }
    
        return axios.post(
            urlx.URL_Krenova + 'addData',
            formDataSend,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `kikensbatara ${token}`,
                },
            }
        );
    };

    
    

    const pickDocument = async () => {
        try {
            const result = await pick({
                mode: 'open',
                type: ['application/pdf'],
            });
    
            if (result) {
                const fileData = Array.isArray(result) ? result[0] : result;
                console.log('File picked:', fileData);
    
                if (
                    fileData.uri &&
                    (fileData.uri.startsWith('content://') ||
                     fileData.uri.startsWith('file://'))
                ) {
                    const destPath = `${RNFS.CachesDirectoryPath}/krenova_${Date.now()}.pdf`;
    
                    try {
                        await RNFS.copyFile(fileData.uri, destPath);
                        setPdfUri('file://' + destPath);
                        setFile({
                            ...fileData,
                            uri: 'file://' + destPath,
                        });
                    } catch (copyError) {
                        console.error('Copy file error:', copyError);
                        setPdfUri(fileData.uri);
                        setFile(fileData);
                    }
                } else {
                    setPdfUri(fileData.uri);
                    setFile(fileData);
                }
            }
        } catch (err) {
            console.error('Pick PDF error:', err);
            ToastAndroid.show('Gagal memilih file PDF', ToastAndroid.SHORT);
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
            }, 100);
        } else {
            ToastAndroid.show('Pilih file PDF terlebih dahulu', ToastAndroid.SHORT);
        }
    };
    
    const closePdfModal = () => {
        setShowPdfModal(false);
        setPdfError(null);
    };
    
    

    const removeFile = () => {
        updateData('file', null);
        updateData('fileName', "");
    };

    const validateForm = () => {
        if (!formData.tahun) {
            setErrorMessage("Tahun harus dipilih");
            return false;
        }
        if (!formData.author || formData.author.trim() === "") {
            setErrorMessage("Author harus diisi");
            return false;
        }
        if (!formData.judul || formData.judul.trim() === "") {
            setErrorMessage("Judul harus diisi");
            return false;
        }
        if (!formData.deskripsi || formData.deskripsi.trim() === "") {
            setErrorMessage("Deskripsi harus diisi");
            return false;
        }
        if (!file || !file.uri) {
            setErrorMessage("Dokumen Krenova (PDF) wajib diunggah");
            return false;
        }
        return true;
    };

    const submitData = async () => {
        if (!validateForm()) return;
    
        setLoading(true);
    
        try {
            await addDataKrenova();
    
            Alert.alert(
                "Sukses",
                "Data Kreatifitas/Inovasi berhasil disimpan",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (err) {
            console.log('Add Krenova error:', err);
            Alert.alert("Gagal", "Data tidak berhasil disimpan");
        } finally {
            setLoading(false);
        }
    };
    

    const fetchDetail = async (id) => {
        // Dummy fetch - replace with real API when available
        setLoading(true);
        setTimeout(() => {
            // Simulate data
            setFormData({
                tahun: "2024",
                author: "Ahmad Fauzi",
                judul: "Inovasi Pengembangan Energi Terbarukan",
                deskripsi: "Pengembangan teknologi panel surya sederhana untuk daerah terpencil",
                file: null,
                fileName: "dokumen.pdf",
            });
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        if (typex === "edit" && id) {
            fetchDetail(id);
        }
    }, [typex, id]);

    useFocusEffect(
        useCallback(() => {
            setRouteBack("ListKrenova");
            visibleBar(true, true);
        }, [visibleBar])
    );

    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View style={{ flex: 1, paddingBottom: 72 }}>
                    <View style={stylex.pageTitleContainer}>
                        <View style={[stylex.pageTitleItemContainer, { justifyContent: 'center' }]}>
                            <View >
                                <Text style={stylex.textTitleList}>
                                    {typex === 'edit' ? 'EDIT KREATIVITAS/INOVASI' : 'TAMBAH KREATIVITAS/INOVASI'}
                                </Text>
                                <Text style={stylex.textSubTitleList2}>Krenova</Text>
                            </View>
                        </View>
                    </View>

                    {/* Error Alert */}
                    {errorMessage !== "" && (
                        <View style={stylex.ErrorAlert}>
                            <Text style={stylex.ErrorAlertText}>{errorMessage}</Text>
                        </View>
                    )}

                    <View style={[stylex.borderContent, { marginBottom: 75 }]}>

                        <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText1}>Tahun</Text>
                        <TextInput
                            style={stylex.inputx1}
                            value={formData.tahun}
                            keyboardType="number-pad"
                            onChangeText={(v) => updateData('tahun', v)}
                            placeholder="Contoh: 2024"
                        />
                        </View>

                        <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText1}>Author</Text>
                        <TextInput
                            style={stylex.inputx1}
                            value={formData.author}
                            onChangeText={(v) => updateData('author', v)}
                        />
                        </View>

                        <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText1}>Judul</Text>
                        <TextInput
                            style={stylex.inputx1}
                            value={formData.judul}
                            onChangeText={(v) => updateData('judul', v)}
                        />
                        </View>

                        <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText1}>Deskripsi</Text>
                        <TextInput
                            style={[stylex.inputx1, { height: 100 }]}
                            multiline
                            value={formData.deskripsi}
                            onChangeText={(v) => updateData('deskripsi', v)}
                        />
                        </View>

                        {/* Upload PDF */}
                        <View style={stylex.InputContainer}>
                            <Text style={stylex.inputText1}>Unggah Dokumen Krenova (PDF)</Text>

                            <TouchableOpacity
                                onPress={pickDocument}
                                style={[
                                    stylex.inputx1,
                                    {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 8,
                                        backgroundColor: file ? '#F8F8F8' : 'white',
                                    },
                                ]}
                            >
                                <Image
                                    style={stylex.iconInputFile}
                                    source={require("../assets/images/icon/file.png")}
                                />

                                <Text
                                    numberOfLines={1}
                                    style={{ color: file ? '#000' : '#9D9D9D' }}
                                >
                                    {file && file.name
                                        ? file.name
                                        : 'Cari Dokumen Krenova (PDF)'}
                                </Text>
                            </TouchableOpacity>

                            {file && file.uri && (
                                <TouchableOpacity
                                    onPress={openPdfViewer}
                                    style={{ marginTop: 8 }}
                                >
                                    <View style={styles.btnPickFile}>
                                        <Text style={styles.btnPickFileText}>👁 Lihat PDF</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>



                        <TouchableOpacity
                            style={[stylex.btnLogin, { marginHorizontal: 16, marginBottom: 30 }]}
                            onPress={submitData}
                            disabled={loading}
                        >
                            {loading ? (
                                <ImageLib
                                    style={{ width: 50 }}
                                    urix={require('../assets/images/loading2.gif')}
                                />
                            ) : (
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                    {typex === 'edit' ? 'UPDATE' : 'SIMPAN'}
                                </Text>
                            )}
                        </TouchableOpacity>

                    </View>

                    


                    


                </View>
            </ScrollView>

            <Modal
    visible={showPdfModal}
    animationType="slide"
    transparent={false}
    onRequestClose={closePdfModal}
>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Preview Dokumen Krenova</Text>
                <TouchableOpacity onPress={closePdfModal}>
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.pdfContainer} key={pdfKey}>
                {pdfError ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{pdfError}</Text>
                    </View>
                ) : (pdfUri || (file && file.uri)) ? (
                    <Pdf
                        source={{ uri: pdfUri || file.uri }}
                        style={{ flex: 1 }}
                        onLoadComplete={() => setPdfLoading(false)}
                        onError={(error) => {
                            console.error(error);
                            setPdfError('Gagal memuat PDF');
                            setPdfLoading(false);
                        }}
                        enablePaging
                    />
                ) : (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>File tidak ditemukan</Text>
                    </View>
                )}
            </View>
        </View>
    </View>
</Modal>


            
        </View>

        
    );
};

const styles = StyleSheet.create({
    yearPickerContainer: {
        backgroundColor: 'white',
        borderRadius: 6,
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#DEDCDC',
        maxHeight: 150,
        overflow: 'hidden',
    },
    yearOption: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    yearOptionText: {
        color: '#000',
        fontSize: 16,
    },
    containerUpload1: {
        backgroundColor: '#D9D9D9',
        marginVertical: 25,
        minHeight: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },

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

export default AddKrenova;

