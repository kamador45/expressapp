import {Stack} from "expo-router";

const Layout = () => {
    return(
        <Stack>
            <Stack.Screen name={"Welcome"} />
            <Stack.Screen name={"SignIn"} />
            <Stack.Screen name={"SignUp"} />
        </Stack>
    )
}

export default Layout;
