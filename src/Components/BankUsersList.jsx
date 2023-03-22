import AccountSummary from './AccountSummary';
import Login from './Login';
import AddNewAccount from './AddNewAccount';
import AccountList from './AccountList';

function BankUsersList() {
    return (
        <>
            <AccountSummary accounts={users} />
            <Login />
            <AddNewAccount onSaveNewAccount={handleAddAccount} />
            <AccountList
                onDeleteUser={handleDeleteAccount}
                accounts={users}
                setUsers={setUsers}
                onDepositAmountChange={handleDepositAmountChange}
            />
            {/* <CookieGenerator /> */}
            {/* <div className={`${modal.class} modal`}>
          <p style={{ backgroundColor: modal.color }}>{modal.msg}</p>
        </div> */}
        </>
    );
}
export default BankUsersList;
