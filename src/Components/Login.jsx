import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Global } from './Global';

function Login() {
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { setLogged, setAuthName } = useContext(Global);

    useEffect(() => {
        axios
            .get('http://localhost:3333/login', { withCredentials: true })
            .then((res) => {
                if (res.data.status === 'OK') {
                }
            });
    }, []);

    const login = (_) => {
        axios
            .post(
                'http://localhost:3333/login',
                { name, password },
                { withCredentials: true }
            )
            .then((res) => {
                if (res.data.status === 'OK') {
                    setName('');
                    setPassword('');
                    setLogged(true);
                    setAuthName(res.data.name);
                    setError(null);
                } else {
                    setError(true);
                }
            });
    };

    return (
        <div className="login">
            <div className="card-header">
                {error ? (
                    <span style={{ color: 'crimson' }}>Login Error</span>
                ) : (
                    <span>Login</span>
                )}
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    <span>Hello, guest.</span>
                </h5>
                <div className="login_name">
                    <label className="form-label"></label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="login_password">
                    <label className="form-label"></label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="button add" onClick={login}>
                    Login
                </button>
            </div>
        </div>
    );
}
export default Login;
