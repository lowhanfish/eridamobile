// pages/Profile/Profile.jsx
//import liraries
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import useGlobalStore from "../../stores/useGlobalStore"; // Pastikan path ini benar


const Profile = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore(state => state.visibleBar);


    useFocusEffect(

        useCallback(() => {
            visibleBar(false, false); // Sembunyikan Top Bar & Bottom Bar

            return () => {
                visibleBar(true, true);
            };
        }, [visibleBar])
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={{ color: 'white' }}>Ke Halaman Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: 'white', marginTop: 20 }}>Ke Halaman Login</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Profile;