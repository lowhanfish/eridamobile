import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, Linking, Alert, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useGlobalStore from "../../stores/useGlobalStore";
import { stylex } from "../../assets/css";
import GetDataToken from "../lib/GetDataToken";

import axios from "axios";

const { width } = Dimensions.get('window');

const LombaInovda = ({ navigation }) => {
    

    const urlx = useGlobalStore((state) => state.url);
    const [panduan, setPanduan] = useState(null);
const [loadingPanduan, setLoadingPanduan] = useState(true);
    const visibleBar = useGlobalStore((state) => state.visibleBar)
    const setRouteBack = useGlobalStore((state) => state.setRouteBack);

    const getPanduan = async () => {
        try {
          const tokenz = await GetDataToken();
      
          const res = await axios.get(urlx.URL_Panduan, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `kikensbatara ${tokenz}`,
            },
          });
      
          if (res.data && res.data.length > 0) {
            // ambil data terakhir (paling aman)
            const lastData = [...res.data].sort(
              (a, b) => new Date(b.createAt) - new Date(a.createAt)
            )[0];
      
            setPanduan(lastData);
          }
        } catch (err) {
          console.log('Gagal ambil panduan', err);
        } finally {
          setLoadingPanduan(false);
        }
      };
      
      

      useFocusEffect(
        useCallback(() => {
          setRouteBack("Home");
          visibleBar(true, true);
          getPanduan();
        }, [])
      );

      const handleUnduhPanduan = () => {
        if (!panduan?.file) {
            Alert.alert("Info", "File panduan belum tersedia");
            return;
        }
    
        const panduanUrl = urlx.URL_FILE + panduan.file;
    
        Alert.alert(
            'Unduh Panduan',
            'Apakah Anda ingin mengunduh panduan Lomba Inovasi Daerah?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Unduh',
                    onPress: () => {
                        Linking.openURL(panduanUrl).catch(err => {
                            Alert.alert(
                                'Error',
                                'Tidak dapat membuka file panduan'
                            );
                        });
                    },
                },
            ]
        );
    };
    

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollPage}>
                <View style={styles.content}>
                    


                    {/* Title Section */}
                    {panduan?.judul && (
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                            {panduan.judul}
                            </Text>
                            <View style={styles.titleDivider} />
                        </View>
                        )}

                    

                    {/* Banner Section */}
                    {/* {loadingPanduan ? null : (
                        <View style={styles.bannerContainer}>
                        <Image
                            source={
                            panduan?.banner
                                ? { uri: urlx.URL_FILE + panduan.banner }
                                : require('../assets/images/lomba.png')
                            }
                            style={styles.bannerImage}
                            resizeMode="contain"
                        />
                        </View>
                        )} */}

                        {panduan?.gambar && (
                        <Image
                            source={{ uri: urlx.URL_FILE + panduan.gambar }}
                            style={styles.bannerFullBleed}
                            resizeMode="contain"
                        />
                        )}


                        {panduan?.isi && (
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.descriptionText}>
                                {panduan.isi}
                                </Text>
                            </View>
                            )}

                    {/* Info Cards */}
                    
                    {/* Button Section */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.unduhButton}
                            onPress={handleUnduhPanduan}
                            activeOpacity={0.8}
                        >
                            <Image
                                // source={require('../assets/images/icon/download.png')}
                                source={require('../assets/images/icon/news.png')}
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.unduhButtonText}>Unduh Panduan</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Contact Section */}
                    <View style={styles.contactContainer}>
                        <Text style={styles.contactTitle}>Informasi Lebih Lanjut</Text>
                        <Text style={styles.contactText}>Hubungi kami melalui:</Text>
                        <View style={styles.contactItem}>
                            <Image
                                // source={require('../assets/images/icon/email.png')}
                                source={require('../assets/images/icon/news.png')}
                                style={styles.contactIcon}
                            />
                            <Text style={styles.contactValue}>brida.konsel@gmail.com</Text>
                        </View>
                        <View style={styles.contactItem}>
                            <Image
                                // source={require('../assets/images/icon/phone.png')}
                                source={require('../assets/images/icon/news.png')}
                                style={styles.contactIcon}
                            />
                            <Text style={styles.contactValue}>+62 401 1234 5678</Text>
                        </View>
                    </View>

                    {/* Bottom Spacing */}
                    <View style={styles.bottomSpacing} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollPage: {
        flex: 1,
        width: '100%',
    },
    content: {
        padding: 20,
    },
    bannerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    bannerImage: {
        width: '80%',
        height: '80%',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    titleDivider: {
        width: 80,
        height: 4,
        backgroundColor: '#EFD06D',
        borderRadius: 2,
    },
    descriptionContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
        marginBottom: 12,
    },
    infoSection: {
        marginBottom: 20,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EFD06D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
    infoTextContainer: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    requirementsContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    checkText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    requirementText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    unduhButton: {
        flexDirection: 'row',
        backgroundColor: '#EFD06D',
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#EFD06D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
        marginRight: 12,
    },
    unduhButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactContainer: {
        backgroundColor: '#FFF8E1',
        borderRadius: 16,
        padding: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#EFD06D',
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    contactText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    contactIcon: {
        width: 18,
        height: 18,
        tintColor: '#EFD06D',
        marginRight: 10,
    },
    contactValue: {
        fontSize: 14,
        color: '#333',
    },
    bottomSpacing: {
        height: 40,
    },

    lombaTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 16,
      },

      bannerFull: {
        width: '100%',
        height: 220,
        marginBottom: 20,
      },
      bannerAuto: {
        width: '100%',
        aspectRatio: 16 / 9, // atau 4/3 sesuai gambar
        marginBottom: 20,
      },
      bannerFullBleed: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 1.3, // rasio poster
        marginLeft: -20,
        marginRight: -20,
        marginBottom: 20,
      },
      
      
});

export default LombaInovda;

