import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { stylex } from "../../pages/assets/css/index.js";

const Home = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={stylex.scrollPage}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text>Ke Halaman Profile</Text>
            </TouchableOpacity>

            <View>
                <Text>Ini halaman Home</Text>
            </View>
        </ScrollView>
    );
};

export default Home;