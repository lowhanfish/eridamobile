import { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StyleSheet,
    ToastAndroid
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import useGlobalStore from "../../stores/useGlobalStore";
import GetDataToken from "../lib/GetDataToken";

const ModalSurvey = ({ visible, onClose, data }) => {
    const urlx = useGlobalStore(state => state.url);
    const [loading, setLoading] = useState(false);


    // AUTO USER
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");

    // SURVEY STATE (8 PERTANYAAN)
    const [q1, setQ1] = useState(null);
    const [q2, setQ2] = useState(null);
    const [q3, setQ3] = useState(null);
    const [q4, setQ4] = useState(null);
    const [q5, setQ5] = useState(null);
    const [q6, setQ6] = useState(null);
    const [q7, setQ7] = useState(null);
    const [q8, setQ8] = useState(null);
    const [q9, setQ9] = useState(null);


    // IDENTITAS TAMBAHAN
    const [umur, setUmur] = useState("");
    const [pendidikan, setPendidikan] = useState("");
    const [pekerjaan, setPekerjaan] = useState("");



    useEffect(() => {
        const loadUser = async () => {
            const profile = await AsyncStorage.getItem("userProfile");
            if (profile) {
                const user = JSON.parse(profile).profile || JSON.parse(profile);
                setNama(user.nama || "");
                setEmail(user.email || "");
            }
        };

        if (visible) {
            loadUser();
        }
    }, [visible]);

    useEffect(() => {
        if (!visible) {
            setUmur("");
            setPendidikan("");
            setPekerjaan("");
            setQ1(null);
            setQ2(null);
            setQ3(null);
            setQ4(null);
            setQ5(null);
            setQ6(null);
            setQ7(null);
            setQ8(null);
            setQ9(null);
        }
    }, [visible]);
    


    const isValid =
    umur.trim() !== "" &&
    pendidikan.trim() !== "" &&
    pekerjaan.trim() !== "" &&
    q1 && q2 && q3 && q4 &&
    q5 && q6 && q7 && q8 && q9;


    const handleSubmit = async () => {
        if (!isValid) {
            ToastAndroid.show("Harap isi semua pertanyaan survey", ToastAndroid.SHORT);
            return;
        }
    
        setLoading(true);
    
        try {
            // 1️⃣ SIMPAN DATA SURVEY (IKM)
            await axios.post(
                urlx.URL_IKMM + "addData",
                {
                    nama,
                    email,
                    umur,
                    pendidikan,
                    pekerjaan,
    
                    persyaratan: q1,
                    prosedur: q2,
                    pelayanan: q3,
                    tarif: q4,
                    ketentuan: q5,
                    kompetensi: q6,
                    sikap: q7,
                    maklumat: q8,
                    pengaduan: q9,
                }
            );
    
            // 2️⃣ UPDATE STATUS PENELITIAN → survey
            const token = await GetDataToken();
            await axios.post(
                urlx.URL_Penelitian + "/addSurvey",
                {
                    ididid: data.id   // 🔴 INI WAJIB
                },
                {
                    headers: {
                        Authorization: `kikensbatara ${token}`,
                    },
                }
            );
    
            ToastAndroid.show("Survey berhasil disimpan", ToastAndroid.SHORT);
            onClose();
    
        } catch (err) {
            console.log("SURVEY ERROR:", err?.response || err);
            ToastAndroid.show("Gagal menyimpan survey", ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };
    
    

    const RadioGroup = ({ value, onChange, options }) => (
        <>
            {options.map((opt, i) => (
                <TouchableOpacity
                    key={i}
                    style={styles.radioRow}
                    onPress={() => onChange(opt)}
                >
                    <View style={[
                        styles.radioCircle,
                        value === opt && styles.radioActive
                    ]} />
                    <Text>{opt}</Text>
                </TouchableOpacity>
            ))}
        </>
    );


    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalBox}>

                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            Survey Indeks Kepuasan Masyarakat
                        </Text>
                    </View>

                    <ScrollView contentContainerStyle={{ padding: 16 }}>

                        <Text style={styles.label}>Nama Responden</Text>
                        <TextInput
                            value={nama}
                            editable={false}
                            style={[styles.input, styles.readOnly]}
                        />

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            value={email}
                            editable={false}
                            style={[styles.input, styles.readOnly]}
                        />

                        <Text style={styles.label}>Umur</Text>
                        <TextInput
                            value={umur}
                            onChangeText={setUmur}
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <Text style={styles.label}>Pendidikan Terakhir</Text>
                        <TextInput
                            value={pendidikan}
                            onChangeText={setPendidikan}
                            style={styles.input}
                        />

                        <Text style={styles.label}>Pekerjaan</Text>
                        <TextInput
                            value={pekerjaan}
                            onChangeText={setPekerjaan}
                            style={styles.input}
                        />


                        {/* PERTANYAAN */}
                        <Text style={styles.question}>
                        Bagaimana Pendapat Bapak/Ibu/Saudara (i) tentang kesesuaian persyaratan pelayanan dengan jenis pelayanannya pada BRIDA KONSEL ?
                        </Text>
                        <RadioGroup value={q1} onChange={setQ1}
                            options={["Tidak Sesuai","Kurang Sesuai","Sesuai","Sangat Sesuai"]}
                        />

                        <Text style={styles.question}>
                        Bagaimana menurut Bapak/Ibu/Saudara (i) tentang kemudahan prosedur/ mekanisme pelayanan yang diberikan pada BRIDA KONSEL ?
                        </Text>
                        <RadioGroup value={q2} onChange={setQ2}
                            options={["Tidak Mudah","Kurang Mudah","Mudah","Sangat Mudah"]}
                        />

                        <Text style={styles.question}>
                        Bagaimana pendapat Bapak/Ibu/Saudara (i) tentang kecepatan pelayanan yang diberikan pada BRIDA KONSEL ?
                        </Text>
                        <RadioGroup value={q3} onChange={setQ3}
                            options={["Tidak Cepat","Kurang Cepat","Cepat","Sangat Cepat"]}
                        />

                        <Text style={styles.question}>
                        Bagaimana menurut Bapak/Ibu/Saudara (i) dalam hal Biaya/Tarif Pelayanan pada BRIDA KONSEL, apakah sudah sesuai dengan biaya yang di tetapkan ?
                        </Text>
                        <RadioGroup value={q4} onChange={setQ4}
                            options={["Sangat Mahal","Cukup Mahal","Murah","Gratis"]}
                        />


                        <Text style={styles.question}>
                        Bagaimana menurut Bapak/Ibu/Saudara (i) kesesuaian antara hasil pelayanan yang di berikan BRIDA KONSEL dengan ketentuan yang di tetapkan / permintaan awal ?
                        </Text>
                        <RadioGroup value={q5} onChange={setQ5}
                            options={["Tidak Sesuai","Kurang Sesuai","Sesuai","Sangat Sesuai"]}
                        />

                        <Text style={styles.question}>
                        Bagaiman menurut Bapak/Ibu/Saudara (i) kemampuan/Kompetensi petugas pelayanan BRIDA KONSEL dalam hal memberikan pelayanan ?
                        </Text>
                        <RadioGroup value={q6} onChange={setQ6}
                            options={["Tidak Kompeten","Kurang Kompeten","Kompeten","Sangat Kompeten"]}
                        />

                        <Text style={styles.question}>
                        Bagaimana pendapat Bapak/Ibu/Saudara (i) tentang sikap, tingkah laku (kesopanan dan keramahan) petugas pelayanan BRIDA KONSEL dalam memberikan pelayanan ?
                        </Text>
                        <RadioGroup value={q7} onChange={setQ7}
                            options={["Tidak Sopan dan Ramah","Kurang Sopan dan Ramah","Sopan dan Ramah","Sangat Sopan dan Ramah"]}
                        />

                        <Text style={styles.question}>
                        Bagaimana menurut Bapak/Ibu/Saudara (i) kesesuaian antara Pelayanan yang di dapat dengan Hasil Maklumat Pelayanan (Standar Pelayanan) yang di tetapkan pada BRIDA KONSEL ?
                        </Text>
                        <RadioGroup value={q8} onChange={setQ8}
                            options={["Buruk","Cukup","Baik","Sangat Baik"]}
                        />

                        <Text style={styles.question}>
                        Bagaimana pendapat Bapak/Ibu/Saudara (i) mengenai kemudahan menyampaikan pengaduan, saran dan masukan di BRIDA KONSEL ?
                        </Text>
                        <RadioGroup value={q9} onChange={setQ9}
                            options={["Tidak Ada","Ada Tapi Tidak Berfungsi","Berfungsi Kurang Maksimal","Dikelola Dengan Baik"]}
                        />


                    </ScrollView>

                    {/* FOOTER */}
                    <View style={styles.footer}>
                    <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={!isValid || loading}
                            style={[
                                styles.btnSave,
                                (!isValid || loading) && { opacity: 0.5 }
                            ]}
                        >
                            <Text style={styles.btnText}>
                                {loading ? "MENYIMPAN..." : "SIMPAN"}
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.btnCancel}
                        >
                            <Text style={styles.btnText}>KEMBALI</Text>
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
    modalBox: {
        width: "95%",
        height: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
    },
    header: {
        backgroundColor: "#4CAF50",
        padding: 14,
    },
    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    label: {
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        marginTop: 5,
    },
    readOnly: {
        backgroundColor: "#f2f2f2",
    },
    question: {
        marginTop: 16,
        fontWeight: "bold",
    },
    radioRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    radioCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: "#555",
        marginRight: 10,
    },
    radioActive: {
        backgroundColor: "#4CAF50",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    btnSave: {
        backgroundColor: "#2196F3",
        padding: 12,
        borderRadius: 6,
    },
    btnCancel: {
        backgroundColor: "#E53935",
        padding: 12,
        borderRadius: 6,
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default ModalSurvey;

