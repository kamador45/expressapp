// screens/SignInScreen.js
import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
//Screens
import CredentialsField from "../Components/Field/CredentialsField";
import PasswordField from "../Components/Field/PasswordField";
//importing images
import facebook from "../../assets/facebook_icon.png";
import google from "../../assets/google_icon.png";
import {StatusBar} from "expo-status-bar";
import FirstNameField from "../Components/Field/FirstNameField";
import LastNameField from "../Components/Field/LastNameField";
import EmailField from "../Components/Field/EmailField";
import PhoneField from "../Components/Field/PhoneField";
import {setAccessToken} from "@maplibre/maplibre-react-native";
import useUser from "../Stores/useUser";
import {signUp} from "../ViewModels/signUp";

const SignUp = ({navigation}) => {
    //states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [password, setPassword] = useState("");

    //storage
    const {
        setUser,
        setToken
    } = useUser();

    const handleSignUp = async () => {
        if(firstName !== "" && lastName !== "" && email !== "" && telephone !== "" && password !== "") {
            signUp(firstName, lastName, email, telephone,password)
                .then((result) => {
                    setToken(result.token);
                    setUser(result.user);
                }).catch((e) => {
                console.log(e);
                return e;
            });
        }
    }


    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar style={"light"} />
            <View style={styles.container}>
                <View style={{width:"90%", padding:10}}>
                    <Text style={styles.title}>Registrarse</Text>
                </View>

                <View style={styles.formContainer}>
                    <FirstNameField
                        width={Dimensions.get('window').width / 2.4}
                        height={50}
                        placeHolder={"Primer Nombre"}
                        placeHolderTextColor={"rgba(0,0,0,0.5)"}
                        onChangeText={(value) => { setFirstName(value) }}
                        value={firstName}
                    />

                    <LastNameField
                        width={Dimensions.get('window').width / 2.4}
                        height={50}
                        placeHolder={"Primer Apellido"}
                        placeHolderTextColor={"rgba(0,0,0,0.5)"}
                        onChangeText={(value) => { setLastName(value) }}
                        value={lastName}
                    />
                </View>

                <View style={styles.formContainer}>
                    <EmailField
                        width={Dimensions.get('window').width - 55}
                        height={50}
                        placeHolder={"Correo Electronico"}
                        placeHolderTextColor={"rgba(0,0,0,0.5)"}
                        onChangeText={(value) => { setEmail(value) }}
                        value={email}
                    />
                </View>

                <View style={styles.formContainer}>
                    <PhoneField
                        width={Dimensions.get('window').width / 2.4}
                        height={50}
                        placeHolder={"Télefono"}
                        placeHolderTextColor={"rgba(0,0,0,0.5)"}
                        onChangeText={(value) => {setTelephone(value)}}
                        value={telephone}
                    />
                    <PasswordField
                        width={Dimensions.get('window').width / 2.4}
                        height={50}
                        placeHolder={"Contraseña"}
                        placeHolderTextColor={"rgba(0,0,0,0.5)"}
                        onChangeText={(value) => { setPassword(value) }}
                        value={password}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:"row", marginBottom:20, padding:10, alignContent:"center", alignItems:"center"}}>
                    <View style={{width:"35%", height:1, backgroundColor:"gray"}}></View>
                    <View style={{padding:10}}>
                        <Text style={{color:"gray"}}>Registrarse</Text>
                    </View>
                    <View style={{width:"35%", height:1, backgroundColor:"gray"}}></View>
                </View>

                <View style={{width:"90%",flexDirection:"column",marginTop:-30, padding:12, alignContent:"center", alignItems:"center", justifyContent:"space-between"}}>
                    <TouchableOpacity style={{padding:10, height:50, width:"100%", borderWidth:0.5, borderRadius:10, borderColor:"gray", alignItems:"center", marginBottom:15}}>
                        <View style={{width:"70%",flexDirection:"row", justifyContent:"space-evenly", alignContent:"center", alignItems:"center"}}>
                            <View style={{width:30, height:30}}>
                                <Image source={facebook} style={{width:"100%", height:"100%"}} />
                            </View>
                            <View>
                                <Text style={{color:"#fff"}}>Iniciar con Facebook</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{padding:10, height:50, width:"100%", borderWidth:0.5, borderRadius:10, borderColor:"gray", alignItems:"center"}}>
                        <View style={{width:"70%",flexDirection:"row", justifyContent:"space-evenly", alignContent:"center", alignItems:"center"}}>
                            <View style={{width:30, height:30}}>
                                <Image source={google} style={{width:"100%", height:"100%"}} />
                            </View>
                            <View>
                                <Text style={{color:"#fff"}}>Iniciar con Google</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{position:"absolute", bottom:0}}>
                    <Text style={{color:"gray"}}>Express App, todos los derechos reservados.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#000"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign:"left",
        color:"#fff"
    },
    formContainer: {
        flexDirection:"row",
        width: '90%',
        marginBottom: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        width: '85%',
        marginBottom:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'normal',
        textAlign:"right"
    }
});

export default SignUp;
