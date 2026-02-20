import React, {useEffect, useState} from "react";
import {Modal, Text, View, StyleSheet, TextInput} from "react-native";
import BackFinderButton from "./Buttons/BackFinderButton";
import ButtonList from "./ButtonList";
const openStreetMaps = require('../helpers/OpenStreetGeocoding');
const openStreetQuery = new openStreetMaps();
const FinderScreen = ({showFinderScreen, setShowFinderScreen, setTravelToAddress, country}) => {
    const [queryData, setQueryData] = useState("");
    const [placeNames, setPlaceNames] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(null);



    const makingQuery = async () => {
        const response = await openStreetQuery.searchPlacesByQueries(queryData, country);
        if(Object.values(response).length > 0) {
            setPlaceNames(response);
        }
    }

    const closeModal = () => {
        setQueryData("");
        setPlaceNames([]);
        setTravelToAddress([]);
        setShowFinderScreen(false);
    }

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const timeoutId = setTimeout(() => {
            if (queryData !== "") {
                makingQuery();
            }
        }, 100);

        setTypingTimeout(timeoutId);

        return () => clearTimeout(timeoutId); // Limpieza del timeout en cada render
    }, [queryData]);

    return (
        <Modal
            animationType={"slide"}
            transparent={false}
            visible={showFinderScreen}
            onRequestClose={showFinderScreen}
            presentationStyle={"fullScreen"}
        >
            <View style={styles.container}>
                <BackFinderButton
                    showFinderScreen={showFinderScreen}
                    closeModal={closeModal}
                />
                <View style={{flexDirection:"column", alignItems:"center", marginTop:30}}>
                    <TextInput
                        placeholder={"Ubicación Actual"}
                        style={{
                            width:"90%",
                            height:50,
                            borderWidth:0.5,
                            borderRadius:5,
                            paddingHorizontal:10,
                            marginVertical:5
                        }}
                        editable={false}
                    />
                    <TextInput
                        placeholder={"Buscar Destino"}
                        style={{
                            width:"90%",
                            height:50,
                            borderWidth:0.5,
                            borderRadius:5,
                            paddingHorizontal:10,
                            marginVertical:5
                        }}
                        onChangeText={(value) => setQueryData(value)}
                    />
                </View>

                <View style={{width:"90%", alignSelf:"center", marginTop:10}}>
                    {
                        placeNames.response?.length > 0 ? (
                            <View style={{alignSelf:"center", marginTop:0, width:"100%"}}>
                                <ButtonList
                                    setShowFinderScreen={setShowFinderScreen}
                                    placeName={placeNames}
                                    setTravelToAddress={setTravelToAddress}
                                />
                            </View>
                        ):(
                            <View style={{alignItems:"center", alignContent:"center", justifyContent:"center"}}>
                                <Text style={{textAlign:"left"}}>No tienes busquedas recientes</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"#fff"
    }
})
export default FinderScreen;
