import React from 'react';
import {View, Text} from "react-native";


const TitleApp = ({title}) => {
    return(
        <View style={{width:'100%'}}>
            <Text style={{fontSize:40, fontWeight:"bold", marginLeft:4, color:"#000"}}>{title}</Text>
        </View>
    )
}

export default TitleApp;