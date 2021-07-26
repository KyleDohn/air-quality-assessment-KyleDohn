import React, {useContext} from "react";

const OpenAQContext = React.createContext({})

export const useAQContext = () => {
    return useContext(OpenAQContext);
}

export default OpenAQContext;

