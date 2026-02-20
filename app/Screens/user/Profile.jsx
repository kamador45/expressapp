import React, {useState, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ActivityIndicator} from "react-native"
const avatar = require("../../../assets/user_avatar.png");
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useUser from "../../Stores/useUser";
import FirstNameField from "../../Components/Field/FirstNameField";
import LastNameField from "../../Components/Field/LastNameField";
import EmailField from "../../Components/Field/EmailField";
import {convertFirstUpperCase} from "../../helpers/convertFirstUpperCase";
import {updatingUserProfile} from "../../ViewModels/updatingUserProfile";
import PhoneField from "../../Components/Field/PhoneField";
import useFetchUserProfile from "../../hooks/useFetchUserProfile";

const Profile = () => {
    const {
        user,
        token
    } = useUser();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const {
        loading,
        error
    } = useFetchUserProfile(token);

    useEffect(() => {
        if(user !== null) {
            user.map((items) => {
                setFirstName(items.firstName);
                setLastName(items.lastName);
                setEmail(items.email);
                setPhoneNumber(items.phoneNumber);
            })
        }
    },[loading]);

    const handleUpdatingProfile =  () => {
        if(firstName !== "" && lastName !== "" && email !== "" && phoneNumber !== "") {
            updatingUserProfile(firstName,lastName,email,phoneNumber)
                .then((result) => {
                    if(result.data.StatusCode === 1) {
                        console.log(result.data.message);
                    }
                }).catch((e) => {
                    console.log(e);
            })
        }
    }

    // Agrega un console.log para verificar el estado
    console.log('Loading:', loading, 'Error:', error);


    if(loading) {
        return <ActivityIndicator size={"large"} color={"#000FF"} style={{alignItems:"center", justifyContent:"center", alignContent:"center", flex:1}} />;
    }

    if(error){
        return(
            <View>
                <Text>{error.message}</Text>
            </View>
        )
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
            <View style={{flex:1, alignItems:"center", margin:5}}>
                <View style={{width:100, height:100}}>
                    <Image source={avatar} style={{width:"100%", height:"100%"}} />
                    <TouchableOpacity style={{width:40, alignItems:"center", zIndex:999, position:"absolute", right:0, top:60}} onPress={() => console.log("change picture")}>
                        <MaterialIcons name="camera-alt" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={{margin:10}}>
                    {
                        user !== null && (
                            user.map((i) => (
                                <View style={{justifyContent:"center", alignItems:"center"}}>
                                    <Text style={{fontSize:20, color:"#000"}}>{convertFirstUpperCase(i.firstName)} {convertFirstUpperCase(i.lastName)}</Text>
                                    <Text style={{fontSize:12, color:"#000", margin:2}}>{i.email}</Text>
                                </View>
                            ))
                        )
                    }
                </View>

                <View style={{margin:10, width:"100%",alignItems:"center"}}>
                    <View style={{flexDirection:"colum"}}>
                        <View style={{flexDirection:"row", justifyContent:"center"}}>
                            <FirstNameField placeHolderTextColor={"rgba(0,0,0,0.5)"} width={"45%"} value={firstName} onChangeText={(e) => {
                                setFirstName(e)
                            }} />
                            <LastNameField placeHolderTextColor={"rgba(0,0,0,0.5)"} width={"45%"} value={lastName} onChangeText={(e) => {
                                setLastName(e)
                            }} />
                        </View>
                        <View style={{flexDirection:"row", justifyContent:"center"}}>
                            <EmailField placeHolderTextColor={"rgba(0,0,0,0.5)"} width={"92%"} value={email} onChangeText={(e) => {
                                setEmail(e)
                            }} />
                        </View>
                        <View style={{flexDirection:"row", justifyContent:"center"}}>
                            <PhoneField placeHolderTextColor={"rgba(0,0,0,0.5)"} width={"92%"} onChangeText={(e) => {
                                setPhoneNumber(e)
                            }} value={phoneNumber} />
                        </View>
                    </View>

                    <View style={{width:"90%", justifyContent:"center", top:10}}>
                        <TouchableOpacity style={{backgroundColor:"rgb(79,129,239)", height:50, borderRadius:10, justifyContent:"center"}} onPress={() => handleUpdatingProfile()}>
                            <Text style={{color:"#fff", textAlign:"center", fontSize:20, fontWeight:"bold"}}>Actualizar Perfil</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile;
