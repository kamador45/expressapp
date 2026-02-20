import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const ShowFinder = ({openNavMenu, top}) => {
    const openSideMenu = () => {
        openNavMenu;
    }
    return (
        <TouchableOpacity style={[styles.container,{top:top}]} onPress={openNavMenu}>
            <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 75, // La mitad de la altura/ancho para hacerlo circular
        backgroundColor: '#FFF', // Color de fondo del botón
        justifyContent: 'center', // Centrar el contenido verticalmente
        alignItems: 'center', // Centrar el contenido horizontalmente
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Posición de la sombra
        shadowOpacity: 0.8, // Opacidad de la sombra
        shadowRadius: 4, // Radio de la sombra
        elevation: 5, // Elevación para sombras en Android,
        zIndex:999,
        marginLeft:15
    },
    text: {
        color: '#fff', // Color del texto
        fontSize: 16, // Tamaño del texto
        fontWeight: 'bold', // Grosor del texto
    }
});

export default ShowFinder;
