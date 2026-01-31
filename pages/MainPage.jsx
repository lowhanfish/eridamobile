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
import Setting from "../pages/Setting/Setting.jsx";

import ListUsulan from "../pages/Usulan/ListUsulan.jsx";
import AddUsulan from "./Usulan/addUsulan.jsx";
import AddUsulanPenelitian1 from "./Usulan/component/AddUsulanPenelitian1.jsx";
import AddUsulanPenelitian2 from "./Usulan/component/AddUsulanPenelitian2.jsx";
import AddUsulanPenelitian3 from "./Usulan/component/AddUsulanPenelitian3.jsx";
import AddUsulanPenelitian4 from "./Usulan/component/AddUsulanPenelitian4.jsx";

import NewsList from "./News/NewsList.jsx";
import NewsDetail from "../components/NewsDetail.jsx";

import ListTemaPenelitian from "./TemaPenelitian/ListTemaPenelitian.jsx";
import AddTemaPenelitian from "./TemaPenelitian/AddTemaPenelitian.jsx";

import AlurUsulanPenelitian from "./Alur/alurUsulanPenelitian.jsx";
import LombaInovda from "./Kreanova/LombaInovda.jsx";
import ListKrenova from "./Kreanova/ListKrenova.jsx";
import AddKrenova from "./Kreanova/AddKrenova.jsx";
import DetailKrenova from "./Kreanova/DetailKrenova.jsx";

const ContentStack = createNativeStackNavigator();


const ContentAll = () => {
    return (
        <ContentStack.Navigator screenOptions={{ headerShown: false }}>
            <ContentStack.Screen name="Home" component={Home} />
            <ContentStack.Screen name="Profile" component={Profile} />
            <ContentStack.Screen name="Setting" component={Setting} />

            <ContentStack.Screen name="ListUsulan" component={ListUsulan} />
            <ContentStack.Screen name="AddUsulan" component={AddUsulan} />
            <ContentStack.Screen name="AddUsulanPenelitian1" component={AddUsulanPenelitian1} />
            <ContentStack.Screen name="AddUsulanPenelitian2" component={AddUsulanPenelitian2} />
            <ContentStack.Screen name="AddUsulanPenelitian3" component={AddUsulanPenelitian3} />
            <ContentStack.Screen name="AddUsulanPenelitian4" component={AddUsulanPenelitian4} />

            <ContentStack.Screen name="NewsList" component={NewsList} />
            <ContentStack.Screen name="NewsDetail" component={NewsDetail} />

            <ContentStack.Screen name="ListTemaPenelitian" component={ListTemaPenelitian} />
            <ContentStack.Screen name="AddTemaPenelitian" component={AddTemaPenelitian} />

<ContentStack.Screen name="AlurUsulanPenelitian" component={AlurUsulanPenelitian} />
            <ContentStack.Screen name="LombaInovda" component={LombaInovda} />
            <ContentStack.Screen name="ListKrenova" component={ListKrenova} />
            <ContentStack.Screen name="AddKrenova" component={AddKrenova} />
            <ContentStack.Screen name="DetailKrenova" component={DetailKrenova} />
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