import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Global } from './Global';
import Login from './Login';
import Home from './Home';

import RoleError from './RoleError';
import AccountSummary from './AccountSummary';

function Auth({ children, roles }) {
    // const [isLoading, setIsLoading] = useState(false);
    const {
        setAuthName,
        logged,
        setLogged,
        route,
        setAuthRole,
        setUpdate,
        setUpdateUsers,
    } = useContext(Global);

    useEffect(() => {
        axios
            .get('http://localhost:3333/login', { withCredentials: true })
            .then((res) => {
                if (res.data.status === 'OK') {
                    setAuthName(res.data.name);
                    setAuthRole(res.data.role);
                    if (roles) {
                        if (roles.split(',').includes(res.data.role)) {
                            setLogged(1);
                            if (route === 'bank') {
                                setUpdate(Date.now());
                            } else if (route === 'registered-users') {
                                setUpdateUsers(Date.now());
                            }
                            if (route === 'bank') {
                                setUpdate(Date.now());
                            } else if (route === 'users') {
                                setUpdateUsers(Date.now());
                            }
                        } else {
                            setLogged(3);
                        }
                    } else {
                        setLogged(1);
                    }
                } else {
                    setAuthName(null);
                    setAuthRole(null);
                    if (roles.length) {
                        setLogged(2);
                    } else {
                        setLogged(1);
                    }
                }
            });
    }, [
        route,
        setUpdate,
        setUpdateUsers,
        setLogged,
        setAuthRole,
        setAuthName,
        roles,
    ]);

    if (null === logged) {
        return <Home />;
    }

    if (1 === logged) {
        return <>{children}</>;
    }

    if (2 === logged) {
        return <Login />;
    }

    if (3 === logged) {
        return <RoleError />;
    }
}
export default Auth;
