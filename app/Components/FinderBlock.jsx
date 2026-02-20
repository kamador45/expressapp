import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const FinderBlock = ({setShowFinderScreen}) => {
    const openFinderScreen = () => {
        setShowFinderScreen(true);
    }
    return (
        <TouchableOpacity style={styles.container} onPress={openFinderScreen}>
            <View style={styles.containerInfo}>
                <FontAwesome name="square" size={7} color="black" style={{alignItems:"flex-start", marginLeft:10}} />
                <Text style={styles.text}>¿A donde quieres ir?</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 340,
        height: 50,
        backgroundColor: '#FFF', // Color de fondo del botón
        justifyContent: 'center', // Centrar el contenido verticalmente
        alignItems: 'center', // Centrar el contenido horizontalmente
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Posición de la sombra
        shadowOpacity: 0.8, // Opacidad de la sombra
        shadowRadius: 4, // Radio de la sombra
        elevation: 5, // Elevación para sombras en Android,
        top:130,
        zIndex:999,
        alignSelf:"center"
    },
    containerInfo:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center"
    },
    text: {
        color: 'gray', // Color del texto
        fontSize: 15, // Tamaño del texto
        fontWeight: 'bold', // Grosor del texto
        marginLeft:10,
    }
});

export default FinderBlock;
