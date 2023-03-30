import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useReadRegisteredUsers } from '../Use/useReadRegisteredUsers';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [update, setUpdate] = useState(Date.now());
    const [filtered, setFiltered] = useState('all');
    const [route, setRoute] = useState('bank');
    const [authName, setAuthName] = useState(null);
    const [logged, setLogged] = useState(null);
    const [users, setUpdateUsers] = useReadRegisteredUsers();

    useEffect(() => {
        if (route === 'registered-users') {
            setUpdateUsers(Date.now());
        } else if (route == 'bank') {
            setUpdate(Date.now());
        }
    }, [route]);

    const logOut = (_) => {
        axios
            .post('http://localhost:3333/logout', {}, { withCredentials: true })
            .then((res) => {
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
                // Users Registered
                users,
                setUpdateUsers,
            }}
        >
            {children}
        </Global.Provider>
    );
};
