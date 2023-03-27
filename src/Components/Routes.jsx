import { useContext } from 'react';
import { Global } from './Global';
import BankUsersPage from './BankUsersPage';
import Login from './Login';
import Auth from './Auth';

function Routes() {
    const { route } = useContext(Global);

    switch (route) {
        case 'bank':
            return (
                <Auth>
                    <BankUsersPage />
                </Auth>
            );
        case 'login':
            return <Login />;
        default:
            return null;
    }
}

export default Routes;
