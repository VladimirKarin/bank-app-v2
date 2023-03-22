import { useEffect, useState } from 'react';
import './App.css';
import AccountList from './Components/AccountList';
import AccountSummary from './Components/AccountSummary';
import AddNewAccount from './Components/AddNewAccount';
import axios from 'axios';
import CookieGenerator from './Components/CookieGenerator';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';

const URL = 'http://localhost:3333/users';

function App() {
    const MODAL_TYPES = {
        ERROR: 'error',
        SUCCESS: 'success',
    };

    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('ERROR');
    const [type, setType] = useState(MODAL_TYPES.ERROR);

    const handleAddAccount = (firstName, lastName) => {
        axios.post(URL, { firstName, lastName }).then((res) => {
            axios.get(URL).then((res) => {
                setUsers(res.data);
            });
        });
    };

    const handleDeleteAccount = (id) => {
        axios
            .delete(URL + '/' + id)
            .then((res) => {
                setVisible(true);
                setMessage('SUCCESS');
                setType(MODAL_TYPES.SUCCESS);

                setTimeout(() => {
                    setVisible(false);
                    setMessage('');
                    setType(MODAL_TYPES.ERROR);
                }, 2000);

                console.log(res);
                axios.get(URL).then((res) => {
                    setUsers(res.data);
                });
            })

            .catch((error) => {
                if (error.response.status === 403) {
                    setVisible(true);
                    setMessage('ERROR');
                    setType(MODAL_TYPES.ERROR);

                    setTimeout(() => {
                        setVisible(false);
                        setMessage('');
                        setType(MODAL_TYPES.ERROR);
                    }, 2000);
                }
            });
    };

    const handleDepositAmountChange = (id, amount) => {
        axios.put(URL + '/' + id, { amount }).then((_) => {
            axios.get(URL).then((res) => {
                setUsers(res.data);
            });
        });
    };

    useEffect(() => {
        axios.get(URL).then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <Login />
                <AccountSummary accounts={users} />
                <AddNewAccount onSaveNewAccount={handleAddAccount} />
                <AccountList
                    onDeleteUser={handleDeleteAccount}
                    accounts={users}
                    setUsers={setUsers}
                    onDepositAmountChange={handleDepositAmountChange}
                />
                {visible && (
                    <div className="app-modal">
                        <p>{message}</p>
                    </div>
                )}
                {/*app-modal-success app-modal-error*/}
            </header>
        </div>
    );
}

export default App;
