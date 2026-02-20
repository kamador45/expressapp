import React, { useRef, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const ConfirmRide = ({expand, bottomSheetRef}) => {

    // Definir los puntos de quiebre para el BottomSheet
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // Función para manejar el estado de BottomSheet
    const handleSheetChanges = (index) => {
        console.log('BottomSheet index:', index);
    };

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1} // Inicialmente cerrado
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                    <Text>¡Hola! Este es un BottomSheet.</Text>
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default ConfirmRide;
