import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const CityPicker = ({id, cities, selectCity}) => {
    const handleChange = e => {
        selectCity(id, e.target.innerText)
    }
    return (
        <Autocomplete
            id={id}
            options={cities}
            style={{ width: 300 }}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label='Enter a city' variant="outlined" />}
        />
    );
};

export default CityPicker;