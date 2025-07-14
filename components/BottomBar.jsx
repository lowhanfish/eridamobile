import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";



import { useNavigation } from "@react-navigation/native";



// import { stylex } from "../pages/assets/css/index";


const BottomBar = ({ navigation }) => {

    // const navigation = useNavigation();

    return (
        <View style={styles.bottomBar}>
            <View style={styles.bottomBarContainer}>

                <View style={[styles.containerIconBottomBar]}>
                    <TouchableOpacity onPress={() => navigation.navigate("MainPage", { screen: "Home" })} style={styles.btnMenu}>
                        <Image style={styles.iconBottomBar} source={require('../pages/assets/images/icon/home.png')} />
                        <Text style={styles.iconBottomBarText}>HOME</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.containerIconBottomBar]}>
                    <TouchableOpacity onPress={() => navigation.navigate("MainPage", { screen: "ListUsulan" })} style={styles.btnMenu}>
                        <Image style={styles.iconBottomBar} source={require('../pages/assets/images/icon/news.png')} />
                        <Text style={styles.iconBottomBarText}>DATA</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.containerIconBottomBar]}>
                    <TouchableOpacity onPress={() => navigation.navigate("MainPage", { screen: "NewsList" })} style={styles.btnMenu}>
                        <Image style={styles.iconBottomBar} source={require('../pages/assets/images/icon/documents.png')} />
                        <Text style={styles.iconBottomBarText}>NEWS</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.containerIconBottomBar]}>
                    <TouchableOpacity onPress={() => navigation.navigate("MainPage", { screen: "Profile" })} style={styles.btnMenu}>
                        <Image style={styles.iconBottomBar} source={require('../pages/assets/images/icon/settings.png')} />
                        <Text style={styles.iconBottomBarText}>DOCUMENTS</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.containerIconBottomBar]}>
                    <TouchableOpacity onPress={() => navigation.navigate("MainPage", { screen: "Profile" })} style={styles.btnMenu}>
                        <Image style={styles.iconBottomBar} source={require('../pages/assets/images/icon/data.png')} />
                        <Text style={styles.iconBottomBarText}>SETTING</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    )

}


const styles = StyleSheet.create({

    bottomBar: {
        // backgroundColor: 'purple',
        width: '100%',
        height: 86,
        // flex :1,
    },

    bottomBarContainer: {
        backgroundColor: '#EFD06D',
        flex: 1,
        flexDirection: 'row',
        borderTopLeftRadius: 33,
        borderTopRightRadius: 33,
        // justifyContent: "center",
        // alignItems: 'center',
    },

    containerIconBottomBar: {
        flex: 1,
        // width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
    },
    btnMenu: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBottomBar: {
        // backgroundColor: 'yellow',
        width: 36,
        height: 36
    },
    iconBottomBarText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 3,
    }



})



export default BottomBar