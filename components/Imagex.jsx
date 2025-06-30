import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

const Imagex = ({ urix, width }) => {
    const [height, setHeight] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof urix === 'number') {
            // Untuk gambar lokal (require)
            const img = Image.resolveAssetSource(urix);
            const ratio = img.height / img.width;
            setHeight(width * ratio);
            setLoading(false);
        } else {
            // Untuk gambar dari URL
            Image.getSize(
                urix,
                (originalWidth, originalHeight) => {
                    const ratio = originalHeight / originalWidth;
                    setHeight(width * ratio);
                    setLoading(false);
                },
                (error) => {
                    console.error("Failed to get image size", error);
                    setLoading(false);
                }
            );
        }
    }, [urix, width]);

    if (loading || !height) {
        return <ActivityIndicator />;
    }

    return (
        <Image
            source={typeof urix === 'string' ? { uri: urix } : urix}
            style={{ width, height, resizeMode: 'contain' }}
        />
    );
};

export default Imagex;
