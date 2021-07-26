import React from 'react';
import City from "./City";
import ErrorAlert from "./ErrorAlert";

const AirQualityComparison = () => {
    return (
        <div style={{width: '600px', margin: 'auto'}}>
            <ErrorAlert/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'start', marginTop: 30}}>
                <City id={'city_1'}/>
                <City id={'city_2'}/>
            </div>
        </div>

    );
};

export default AirQualityComparison;