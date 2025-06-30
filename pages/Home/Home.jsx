import React, { useCallback, useState, useEffect } from 'react';
import { Dimensions, View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import useGlobalStore from "../../stores/useGlobalStore.js";

import { stylex } from "../../pages/assets/css/index.js";

const { width } = Dimensions.get('window');


const AutoHeightImage = ({ uri, width }) => {
    const [imageHeight, setImageHeight] = useState(0);

    useEffect(() => {
        if (uri) {
            Image.getSize(uri, (originalWidth, originalHeight) => {
                const aspectRatio = originalWidth / originalHeight;
                setImageHeight(width / aspectRatio);
            });
        }
    }, [uri, width]);

    return (
        <View style={{ width, height: imageHeight }}>
            <Image
                source={{ uri }}
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    );
}


import Imagex from "../../components/Imagex.jsx";



const Home = () => {
    const navigation = useNavigation();
    const visibleBar = useGlobalStore((state) => state.visibleBar);


    useFocusEffect(
        useCallback(() => {
            visibleBar(false, true);
            return () => {
                visibleBar(true, true);
            }
        }, [visibleBar])
    )

    return (
        <View style={stylex.container}>
            <Image
                source={require('../../pages/assets/images/homebanner.png')}
                style={[stylex.imageLogo, styles.imagebanner, { width: '100%' }]}
            />
            {/* <AutoHeightImage uri={imageUri} width={displayWidth} /> */}




            <ScrollView style={stylex.scrollPage}>
                <View style={styles.homeLogo}>
                    <Imagex width={121} urix={require('../../pages/assets/images/logo2.png')} />
                </View>

                <View>
                    <View>
                        <Text>HOME</Text>
                    </View>
                    <View>

                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Text>Route Profile</Text>
                </TouchableOpacity>
                <View>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    homeLogo: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24
    },
    imagebanner: {
        position: 'absolute',
        right: 0,
        top: -25,
        // backgroundColor: 'pink'

    },
});


export default Home;