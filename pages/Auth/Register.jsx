//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// create a component
const Register = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Go to Login</Text>
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
export default Register;
