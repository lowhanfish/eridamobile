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






const ContentStack = createNativeStackNavigator();

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