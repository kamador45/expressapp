import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Splash = () => {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 2000, // Duración de la animación en milisegundos
                useNativeDriver: true,
            })
        ).start();
    }, [rotation]);

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotateInterpolate }],
    };

    return (
        <View style={styles.container}>
            <Animated.View style={animatedStyle}>
                <MaterialCommunityIcons name="map-marker" size={60} color="#fff" />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
});

export default Splash;
