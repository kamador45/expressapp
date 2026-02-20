import React from "react";
import {View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity} from "react-native";
import Divider from "../Divider";
const avatar = require("../../../assets/user_avatar.png");
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useNavigation} from "@react-navigation/native";
import Profile from "../../Screens/user/Profile";
const CustomDrawerContent = ({userDatas, logout}) => {
    const navigation = useNavigation();
    const navigationApp = [
        {
            id:1,
            title:"Home",
            navigation:"Home",
            icon:"home",
        },
        {
            id:2,
            title:"Perfil",
            navigation:"Profile",
            icon:"person",
        },
        {
            id:3,
            title:"Historial de viajes",
            navigation:"History",
            icon:"history",
        },
        {
            id:4,
            title:"Configuraciones",
            navigation:"Settings",
            icon:"settings",
        }
    ]
    return(
        <SafeAreaView style={{flex:1, backgroundColor:"rgba(0,0,0,0.9)"}}>
            <View style={{flex:1, flexDirection:"column", alignItems:"center"}}>
                <View style={{width:100, height:100}}>
                    <Image source={avatar} style={{width:"100%", height:"100%"}} />
                </View>
                <View style={{width:"100%", margin:7}}>
                    {
                        userDatas && (
                            <React.Fragment>
                                {
                                    userDatas.map((items) => (
                                        <Text style={{color:"#fff", textAlign:"center"}}>{items.firstName} {items.lastName}</Text>
                                    ))
                                }
                            </React.Fragment>
                        )
                    }
                </View>
                <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"100%", margin:10}}>
                    <View>
                        <Text style={{color:"#fff", textAlign:"center"}}>
                            10
                        </Text>
                        <Text style={{color:"#fff", textAlign:"center"}}>
                            Viajes
                        </Text>
                    </View>
                    <View>
                        <Text style={{color:"#fff", textAlign:"center"}}>
                            5
                        </Text>
                        <Text style={{color:"#fff", textAlign:"center"}}>
                            Favoritos
                        </Text>
                    </View>
                </View>
                <Divider width={"90%"} height={0.3} margin={10} />
                <View style={{width:"100%", height:"100%"}}>
                    <View style={{margin:10, flexDirection:"column"}}>
                        {
                            navigationApp.map((i) => (
                                <TouchableOpacity key={i.id} onPress={() => navigation.navigate(i.navigation)} style={{height:50,width:"90%", borderRadius:10, justifyContent:"space-evenly", alignItems:"center"}}>
                                    <View style={{ flexDirection:"row", alignItems:"center",flex:1, width:"90%"}}>
                                        <MaterialIcons name={i.icon} size={24} color="#fff" style={{margin:10}} />
                                        <Text style={{color:"#fff"}}>{i.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }

                        <TouchableOpacity onPress={() => logout()} style={{height:50,width:"90%", borderRadius:10, justifyContent:"space-evenly", alignItems:"center"}}>
                            <View style={{ flexDirection:"row", alignItems:"center",flex:1, width:"90%"}}>
                                <MaterialIcons name={"logout"} size={24} color="#fff" style={{margin:10}} />
                                <Text style={{color:"#fff"}}>Cerrar Sesión</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CustomDrawerContent;
