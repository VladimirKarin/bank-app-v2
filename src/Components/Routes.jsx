import { useContext } from 'react';
import { Global } from './Global';
import BankUsersPage from './BankUsersPage';
import Login from './Login';
import Auth from './Auth';
import Users from './Users';
import Register from './Register';

function Routes() {
    const { route } = useContext(Global);

    switch (route) {
        case 'bank':
            return (
                <Auth>
                    <BankUsersPage />
                </Auth>
            );

        case 'registered-users':
            return (
                <Auth>
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
