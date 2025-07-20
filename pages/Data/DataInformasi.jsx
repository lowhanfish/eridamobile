import { useState, useEffec, useCallback } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import useGlobalStore from "../../stores/useGlobalStore";







const DataInformasi = () => {

    const navigation = useNavigation();
    const visibleBar = useGlobalStore(() => state.visibleBar);




    useFocusEffect(
        useCallback(() => {
            visibleBar(true, true)
        }, [visibleBar])
    )



    return (
        <View>
            <Text>Ini data dan informasi</Text>
        </View>

    )






}


export default DataInformasi