import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useReadRegisteredUsers } from '../Use/useReadRegisteredUsers';
import { useWriteRegisteredUsers } from '../Use/useWriteUse';
import { useMessages } from '../Use/useMessage';
import { useWrite } from '../Use/useWrite';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [update, setUpdate] = useState(Date.now());
    const [filtered, setFiltered] = useState('all');
    const [route, setRoute] = useState('bank');
    const [authName, setAuthName] = useState(null);
    const [logged, setLogged] = useState(null);
    const [users, setUpdateUsers] = useReadRegisteredUsers();
    const [userResponse, setUserDelete] = useWriteRegisteredUsers();
    const [messages, setMessage] = useMessages([]);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        setUpdate(Date.now());

        // if (null !== response) {
        //     setMessage({
        //         text: response.message.text,
        //         type: response.message.type,
        //     });
        // }
    }, [response, setMessage, setUpdate]);

    useEffect(() => {
        setUpdateUsers(Date.now());
        // if (null !== userResponse && userResponse.code) {
        //     setMessage({
        //         text: userResponse.message
        //             ? userResponse.message
        //             : userResponse.code,
        //         type: 'error',
        //     });
        // } else if (null !== userResponse) {
        //     setMessage({
        //         text: response.message.text,
        //         type: response.message.type,
        //     });
        // }
    }, [userResponse, setMessage, setUpdate]);

    useEffect(() => {
        if (route === 'registered-users') {
            setUpdateUsers(Date.now());
        } else if (route === 'bank') {
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
                userResponse,
                setUserDelete,
            }}
        >
            {children}
        </Global.Provider>
    );
};
