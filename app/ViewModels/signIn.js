import Config from "react-native-config";
const apiUrl = `${Config.API_URL}/signIn`;
export const signIn = async (credential, password) => {
    const request  = await  fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            credential: credential,
            password: password,
        }),
    });

    const response = await request.json();

    if(response.status === 500) {
        return {
            status: 500,
            message:response.result,
        }
    } else {
        return {
            status: 200,
            token:response.token,
            user:response.user
        }
    }
};
