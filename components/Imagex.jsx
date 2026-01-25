
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from "react-native";

const Imagex = ({ urix, width, onPress }) => {
    const [height, setHeight] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setImageLoading(true);
        setError(false);

        if (typeof urix === 'number') {
            // Local image from require()
            try {
                const img = Image.resolveAssetSource(urix);
                if (img && img.width > 0 && img.height > 0) {
                    const ratio = img.height / img.width;
                    setHeight(width * ratio);
                } else {
                    // Fallback: use provided width as height
                    setHeight(width);
                }
            } catch (e) {
                // Fallback: use provided width as height
                setHeight(width);
            }
            setImageLoading(false);
        } else if (typeof urix === 'string') {
            // Remote image URL
            const isPdfUri = 
                urix.toLowerCase().endsWith('.pdf') || 
                urix.toLowerCase().includes('.pdf?') ||
                (urix.includes('name=') && urix.toLowerCase().includes('.pdf'));
            
            if (isPdfUri) {
                setHeight(width * 1.4);
                setImageLoading(false);
            } else {
                // Set a timeout to stop loading after 8 seconds
                const timeout = setTimeout(() => {
                    if (imageLoading) {
                        setImageLoading(false);
                        if (height === null) {
                            setHeight(width);
                        }
                    }
                }, 8000);

                Image.getSize(
                    urix,
                    (originalWidth, originalHeight) => {
                        clearTimeout(timeout);
                        const ratio = originalHeight / originalWidth;
                        setHeight(width * ratio);
                        setImageLoading(false);
                    },
                    (err) => {
                        clearTimeout(timeout);
                        setHeight(width);
                        setImageLoading(false);
                        setError(true);
                    }
                );
            }
        } else {
            setImageLoading(false);
        }
    }, [urix, width]);

    if (error) {
        return (
            <View style={{ width, height: width, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
                <Text style={{ fontSize: 12, color: '#666' }}>Gagal memuat</Text>
            </View>
        );
    }

    const imageStyle = { width, height: height || width, resizeMode: 'contain' };

    return (
        <View style={{ width, height: height || width, justifyContent: 'center', alignItems: 'center' }}>
            {imageLoading ? (
                <View style={[imageStyle, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }]}>
                    <ActivityIndicator size="small" color="#947306" />
                </View>
            ) : onPress ? (
                <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                    <Image
                        source={typeof urix === 'string' ? { uri: urix } : urix}
                        style={imageStyle}
                        onError={() => {
                            setImageLoading(false);
                            setError(true);
                        }}
                    />
                </TouchableOpacity>
            ) : (
                <Image
                    source={typeof urix === 'string' ? { uri: urix } : urix}
                    style={imageStyle}
                    onError={() => {
                        setImageLoading(false);
                        setError(true);
                    }}
                />
            )}
        </View>
    );
};

export default Imagex;

