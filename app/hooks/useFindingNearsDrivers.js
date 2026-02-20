import React, {useState, useEffect} from "react";
import {findingNearsDrivers} from "../ViewModels/findingNearsDrivers";
import {useFocusEffect} from "@react-navigation/native";
import useUser from "../Stores/useUser";

const useFindingNearsDrivers = (latitude, longitude, serviceType) => {
    const {
        user
    } = useUser()
    const [loadingDrivers, setLoadingDrivers] = useState(false);
    const [driversList, setDriversList] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            if(latitude !== null && latitude !== null) {
                const findingDrivers = async () => {
                    try {
                        setLoadingDrivers(true);
                        const request = await findingNearsDrivers(1,latitude, longitude, serviceType);

                        if (request && request.driverResponse && Array.isArray(request.driverResponse)) {
                            setDriversList(request.driverResponse); // 📌 Guardar solo el array de conductores
                        } else {
                            console.warn("⚠ `request.driverResponse` no es un array:", request);
                            setDriversList([]); // 📌 Evitar `undefined`
                        }

                    } catch (e) {
                        console.error(e);
                        return e;
                    } finally {
                        setLoadingDrivers(false);
                    }
                }

                findingDrivers()
            }
        },[])
    )

    return {
        loadingDrivers,
        driversList,
    }
}

export default useFindingNearsDrivers;
