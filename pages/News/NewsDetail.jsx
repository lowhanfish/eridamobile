import { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";


const NewsDetail = () => {

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);



    useFocusEffect(
        useCallback(() => {
            setRouteBack("NewsList");
            visibleBar(true, true)

        }, [visibleBar])
    )


    return (
        <View>
            <Text>NewsList</Text>
        </View>
    )

}



export default NewsDetail