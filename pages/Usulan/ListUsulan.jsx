import { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { stylex } from "../assets/css";


import { useFocusEffect } from "@react-navigation/native";
import useGlobalStore from "../../stores/useGlobalStore";



const ListUsulan = () => {

    const visibleBar = useGlobalStore((state) => state.visibleBar);


    useFocusEffect(
        useCallback(() => {
            visibleBar(true, true)
        }, [visibleBar])


    )


    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({

})


export default ListUsulan