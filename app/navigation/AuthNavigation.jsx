// AuthNavigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
const AuthStack = createNativeStackNavigator();


const AuthNavigation = () => {
    return (
        <AuthStack.Navigator initialRouteName="SignIn">
            <AuthStack.Screen name="SignIn" component={SignIn} options={{headerShown:false}} />
            <AuthStack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
        </AuthStack.Navigator>
    );
};

export default AuthNavigation;
