import React, {useState, useEffect} from 'react';
import OpenAQContext from "./OpenAQContext";
import axios from "axios";

const OPEN_AQ_API_LINK = 'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com';

const getOpenAQResponse = async paramsURL => {
    const response = await axios.get(OPEN_AQ_API_LINK + paramsURL);
    if(response.status !== 200){
        throw new Error('Could not retrieve data from server. Please try again')
    }
    return response;

}

const OpenAQProvider = ({children}) => {
    const [cityList, setCityList] = useState([]);
    const [cityA, setCityA] = useState({});
    const [cityB, setCityB] = useState({})
    const [airQualityParams, setAirQualityParams] = useState([]);
    const [loading, setLoading] = useState({city_1: false, city_2: false});
    const [error, setError] = useState(null);


    //Retrieves list of all air quality parameters that OpenAQApi can show for any given city
    const getAirQualityParams = async () => {
        try{
            const response = await getOpenAQResponse('/v2/parameters?limit=100&page=1&offset=0&sort=asc&order_by=id');
            const paramsList = response.data.results;

            //We are using only the names of the parameters
            const list = paramsList.map(param => {
                return param.displayName
            })
            setAirQualityParams(list);
        }
        catch(e){
            setError(e.message)
        }

    }

    //Retrieves list of all U.S. cities that OpenAQApi offers
    const getCities = async () => {
        try{
            const response = await getOpenAQResponse('/v2/cities?limit=100000&page=1&offset=0&sort=asc&country_id=US&order_by=city');
            const cityArray = response.data.results;

            //We are only using the names of the cities
            const cityNames = cityArray.filter(city => city.city[0] !== '0').map(city => city.city)
            setCityList(cityNames)
        }
        catch(e){
            setError(e.message)
        }
    }

    //Saves given city as either the first or second city to comapre
    const selectCity = async (id, city) => {

        //loading while city is set and data is retrieved
        setLoading({...loading, [id]: true})

        //determines if CityA or CityB is being selected
        const citySetter = id === 'city_1' ? setCityA : setCityB

        //if no city is selected
        if(!city){
            citySetter({})
            setLoading({...loading, [id]: false})
            return
        }

        try{
            //retrieves air quality data for selected city
            const airQuality = await getAirQualityForCity(city);
            citySetter({name: city, airQuality: airQuality})
            setLoading({...loading, [id]: false})
        }
        catch(e){
            setError(e.message)
            setLoading({...loading, [id]: false})
        }
    }

    //Retrieves first available location ID for given city from OpenAQApi
    const getCityLocationId = async cityName => {
        try{
            const response = await getOpenAQResponse(`/v2/locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&city=${cityName}&order_by=lastUpdated&dumpRaw=false`);
            return response.data.results[0].id
        }
       catch(e){
            throw e;
       }
    }

    //Retrieves air quality data for given city name
    const getAirQualityForCity = async cityName => {
        try{
            //get location id for city
            const locationId = await getCityLocationId(cityName);

            //use location id to retrieve air quality info
            const response = await getOpenAQResponse(`/v2/locations/${locationId}?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=US&order_by=lastUpdated&dumpRaw=false`);

            //Save only the data we need from the response
            const airQuality = response.data.results[0].parameters.map(parameter => {
                return {
                    name: parameter.displayName,
                    value: parameter.lastValue,
                    unit: parameter.unit,
                }
            })

            return airQuality;
        }
        catch(e){
            throw e;
        }
    }

    //When component mounts, load available cities and air quality params
    useEffect(() => {
        getCities();
        getAirQualityParams();
    },[])

    return (
        <OpenAQContext.Provider value={{cityList, selectCity, loading, error, setError, airQualityParams, chosenCities: {cityA, cityB}}}>
            {children}
        </OpenAQContext.Provider>
    );
};

export default OpenAQProvider;