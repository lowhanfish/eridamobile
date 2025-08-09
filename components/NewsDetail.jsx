import { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import useGlobalStore from "../stores/useGlobalStore.js";
import { stylex } from "../pages/assets/css/index.js";
import ImageLib from "./ImageLib.jsx";
import axios from "axios";
import GetDataToken from "../pages/lib/GetDataToken.js";




const NewsDetail = () => {

    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);

    const urlx = useGlobalStore(state => state.url)

    const [cek_load_data, setCekLoadData] = useState(true);
    const [list_data, setListData] = useState([]);



    const route = useRoute();
    const { id } = route.params;

    console.log(id)


    const getData = async () => {
        setCekLoadData(true)
        var tokenz = await GetDataToken();
        axios.post(urlx.URL_Berita + '/viewOne', {
            id: id
        }, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `kikensbatara ${tokenz}`,
            }
        }).then(response => {
            setCekLoadData(false)
            setListData(response.data)
            console.log(response)
        }).catch(err => {
            setCekLoadData(false)
            console.log(err)
        })
    }

    useFocusEffect(
        useCallback(() => {
            setRouteBack("NewsList");
            visibleBar(true, true);
            getData();
        }, [visibleBar])
    )

    return (
        <View style={stylex.container}>
            <ScrollView style={stylex.scrollPage}>
                <View style={{ flex: 1, paddingBottom: 50 }}>

                    {cek_load_data ? (

                        <View style={stylex.loading_container}>
                            <ImageLib style={{ width: 200 }} urix={require('../pages/assets/images/loading.gif')} />
                            <Text style={stylex.loading_text}>Memuat Data...</Text>
                        </View>
                    ) : (

                        list_data.map((data, i) => (

                            <View key={i}>
                                <ImageLib
                                    urix={"https://server-erida.konaweselatankab.go.id/uploads/1752836088394.jpg"} customWidth={'100%'}
                                    style={styles.ImgNews}
                                />

                                <Text style={styles.NewsTitle}>{data.judul}</Text>
                                <View style={styles.newsAuthorContainer}>
                                    <View style={styles.newsAuthorContainerItem}>
                                        <Image style={stylex.newsListTitleDescIcon} source={require('../pages/assets/images/icon/time.png')} />
                                        <Text style={stylex.newsListTitleDescText}>20 March 2025</Text>
                                    </View>
                                    <View style={styles.newsAuthorContainerItem}>
                                        <Image style={stylex.newsListTitleDescIcon} source={require('../pages/assets/images/icon/user.png')} />
                                        <Text style={stylex.newsListTitleDescText}>admin_erida</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.newsText}>
                                        {data.isi}
                                    </Text>
                                </View>
                            </View>
                        ))

                    )}




                </View>
            </ScrollView>
        </View>
    )

}



const styles = StyleSheet.create({
    ImgNews: {
        borderWidth: 0.2,
        borderRadius: 5
    },
    NewsTitle: {
        color: '#717171',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 18
    },
    newsAuthorContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
    },
    newsAuthorContainerItem: {

        width: 120,
        flexDirection: 'row'
    },
    newsText: {
        textAlign: 'justify',
        marginTop: 13
    },
})


export default NewsDetail