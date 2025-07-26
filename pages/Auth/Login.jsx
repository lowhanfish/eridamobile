//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import axios from "axios";
import Joi from 'joi';

import { useNavigation } from "@react-navigation/native";
import useGlobalStore from "../../stores/useGlobalStore.js";

import { stylex } from "../../pages/assets/css/index.js";


// create a component
const Login = () => {
    const navigation = useNavigation()

    // const name = useGlobalStore((state) => state.name)

    const LoginAccount = async () => {
        console.log("Hy saya login");
        // navigation.navigate("MainPage")
        try {
            const url = '';
            const data = null;
            const authToken = ''
            // const response = await axios.post(url, data,{
            //     headers : {'Authorization':authToken, 'Content-Type': 'application/json'}
            // });
            const response = await axios.post(url, data);
            console.log(error);
            return response.data;

        } catch (error) {
            console.log("error :", error);
            throw error

        }


    }

    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <Image
                    source={require('../../pages/assets/images/logo1.png')}
                    style={[stylex.imageLogo, { width: 272, marginTop: 137 }]}
                />

                <View>
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>username</Text>
                        <TextInput
                            style={stylex.inputx}
                        />
                    </View>
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>Password</Text>
                        <TextInput
                            style={stylex.inputx}
                        />
                    </View>
                </View>

                <View>
                    <TouchableOpacity onPress={() => LoginAccount()} style={[stylex.btnLogin, stylex.margintop22]}>
                        <Text style={[stylex.btnText, stylex.shaddowText]}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[stylex.btnTextAccount, stylex.margintop10]}>Belum punya akun? registrasi di bawah</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylex.btnRegis, stylex.margintop10]}>
                        <Text style={[stylex.btnText, stylex.shaddowText]}>Register</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </View>
    );
};

// // define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2c3e50',
//     },
// });

//make this component available to the app
export default Login;
