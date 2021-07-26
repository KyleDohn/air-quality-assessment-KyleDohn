import React from 'react';
import {Alert} from "@material-ui/lab";
import {useAQContext} from "../contexts/OpenAQ/OpenAQContext";

const ErrorAlert = () => {
    const {error, setError} = useAQContext();
    return (
        <>
            {error && <Alert onClose={() => setError(null)} severity="error">{error}</Alert>}
        </>
    );
};

export default ErrorAlert;