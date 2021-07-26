import React from 'react';
import {CircularProgress, Divider, List, ListItem, ListItemText} from "@material-ui/core";



const AirQualityDisplay = ({cityInfo, airQualityParams, loading}) => {
    const {airQuality} = cityInfo;

    const airQualityParamById = (name) => {
        if(!airQuality){
            return false;
        }
        const result = airQuality.filter(p => p.name === name)
        if(result.length === 0){
            return false;
        }
        else{
            return result[0]
        }
    }

    return (
        <List component="nav" >
            {airQualityParams.map(param => {
                const paramForCity = airQualityParamById(param);
                return <>
                    <ListItem style={{backgroundColor: paramForCity ? 'rgba(0,0,0,0.12)' : ''}}>
                        <ListItemText>
                            <b>{`${param}`}:</b>
                            <span style={{margin: '25px'}} >{paramForCity ? `${paramForCity.value} ${paramForCity.unit}` : '-'}</span>
                        </ListItemText>
                    </ListItem>
                    <Divider/>
                </>
            })}
            {loading && <div style={{position: 'absolute', left: 0, top: 0, zIndex: 1, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.1)'}}>
                    <CircularProgress  style={{marginTop: '20px', marginLeft: '120px'}}/>

            </div>
            }
        </List>

    );
};

export default AirQualityDisplay;