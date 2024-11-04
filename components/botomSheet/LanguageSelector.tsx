import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

export default function LanguageSelector() {
    const [language, setLanguage] = useState('ru'); // 'ru' для русского языка
    const [modalVisible, setModalVisible] = useState(false);
    const selectLanguage = (code: string) => {
        setLanguage(code);
        setModalVisible(false);
        console.log('leng',code)
        // Сюда можно добавить код для обновления языка приложения
    };


    const languages = [
        { code: 'ru', label: 'Русский' },
        { code: 'en', label: 'English' },
        { code: 'it', label: 'Italiano' },
        // Добавьте другие языки здесь
    ];



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.text}>{languages.find((lang) => lang.code === language)?.label}</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    {languages.map((lang) => (
                        <TouchableOpacity key={lang.code} onPress={() => selectLanguage(lang.code)}
                                          style={[styles.option, { backgroundColor: lang.code === language ? 'blue' : 'white' }]} // Исправление на lang.code
                        >
                            <Text style={[styles.optionText,{ color: lang.code === language ? 'white' : 'black' }]}>{lang.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10, alignItems: 'center' },
    button: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize:22,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding:20,
        gap:10,
    },
    option: {
        padding: 15,
        width:'100%',
        backgroundColor: 'white',
    },
    optionText: {
        fontSize: 18,
        textAlign:"center"
    },
});
