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

const EditUsulan = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    var urlx = useGlobalStore((state) => state.url)

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
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const addData = async (data) => {

        var tokenz = await GetDataToken();

        var formData = new FormData();
        formData.append('nama', data.nama);
        formData.append('alamat', data.alamat);
        formData.append('hp', data.hp);
        formData.append('email', data.email);
        formData.append('nik', data.nik);
        formData.append('status', data.status);
        formData.append('keterangan', data.keterangan);

        const file = data.ktp[0];

        console.log(file)

        formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: file.type,
        });


        axios.post(urlx.URL_Penelitian + "/addDataMobile", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `kikensbatara ${tokenz}`,
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });


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

export default EditUsulan