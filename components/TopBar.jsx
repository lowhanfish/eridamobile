import { useState, useEffect, useCallback } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import useGlobalStore from "../stores/useGlobalStore";


import { stylex } from "../pages/assets/css/index";


const TopBar = ({ navigation }) => {

    const backRoute = useGlobalStore(state => state.routeBack);
    // const setRouteBack = useGlobalStore((state) => state.setRouteBack);
    // console.log(backRoute)

    // const navigation = useNavigation()



    // useFocusEffect(
    //     useCallback(() => {
    //         // setRouteBack = useGlobalStore((state) => state.setRouteBack);
    //         // setRouteBack("Home")
    //     }, [setRouteBack])
    // )



    return (

        <View style={[stylex.topBarContainer]}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.8, borderBottomColor: '#D9D9D9' }}>
                <View style={stylex.topBarLeft}>
                    {/* <Text>Back x: {backRoute}</Text>
                    <Text>Back : {backRoute}</Text> */}
                    <TouchableOpacity onPress={() => navigation.navigate("MainPage", { screen: backRoute })}>
                        <Image style={styles.topBarLeftImage} source={require("../pages/assets/images/icon/back.png")} />
                    </TouchableOpacity>
                </View>
                <View style={stylex.topBarMid}>
                    <Image style={styles.topBarMidImage} source={require("../pages/assets/images/logo2.png")} />
                </View>
                <View style={stylex.topBarRight}>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBarMidImage: {
        height: 83,
        width: 83
    },
    topBarLeftImage: {
        height: 36,
        width: 91
    },
})



export default TopBar