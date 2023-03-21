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
                if (res.data.status === 'ok') {
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
        <div className="card mt-4">
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
                <div className="mb3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb3">
                    <label className="form-label">Name</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary m-1" onClick={login}>
                    Login
                </button>
            </div>
        </div>
    );
}
export default Login;
