import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView, TextInput, Button, StyleSheet, Platform, Modal, ToastAndroid } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { pick } from '@react-native-documents/picker'
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';


// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

import useGlobalStore from "../../../stores/useGlobalStore";
import { stylex } from "../../assets/css";
import axios from "axios";
import GetDataToken from "../../lib/GetDataToken";



const AddUsulanPenelitian4 = ({ data, updateData, nextStep, prevStep, addData }) => {
    const navigation = useNavigation();

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);


    const [text, onChangeText] = useState('');
    const [kategori, setKategori] = useState('');
    const [judulpenelitian, setJudulpenelitian] = useState('');
    const [lokasipenelitian, setLokasipenelitian] = useState('');
    const [maksudtujuan, setMaksudtujuan] = useState('');
    const [ruanglingkup, setRuanglingkup] = useState('');

    const [tglMulai, setTglMulai] = useState(new Date());
    const [tglSelesai, setTglSelesai] = useState(new Date());

    const [showMulai, setShowMulai] = useState(false);
    const [showSelesai, setShowSelesai] = useState(false);
    const isLocalPdf = typeof pdfUri === 'string' && pdfUri.startsWith('file://');


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

    



    // ===== LIFTING_STATE_UP =====
    const [name, setName] = useState(data.name);
    const handleAddData = async () => {
        if (!data.id) {
          ToastAndroid.show(
            "ID tidak ditemukan, kembali ke step 1",
            ToastAndroid.LONG
          );
          return;
        }
      
        try {
          await submitPenelitian();
      
          ToastAndroid.show(
            "Usulan penelitian berhasil disimpan",
            ToastAndroid.LONG
          );
      
          navigation.replace("ListUsulan");
        } catch (e) {
          console.log(e);
          ToastAndroid.show(
            "Gagal menyimpan data penelitian",
            ToastAndroid.SHORT
          );
        }
      };
      
    const handlePrev = () => {
        updateData({ name }); // simpan data
        prevStep(); // lanjut ke step berikutnya
    };
    // ===== LIFTING_STATE_UP =====

    const submitPenelitian = async () => {
        const token = await GetDataToken();
        const formData = new FormData();
      
        formData.append(
          "data",
          JSON.stringify({
            id: data.id,
            judul: judulpenelitian,
            lokasi: lokasipenelitian,
            tujuan: maksudtujuan,
            lingkup: ruanglingkup,
            tgl_mulai: tglMulai.toISOString().slice(0, 10),
            tgl_selesai: tglSelesai.toISOString().slice(0, 10),
            kategori_id: kategori,
          })
        );
      
        if (file && file.uri && !file.uri.startsWith("http")) {
          formData.append("file", {
            uri: file.uri,
            name: file.name || "proposal.pdf",
            type: "application/pdf",
          });
        }
      
        return axios.post(
          useGlobalStore.getState().url.URL_Penelitian + "/addPenelitianMobile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `kikensbatara ${token}`,
            },
          }
        );
      };

      useEffect(() => {
        setJudulpenelitian(data.judul || '');
        setLokasipenelitian(data.lokasi || '');
        setMaksudtujuan(data.tujuan || '');
        setRuanglingkup(data.lingkup || '');
        setKategori(data.kategori_id || '');
      
        if (data.proposal) {
          setFile({
            name: data.proposal,
            uri: useGlobalStore.getState().url.URL_APP + 'uploads/' + data.proposal,
            type: 'application/pdf',
          });
          setPdfUri(
            useGlobalStore.getState().url.URL_APP + 'uploads/' + data.proposal
          );
        }
      }, [data]);
      


    // ===== PICKFILE =====

    const [file, setFile] = useState(null);
    
    // Modal state for PDF viewer
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfError, setPdfError] = useState(null);
    const [pdfUri, setPdfUri] = useState(null);
    const canPreview = typeof pdfUri === 'string';

    const [pdfKey, setPdfKey] = useState(0);

    const pickDocument = async () => {
        try {
          const res = await pick({
            mode: "open",
            type: ["application/pdf"],
          });
      
          const f = Array.isArray(res) ? res[0] : res;
          if (!f?.uri) return;
      
          const destPath =
            RNFS.CachesDirectoryPath + `/pdf_${Date.now()}.pdf`;
      
          const base64 = await RNFS.readFile(f.uri, "base64");
          await RNFS.writeFile(destPath, base64, "base64");
      
          const localUri = "file://" + destPath;
      
          setFile({
            uri: localUri,
            name: f.name || "document.pdf",
            type: "application/pdf",
          });
      
          setPdfUri(localUri);
        } catch (e) {
          console.log("pick pdf error:", e);
          ToastAndroid.show("Gagal memilih PDF", ToastAndroid.SHORT);
        }
      };
      

      const openPdfViewer = () => {
        if (!pdfUri) {
          ToastAndroid.show("Pilih PDF terlebih dahulu", ToastAndroid.SHORT);
          return;
        }
        setPdfError(null);
        setShowPdfModal(true);
      };
      

    const closePdfModal = () => {
        setShowPdfModal(false);
        setPdfError(null);
    };
    // ===== PICKFILE =====


   

    // const [mode, setMode] = useState('date'); // or 'time'


    // const onChangeMulai = (event, selectedDate) => {
    //     const currentDate = selectedDate || tglMulai;
    //     setShowMulai(Platform.OS === 'ios');
    //     setTglMulai(currentDate);
    //   };

    //   const onChangeSelesai = (event, selectedDate) => {
    //     const currentDate = selectedDate || tglSelesai;
    //     setShowSelesai(Platform.OS === 'ios');
    //     setTglSelesai(currentDate);
    //   };
      

   

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
                                <View style={{ height: 45, borderRadius: 6, borderWidth: 1, borderColor: '#DEDCDC', paddingLeft: 10, justifyContent: 'center' }}>
                                    <Picker
                                        selectedValue={kategori}
                                        onValueChange={(itemValue) => setKategori(itemValue)}
                                        style={{ height: 55, width: '100%' }}
                                        mode="dialog"
                                        enabled={true}
                                    >
                                        <Picker.Item label="-- Pilih Kategori --" value="" />
                                        <Picker.Item label="Mahasiswa D3" value="mahasiswa_d3" />
                                        <Picker.Item label="Mahasiswa S1" value="mahasiswa_s1" />
                                        <Picker.Item label="Mahasiswa S2" value="mahasiswa_s2" />
                                        <Picker.Item label="Mahasiswa S3" value="mahasiswa_s3" />
                                        <Picker.Item label="Peneliti" value="peneliti" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Judul Penelitian</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={setJudulpenelitian}
                                    value={judulpenelitian}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Lokasi Penelitian</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={setLokasipenelitian}
                                    value={lokasipenelitian}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Maksud & Tujuan Penelitian</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={setMaksudtujuan}
                                    value={maksudtujuan}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                <Text style={stylex.inputText1}>Ruang Lingkup Penelitian</Text>
                                <TextInput
                                    style={stylex.inputx1}
                                    onChangeText={setRuanglingkup}
                                    value={ruanglingkup}
                                />
                            </View>
                            <View style={stylex.InputContainer}>
                                    <Text style={stylex.inputText1}>Tanggal Mulai</Text>
                                    <TouchableOpacity
                                        onPress={() => setShowMulai(true)}
                                        style={stylex.inputx1}
                                    >
                                        <Image style={stylex.iconInput} source={require("../../assets/images/icon/date.png")} />
                                        <Text>
                                        Tgl : {tglMulai.toLocaleDateString("id-ID")}
                                        </Text>
                                    </TouchableOpacity>
                                    </View>

                                    <View style={stylex.InputContainer}>
                                    <Text style={stylex.inputText1}>Tanggal Selesai</Text>
                                    <TouchableOpacity
                                        onPress={() => setShowSelesai(true)}
                                        style={stylex.inputx1}
                                    >
                                        <Image style={stylex.iconInput} source={require("../../assets/images/icon/date.png")} />
                                        <Text>
                                        Tgl : {tglSelesai.toLocaleDateString("id-ID")}
                                        </Text>
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
                            </View>
                        </View>



                    </View>


                </View>

            </ScrollView>

            <DatePicker
                modal
                open={showMulai}
                date={tglMulai}
                mode="date"
                locale="id"
                onConfirm={(d) => {
                    setShowMulai(false);
                    setTglMulai(d);
                }}
                onCancel={() => setShowMulai(false)}
                />

                <DatePicker
                modal
                open={showSelesai}
                date={tglSelesai}
                minimumDate={tglMulai}
                mode="date"
                locale="id"
                onConfirm={(d) => {
                    setShowSelesai(false);
                    setTglSelesai(d);
                }}
                onCancel={() => setShowSelesai(false)}
                />



            {/* PDF Viewer Modal - DIHAPUS */}
            {/* 
            <Modal visible={showPdfModal} onRequestClose={closePdfModal}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={closePdfModal} style={{ padding: 12 }}>
                <Text>Tutup</Text>
                </TouchableOpacity>

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
                    startInLoadingState
                    style={{ flex: 1 }}
                />
                ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>PDF tidak tersedia</Text>
                </View>
                )}


            </View>
            </Modal>
            */}

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
