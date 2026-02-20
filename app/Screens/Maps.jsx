import React, {useState, useEffect, useRef} from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Animated,
    Image,
    ScrollView,
    TouchableOpacity, ActivityIndicator
} from "react-native";
import MapLibreGL, {Camera, ShapeSource, LineLayer, UserLocation, MarkerView, Images } from "@maplibre/maplibre-react-native";
import * as Location from 'expo-location';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ShowFinder from "../Components/ShowFinder";
import FinderBlock from "../Components/FinderBlock";
import FinderScreen from "../Components/FinderScreen";
import {getRoutes} from "../helpers/getRoutes";
import BottomSheet from "@gorhom/bottom-sheet";
import BackFinderButton from "../Components/Buttons/BackFinderButton";
import Separator from "../Components/Separator";
import {calculatePrices} from "../helpers/calculatePrices";
import useUser from "../Stores/useUser";
const openStreetMaps = require('../helpers/OpenStreetGeocoding');
const openStreetQuery = new openStreetMaps();
const accessToken = "sk.eyJ1Ijoia2FtYWRvcjk0IiwiYSI6ImNsbDY0cnhlaTBqbzYzZm9nMDBqanp3aXUifQ.TxmnQhfurab13sqNSt9E4A";
// Mapbox.setAccessToken(accessToken);
import {DrawerActions, useNavigation} from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import {getMe} from "../lib/getMe";
import useFetchUserProfile from "../hooks/useFetchUserProfile";
import useFindingNearsDrivers from "../hooks/useFindingNearsDrivers";
import useGettingLocationPermission from "../hooks/useGettingLocationPermission";
import useGettingLocation from "../hooks/useGettingLocation";
import {Marker} from "react-native-maps";

const Maps = () => {
    const {
        isGranted
    } = useGettingLocationPermission();
    const {
        latitude,
        longitude
    } = useGettingLocation(isGranted)
    const {
        token,
        user,
        logout
    } = useUser();

    const route = useRoute();
    const { serviceType, maxPassangers } = route.params;

    const {
        loading,
        error
    } = useFetchUserProfile(token);

    MapLibreGL.locationManager.start();
    const navigation = useNavigation();
    const mapRef = useRef(null);
    const elevationAnim = new Animated.Value(20);
    const [showFinderScreen, setShowFinderScreen] = useState(false);
    const [hideFinderBlock, setHideFinderBlock] = useState(true);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [travelToAddress, setTravelToAddress] = useState([]);
    const [routesCoordinates, setRoutesCoordinates] = useState([]);
    const [displayedRoute, setDisplayedRoute] = useState([]);
    const [showConfirmRide, setShowConfirmRide] = useState(false);
    const [cameraElevation, setCameraElevation] = useState(null);
    const [closeBottomSheet, setCloseBottomSheet] = useState(-1);
    const [zoomLevel, setZoomLevel] = useState(15);
    const [distanceKm, setDistanceKm] = useState(0);
    const [isSelected, setIsSelected] = useState(null);
    const [countryDefaultLocation, setCountryDefaultLocation] = useState("");
    const [servicesSelected, setServicesSelected] = useState(null);

    // Crear una referencia para BottomSheet
    const bottomSheetRef = useRef(null);

    //Call findingDrivers Hooks
    const {
        driversList
    } = useFindingNearsDrivers(latitude, longitude, serviceType);


    //will update the user info
    useEffect(() => {
        const updatingUserInfo = async () => {
            const fetching = await getMe(token);
            if(fetching.status === 401) {
                await logout();
            }
        }

        updatingUserInfo();

    }, []);

    useEffect(() => {
        console.log("📌 Lista de conductores en la vista:", driversList);
    }, [driversList]);

    //Will ask for location permission
    // useEffect(() => {
    //     const gettingCurrentLocationUser = async () => {
    //         if (Platform.OS === 'android' || Platform.OS === 'ios') {
    //             let { status } = await Location.requestForegroundPermissionsAsync();
    //             if (status !== 'granted') {
    //                 setErrorMsg('Permission to access location was denied');
    //                 return;
    //             }
    //             let location = await Location.getCurrentPositionAsync({});
    //             setLocation(location);
    //         }
    //     }
    //
    //     gettingCurrentLocationUser();
    //
    // }, []);

    // useEffect(() => {
    //     if(location !== null) {
    //         setStartPoint({
    //             latitude:location.coords.latitude,
    //             longitude:location.coords.longitude
    //         })
    //         animateCamera();
    //     }
    // }, [location]);


    useEffect(() => {
        if(latitude && longitude) {
                const gettingCurrentUserState = async () => {
                    try {
                        const req = await openStreetQuery.reverseOpenStreetGeocoding(
                            Number(latitude),
                            Number(longitude)
                        );

                        if (req.response.address.country !== undefined) {
                            setCountryDefaultLocation(req.response.address.country);
                        }
                    } catch (error) {
                        console.error('Error fetching reverse geocoding:', error);
                    }
                };

                gettingCurrentUserState();
            };
    }, [travelToAddress]);


    //Destiny coordinates
    const endPoint = {
        latitude: travelToAddress !== undefined && travelToAddress.lat,
        longitude: travelToAddress !== undefined && travelToAddress.lon
    }

    useEffect(() => {
        const fetchRoute = async () => {
            if (endPoint && latitude && longitude && endPoint.latitude && endPoint.longitude) {
                try {
                    const routeData = await getRoutes(latitude,longitude, endPoint);

                    if (routeData.routes && routeData.routes.length > 0) {
                        const coordinates = routeData.routes[0].geometry.coordinates;
                        setRoutesCoordinates(coordinates.map(coord => [coord[0], coord[1]]));

                        //will get the distances in km
                        const distanceMeters = routeData.routes[0].distance;
                        const distanceKiloters = Number(distanceMeters) / 1000;
                        setDistanceKm(distanceKiloters);

                        if (distanceKiloters < 5) {
                            setZoomLevel(14) // Zoom cercano para distancias cortas
                        } else if (distanceKiloters < 20) {
                            setZoomLevel(12); // Zoom medio
                        } else if (distanceKiloters < 50) {
                            setZoomLevel(10) // Zoom más alejado
                        } else if (distanceKiloters < 100) {
                            setZoomLevel(8); // Zoom para trayectos largos
                        } else {
                            setZoomLevel(6) // Zoom muy alejado para distancias muy largas
                        }

                        if (bottomSheetRef.current) {
                            bottomSheetRef.current.expand();
                            setCloseBottomSheet(0);
                        }

                        animateCamera();

                    }
                } catch (error) {
                    console.error('Error fetching route:', error);
                }
            } else {
                console.log("startPoint o endPoint no están listos.");
            }
        }

        fetchRoute();
    }, [travelToAddress, latitude, longitude]);


    useEffect(() => {
        if (routesCoordinates.length > 0) {
            //animateRouteDrawing(routesCoordinates);
            setHideFinderBlock(false);
            // cameraElevations(15);
        }
    }, [routesCoordinates, zoomLevel, closeBottomSheet]);
    const snapPoints = ['35%'];


    const animateCamera = async () => {
        const midLatitude = (latitude + endPoint.latitude) / 2;
        const midLongitude = (longitude + endPoint.longitude) / 2;

        await mapRef.current.Camera.setCamera({
            centerCoordinate: [midLongitude, midLatitude],
            zoomLevel: zoomLevel,
            duration: 2000,
        });
    };

    const closeConfirmRide = () => {
        setHideFinderBlock(true);
        setRoutesCoordinates([]);
        setTravelToAddress([]);
        setZoomLevel(5);
        setServicesSelected(null);

        if (bottomSheetRef.current) {
            bottomSheetRef.current.close(); // Cierra el BottomSheet manualmente
        }

        setCloseBottomSheet(-1); // Asegúrate de que el estado también refleje que debe estar cerrado
    };

    const handlePress = (index, items) => {
        //set backgroundColor
        setIsSelected(index);
        const priceCalculated = calculatePrices(distanceKm, items.type);
    };

    const openNavMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }


    if(loading) {
        return <ActivityIndicator size={"large"} color={"#000FF"} style={{alignItems:"center", justifyContent:"center", alignContent:"center", flex:1}} />;
    }

    if(error){
        return(
            <View>
                <Text>{error.message}</Text>
            </View>
        )
    }

    //Drivers components
    const DriversComponent = ({driversList}) => {
        console.log("probando ===>", driversList);
        return(
            <View></View>
        )
        // if(driverList !== undefined) {
        //     return (
        //         driverList.map((driver, index) => (
        //             <MapLibreGL.MarkerView key={index} coordinate={[Number(driver.latitude), Number(driver.longitude)]}
        //                                    title={`Conductor ${driver.driverId}`}
        //             >
        //                 <MapLibreGL.Images
        //                     source={require("../../assets/car.png")}
        //                     style={{width: 150, height: 150, resizeMode: 'contain'}}
        //                 />
        //             </MapLibreGL.MarkerView>
        //         ))
        //     )
        // }
    }


    //showing passager number
    const PassagersNumber = ({serviceId, maxPassangers}) => {
        const maxPass = [];
        for (let i = 1; i <= maxPassangers; i++) {
            maxPass.push(i);
        }
        switch (serviceId) {
            case 1:
                return (
                    <View style={{marginTop:5, flexDirection:"row"}}>
                        {
                            maxPass.map((i, index) => (
                                <TouchableOpacity key={index} style={{backgroundColor:index === servicesSelected ? "rgb(79,129,239)" : "rgba(0,0,0,0.5)", height:30,width:30, borderRadius:4, justifyContent:"center", margin:5}} onPress={() => handleSelect(i,index)}>
                                    <Text style={{color:"#fff", textAlign:"center", fontSize:20, fontWeight:"bold"}}>{i}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )
            case 2:
                return (
                    <View style={{marginTop:5, flexDirection:"row"}}>
                        {
                            maxPass.map((i, index) => (
                                <TouchableOpacity key={index} style={{backgroundColor:index === servicesSelected ? "rgb(79,129,239)" : "rgba(0,0,0,0.5)", height:30,width:30, borderRadius:4, justifyContent:"center", margin:5}} onPress={() => handleSelect(i,index)}>
                                    <Text style={{color:"#fff", textAlign:"center", fontSize:20, fontWeight:"bold"}}>{i}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )
            case 3:
                return (
                    <View style={{marginTop:5, flexDirection:"row"}}>
                        {
                            maxPass.map((i, index) => (
                                <TouchableOpacity key={index} style={{backgroundColor:index === servicesSelected ? "rgb(79,129,239)" : "rgba(0,0,0,0.5)", height:30,width:30, borderRadius:4, justifyContent:"center", margin:5}} onPress={() => handleSelect(i,index)}>
                                    <Text style={{color:"#fff", textAlign:"center", fontSize:20, fontWeight:"bold"}}>{i}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )
            default:
                return(
                    <View>
                        <Text>Servicio desconocido</Text>
                    </View>
                )
        }
    }

    const handleSelect = (i,index) => {
        setServicesSelected(index);
        console.log("number passanger selected ===>", i);
    }

    return(
        <View style={styles.container}>
            <MapLibreGL.MapView ref={mapRef} zoomEnabled={true} style={{flex:1}} styleURL="https://api.maptiler.com/maps/basic-v2-dark/style.json?key=VHQU7pizpMp1d3bz5ztZ" logoEnabled={true}>

                {/*OPen SideMenu*/}
                <ShowFinder openNavMenu={openNavMenu} top={100} />

                {
                    hideFinderBlock && <FinderBlock setShowFinderScreen={setShowFinderScreen} />
                }

                <Camera
                    centerCoordinate={[longitude,latitude]}
                    animationMode="flyTo"
                    zoomLevel={zoomLevel}
                    followZoomLevel
                    animationDuration={2000}
                    pitch={5}
                    // followPitch
                />

                <UserLocation visible={true} />

                {/*Drivers components*/}
                <DriversComponent driversList={driversList} />

                <FinderScreen
                    showFinderScreen={showFinderScreen}
                    setShowFinderScreen={setShowFinderScreen}
                    setTravelToAddress={setTravelToAddress}
                    country={countryDefaultLocation}
                />
                {routesCoordinates.length > 1 && (
                    <ShapeSource
                        id={"routeSource"}
                        lineMetrics={true}
                        shape={{
                            properties: {},
                            type: "Feature",
                            geometry: {
                                type: 'LineString',
                                coordinates: routesCoordinates, // Asegúrate de que esto tenga al menos 2 coordenadas
                            },
                        }}
                    >
                        <LineLayer
                            id={"routeWay"}
                            style={{
                                lineColor: "rgb(79,129,239)",
                                lineCap: "round",
                                lineJoin: "round",
                                lineWidth: 7,
                            }}
                        />
                    </ShapeSource>
                )}

                {/*<ShapeSource*/}
                {/*    id={"routeSource"}*/}
                {/*    lineMetrics={true}*/}
                {/*    shape={{*/}
                {/*        properties:{},*/}
                {/*        type:"Feature",*/}
                {/*        geometry: {type:'LineString', coordinates:routesCoordinates}*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <LineLayer*/}
                {/*        id={"routeWay"}*/}
                {/*        style={{*/}
                {/*            lineColor:"blue",*/}
                {/*            lineCap:"round",*/}
                {/*            lineJoin:"round",*/}
                {/*            lineWidth:7*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</ShapeSource>*/}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={closeBottomSheet} // Inicialmente cerrado
                    snapPoints={snapPoints}
                    onChange={(index) => {
                        console.log('BottomSheet index:', index);
                    }}
                >
                    <View style={styles.contentContainer}>
                       <View style={{width:"100%", flexDirection:"row", justifyContent:"flex-end", padding:5}}>
                           <TouchableOpacity onPress={() => closeConfirmRide()}>
                               <MaterialIcons name="close" size={24} color="black" />
                           </TouchableOpacity>
                       </View>
                        <View style={{marginHorizontal:20, flexDirection:"column"}}>
                            <Text style={{fontSize:18, color:"gray"}}>• Ubicación Actual</Text>
                            <View style={{backgroundColor:"#CED0CE", height:20, width:1}}></View>
                            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                <Text style={{fontSize:18, color:"#000"}}>• Destino Final</Text>
                                <Text style={{fontSize:18, color:"#000"}}>{distanceKm.toFixed(2)} km</Text>
                            </View>
                            <Separator />
                            <View style={{top:0}}>
                                <Text style={{fontSize:25}}>Cantidad de pasajeros</Text>
                            </View>
                            <View style={{height:30,width:"100%", flexDirection:"row"}}>
                                <PassagersNumber serviceId={serviceType} maxPassangers={maxPassangers} />
                            </View>
                        {/*    Carousel of riders*/}
                        {/*    <View style={{top:0}}>*/}

                        {/*    </View>*/}
                            {/*<View style={{height:250, width:"100%",flexDirection:"column", marginTop:5}}>*/}
                            {/*    <ScrollView*/}
                            {/*        horizontal={false}*/}
                            {/*        showsHorizontalScrollIndicator={false}*/}
                            {/*        contentContainerStyle={{ alignItems: 'center', paddingBottom:10 }}*/}
                            {/*    >*/}
                            {/*        {*/}
                            {/*            transportTypeList.map((items, index) => (*/}
                            {/*                <TouchableOpacity*/}
                            {/*                    key={index}*/}
                            {/*                    onPress={() => handlePress(index, items)}*/}
                            {/*                    style={{*/}
                            {/*                    width:"100%",*/}
                            {/*                    height:70,*/}
                            {/*                    marginHorizontal:7,*/}
                            {/*                    borderRadius:10,*/}
                            {/*                    flexDirection:"row",*/}
                            {/*                    justifyContent:"flex-start",*/}
                            {/*                    alignItems:"center",*/}
                            {/*                        margin:5,*/}
                            {/*                    backgroundColor: isSelected === index ? "rgb(79,129,239)" : "gray"*/}
                            {/*                }}*/}
                            {/*                >*/}
                            {/*                    <View  style={{flex:0.5, alignItems:"flex-start"}}>*/}
                            {/*                        <Image*/}
                            {/*                            source={items.pictureMobile}*/}
                            {/*                            style={{width:70, height:70, objectFit:"contain"}}*/}
                            {/*                        />*/}
                            {/*                    </View>*/}
                            {/*                    <View style={{flex:1, alignItems:"flex-start", margin:10}}>*/}
                            {/*                        <Text style={{color:"#fff", fontSize:18}}>{items.type}</Text>*/}
                            {/*                    </View>*/}
                            {/*                    <View style={{flex:1, alignItems:"flex-end", margin:10}}>*/}
                            {/*                        <Text style={{color:"#fff", fontSize:18}}>C$ 100</Text>*/}
                            {/*                    </View>*/}
                            {/*                </TouchableOpacity>*/}
                            {/*            ))*/}
                            {/*        }*/}
                            {/*    </ScrollView>*/}
                            {/*</View>*/}
                            <View style={{flexDirection:"column", justifyContent:"space-between", marginTop:20}}>
                                {/*<View>*/}
                                {/*    <Text style={{color:"#000", fontSize:25}}>Metodo de pago</Text>*/}
                                {/*    <TouchableOpacity*/}
                                {/*        style={{borderRadius:5, width:"100%", height:50, backgroundColor:"rgb(79,129,239)", top:10, justifyContent:"space-between", flexDirection:"row", alignItems:"center"}}>*/}
                                {/*        <View style={{flex:1, flexDirection:"row"}}>*/}
                                {/*            <Text style={{marginHorizontal:10, color:"#fff"}}>VISA</Text>*/}
                                {/*            <Text style={{marginHorizontal:10, color:"#fff"}}>***********7890</Text>*/}
                                {/*        </View>*/}
                                {/*        <View>*/}
                                {/*            <MaterialIcons name="arrow-forward-ios" size={24} color="#fff" style={{marginHorizontal:10}} />*/}
                                {/*        </View>*/}
                                {/*    </TouchableOpacity>*/}
                                {/*</View>*/}

                                <View style={{flexDirection:"column", justifyContent:"center"}}>
                                    <TouchableOpacity style={{backgroundColor:"rgb(79,129,239)", height:50, borderRadius:10, justifyContent:"center"}} onPress={() => console.log("confirm ride")}>
                                        <Text style={{color:"#fff", textAlign:"center", fontSize:20, fontWeight:"bold"}}>Solicitar Viaje</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </BottomSheet>
            </MapLibreGL.MapView>
        </View>
    )
}

{/*<ShapeSource*/}
{/*    id={"drivers"}*/}
{/*    shape={driversGeoJSON}*/}
{/*>*/}
{/*    <SymbolLayer*/}
{/*        id={"driversIcons"}*/}
{/*        style={{*/}
{/*            iconImage:['get','icon'],*/}
{/*            iconSize:0.25,*/}
{/*            iconAllowOverlap:true,*/}
{/*            iconHaloColor:"rgba(0,0,0,0.5)",*/}
{/*            iconHaloWidth:10,*/}
{/*            iconHaloBlur:10*/}
{/*        }}*/}
{/*    />*/}
{/*    <Images images={images} />*/}
{/*</ShapeSource>*/}

{/*<MarkerView id={"routeDestiny"} coordinate={[endPoint.longitude, endPoint.latitude]} />*/}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000"
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        backgroundColor: '#000',
    },
    radioLabel: {
        fontSize: 18,
    },
    selectedText: {
        marginTop: 20,
        fontSize: 18,
    },
})

export default Maps;
