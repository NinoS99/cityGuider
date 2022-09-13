import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Phone from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import WebIcon from '@mui/icons-material/Web';

import useStyles from './styles';
import { getPlaceDetails } from '../../api';

const PlaceDetails = ({ place, selected, refProp }) => {

    const classes = useStyles();

    const [details, setPlaceDetails] = useState({});

    useEffect(() => { //getPlaceDetails api call 
        getPlaceDetails(place.properties.xid)
            .then((response) => response)
            .then((data) => {
                setPlaceDetails(data);
            })
    
    }, [place]);

    if(selected){
        refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'center'});
    } 

    return (
        
        <>
        <Card elevation={3}>
            {details.name ?  <CardContent>
                <Typography gutterBottom variant="h4"> {details.name}</Typography>
                <Typography gutterBottom variant="body2" className={classes.subtitle}> 
                    <LocationOnIcon /> { details.address.road && details.address.house_number && details.address.house_number ? details.address.house_number + ' ' + details.address.road + ", " + details.address.postcode : details.address.postcode}
                </Typography>
             </CardContent> : null}
             {details.url ?
             <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(details.url, '_blank')}>
                    Website
                </Button>
            </CardActions>: null }
        </Card>
        </>
    );
    
}

export default PlaceDetails;