import { useContext } from 'react';
import { Global } from './Global';
import BankUsersPage from './BankUsersPage';
import Login from './Login';
import Auth from './Auth';
import Users from './Users';
import Register from './Register';
import Home from './Home';

function Routes() {
    const { route } = useContext(Global);

    switch (route) {
        case 'home':
            return (
                <Auth roles={''}>
                    <Home />
                </Auth>
            );

        case 'bank':
            return (
                <Auth roles={'admin, user'}>
                    <BankUsersPage />
                </Auth>
            );

        case 'registered-users':
            return (
                <Auth roles={'admin'}>
                    <Users />
                </Auth>
            );

        case 'login':
            return <Login />;

        case 'register':
            return <Register />;

        default:
            return null;
    }
}

export default Routes;
