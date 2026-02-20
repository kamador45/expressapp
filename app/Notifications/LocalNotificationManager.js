import { Animated, Linking } from 'react-native';
import {Notifier, Easing, NotifierComponents} from "react-native-notifier";

export const showInfoMessage = ({title, message}) => {
    Notifier.showNotification({
        title: title,
        description: message,
        duration:2200,
        Component: NotifierComponents.Notification,
        componentProps: {
            imageSource: require('../../assets/ExpressApp.png'),
        },
        swipeEnabled:true,
    });
};