import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";

import { stylex } from "../pages/assets/css/index.js";
import Home from "../pages/Home/Home.jsx";
import Profile from "../pages/Profile/Profile.jsx";

import useGlobalStore from "../stores/useGlobalStore.js";

import BottomBar from "../components/BottomBar.jsx";




const ContentStack = createNativeStackNavigator();

const ContentAll = () => {
    return (
        <ContentStack.Navigator screenOptions={{ headerShown: false }}>
            <ContentStack.Screen name="Home" component={Home} />
            <ContentStack.Screen name="Profile" component={Profile} />
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
                <View>
                    <Text>Top Bar {topBar}</Text>
                </View>
            ) : (
                <></>
            )}
            <View style={stylex.mainPage}>
                <ContentAll />
            </View>

            {bottomBar ? (
                <BottomBar navigation={navigation} />

            ) : (
                <></>
            )}


        </View>
    );
};



export default MainPage;