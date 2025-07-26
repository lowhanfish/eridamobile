//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import axios from "axios";
import Joi from 'joi';

import { useNavigation } from "@react-navigation/native";
import useGlobalStore from "../../stores/useGlobalStore.js";

import { stylex } from "../../pages/assets/css/index.js";


const loginSchema = Joi.object({
    username: Joi.string()
        // .alphanum() // Opsional: jika username hanya boleh huruf dan angka
        .min(6)
        .max(12)
        .required()
        .messages({
            'string.empty': `Username tidak boleh kosong.`,
            'string.alphanum': `Username hanya boleh huruf dan angka.`,
            'string.min': `Username minimal {#limit} karakter.`,
            'string.max': `Username maksimal {#limit} karakter.`,
            'any.required': `Username wajib diisi.`
        }),
    password: Joi.string()
        .min(6)
        .max(12)
        .required()
        .messages({
            'string.empty': `Password tidak boleh kosong.`,
            'string.empty': `Password tidak boleh kosong.`,
            'string.min': `Password minimal {#limit} karakter.`,
            'string.max': `Nama pengguna maksimal {#limit} karakter.`,
            'any.required': `Password wajib diisi.`
        }),
});


// create a component
const Login = () => {
    var navigation = useNavigation()
    var statex = useGlobalStore((state) => state.url)

    var [username, setUsername] = useState('monkeydluffy');
    var [password, setPassword] = useState('monkeydluffy');
    var [errors, setErrors] = useState("");

    const RequestLogin = async (data) => {
        console.log("Hy saya login");
        // navigation.navigate("MainPage")
        try {
            const url = statex.URL_APP + "auth/login";
            // const data = null;
            // const authToken = ''
            // const response = await axios.post(url, data,{
            //     headers : {'Authorization':authToken, 'Content-Type': 'application/json'}
            // });
            const response = await axios.post(url, data);
            return response.data;

        } catch (error) {
            // console.log("error1 :", error.response.data);
            // console.log("error2 :", error.response.data.message);
            setErrors(error.response.data.message);
            throw error
        }
    }

    const LoginAccount = async () => {

        const { error } = loginSchema.validate({ username, password }, { abortEarly: false });
        if (error) {

            // console.log(error)
            const newErrors = {};
            // var resultString = "";
            error.details.forEach(detail => {
                const fieldName = detail.path[0];
                newErrors[fieldName] = detail.message;
                setErrors(
                    errors += `${detail.message}`
                );
            });
            // console.log("Validation Errors:", newErrors);

        } else {
            setErrors("");
            const data = { username, password }
            const result = await RequestLogin(data)
            console.log(result);

            // 11. Lanjutkan dengan logika bisnis utama, misal kirim data ke API
            // sendLoginRequest(username, password);
        }
    }

    const clearError = () => {

    }

    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <Image
                    source={require('../../pages/assets/images/logo1.png')}
                    style={[stylex.imageLogo, { width: 272, marginTop: 137 }]}
                />

                {errors &&

                    <View style={stylex.ErrorAlert}>
                        <Text style={stylex.ErrorAlertText}>{errors}</Text>
                    </View>

                }

                <View>
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>username</Text>
                        <TextInput
                            onPress={() => setErrors("")}
                            value={username}
                            onChangeText={setUsername}
                            style={stylex.inputx}
                        />
                    </View>
                    {/* <Text>{errors}</Text> */}


                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText}>Password</Text>
                        <TextInput
                            onPress={() => setErrors("")}
                            value={password}
                            onChangeText={setPassword}
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
