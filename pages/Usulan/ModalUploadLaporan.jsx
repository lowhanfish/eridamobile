import { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid,
    Linking
} from "react-native";
import { pick } from '@react-native-documents/picker';

import axios from "axios";

import useGlobalStore from "../../stores/useGlobalStore";
import GetDataToken from "../lib/GetDataToken";

const ModalUploadLaporan = ({ visible, onClose, data, onSuccess }) => {
    const urlx = useGlobalStore(state => state.url);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickFile = async () => {
        try {
            const result = await pick({
                type: ['application/pdf'],
            });
    
            const fileData = Array.isArray(result) ? result[0] : result;
    
            setFile({
                uri: fileData.uri,
                name: fileData.name || 'laporan.pdf',
                type: 'application/pdf',
            });
        } catch (err) {
            if (err?.code !== 'DOCUMENT_PICKER_CANCELED') {
                ToastAndroid.show("Gagal memilih file", ToastAndroid.SHORT);
                console.log(err);
            }
        }
    };
    

    const handleUpload = async () => {
        if (!file) {
            ToastAndroid.show("Pilih file laporan terlebih dahulu", ToastAndroid.SHORT);
            return;
        }

        setLoading(true);

        try {
            const token = await GetDataToken();
            const formData = new FormData();

            formData.append("data", JSON.stringify({
                id: data.id,
            }));

            formData.append("file", {
                uri: file.uri,
                name: file.name,
                type: "application/pdf",
            });

            await axios.post(
                urlx.URL_Penelitian + "/editLaporan",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `kikensbatara ${token}`,
                    },
                }
            );

            ToastAndroid.show("Laporan berhasil diunggah", ToastAndroid.SHORT);
            onSuccess();

        } catch (err) {
            console.log(err);
            ToastAndroid.show("Gagal upload laporan", ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.box}>

                    <Text style={styles.title}>Laporan Akhir Penelitian</Text>

                    {/* DOWNLOAD SURAT REKOMENDASI */}
                    {data?.rekomendasi ? (
                        <TouchableOpacity
                            onPress={() =>
                                Linking.openURL(
                                    urlx.URL_APP + "uploads/" + data.rekomendasi
                                )
                            }
                            style={styles.btnDownload}
                        >
                            <Text style={styles.btnText}>
                                ⬇ Unduh Surat Rekomendasi
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={{ color: "#999", marginBottom: 12 }}>
                            Surat rekomendasi belum tersedia
                        </Text>
                    )}


                    {/* PICK FILE */}
                    <TouchableOpacity onPress={pickFile} style={styles.btnPick}>
                        <Text>
                            {file ? file.name : "Pilih Laporan Akhir (PDF)"}
                        </Text>
                    </TouchableOpacity>

                    {/* ACTION */}
                    <View style={{ flexDirection: "row", marginTop: 16 }}>
                        <TouchableOpacity
                            onPress={handleUpload}
                            disabled={loading}
                            style={[styles.btnSave, loading && { opacity: 0.5 }]}
                        >
                            <Text style={styles.btnText}>
                                {loading ? "MENGUNGGAH..." : "SIMPAN"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onClose} style={styles.btnCancel}>
                            <Text style={styles.btnText}>BATAL</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 12,
    },
    btnDownload: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 6,
        marginBottom: 12,
    },
    btnPick: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 6,
    },
    btnSave: {
        backgroundColor: "#2196F3",
        padding: 10,
        borderRadius: 6,
        marginRight: 10,
    },
    btnCancel: {
        backgroundColor: "#E53935",
        padding: 10,
        borderRadius: 6,
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default ModalUploadLaporan;
