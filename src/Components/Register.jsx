import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Global } from './Global';

function Register() {
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    // const { setLogged, setAuthName } = useContext(Global);

    useEffect(() => {
        axios
            .get('http://localhost:3333/login', { withCredentials: true })
            .then((res) => {
                if (res.data.status === 'OK') {
                }
            });
    }, []);

    const register = (_) => {
        if (name.length < 3) {
            setError(`Username is too short`);
            return;
        }

        if (password.length < 3) {
            setError(`Your password is too short`);
            return;
        }

        if (password !== repeatedPassword) {
            setError(`Password doesn't match`);
            return;
        }

        axios
            .post(
                'http://localhost:3333/registered-users',
                { name, password },
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res.data);
                if (res.data.status === 'OK') {
                    setName('');
                    setPassword('');
                    setRepeatedPassword('');
                    setError(null);
                } else {
                    setError('Server error');
                }
            })
            .catch((error) => {
                setError(
                    error.response ? error.response.statusText : error.code
                );
            });
    };

    return (
        <div className="login">
            <div className="card-header">
                {error ? (
                    <span style={{ color: 'crimson' }}>{error}</span>
                ) : (
                    <span>Registration</span>
                )}
            </div>
            <div className="card-body">
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
                <div className="login_password">
                    <label className="form-label"></label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repeat your password"
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                    />
                </div>
                <button className="button add" onClick={register}>
                    Register New User
                </button>
            </div>
        </div>
    );
}
export default Register;
