import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator = () => {
    return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
    separator: {
        height: 1, // Altura de la línea
        width: '100%', // Ancho completo
        backgroundColor: '#CED0CE', // Color de la línea
        marginVertical: 10, // Margen vertical para separar de otros elementos
    },
});

export default Separator;
