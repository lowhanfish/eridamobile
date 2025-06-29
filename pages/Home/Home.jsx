import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import useGlobalStore from "../../stores/useGlobalStore.js";

import { stylex } from "../../pages/assets/css/index.js";

const Home = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar);


    useFocusEffect(
        useCallback(() => {
            visibleBar(true, true);
            return () => {
                visibleBar(true, true);
            }
        }, [visibleBar])
    )



    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View style={styles}>
                    <Image
                        source={require('../../pages/assets/images/logo1.png')}
                        style={[stylex.imageLogo, { width: 121, marginTop: 16 }]}
                    />
                </View>
                <View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <Text>Route Profile</Text>
                        </TouchableOpacity>



                    </View>
                    <View></View>
                </View>
                <View>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    homeLogo: {

    },
});


export default Home;