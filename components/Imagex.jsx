import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

const Imagex = ({ urix, width }) => {
    const [height, setHeight] = useState(null);
    const [imageLoading, setImageLoading] = useState(true); // true = gambar belum selesai dimuat
    const [sizeLoading, setSizeLoading] = useState(true);   // true = ukuran gambar belum diketahui

    useEffect(() => {
        if (typeof urix === 'number') {
            const img = Image.resolveAssetSource(urix);
            const ratio = img.height / img.width;
            setHeight(width * ratio);
            setSizeLoading(false);
        } else {
            Image.getSize(
                urix,
                (originalWidth, originalHeight) => {
                    const ratio = originalHeight / originalWidth;
                    setHeight(width * ratio);
                    setSizeLoading(false);
                },
                (error) => {
                    console.error("Failed to get image size", error);
                    setSizeLoading(false);
                }
            );
        }
    }, [urix, width]);

    return (
        <View style={{ width, height: height || 100, justifyContent: 'center', alignItems: 'center' }}>
            {(sizeLoading || imageLoading) && (
                <ActivityIndicator style={StyleSheet.absoluteFill} size="large" color="#947306" />
            )}
            {height && (
                <Image
                    source={typeof urix === 'string' ? { uri: urix } : urix}
                    style={{ width, height, resizeMode: 'contain' }}
                    onLoadStart={() => setImageLoading(true)}
                    onLoadEnd={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                />
            )}
        </View>
    );
};

export default Imagex;
