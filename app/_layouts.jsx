import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {NavigationContainer} from "@react-navigation/native";
import * as Linking from "expo-linking";
import RootNavigation from "./navigation/RootNavigation";
import {NotifierWrapper} from "react-native-notifier";

const prefix = Linking.createURL('expressapp://');

const Layout = () => {
    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                Welcome:'/',
                SignIn: 'signin',
                SignUp: 'signup',
            },
        },
    };

    return(
        <GestureHandlerRootView style={{flex:1}}>
            <NotifierWrapper>
                <NavigationContainer independent={true} linking={linking}>
                    <RootNavigation />
                </NavigationContainer>
            </NotifierWrapper>
        </GestureHandlerRootView>
    )
}

export default Layout;
