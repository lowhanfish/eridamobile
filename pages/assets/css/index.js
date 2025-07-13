import React from 'react';
import {StyleSheet, Dimensions } from 'react-native';

const topBarHeight = 90;

const { width } = Dimensions.get('window');

const centerAll = {
                justifyContent : 'center',
                alignItems : 'center'
    }



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
        ...centerAll,
        
        // backgroundColor: 'pink',
    },

    topBarContainer :{
        // flex :1,
        flexDirection : 'row',
        // backgroundColor : 'black',
        height : topBarHeight,
        marginTop : 20
    },
    topBarLeft :{
        flex : 1,
        ...centerAll,
        // backgroundColor : 'red',
        height : topBarHeight,

    },
    topBarMid :{
        flex : 1,
        ...centerAll,
        // backgroundColor : 'yellow',
        height : topBarHeight,
        

    },
    topBarRight :{
        flex : 1,
        // backgroundColor : 'purple',
        height : topBarHeight,
    },


    mainPage : {
        display : 'flex',
        width : '100%',
        flex : 1,
        // backgroundColor :'blue'
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
    inputx1 : {
        height : 45,
        borderRadius : 6,
        borderStyle : 'solid',
        borderWidth : 1,
        borderColor : '#DEDCDC',
        paddingLeft : 10,
        color : 'black',
        // justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row'
    },
    inputText1 : {
        color : '#9D9D9D',
        fontSize : 14,
        fontWeight : 400,
    },
    inputText : {
        color : '#9D9D9D',
        fontSize : 16,
    },
    iconInput : {
        width : 21,
        height:23,
        marginRight : 5
    },
    iconInputFile : {
        width : 12,
        height:23,
        marginRight : 9
    },

    btnLogin :{
        height : 61,
        backgroundColor : "#EFD06D",
        borderRadius : 6,
        ...centerAll,
        marginTop : 30,
    },
    btnRegis : {
        height : 33,
        backgroundColor : "#FF9191",
        borderRadius : 6,
        ...centerAll,
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
        textShadowRadius : 1,
        elevation: 0.7, // 👈 ini untuk Android
    },
    shaddow : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 0.7, // 👈 ini untuk Android
    },
    textTitleList : {
        fontSize : 13,
        fontWeight : 800,
        color : '#717171',
        fontFamily : 'Helvetica'
    },
    textSubTitleList : {
        fontSize : 10,
        fontWeight : 'bold',
        color : '#717171'
    },
    textSubTitleList2 : {
        fontSize : 10,
        // fontWeight : 'bold',
        color : '#717171'
    },
    ImgNews : {
        width : 136,
        height : 91,
         borderRadius : 5,
    },

    newsListContainer : {
        flex : 1,
        flexDirection : 'row',
        marginBottom : 15,
        // backgroundColor :'pink'
    },
    newsListContainerImg : {
        flex : 1,
        ...centerAll,
       
    },
    newsListContainerText : {
        flex : 1,
        paddingLeft : 5,
        paddingRight : 5
    },
    newsListTitle : {
        flex : 1,
        flexWrap : 'nowrap',
        color : '#717171',
        fontSize : 12,
        fontWeight : '700',
        marginBottom : 5
    },
    newsListTitleDesc : {
        flex: 1, flexDirection: 'row', 
        ...centerAll,
    },
    newsListTitleDescIcon : {
        width: 13, 
        height: 13
    },
    newsListTitleDescText : {
        flex: 1, 
        paddingLeft: 5, 
        fontSize: 10, 
        color: '#717171',
        
    },

    pageTitleContainer : {
        flex :1,
        flexDirection : 'row',
        marginTop : 10
    },
    pageTitleItemContainer : {
        flex : 1,
        // backgroundColor : 'pink',
        margin : 1,
    },
    btnCornerFlat : {
        flexDirection : 'row',
        backgroundColor : '#F1D372',
        borderRadius : 7,
        height : 32,
        width : 117,
        ...centerAll,
    },

    btnCornerFlatIcon : {
        width : 24,
        height : 24
    },
    btnCornerFlatText : {
        fontSize : 10,
        fontWeight : 'bold',
        color : 'white',
        marginLeft : 6,
    },
    borderContent : {
        flex : 1,
        borderStyle : 'dashed',
        borderWidth : 6,
        borderColor : '#DFDDDD',
        borderRadius : 5,
        paddingLeft : 16,
        paddingRight : 16,
        paddingBottom : 16,
        marginTop : 24,
        
        // backgroundColor : 'red',

    },

    DataListCont :{
        flex : 1,
        flexDirection : 'row',
        backgroundColor : '#FFF3F3',
        paddingTop : 5,
        paddingBottom : 5,
        paddingLeft : 5,
        paddingRight : 2,
        borderRadius : 11

    },
    DataListImgCont :{
        width : 60,
        justifyContent : 'center'
    },
    DataListTextCont : {
        flex : 1,
        // backgroundColor : 'purple',
        flexDirection : 'column'
    },

    DataListImg : {
        width : 52,
        height : 52
    },
    DataListText1 : {
        fontSize : 10,
        fontWeight : 800
    },
    DataListText2 : {
        fontSize : 8,
        color : '#5F5F5F',
        marginTop : 3,
    },
    DataListText3 : {
        fontSize : 8,
        fontWeight : 900,
        color : '#8A8A8A',
        marginTop : 4,
    },




    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Latar belakang semi-transparan
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        minWidth: '70%',
        alignItems: 'center',
        flexDirection : 'column'
    },
    modalText: {
        // marginBottom: 10,
        fontSize: 12,
        fontWeight : 'bold',
        color : 'white'
    },

    modalButton : {
        width : '150',
        height : 35,
        marginTop : 10,
         ...centerAll,
        borderRadius : 5
    },
  
    paginContainer : {
        flex : 1,
        width : '100%',
        flexDirection : 'row',
        height : 39,
        // backgroundColor : 'pink',
        position : 'absolute',
        bottom : 10,
         ...centerAll,
    },
    paginContainerBtn : {
        flex :1,
        flexDirection : 'row',
        
        // backgroundColor :'red',
        margin : 3
    },

    paginTouchBtn : {
        // flex : 1,
        ...centerAll,
        flexDirection : 'row',
        backgroundColor : '#EFEFEF',
        width : 117,
        height : 38,
        borderRadius :15,
    },
    paginTouchBtnImg : {
        width : 26,
        height : 26
    },
    paginTouchBtnText : {
        color :'#777777',
        fontSize : 10,
        fontWeight :'bold'
    },

    IndicatorContainer : {
        flex : 1,
        // flexDirection : 'row',
        marginTop : 19,
        marginBottom : 32,
    },
    IndicatorContainer1 : {
        flex : 1,
        flexDirection : 'row',
        
    },
    IndicatorContainer2 : {
        flex : 1,
        backgroundColor : 'red',
        height : 5,
        marginTop : -30,
        zIndex : -1,
        marginLeft : 30,
        marginRight : 30,
        backgroundColor : '#D9D9D9'
    },
    IndicatorListContainer : {
        flex : 1,
        ...centerAll,
    },
    IndicatorListContainer : {
        flex : 1,
        // backgroundColor : 'red',
        margin :1,
        flexDirection : 'column',
        ...centerAll,
    },
    IndicatorLamp : {
        width : 29,
        height : 29,
        // backgroundColor : '#D9D9D9',
        borderRadius : 50,
         ...centerAll,
    },
    IndicatorText : {
        color : '#8E8E8E',
        fontSize : 10,
    },
    IndicatorImg : {
        width : 20,
        height : 13,
    },




    centerAll : {
        ...centerAll,
    },
    





});
