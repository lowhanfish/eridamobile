import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";


import { stylex } from "../pages/assets/css/index";


const TopBar = ({ navigation }) => {

    // const navigation = useNavigation()


    return (

        <View style={stylex.topBarContainer}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={stylex.topBarLeft}>
                    <TouchableOpacity onPress={() => navigation.navigate("MainPage", { screen: 'Home' })}>
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