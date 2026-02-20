import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useGettingLocation = (isGranted) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let locationSubscription = null; // Para detener la suscripción cuando el componente se desmonta

    const gettingLocation = async () => {
      try {
        // 📌 Si no tenemos permisos, solicitarlos
        if (!isGranted) {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setError("Permiso de ubicación denegado");
            return;
          }
        }

        // 📌 Obtener ubicación actual y actualizar estado
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);

        // 📌 Mantener la ubicación actualizada en tiempo real
        locationSubscription = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              timeInterval: 5000, // Se actualizará cada 5 segundos
              distanceInterval: 10, // O cuando el usuario se mueva 10 metros
            },
            (newLocation) => {
              setLatitude(newLocation.coords.latitude);
              setLongitude(newLocation.coords.longitude);
            }
        );
      } catch (e) {
        setError(e.message);
      }
    };

    gettingLocation();

    return () => {
      // 📌 Si existe una suscripción, la limpiamos
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [isGranted]);

  return {
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    error,
  };
};

export default useGettingLocation;

