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
    const [modalClassName, setModalClassName] = useState('app-modal,');

    const handleAddAccount = (firstName, lastName) => {
        axios.post(URL, { firstName, lastName }).then((res) => {
            setVisible(true);
            setMessage('Account created successfully.');
            setModalClassName('app-modal modal-success');
            setType(MODAL_TYPES.SUCCESS);

            setTimeout(() => {
                setVisible(false);
                setMessage('');
                setModalClassName('app-modal');
                setType(MODAL_TYPES.ERROR);
            }, 2000);

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
                setMessage('Account deleted successfully.');
                setModalClassName('app-modal modal-success');
                setType(MODAL_TYPES.SUCCESS);

                setTimeout(() => {
                    setVisible(false);
                    setMessage('');
                    setType(MODAL_TYPES.ERROR);
                }, 2000);

                axios.get(URL).then((res) => {
                    setUsers(res.data);
                });
            })

            .catch((error) => {
                if (error.response.status === 403) {
                    setVisible(true);
                    setMessage(
                        "Account can't be deleted if there are any funds."
                    );
                    setModalClassName('app-modal modal-error');
                    setType(MODAL_TYPES.ERROR);

                    setTimeout(() => {
                        setVisible(false);
                        setMessage('');
                        setModalClassName('app-modal');
                        setType(MODAL_TYPES.ERROR);
                    }, 2000);
                }
            });
    };

    const handleDepositAmountChange = (id, amount) => {
        axios
            .put(URL + '/' + id, { amount })
            .then((_) => {
                setVisible(true);
                setMessage('Money successfully transfered.');
                setModalClassName('app-modal modal-success');
                setType(MODAL_TYPES.SUCCESS);

                setTimeout(() => {
                    setVisible(false);
                    setMessage('');
                    setType(MODAL_TYPES.ERROR);
                }, 2000);

                axios.get(URL).then((res) => {
                    setUsers(res.data);
                });
            })
            .catch((error) => {
                if (error) {
                    setVisible(true);
                    setMessage("You can't withdrow more than you have.");
                    setModalClassName('app-modal modal-error');
                    setType(MODAL_TYPES.ERROR);

                    setTimeout(() => {
                        setVisible(false);
                        setMessage('');
                        setModalClassName('app-modal');
                        setType(MODAL_TYPES.ERROR);
                    }, 2000);
                }
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
                    <div className={modalClassName}>
                        <p>{message}</p>
                    </div>
                )}
                {/*app-modal-success app-modal-error*/}
            </header>
        </div>
    );
}

export default App;
