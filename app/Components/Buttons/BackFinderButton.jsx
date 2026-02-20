import React, {useRef} from "react";
import {View, StyleSheet, TouchableOpacity, Animated} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import {useEffect} from "react";


const BackFinderButton = ({showFinderScreen,closeModal, closeConfirmRide}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    //life cycle animation
    useEffect(() => {
        if(showFinderScreen) {
            const timeout = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 1, // Opacidad final en 1 (completamente visible)
                    duration: 500, // Duración de la animación en milisegundos
                    useNativeDriver: true, // Mejora el rendimiento usando el driver nativo
                }).start();
            }, 500); // Esperar 500ms

            return () => clearTimeout(timeout);
        } else {
            Animated.timing(fadeAnim,{
                toValue:1,
                duration:500,
                useNativeDriver:true
            }).start()
        }
    }, [showFinderScreen, fadeAnim]);


    return(
        <View style={styles.container}>
            <Animated.View style={[styles.backButton, {opacity:fadeAnim}]}>
                <TouchableOpacity
                    onPress={() => {
                        if (closeModal) closeModal(); // Verifica si closeModal está definido antes de llamarlo
                        if (closeConfirmRide) closeConfirmRide(); // Verifica si closeConfirmRide está definido antes de llamarlo
                    }}
                >
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:50,
    },
    backButton:{
        backgroundColor:"#fff",
        width: 50,
        height: 50,
        borderRadius: 75, // La mitad de la altura/ancho para hacerlo circular
        justifyContent: 'center', // Centrar el contenido verticalmente
        alignItems: 'center', // Centrar el contenido horizontalmente
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Posición de la sombra
        shadowOpacity: 0.8, // Opacidad de la sombra
        shadowRadius: 4, // Radio de la sombra
        elevation: 5, // Elevación para sombras en Android,
        top:10,
        zIndex:999,
        marginLeft:15
    }
})

export default BackFinderButton;
