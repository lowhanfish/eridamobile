import { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Button, StyleSheet } from "react-native";

import { stylex } from '../assets/css';
// import { StyleSheet } from 'react-native/types_generated/index';

const ModalSetting = ({ visible, onClose }) => { // Terima visible dan onClose sebagai props

    // Hapus state modalVisible internal, karena sekarang dikelola oleh parent

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible} // Gunakan prop visible
            onRequestClose={onClose} // Gunakan prop onClose
        >
            <View style={[stylex.modalOverlay, { flex: 1 }]}>
                <View style={[stylex.modalContent]}>
                    <TouchableOpacity style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#6DA3EF' }]}>
                        <Text style={stylex.modalText}>Detail Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#EFD06D' }]}>
                        <Text style={stylex.modalText}>Edit Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#FF9191' }]}>
                        <Text style={stylex.modalText}>Hapus Data</Text>
                    </TouchableOpacity>





                    <TouchableOpacity onPress={onClose} style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#AC4345', marginTop: 22 }]}>
                        <Text style={stylex.modalText}>Tutup</Text>
                    </TouchableOpacity>




                </View>
            </View>
        </Modal>
    );
};



const styles = StyleSheet.create({
    btnClose: {
        // flex: 1,
        width: '100%',
        height: 45,
        backgroundColor: 'red'
    }
})

export default ModalSetting;