import { createContext, useEffect, useState } from 'react';
import { useReadRegisteredUsers } from '../Use/useReadRegisteredUsers';
import { useWriteRegisteredUsers } from '../Use/useWriteUse';
import { useMessages } from '../Use/useMessage';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [route, setRoute] = useState('home');
    const [update, setUpdate] = useState(Date.now());
    const [filtered, setFiltered] = useState('all');
    const [authName, setAuthName] = useState(null);
    const [logged, setLogged] = useState(null);
    const [users, setUpdateUsers] = useReadRegisteredUsers();
    const [userResponse, setUserDelete] = useWriteRegisteredUsers();
    const [messages, setMessage] = useMessages([]);
    const [response, setResponse] = useState(null);
    const [authRole, setAuthRole] = useState(null);

    // useEffect(() => {
    //     if (null === response) {
    //         return;
    //     }
    //     setUpdate(Date.now());
    //     if (null !== response) {
    //         setMessage({
    //             text: response.message.text,
    //             type: response.message.type,
    //         });
    //     }
    // }, [response, setMessage, setUpdate]);

    // useEffect(() => {
    //     if (null === userResponse) {
    //         return;
    //     }
    //     setUpdateUsers(Date.now());
    //     if (userResponse.code) {
    //         setMessage({
    //             text: userResponse.message
    //                 ? userResponse.message
    //                 : userResponse.code,
    //             type: 'error',
    //         });
    //     } else {
    //         setMessage({
    //             text: userResponse.message.text,
    //             type: userResponse.message.type,
    //         });
    //     }
    // }, [setUpdateUsers, setMessage, userResponse]);

    // useEffect(() => {
    //     setLogged(null);
    // }, [route]);

    // useEffect(() => {
    //     if (route === 'registered-users') {
    //         setUpdateUsers(Date.now());
    //     } else if (route === 'bank') {
    //         setUpdate(Date.now());
    //     }
    // }, [route, setUpdate, setUpdateUsers]);

    return (
        <Global.Provider
            value={{
                //filter
                filtered,
                setFiltered,
                setUpdate,
                // Route
                route,
                setRoute,
                //auth
                authName,
                setAuthName,
                logged,
                setLogged,
                // Users Registered
                users,
                setUpdateUsers,
                userResponse,
                setUserDelete,
                //AuthRole
                authRole,
                setAuthRole,
            }}
        >
            {children}
        </Global.Provider>
    );
};
