import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Easing, StatusBar } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    // Start animations
    Animated.sequence([
      // Fade in and scale up logo
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          speed: 12,
          bounciness: 8,
          useNativeDriver: true,
        }),
      ]),
      // Fade in text
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Wait a bit then finish
      setTimeout(() => {
        if (onFinish) {
          onFinish();
        }
      }, 500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
      >
        <Image
          source={require('../pages/assets/images/logo1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.Text
        style={[
          styles.appName,
          {
            opacity: textOpacity,
          },
        ]}
      >
        erida
      </Animated.Text>
      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: textOpacity,
          },
        ]}
      >
        Aplikasi Penelitian dan Inovasi
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    letterSpacing: 1,
  },
});

export default SplashScreen;

