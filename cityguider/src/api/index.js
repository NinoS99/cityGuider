import axios from 'axios';
  
export const getPlacesData = async (sw,ne,kinds,subKinds) => {

    if(subKinds !== "all"){

        if(subKinds === "fast food"){
            var kindsParam = "fast_food";
        } else if (subKinds === "hotels"){
            var kindsParam = "other_hotels"
        }
        else {
            var kindsParam = subKinds;
        }
    } else{
        var kindsParam = kinds;
    }
    try {
        // request
        const { data: { features } } = await axios.get('https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox', {
            params: {
                lon_max: ne.lng,
                lon_min: sw.lng,
                lat_max: ne.lat,
                lat_min: sw.lat,
                kinds: kindsParam,
                limit: 30
          },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_PLACES_API_KEY,
                'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
            }
          });
        return features;
    } catch (error) {
        console.log(error);
    }
}

export const getPlaceDetails = async (placeId) => {

    try{
    const data = await axios.get(`https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${placeId}` , {
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_PLACES_API_KEY,
            'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
          }
        });
        return data.data; 
    } catch (error) {
        console.log(error);
    }

}



export const getWeatherData = async(query) => {
    try {
        const { data  } = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json' , {
            params: {q: query, 
            days: '5'},

            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        
    });

    return data;

    } catch (error) {
        console.log(error);
    }

}
