import {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {Platform} from 'react-native';

const useGettingLocationPermission = ()=> {
  const [isGranted, setIsGranted] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let result;
        if(Platform.OS === 'ios') {
          result = await Location.requestForegroundPermissionsAsync()
        }

        if(Platform.OS === 'android') {
          result = await Location.requestForegroundPermissionsAsync()
        }

        if(result === 'granted') {
          setIsGranted(true);
        } else {
          setIsGranted(false);
        }
      } catch (e) {
        console.error(e);
      }
    }

    requestLocationPermission()
  },[isGranted]);

  return {
    isGranted,
  }
}

export default useGettingLocationPermission;
