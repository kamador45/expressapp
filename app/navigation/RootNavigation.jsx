// RootNavigation.js
import React from 'react';
import AuthNavigation from './AuthNavigation';
import useUser from "../Stores/useUser";
import AppDrawer from "../Components/Drawer/AppDrawer";
import Splash from "../Components/Splash";


const RootNavigation = () => {
    const {
        isHydrated,
        isAuthenticated
    } = useUser();


    if(isHydrated) {
        return (
            <Splash />
        )
    }

    return (
        <React.Fragment>
            {
                isAuthenticated ? (
                    <AppDrawer />
                ):(
                    <AuthNavigation />
                )
            }
        </React.Fragment>
    )
};

export default RootNavigation;
