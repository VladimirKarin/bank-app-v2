import { useContext } from 'react';
import { Global } from './Global';
import './styles/nav.css';
import axios from 'axios';

function Nav() {
    const { route, setRoute, authName, setLogged, authRole } =
        useContext(Global);

    const logOut = (_) => {
        axios
            .post('http://localhost:3333/logout', {}, { withCredentials: true })
            .then((res) => {
                setLogged(false);
                authName(false);
                setRoute('home');
            });
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-top">
                    <div className="right" id="navbarNav">
                        <span
                            onClick={(_) => setRoute('home')}
                            href="#"
                            className={
                                'nav-link' + (route === 'home' ? ' active' : '')
                            }
                            aria-current="page"
                        >
                            Home
                        </span>
                        {['admin', 'user'].includes(authRole) ? (
                            <span
                                onClick={(_) => setRoute('bank')}
                                href="#"
                                className={
                                    'nav-link' +
                                    (route === 'bank' ? ' active' : '')
                                }
                                aria-current="page"
                            >
                                Bank Account
                            </span>
                        ) : null}

                        {['admin'].includes(authRole) ? (
                            <span
                                onClick={(_) => setRoute('registered-users')}
                                href="#"
                                className={
                                    'nav-link' +
                                    (route === 'registered-users'
                                        ? ' active'
                                        : '')
                                }
                                aria-current="page"
                            >
                                Registered Users List
                            </span>
                        ) : null}
                    </div>
                    <div className="right">
                        {authName ? (
                            <>
                                <span className="nav-link">{authName}</span>
                                <span className="nav-link" onClick={logOut}>
                                    Logout
                                </span>
                            </>
                        ) : (
                            <>
                                <span
                                    onClick={(_) => setRoute('login')}
                                    href="#"
                                    className={
                                        'nav-link' +
                                        (route === 'login' ? ' active' : '')
                                    }
                                    aria-current="page"
                                >
                                    Login
                                </span>

                                <span
                                    onClick={(_) => setRoute('register')}
                                    href="#"
                                    className={
                                        'nav-link' +
                                        (route === 'login' ? ' active' : '')
                                    }
                                    aria-current="page"
                                >
                                    Register
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Nav;
