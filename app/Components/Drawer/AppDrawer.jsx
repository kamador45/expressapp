// AppDrawerNavigation.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerActions, NavigationContainer, useNavigation} from '@react-navigation/native';
import Maps from "../../Screens/Maps";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomDrawerContent from "./CustomDrawerContent";
import useUser from "../../Stores/useUser";
import Profile from "../../Screens/user/Profile";
import Header from "../Header";
import Home from "../../Screens/Home/Home";

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
    const {
        user,
        logout
    } = useUser();

    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} userDatas={user} logout={logout} />}
        >
            <Drawer.Screen
                name={"Home"}
                component={Home}
                options={{
                    headerShown:true,
                    header:() => <Header title={'Home'} color={"#fff"}  />,
                    drawerIcon:() => (
                        <FontAwesome name={"home"} size={24} color={"black"} />
                    )
                }}
            />

            <Drawer.Screen
                name="Maps"
                component={Maps}
                options={{
                    headerShown:false,
                    drawerIcon:({size, color}) => (
                        <FontAwesome name="map-signs" size={24} color="black" />
                    )
            }}
            />

            <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown:true,
                    header:() => <Header title={'Perfil'} color={"#fff"}  />
                }}
            />
        </Drawer.Navigator>
    );
}

export default AppDrawer;
