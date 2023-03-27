import { createContext, useState } from 'react';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [filtered, setFiltered] = useState('all');
    const [route, setRoute] = useState('bank');
    const [authName, setAuthName] = useState(null);

    return (
        <Global.Provider
            value={{
                //filter
                filtered,
                setFiltered,
                // Route
                route,
                setRoute,
                //auth
                authName,
                setAuthName,
            }}
        >
            {children}
        </Global.Provider>
    );
};
