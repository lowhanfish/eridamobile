import { useEffect, useCallback } from "react";
import { View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";

const AddTemaPenelitian = () => {

    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar);
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);


    useFocusEffect(
        useCallback(() => {
            setRouteBack("ListTemaPenelitian");
            visibleBar(true, true);
        }, [visibleBar])
    )


    return (
        <View>
            <Text>Ini tambah data tema usulan</Text>
        </View>
    )

}

export default AddTemaPenelitian