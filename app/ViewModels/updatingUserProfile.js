import Config from "react-native-config";
const apiUrl = `${Config.API_URL}/updatingProfile`;
export const updatingUserProfile = (firstName, lastName, email, phoneNumber) => {
    console.log(apiUrl);
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName:lastName,
            email: email,
            phoneNumber: phoneNumber,
        }),
    })
        .then((response) => {
            // Verificamos si la respuesta tiene un código de estado 200-299
            if (!response.ok) {
                // Si no es exitosa, lanzamos un error y tratamos de leer el mensaje de error del servidor
                return response.json().then((errorData) => {
                    throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
                });
            }
            // Si la respuesta es exitosa, retornamos el JSON
            return response.json();
        })
        .then((data) => {
            if(data.status === 500) {
                return {
                    result:data.result
                }
            }

            return {
                data:data.result[0]
            }
            // return {
            //     token:data.token,
            //     user:data.user
            // }
        })
        .catch((error) => {
            // Aquí capturamos tanto errores de red como respuestas HTTP con código de error
            console.log("Error ===>", error.message);
        });
};
