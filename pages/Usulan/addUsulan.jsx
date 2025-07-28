import { useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";


import AddUsulanPenelitian1 from "./component/AddUsulanPenelitian1";
import AddUsulanPenelitian2 from "./component/AddUsulanPenelitian2";
import AddUsulanPenelitian3 from "./component/AddUsulanPenelitian3";
import AddUsulanPenelitian4 from "./component/AddUsulanPenelitian4";
import axios from "axios";
import GetDataToken from "../lib/GetDataToken";







const AddUsulan = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    var urlx = useGlobalStore((state) => state.url)
    const [isModalVisibleSetting, setisModalVisibleSetting] = useState(false);

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
    });

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const updateFormData = (newData) => {
        // console.log(newData)
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const addData = async (data) => {

        var tokenz = await GetDataToken();
        // console.log(tokenz)


        console.log("kikensbatara " + tokenz);

        const formData = new FormData();
        formData.append('nama', data.nama);
        formData.append('alamat', data.alamat);
        formData.append('hp', data.hp);
        formData.append('email', data.email);
        formData.append('nik', data.nik);
        formData.append('status', data.status);
        formData.append('keterangan', data.keterangan);


        // const file = data.ktp[0];
        // const fileName = file.name || 'file.jpg';
        // const fileType = file.type || 'image/jpeg';

        // formData.append('file', {
        //     uri: file.uri.replace('content://', 'file://'), // jika pakai library lain, sesuaikan
        //     name: fileName,
        //     type: fileType,
        // });

        // const response = await axios.get("http://10.0.2.2:5070/api/v1/server_penelitian/test", {
        //     params: {
        //         nama: 'budi',
        //         hp: '08123'
        //     }
        // });
        // console.log("Server response:", response.data);



        // try {
        //     const url = "http://10.216.143.96:5070/api/v1/server_penelitian/test";
        //     console.log("try request data to:", url);
        //     console.log("Data to send:", data);
        //     const response = await axios.post(url, { nama: 'tai' }); // jangan pakai JSON.stringify
        //     console.log("Server responded:", response.data);
        //     return response.data;
        // } catch (error) {
        //     console.error("Request failed:", error);
        // }


        const dataz = {
            nama: 'budi',
            hp: '08123'
        };

        try {
            const response = await axios.post("http://10.0.2.2:5070/api/v1/server_penelitian/test", data);
            console.log("Server response:", response.data);
        } catch (error) {
            console.error("POST error:", error.message);
        }
    }




    useFocusEffect(
        useCallback(() => {
            setRouteBack("ListUsulan");
            visibleBar(true, true)
        }, [visibleBar])
    )


    switch (currentStep) {
        case 1:
            return <AddUsulanPenelitian1 data={formData} updateData={updateFormData} excuteData={addData} nextStep={nextStep} />;
        case 2:
            return <AddUsulanPenelitian2 data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
        case 3:
            return <AddUsulanPenelitian3 data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
        case 4:
            return <AddUsulanPenelitian4 data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} addData={addData} />;
        default:
            return null;
    }






}


export default AddUsulan