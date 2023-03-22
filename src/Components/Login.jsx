import { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {
    const [userName, setUserName] = useState('null');
    const [error, setError] = useState('null');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3333/login', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if (res.data.status === 'OK') {
                    setUserName(res.data.name);
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
                console.log(res.data);
                if (res.data.status === 'OK') {
                    setUserName(res.data.name);
                    setName('');
                    setPassword('');
                    setError(null);
                } else {
                    setError(true);
                    setUserName(null);
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
                    {userName ? (
                        <span>Hello, {userName}</span>
                    ) : (
                        <span>Hello, guest.</span>
                    )}
                </h5>
                <div className="login_name">
                    <label className="form-label">UsersName</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="login_password">
                    <label className="form-label">Password</label>
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
