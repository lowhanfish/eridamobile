import { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";

import AddUsulanPenelitian1 from "./component/AddUsulanPenelitian1";
import AddUsulanPenelitian2 from "./component/AddUsulanPenelitian2";
import AddUsulanPenelitian3 from "./component/AddUsulanPenelitian3";
import AddUsulanPenelitian4 from "./component/AddUsulanPenelitian4";
import axios from "axios";
import GetDataToken from "../lib/GetDataToken";

const AddUsulan = () => {
    // console.log("ADD")
    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    var urlx = useGlobalStore((state) => state.url)

    const route = useRoute()
    const { typex } = route.params;
    console.log(typex, " XXXX")

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        id: "",
        nama: "",
        alamat: "",
        hp: "",
        email: "",
        nik: "",
        ktp: null,
        status: "",
        keterangan: "",

        nomorP: "",
        tanggalP: "",
        namaP: "",
        jabatanP: "",
        suratP: null,
    });

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };


    const [pathx, setPathx] = useState('')




    const addData = async (data) => {
        var tokenz = await GetDataToken();
        const formDatax = new FormData();

        formDatax.append('nama', data.nama);
        formDatax.append('alamat', data.alamat);
        formDatax.append('hp', data.hp);
        formDatax.append('email', data.email);
        formDatax.append('nik', data.nik);
        formDatax.append('status', data.status);
        formDatax.append('keterangan', data.keterangan);

        const file = data.ktp[0];
        formDatax.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.type,
        });

        axios.post(urlx.URL_Penelitian + "/addDataMobile", formDatax, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `kikensbatara ${tokenz}`,
            }
        }).then(response => {
            console.log("SUKSES BOSSS")
            console.log(response);
            updateFormData({
                id: response.data.insertId
            });

        }).catch(error => {
            console.log("ada yang error yaaa...")
            console.error(error);
        });
    }

    const editData = async (data) => {
        // Ambil token lebih dulu dengan await
        const tokenz = await GetDataToken();

        const formDatax = new FormData();
        formDatax.append('id', data.id);
        formDatax.append('nama', data.nama);
        formDatax.append('alamat', data.alamat);
        formDatax.append('hp', data.hp);
        formDatax.append('email', data.email);
        formDatax.append('nik', data.nik);
        formDatax.append('status', data.status);
        formDatax.append('keterangan', data.keterangan);

        // Hanya tambahkan file jika ada file baru
        let file;
        if (Array.isArray(data.ktp) && data.ktp.length > 0) {
            file = data.ktp[0];
        }
        if (file) {
            formDatax.append('file', {
                uri: file.uri,
                name: file.name,
                type: file.type,
            });
        }

        // console.log('POST URL', urlx.URL_Penelitian + "/editDataMobile");
        // console.log('KTP type', typeof data.ktp, data.ktp);

        axios.post(urlx.URL_Penelitian + "/editDataMobile", formDatax, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `kikensbatara ${tokenz}`,
            },
        }).then((response) => {
            console.log("Edit sukses", response.data);
        }).catch((error) => {
            console.log("Edit gagal", error.message);
        });
    };




    useEffect(() => {

    }, [typex])

    useFocusEffect(
        useCallback(() => {
            setRouteBack("ListUsulan");
            visibleBar(true, true)
        }, [visibleBar])
    )

    switch (currentStep) {
        case 1:
            // return <AddUsulanPenelitian1 routex={route.params} data={formData} updateData={updateFormData} excuteData={typex === 'add' ? addData : editData} nextStep={nextStep} />;
            return <AddUsulanPenelitian1 routex={route.params} data={formData} updateData={updateFormData} excuteData={addData} editData={editData} nextStep={nextStep} />;
        case 2:
            return <AddUsulanPenelitian2 data={formData} updateData={updateFormData} nextStep={nextStep} editData={editData} prevStep={prevStep} />;
        case 3:
            return <AddUsulanPenelitian3 data={formData} updateData={updateFormData} nextStep={nextStep} editData={editData} prevStep={prevStep} />;
        case 4:
            return <AddUsulanPenelitian4 data={formData} updateData={updateFormData} nextStep={nextStep} editData={editData} prevStep={prevStep} addData={addData} />;
        default:
            return null;
    }

}

export default AddUsulan