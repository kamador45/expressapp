import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import ShowFinder from "./ShowFinder";
import {DrawerActions, useNavigation} from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';
const Header = ({title, color}) => {
    const navigation = useNavigation();
    const openNavMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }
    return (
        <View style={{ backgroundColor: "#000", height: 100, flexDirection: "row", alignItems: "center", width:"100%"}}>
            {/* Contenedor del botón ShowFinder (alineado a la izquierda) */}
            <View style={{left:10,flex:1,height:"50%", justifyContent:"center", top:10, alignItems:"flex-start"}}>
                <TouchableOpacity onPress={() => openNavMenu()}>
                    <Feather name="menu" size={24} color={color} />
                </TouchableOpacity>
            </View>

            {/* Título centrado */}
            <View style={{top:10, flex:1}}>
                <Text style={{ fontSize: 20, fontWeight: "regular", textAlign:"center", color:color }}>{title}</Text>
            </View>
            <View style={{flex:1}}></View>
        </View>

    )
}

export default Header;
