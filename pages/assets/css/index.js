import React from 'react';
import {StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const stylex = StyleSheet.create({
    margintop10 : {
        marginTop : 10,
    },
    margintop18 : {
        marginTop : 18,
    },
    margintop22 : {
        marginTop : 22,
    },
    margintop30 : {
        marginTop : 30,
    },
    
    imageLogo : {
        width: 100, // sedikit lebih kecil dari lebar layar
        height: (width - 20) * 0.6, // proporsi tinggi (60% dari lebar)
        resizeMode: 'contain',

    },
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'pink',
    },
    mainPage : {
        display : 'flex',
        width : '100%',
        flex : 1,
        backgroundColor :'blue'
    },
    scrollPage: {
        width: "100%",
        display: 'flex',
        flex: 1,
        paddingLeft : 20,
        paddingRight : 20,

        // justifyContent: 'center',
        // alignItems: 'center',
    },


    InputContainer : {
        paddingTop : 8,
    },

    inputx : {
        height : 40,
        borderRadius : 6,
        borderStyle : 'solid',
        borderWidth : 1,
        borderColor : '#DEDCDC',
        paddingLeft : 10,
    },
    inputText : {
        color : '#9D9D9D',
        fontSize : 16,
    },

    btnLogin :{
        height : 61,
        backgroundColor : "#EFD06D",
        borderRadius : 6,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 30,
    },
    btnRegis : {
        height : 33,
        backgroundColor : "#FF9191",
        borderRadius : 6,
        justifyContent : 'center',
        alignItems : 'center'
    },

    

    btnText : {
        color : 'white'
    },

    btnTextAccount : {
        fontSize : 10,
        color : '#9D9D9D'
    },
    shaddowText : {
        textShadowColor : 'gray',
        textShadowOffset : {width : 1, height:1},
        textShadowRadius : 1
    },
    shaddow : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    textTitleList : {
        fontSize : 13,
        fontWeight : 800,
        color : '#717171'
    },
    textSubTitleList : {
        fontSize : 10,
        fontWeight : 'bold',
        color : '#717171'
    }



});
