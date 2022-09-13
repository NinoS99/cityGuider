import React, {useEffect, useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getWeatherData } from '../../api';

import useStyles from './styles';

const Header = ({ setCoordinates, weatherData, coordinates}) => {
    const classes = useStyles();
    const [autocomplete, setAutoComplete] = useState(null);
    // const [weatherData, setWeatherData] = useState({});
    // const [localCoordinates, setLocalCoordinates] = useState({});

    const onLoad = (autoC) => setAutoComplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({ lat, lng });
    }
    
    // useEffect(() => {

    //     getWeatherData(coordinates.lat + ',' + coordinates.lng)
    //     .then((response) => response)
    //     .then((data) => {setWeatherData(data);
    //     });

    // },[coordinates])

    

    return (
        <AppBar position="static" color='black'>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    City Guider
                </Typography >

                { weatherData.location ? 
                <>
                <Typography variant="h8" className={classes.title}>
                    Current Place: {weatherData.location.name}
                </Typography>
                <Typography variant="h8" className={classes.title}>
                    Current Temperature: {weatherData.current.temp_c}°C || Feels Like: {weatherData.current.feelslike_c}°C 
                </Typography>
                <Typography variant="h8" className={classes.title}>
                    <img height={50} src={`https:${weatherData.current.condition.icon}`}></img>
                </Typography>
                <Typography variant="h8" className={classes.title}>
                    Humidity: {weatherData.current.humidity}% UV: {weatherData.current.uv}
                </Typography>
                <Typography variant="h8" className={classes.title}>
                    Tomorrow's Temperature: {weatherData.forecast.forecastday[0].day.avgtemp_c}°C
                </Typography>
                <Typography variant="h8" className={classes.title}>
                    Tomorrow's Condition: {weatherData.forecast.forecastday[0].day.condition.text}
                </Typography>
                
                </>
                : <Typography>
                    
                </Typography>}


                <Box display="flex">
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}> 
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search for places...' classes={{ root: classes.inputRoot, input: classes.inputInput}} />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;