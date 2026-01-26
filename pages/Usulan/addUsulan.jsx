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
    const { typex, id } = route.params;
    console.log(typex, " XXXX")

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        id: null,
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

    const updateData = (partial) => {
        setFormData(prev => ({
            ...prev,      // ⬅️ JANGAN DIHAPUS
            ...partial,   // ⬅️ hanya update field yang dikirim
        }));
    };
    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

  


    const [pathx, setPathx] = useState('')

    const fetchDetail = async (id) => {
        try {
          const token = await GetDataToken();
      
          const res = await axios.post(
            urlx.URL_Penelitian + "/detailMobile", // endpoint detail by id
            { id },
            {
              headers: {
                Authorization: `kikensbatara ${token}`,
              },
            }
          );
      
          const d = res.data;
      
          // 1️⃣ isi formData
          setFormData(d);
      
          // 2️⃣ tentukan step
          if (!d.ktp) setCurrentStep(1);
          else if (!d.nomorP) setCurrentStep(2);
          else if (!d.nomorR) setCurrentStep(3);
          else if (!d.judul) setCurrentStep(4);
          else setCurrentStep(4); // semua lengkap
      
        } catch (err) {
          console.log(err);
        }
      };

      
      useEffect(() => {
        if (typex === "edit" && id) {
          fetchDetail(id);
        }
      }, [typex, id]);


    useFocusEffect(
        useCallback(() => {
            setRouteBack("ListUsulan");
            visibleBar(true, true)
        }, [visibleBar])
    )

    switch (currentStep) {
        case 1:
            // return <AddUsulanPenelitian1 routex={route.params} data={formData} updateData={updateFormData} excuteData={typex === 'add' ? addData : editData} nextStep={nextStep} />;
            return <AddUsulanPenelitian1 routex={route.params} data={formData} updateData={updateData} nextStep={nextStep} />;
        case 2:
            return <AddUsulanPenelitian2 routex={route.params} data={formData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />;
        case 3:
            return <AddUsulanPenelitian3 routex={route.params} data={formData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />;
        case 4:
            return <AddUsulanPenelitian4 routex={route.params} data={formData} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />;
        default:
            return null;
    }

}

export default AddUsulan