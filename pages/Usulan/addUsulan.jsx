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
            return <AddUsulanPenelitian1 routex={route.params} data={formData} updateData={updateFormData} nextStep={nextStep} />;
        case 2:
            return <AddUsulanPenelitian2 data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
        case 3:
            return <AddUsulanPenelitian3 data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
        case 4:
            return <AddUsulanPenelitian4 data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
        default:
            return null;
    }

}

export default AddUsulan