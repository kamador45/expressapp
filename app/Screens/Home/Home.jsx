import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ActivityIndicator} from "react-native";
import {useNavigation} from "@react-navigation/native";
import useUser from "../../Stores/useUser";
import TitleApp from "../../Components/Home/TitleApp";
import SubTitle from "../../Components/Home/SubTitle";
import {getMe} from "../../lib/getMe";

const Home = () => {
    const {
        user,
        token,
        logout
    } = useUser();

    const navigation = useNavigation();

    const [servicesList, setServicesList] = useState([
        {
            id:1,
            serviceName:"Taxi",
            icon:require("../../../assets/Home/taxi-unselected.png"),
            iconSelected:require("../../../assets/Home/taxi-selected.png"),
            maxPassangers:4
        },
        {
            id:2,
            serviceName: "Privado",
            icon:require("../../../assets/Home/private-unselected.png"),
            iconSelected:require("../../../assets/Home/private-selected.png"),
            maxPassangers: 4
        },
        {
            id:3,
            serviceName: "Motocicleta",
            icon:require("../../../assets/Home/bike-unselected.png"),
            iconSelected:require("../../../assets/Home/bike-selected.png"),
            maxPassangers: 1
        }
    ]);

    const [selected, setSelected] = useState(null)

    const handleSelect = (items, index) => {
        setSelected(index);
    }

    //will update the user info
    useEffect(() => {
        const updatingUserInfo = async () => {
            const fetching = await getMe(token);
            console.log("Checando session ==>", fetching);
            if(fetching.status === 401) {
                await logout();
            }
        }

        updatingUserInfo();

    }, []);

    const Service = ({servicesList}) => (
        <View
          style={{
              flexWrap:"wrap",
              display:"flex",
              flexDirection:"row",
              margin:5,
              gap:6,
              alignSelf:"center"
        }}>
            {
                servicesList.map((service, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{width:"49%", height:150, borderRadius:10, alignSelf:"center",backgroundColor: index === selected  ? "rgba(0,0,0,0.2)":"rgba(0,0,0,0.1)", alignItems:"center", justifyContent:"center"}}
                        onPress={() => {
                            handleSelect(service, index);
                                navigation.navigate('Maps',{
                                    serviceType:service.id,
                                    maxPassangers:service.maxPassangers,
                                });
                        }}
                    >
                        <View style={{width:70, height:70}}>
                            <Image source={index === selected ? service.iconSelected : service.icon} style={{width:"100%", height:"100%"}} />
                        </View>
                        <View style={{marginTop:5}}>
                            <Text style={{fontSize:18, fontWeight:"regular", textAlign:"center", color: index === selected ? "#fff" : "#000"}}>{service.serviceName}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )

    return(
        <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
            <View style={{flex:1, alignItems:"center"}}>
                <View style={{display:"flex",width:"100%", justifyContent:"flex-start", marginTop:30}}>
                    <TitleApp title={"Express App"} />
                </View>
                <View style={{display:"flex",width:"100%", justifyContent:"flex-start",}}>
                    <SubTitle title={"A donde sea?"} />
                </View>
                <View>
                    <Service servicesList={servicesList} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home;