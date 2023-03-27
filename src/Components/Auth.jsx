import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Global } from './Global';
import LoadingSpinner from './Loader';
import Login from './Login';

function Auth({ children }) {
    const [logged, setlogged] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthName } = useContext(Global);

    useEffect(() => {
        axios
            .get('http://localhost:3333/login', { withCredentials: true })
            .then((res) => {
                if (res.data.status === 'OK') {
                    setlogged(true);
                    setAuthName(res.data.name);
                } else {
                    setlogged(false);
                }
            });
    }, []);

    if (logged === null) {
        return <LoadingSpinner />;
    }

    if (true === logged) {
        return <>{children}</>;
    }

    if (false === logged) {
        return <Login />;
    }
}
export default Auth;
