import React, {useState, useEffect, createRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Card} from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

const List = ({setType, setSelectedSubType, places, childClicked}) => {
    const classes = useStyles();
    //Type (restaurants, hotels ...), SubType for each type (restaurants : bars, cafes ...)

    const [localType, setLocalType] = useState('restaurants'); //Type state for inside this component, needed to know which subTypes to display on the 2nd DropDown List (default it at restaurants)
    const [subType, setSubType] = useState(['']); //subType state for this component, keeps track of subTypes array state for each Type 
    const [defaultValue, setDefaultValue] = useState('all'); //TO-DO: everytime localType changes, make the subType dropdown default selected to all

    const restaurantsSubType = ["all", "bars", "restaurants", "cafes", "fast food", "pubs"];
    const attractionsSubType = ["all", "architecture", "cultural", "historic", "natural", "religion"];
    const hotelsSubType = ["all", "hotels", "motels", "resorts", "apartments", "hostels"];

    useEffect(() => { //used to set SubType state, each time the localType changes 
      
        if(localType === "restaurants"){
            setSubType(restaurantsSubType);
        }

        if(localType === "interesting_places"){
            setSubType(attractionsSubType);
        }

        if(localType === "accomodations"){
            setSubType(hotelsSubType)
        }

        setDefaultValue('all');
    
    }, [localType])
    
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places])

    return (
        <div className={classes.container}> 
            <Typography variant="h4">Food, Attractions and Hotels Near You!</Typography>
            <FormControl className={classes.formControl}> 
                <InputLabel> Type </InputLabel>
                <Select  defaultValue={"restaurants"} onChange={(e) =>{setType(e.target.value); setLocalType(e.target.value); }}> {/* When new option is clicked on 1st drop down list, set Type to pass its state (fcn in const list), set local type state */}
                    <MenuItem value="restaurants"> Foods </MenuItem>
                    <MenuItem value="interesting_places"> Attractions </MenuItem>
                    <MenuItem value="accomodations"> Accomodations </MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel> Sub-Type </InputLabel>
                {/* When new option is clicked on 2nd drop down list, set Sub Type to pass its state (fnc in const list) */}
                <Select  defaultValue={'all'} onChange={(e) => {setSelectedSubType(e.target.value)}}>
                    {/* Display corresponding subTypes for type selected by using the subType state (array) */}
                    {subType.map((subType) => ( 
                        <MenuItem value={subType}>{subType}</MenuItem> 
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    <Grid item key={i} xs={12}> 
                        <PlaceDetails place={place}
                            selected={Number(childClicked) === i}
                            refProp={elRefs[i]}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default List;