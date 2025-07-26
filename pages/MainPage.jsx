import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import useGlobalStore from "../stores/useGlobalStore.js";

import { stylex } from "../pages/assets/css/index.js";

import TopBar from "../components/TopBar.jsx";
import BottomBar from "../components/BottomBar.jsx";


import Home from "../pages/Home/Home.jsx";
import Profile from "../pages/Profile/Profile.jsx";

import ListUsulan from "../pages/Usulan/ListUsulan.jsx";
import AddUsulanPenelitian1 from "./Usulan/component/AddUsulanPenelitian1.jsx";
import AddUsulanPenelitian2 from "./Usulan/component/AddUsulanPenelitian2.jsx";
import AddUsulanPenelitian3 from "./Usulan/component/AddUsulanPenelitian3.jsx";
import AddUsulanPenelitian4 from "./Usulan/component/AddUsulanPenelitian4.jsx";

import NewsList from "./News/NewsList.jsx";
import NewsDetail from "./News/NewsDetail.jsx";

import ListTemaPenelitian from "./TemaPenelitian/ListTemaPenelitian.jsx";
import AddTemaPenelitian from "./TemaPenelitian/AddTemaPenelitian.jsx";

const ContentStack = createNativeStackNavigator();


const loginSchema = Joi.object({
    username: Joi.string()
        // .alphanum() // Opsional: jika username hanya boleh huruf dan angka
        .min(6)
        .max(12)
        .required()
        .messages({
            'string.empty': `Username tidak boleh kosong.`,
            'string.alphanum': `Nama pengguna hanya boleh huruf dan angka.`,
            'string.min': `Nama pengguna minimal {#limit} karakter.`,
            'string.max': `Nama pengguna maksimal {#limit} karakter.`,
            'any.required': `Nama pengguna wajib diisi.`
        }),
    password: Joi.string()
        .min(6)
        .max(12)
        .required()
        .messages({
            'string.empty': `Password tidak boleh kosong.`,
            'string.empty': `Password tidak boleh kosong.`,
            'string.min': `Password minimal {#limit} karakter.`,
            'string.max': `Nama pengguna maksimal {#limit} karakter.`,
            'any.required': `Password wajib diisi.`
        }),
});


const ContentAll = () => {
    return (
        <ContentStack.Navigator screenOptions={{ headerShown: false }}>
            <ContentStack.Screen name="Home" component={Home} />
            <ContentStack.Screen name="Profile" component={Profile} />

            <ContentStack.Screen name="ListUsulan" component={ListUsulan} />
            <ContentStack.Screen name="AddUsulanPenelitian1" component={AddUsulanPenelitian1} />
            <ContentStack.Screen name="AddUsulanPenelitian2" component={AddUsulanPenelitian2} />
            <ContentStack.Screen name="AddUsulanPenelitian3" component={AddUsulanPenelitian3} />
            <ContentStack.Screen name="AddUsulanPenelitian4" component={AddUsulanPenelitian4} />

            <ContentStack.Screen name="NewsList" component={NewsList} />
            <ContentStack.Screen name="NewsDetail" component={NewsDetail} />

            <ContentStack.Screen name="ListTemaPenelitian" component={ListTemaPenelitian} />
            <ContentStack.Screen name="AddTemaPenelitian" component={AddTemaPenelitian} />
        </ContentStack.Navigator>
    );
};

const MainPage = () => {

    const navigation = useNavigation()

    const topBar = useGlobalStore(state => state.topBar)
    const bottomBar = useGlobalStore(state => state.bottomBar)


    useEffect(() => {


    }, [])


    return (
        <View style={stylex.container}>
            {topBar ? (
                <TopBar navigation={navigation} />
            ) : (
                <></>
            )
            }
            <View style={stylex.mainPage}>
                <ContentAll />
            </View>

            {
                bottomBar ? (
                    <BottomBar navigation={navigation} />

                ) : (
                    <></>
                )
            }


        </View >
    );
};



export default MainPage;