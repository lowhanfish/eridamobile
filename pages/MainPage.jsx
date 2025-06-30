import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { stylex } from "../pages/assets/css/index.js";
import Home from "../pages/Home/Home.jsx";
import Profile from "../pages/Profile/Profile.jsx";

import useGlobalStore from "../stores/useGlobalStore.js";

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

    const topBar = useGlobalStore(state => state.topBar)


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
            <View style={stylex.bottomBar}>
                <View style={stylex.bottomBarContainer}>
                    <Text>KKKXZZ</Text>
                </View>
            </View>
        </View>
    );
};



export default MainPage;