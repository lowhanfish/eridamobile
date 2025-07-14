import { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { stylex } from '../assets/css';
// import { StyleSheet } from 'react-native/types_generated/index';

const ModalSetting = ({ visible, onClose }) => { // Terima visible dan onClose sebagai props

    const [text, onChangeText] = useState('');

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
                    <View style={stylex.InputContainer}>
                        <Text style={stylex.inputText1}>Pilih Jumlah Data ditampilkan</Text>
                        <TextInput
                            style={stylex.inputx1}
                            onChangeText={onChangeText}
                            value={text}
                        />
                    </View>


                    <TouchableOpacity style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#EFD06D' }]}>
                        <Text style={stylex.modalText}>Filter</Text>
                    </TouchableOpacity>





                    <TouchableOpacity onPress={onClose} style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#AC4345', marginTop: 5 }]}>
                        <Text style={stylex.modalText}>Batal</Text>
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