import { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

import Imagex from "./Imagex";
import { stylex } from "../pages/assets/css/index";


const RecentNews = () => {

    return (
        <>
            <View>
                <View style={[styles.containerContent1]}>
                    <View style={[styles.containerContentDiv1]}>
                        <Text style={stylex.textTitleList}>RECENT RIDA NEWS</Text>
                    </View>


                    {[...Array(8)].map((_, i) => (

                        <View key={i} style={stylex.newsListContainer}>
                            <View styl={stylex.newsListContainerImg}>
                                <Image style={stylex.ImgNews} source={{ uri: 'https://server-erida.konaweselatankab.go.id/uploads/1750636695002.jpg' }} />
                            </View>
                            <View style={stylex.newsListContainerText}>
                                <View>
                                    <TouchableOpacity>
                                        <Text style={stylex.newsListTitle}>
                                            Sekda Konsel Terima 30 Mahasiswa KKN-PPM UGM
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={stylex.newsListTitleDesc}>
                                        <Image style={stylex.newsListTitleDescIcon} source={require('../pages/assets/images/icon/time.png')} />
                                        <Text style={stylex.newsListTitleDescText}>20 March 2025</Text>
                                    </View>
                                    <View style={stylex.newsListTitleDesc}>
                                        <Image style={stylex.newsListTitleDescIcon} source={require('../pages/assets/images/icon/user.png')} />
                                        <Text style={stylex.newsListTitleDescText}>admin_erida</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                    ))}




                </View>
            </View>
        </>
    )
}



const styles = StyleSheet.create({


    containerContent1: {
        flex: 1,
        borderStyle: 'solid',
        borderTopWidth: 14,
        borderTopColor: '#D9D9D9',
        // flexDirection: 'row',
        paddingTop: 10,
    },
    containerContentDiv: {
        flex: 1,
    },
    containerContentDiv1: {
        flex: 1,
        borderBottomWidth: 5,
        borderBottomColor: '#D9D9D9',
        paddingBottom: 12,
        marginBottom: 13,
    },
    textTitleListItem: {
        fontSize: 12,
        fontFamily: 'Courier New',
        marginTop: 5
    }

});

export default RecentNews