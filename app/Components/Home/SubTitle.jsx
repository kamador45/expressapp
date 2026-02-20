import React from 'react';
import {View, Text} from "react-native";


const SubTitle = ({title}) => {
    return(
        <View style={{width:'100%'}}>
            <Text style={{fontSize:20, fontWeight:"bold", marginLeft:4, color:"#000"}}>{title}</Text>
        </View>
    )
}

export default SubTitle;