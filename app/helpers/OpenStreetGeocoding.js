class OpenStreetGeocodingMap {
    constructor() {
        this.baseUrl = 'http://localhost:8081';
        //https://nominatim.openstreetmap.org/search.php?q=El%20chante%20Managua&polygon_geojson=1&format=jsonv2
        this.queryUrl = 'http://localhost:8081/search?q=';
    }

    async reverseOpenStreetGeocoding(latitude, longitude) {
        console.log("checando coords ===>", latitude, longitude);
        try {
            if(latitude !== undefined && longitude !== undefined) {
                const url = `${this.baseUrl}/reverse?lat=${latitude}&lon=${longitude}&format=json`;
                const response = await fetch(url);
                if(!response) return {error:`${response.statusText}`}
                const data = await response.json();
                return {response:data}
            }
        } catch (e) {
            console.log("error geocoding locations ---->", e);
        }
    }

    async searchPlacesByQueries(queryName, country) {
        const encodeQuery = encodeURIComponent(`${queryName} ${country}`);
        const url = `${this.queryUrl}${encodeQuery}&polygon_geojson=1&format=jsonv2`;

        try {
            if(queryName !== "") {
                const response = await fetch(url);
                const data = await response.json();
                return {
                    response:data
                }
            }
        } catch (e) {
            console.log("error looking for your place", e);
            return {error:e.toString()}
        }
    }
}

module.exports = OpenStreetGeocodingMap;
