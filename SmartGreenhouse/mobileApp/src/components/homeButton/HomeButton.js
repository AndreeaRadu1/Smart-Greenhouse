import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

const HomeButton = ({ onPress, text, type = "PRIMARY" }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, styles[`container_${type}`]]} >
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',

        padding: 40,
        marginVertical: 10,

        alignItems: 'center',
        borderRadius: 10,
    },

    container_PRIMARY: {
        backgroundColor: 'rgba(35, 62, 0, 0.54)'
    },

    container_SECONDARY: {
        backgroundColor: '#43428b',
        marginBottom: 40,
        marginTop: 40,
    },

    text_SECONDARY: {
        color: 'white',
    },

    container_Welcome: {
        backgroundColor: 'white',
    },

    text_Welcome: {
        color: 'black',
    },

    container_TERTIARY: {

    },

    text: {
        fontWeight: 'bold',
        color: '#C2410C',
        fontSize: 20
    },

    text_TERTIARY: {
        color: 'grey',
    },
});

export default HomeButton;