import { useState } from 'react';
import AccountsFilter from './AccountsFilter';
import User from './User';

const AccountList = ({
    accounts,
    setAccount,
    onDeleteUser,
    onDepositAmountChange,
}) => {
    const [filtered, setFiltered] = useState('all');
    const [modal, setModal] = useState({ class: 'hidden', msg: '', color: '' });

    const filterHandler = (e) => {
        setFiltered(e.target.value);
    };

    const filteredAccounts = accounts.filter((user) =>
        filtered === 'empty'
            ? user.sum === 0
            : filtered === 'positive'
            ? user.sum > 0
            : true
    );

    return (
        <div className="accounts-container">
            <AccountsFilter filterHandler={filterHandler} />

            {/* MOdal */}

            <div className={`${modal.class} modal`}>
                <p style={{ backgroundColor: modal.color }}>{modal.msg}</p>
            </div>

            <section className="accounts">
                {filteredAccounts.length === 0 ? (
                    <p className="none">Nothing to see here.</p>
                ) : (
                    [...filteredAccounts]
                        .sort((a, b) => a.lastName.localeCompare(b.lastName))
                        .map((user) => (
                            <User
                                user={user}
                                key={user.id}
                                onDeleteUser={onDeleteUser}
                                onDepositAmountChange={onDepositAmountChange}
                            />
                        ))
                )}
            </section>
        </div>
    );
};

export default AccountList;
