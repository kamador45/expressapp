import React, {useState, useEffect} from "react";
import {TouchableOpacity, Text, StyleSheet, Image, View} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Separator from "./Separator";

const ButtonList = ({placeName, setShowFinderScreen, setTravelToAddress}) => {
    useEffect(() => {
    }, [placeName, setTravelToAddress]);
    const selectDirectionPlace = (address) => {
        setTravelToAddress(address);
        setTimeout(() => {
            setShowFinderScreen(false);
        },900);
    }
    return(
        placeName.response.map((items, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => selectDirectionPlace(items)}
                style={{
                  height:60,
                  width:"100%",
                  flexDirection:"row",
                  alignItems:"center"
                }}
            >
                <View style={{backgroundColor:"blue", width:30, height:30, borderRadius:30, justifyContent:"center",marginHorizontal:5}}>
                    <FontAwesome name="map-pin" size={15} color="#fff" style={{marginHorizontal:10}} />
                </View>
                <View style={{width:"90%"}}>
                    <Text style={{textAlign:"left",top:5}}>{items.name}</Text>
                    <Text style={{textAlign:"left",top:5, fontSize:10, color:"gray"}}>{items.display_name}</Text>
                    <Separator />
                </View>
            </TouchableOpacity>
        ))
    )
}

export default ButtonList;
