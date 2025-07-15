import { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import RNPickerSelect from 'react-native-picker-select';

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
                        <Text style={stylex.inputText1}>Jumlah Data ditampilkan</Text>
                        <View style={stylex.inputxSelect}>

                            <RNPickerSelect

                                onValueChange={(value) => console.log(value)}
                                items={[
                                    { label: '- 8 Data -', value: '8' },
                                    { label: '- 25 Data -', value: '25' },
                                    { label: '- 50 Data -', value: '50' },
                                    { label: '- 100 Data -', value: '100' },
                                    { label: '- 250 Data -', value: '250' },

                                ]}
                            />
                        </View>
                    </View>


                    <TouchableOpacity style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#60BDDA' }]}>
                        <Text style={stylex.modalText}>TERAPKAN</Text>
                    </TouchableOpacity>





                    <TouchableOpacity onPress={onClose} style={[stylex.modalButton, stylex.shaddow, { backgroundColor: '#DE675B', marginTop: 5 }]}>
                        <Text style={stylex.modalText}>BATAL</Text>
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