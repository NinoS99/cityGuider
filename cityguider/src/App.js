import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getPlaceDetails, getWeatherData } from './api';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';

const App = () => {
    const [places, setPlaces] = useState([]); //arr to store places object
    const [weatherData, setWeatherData] = useState([]); //arr to store places object
    const [childClicked, setChildClicked] = useState(null);
    const [type, setType] = useState('restaurants');
    const [selectedSubType, setSelectedSubType] = useState('all');
    const [coordinates, setCoordinates] = useState({}); //empty object
    const [bounds, setBounds] = useState({}); //empty object
    const [placesDetails,setPlacesDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { //Only runs on first render, get user current position (lat, lng)
        navigator.geolocation.getCurrentPosition(( {coords: { latitude, longitude } } ) => { //destructure to get long, lat right away. when this function runs, the useEffect below is called, therefore running on initial render
            setCoordinates({ lat: latitude, lng: longitude});

        })

    }, []);

    useEffect(() => { //getPlaces api call 
        if(bounds.sw && bounds.ne){
        setIsLoading(true);
        
        getWeatherData(coordinates.lat +','+coordinates.lng)
            .then((data) => setWeatherData(data));

        getPlacesData(bounds.sw, bounds.ne, type, selectedSubType)
            .then((data) => {
                const filteredData = data.filter(data => {
                    return data.properties.name !== "";
                })
                setPlaces(filteredData);
                setIsLoading(false);
            })
        }
    }, [bounds, type, selectedSubType]); //runs when coords or bounds are changed (user drags map or first render)


 


    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} weatherData={weatherData} coordinates={coordinates}/>
            <Grid container spacing={3} style={{ width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List
                    setType={setType}
                    setSelectedSubType={setSelectedSubType}
                    places={places}
                    placesDetails = {placesDetails}
                    childClicked = {childClicked}
                    isLoading = {isLoading}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                    setCoordinates = {setCoordinates} //min 55 on video
                    setBounds = {setBounds}
                    coordinates = {coordinates}
                    places = {places}
                    type = {type}
                    setChildClicked ={setChildClicked}
                    weatherData = {weatherData}
                    />
                </Grid>
            </Grid>
       
        </>
    );
}

export default App;