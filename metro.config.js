const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const config = {
  resolver: {
    extraNodeModules: {
        'react-native-fs': path.resolve(__dirname, 'fs-bridge.js'),
        'crypto-js': path.resolve(__dirname, 'node_modules/crypto-js'),
        // Tambahkan baris ini
        'lodash.isequal': path.resolve(__dirname, 'node_modules/lodash.isequal/index.js'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);