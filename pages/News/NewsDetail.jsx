import { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../assets/css";
import ImageLib from "../../components/ImageLib.jsx";



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
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View>

                    <ImageLib
                        urix={"https://server-erida.konaweselatankab.go.id/uploads/1752836088394.jpg"} customWidth={'100%'}
                    />
                    <Text>asdad</Text>
                </View>
            </ScrollView>
        </View>
    )

}



export default NewsDetail