import React, { useCallback, useState, useEffect} from "react";
import {getMe} from "../lib/getMe";
import useUpdateStoreUser from "./useUpdateStoreUser";
import {useFocusEffect} from "@react-navigation/native";

const useFetchUserProfile = (token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Memoizar la función de actualización del usuario para evitar renderizados innecesarios
    const updateUserInStore = useCallback(useUpdateStoreUser(), []);

    useFocusEffect(
        React.useCallback(() => {
            const fetchUserProfile = async () => {
                setLoading(true);
                try {
                    const data = await getMe(token);
                    if(data.result) {
                        updateUserInStore(data.result);
                    } else if (data.message) {
                        setError(data.message);
                    }
                } catch (e) {
                    setError(e);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserProfile();
        },[])
    )

    return {
        loading, error
    };
};

export default useFetchUserProfile;
