import { useEffect, useState } from 'react';
import './App.css';
import AccountList from './Components/AccountList';
import AccountSummary from './Components/AccountSummary';
import AddNewAccount from './Components/AddNewAccount';
import axios from 'axios';
import CookieGenerator from './Components/CookieGenerator';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Components/Login';

const URL = 'http://localhost:3333/users';

function App() {

  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({ class: 'hidden', msg: '', color: '' });


  const handleAddAccount = (firstName, lastName) => {
    axios.post(URL, { firstName, lastName }).then(res => {
      axios.get(URL).then(res => {
        setUsers(res.data);
      });
    });
  };

  const handleDeleteAccount = (id) => {
    try {
      axios.delete(URL + '/' + id).then(res => {
        console.log(res);
        axios.get(URL).then(res => {
          setUsers(res.data);
        });
      });
    } catch (error) {

      setModal({
        class: 'visible',
        msg: `Destruction is imposible. You've got funds.`,
        color: '#f470a9FF',
      });
      setTimeout(() => {
        setModal({
          class: 'hidden',
          msg: '',
          color: '',
        });
      }, 1500);
    } finally {
      setModal({
        class: 'hidden',
        msg: 'Destruction completed',
        color: '#93d1d1ff',
      });
      setTimeout(() => {
        setModal({
          class: 'hidden',
          msg: '',
          color: '',
        });
      }, 1500);
    }
  };


  const handleDepositAmountChange = (id, amount) => {
    axios.put(URL + '/' + id, { amount }).then(_ => {
      axios.get(URL).then(res => {
        setUsers(res.data);
      });
    });
  };


  useEffect(() => {
    axios.get(URL).then(res => {
      setUsers(res.data);
    });
  }, []);

  // useEffect(() => {
  //   if (null === users) {
  //     return;
  //   }
  //   axios.delete(URL + '/' + users.id).then((res) => { });
  // }, [users]);





  return (

    <div className="App">
      <header className="App-header">

        <AccountSummary accounts={users} />
        <Login />
        <AddNewAccount onSaveNewAccount={handleAddAccount} />
        <AccountList
          onDeleteUser={handleDeleteAccount}
          accounts={users}
          setUsers={setUsers}
          onDepositAmountChange={handleDepositAmountChange}

        />
        <CookieGenerator />
        {/* <div className={`${modal.class} modal`}>
          <p style={{ backgroundColor: modal.color }}>{modal.msg}</p>
        </div> */}
      </header>
    </div>
  );
}

export default App;
