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
import {signIn} from "../ViewModels/signIn";
import useUser from "../Stores/useUser";
import {showInfoMessage} from "../Notifications/LocalNotificationManager";

const SignIn = ({navigation}) => {
    //states
    const [credentials, setCredentials] = useState("");
    const [password, setPassword] = useState("");

    //stores
    const {
        setUser,
        setToken,
        isHydrated
    } = useUser();

    const handleSignIn = async () => {
        if(password !== "" && credentials !== "") {
            const req = await signIn(credentials, password);
            console.log("response ===>", req);
            if(req.status === 500) {
                console.log(req.message);
                return showInfoMessage({
                    title:"Mensaje",
                    message:req.message
                })
            }
            console.log(req);
            setToken(req.token);
            setUser(req.user);
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar style={"light"} />
            <View style={styles.container}>
                <View style={{width:"90%", padding:10}}>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                </View>

                <View style={styles.formContainer}>
                    <CredentialsField
                        width={Dimensions.get('window').width - 60}
                        height={50}
                        placeHolder={"Correo / Télefono"}
                        placeHolderTextColor={"rgba(0,0,0,0.5)"}
                        onChangeText={(value) => { setCredentials(value) }}
                        value={credentials}
                    />

                    <PasswordField
                        width={Dimensions.get('window').width - 60}
                        height={50}
                        placeHolder={"Contraseña"}
                        placeHolderTextColor={"rgba(0,0,0,0.5)"}
                        onChangeText={(value) => { setPassword(value) }}
                        value={password}

                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => handleSignIn()}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:"row", marginBottom:20, padding:10, alignContent:"center", alignItems:"center"}}>
                    <View style={{width:"37%", height:1, backgroundColor:"gray"}}></View>
                    <View style={{padding:10}}>
                        <Text style={{color:"gray"}}>Inicia</Text>
                    </View>
                    <View style={{width:"37%", height:1, backgroundColor:"gray"}}></View>
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

export default SignIn;
