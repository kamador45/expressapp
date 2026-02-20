import Config from "react-native-config";
const apiUrl = `${Config.API_URL}/profile`;

export const getMe =  async (token) => {
    console.log(token, apiUrl);
    const request  =   await fetch(apiUrl, {
        method:"GET",
        headers:{
            'Concept': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    return request.json();
}