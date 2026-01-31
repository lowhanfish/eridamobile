import { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { stylex } from '../assets/css';

const ModalKrenova = ({ visible, onClose, datax, removeData }) => {
    const navigation = useNavigation();

    const routeToDetail = () => {
        onClose();
        navigation.navigate('DetailKrenova', { id: datax?.id });
    };

    const routeToEdit = () => {
        onClose();
        navigation.navigate('AddKrenova', { typex: 'edit', id: datax?.id });
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={[stylex.modalOverlay, { flex: 1 }]}>
                <View style={[stylex.modalContent]}>
                    <TouchableOpacity 
                        onPress={routeToDetail} 
                        style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#6DA3EF' }]}
                    >
                        <Text style={stylex.modalText}>Detail Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={routeToEdit} 
                        style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#EFD06D' }]}
                    >
                        <Text style={stylex.modalText}>Edit Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            onClose();
                            removeData(datax);
                        }} 
                        style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#FF9191' }]}
                    >
                        <Text style={stylex.modalText}>Hapus Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={onClose} 
                        style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#AC4345', marginTop: 22 }]}
                    >
                        <Text style={stylex.modalText}>Tutup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    btnClose: {
        width: '100%',
        height: 45,
        backgroundColor: 'red'
    }
});

export default ModalKrenova;

