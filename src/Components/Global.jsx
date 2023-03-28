import axios from 'axios';
import { createContext, useState } from 'react';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [filtered, setFiltered] = useState('all');
    const [route, setRoute] = useState('bank');
    const [authName, setAuthName] = useState(null);
    const [logged, setLogged] = useState(null);

    const logOut = (_) => {
        axios
            .post('http://localhost:3333/logout', {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setLogged(false);
                authName(null);
            });
    };

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
                logOut,
                logged,
                setLogged,
            }}
        >
            {children}
        </Global.Provider>
    );
};
