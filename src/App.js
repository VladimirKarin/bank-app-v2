import { useEffect, useState } from 'react';
import './App.css';
import AccountList from './Components/AccountList';
import AccountSummary from './Components/AccountSummary';
import AddNewAccount from './Components/AddNewAccount';
import axios from 'axios';

const URL = 'http://localhost:3333/users';

function App() {

  const [users, setUsers] = useState([]);

  const handleAddAccount = (firstName, lastName) => {
    axios.post(URL, { firstName, lastName }).then(res => {
      axios.get(URL).then(res => {
        setUsers(res.data);
      });
    });
  };

  const handleDeleteAccount = (id) => {
    axios.delete(URL + '/' + id).then(res => {
      axios.get(URL).then(res => {
        setUsers(res.data);
      });
    });
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
        <AddNewAccount onSaveNewAccount={handleAddAccount} />
        <AccountList
          onDeleteUser={handleDeleteAccount}
          accounts={users}
          setUsers={setUsers}
          onDepositAmountChange={handleDepositAmountChange}
        />
      </header>
    </div>
  );
}

export default App;
