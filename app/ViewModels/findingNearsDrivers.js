import Config from "react-native-config";
const apiURL = `${Config.API_URL}/findNearestDrivers`;

export const findingNearsDrivers = async (latitude, longitude, serviceType) => {
    console.log("viewModel ===>", latitude, longitude, serviceType, apiURL);
    try {
        const request = await fetch(apiURL,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                o_latitude: 13.086014,
                o_longitude: -86.0044726902748,
                serviceType: 2,
            })
        });

        return  await request.json();

    } catch (error) {
        return error
    }
}
