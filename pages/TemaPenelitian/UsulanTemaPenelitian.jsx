import { useState, useCallback, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";


const UsulanTemaPenelitian = () => {

    const navigation = useNavigation();
    const visibleBar = useGlobalStore(() => state.visibleBar)



    useFocusEffect(
        useCallback(() => {
            visibleBar(true, true)
        }, [visibleBar])
    )


    return (
        <View>
            <Text>Ini UsulanTemaPenelitian</Text>
        </View>
    )
}

export default UsulanTemaPenelitian



