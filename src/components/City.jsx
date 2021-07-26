import React from 'react';
import {Card} from "@material-ui/core";
import CityPicker from "./CityPicker";
import {useAQContext} from "../contexts/OpenAQ/OpenAQContext";
import AirQualityDisplay from "./AirQualityDisplay";

const City = ({id}) => {
    const {cityList, selectCity, chosenCities, airQualityParams, loading} = useAQContext();
    const cityId = (id === 'city_1' ? 'cityA' : 'cityB')
    const cityInfo = chosenCities[cityId]
    return (
        <Card style={{marginTop: '6px', paddingTop: '5px'}}>
            <CityPicker cities={cityList} selectCity={selectCity} id={id}/>
            <AirQualityDisplay cityInfo={cityInfo} airQualityParams={airQualityParams} loading={loading[id]}/>
        </Card>
    );
};

export default City;