import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import useStyles from './styles';
import mapStyles from './mapStyles';

const Map = ({ setCoordinates, setBounds, coordinates, places, type, setChildClicked}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e) =>{
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div 
                        className = {classes.markerContainer}
                        lat={Number(place.geometry.coordinates[1])}
                        lng={Number(place.geometry.coordinates[0])}
                        key={i}
                        >
                        { 
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                            ) : (
      
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.properties.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src = {type === "restaurants" ? 'https://www.clipartmax.com/png/middle/19-194104_building-clipart-restaurant-clipart-restaurant-building-restaurant.png' 
                                        : type === "interesting_places" ? 'https://library.kissclipart.com/20190930/yce/kissclipart-line-recreation-fun-clip-art-tourist-attraction-52b2c4cb682c4048.png' :
                                        'https://www.kindpng.com/picc/m/390-3908217_clip-art-clipart-hotel-hotel-clipart-png-transparent.png'}
                                    />
                                </Paper>                            
                            )
                        }
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;