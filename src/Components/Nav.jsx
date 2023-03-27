import { useContext, useState } from 'react';
import { Global } from './Global';
import './Nav.css';

function Nav() {
    const { route, setRoute, authName } = useContext(Global);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-top">
                    <div className="left">NavBar</div>

                    <div className="right" id="navbarNav">
                        <span
                            onClick={(_) => setRoute('bank')}
                            href="#"
                            className={
                                'nav-link' + (route === 'bank' ? ' active' : '')
                            }
                            aria-current="page"
                        >
                            Bank Account
                        </span>
                    </div>
                    <div className="right">
                        {authName ? (
                            <>
                                <span className="nav-link">{authName}</span>
                                <span className="nav-link">Logout</span>
                            </>
                        ) : (
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
                        )}
                        {/* <span
                            onClick={(_) => setRoute('login')}
                            href="#"
                            className={
                                'nav-link' +
                                (route === 'login' ? ' active' : '')
                            }
                            aria-current="page"
                        >
                            Login
                        </span> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Nav;
