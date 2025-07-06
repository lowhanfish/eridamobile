import { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Button } from "react-native";

import { stylex } from '../assets/css';

const ModalSetting = ({ visible, onClose }) => { // Terima visible dan onClose sebagai props

    // Hapus state modalVisible internal, karena sekarang dikelola oleh parent

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible} // Gunakan prop visible
            onRequestClose={onClose} // Gunakan prop onClose
        >
            <View style={stylex.modalOverlay}>
                <View style={stylex.modalContent}>
                    <TouchableOpacity style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#6DA3EF' }]}>
                        <Text style={stylex.modalText}>Detail Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#EFD06D' }]}>
                        <Text style={stylex.modalText}>Edit Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#FF9191' }]}>
                        <Text style={stylex.modalText}>Hapus Data</Text>
                    </TouchableOpacity>
                    <Button title="Tutup" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

export default ModalSetting;