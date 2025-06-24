import { StyleSheet } from "react-native";


export const stylex = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'pink',
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

        // justifyContent: 'center',
        // alignItems: 'center',
    },
    bottomBar : {
        backgroundColor : 'purple',
        width : '100%',
        height : 86,
    },

    bottomBarContainer : {
        backgroundColor : 'red',
        flex : 1,
        justifyContent : "center",
        alignItems : 'center'
    }
});
