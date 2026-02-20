const accessToken = "sk.eyJ1Ijoia2FtYWRvcjk0IiwiYSI6ImNsbDY0cnhlaTBqbzYzZm9nMDBqanp3aXUifQ.TxmnQhfurab13sqNSt9E4A";
export const getRoutes = async (latitude,longitude, destination) => {
    console.log("checking data ===>", destination);
   let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${longitude},${latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=${accessToken}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error(e);
        return {err:e.toString()}
    }
}
