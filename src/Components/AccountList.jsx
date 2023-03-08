import { useState } from 'react';
import AccountsFilter from './AccountsFilter';

const AccountList = ({ accounts, setAccount }) => {
    const [filtered, setFiltered] = useState('all');
    const [modal, setModal] = useState({ class: 'hidden', msg: '', color: '' });

    const deleteHandler = (id) => {
        if (accounts.filter((acc) => acc.id === id)[0].sum > 0) {
            setModal({
                class: 'visible',
                msg: `Destruction is imposible. You've got funds.`,
                color: '#f470a9',
            });
            setTimeout(() => {
                setModal({
                    class: 'hidden',
                    msg: '',
                    color: '',
                });
            }, 2500);
        } else {
            setModal({
                class: 'hidden',
                msg: 'Destruction completed',
                color: '#93d1d1',
            });
            setTimeout(() => {
                setModal({
                    class: 'hidden',
                    msg: '',
                    color: '',
                });
            }, 2500);
            setAccount((prev) => prev.filter((acc) => acc.id !== id));
        }
    };

    //Dealing with money transfers

    const inputHandler = (e) => {
        if (+e.target.value >= 0 || !e.target.value) {
            let updatedBalance = accounts.map((acc) =>
                acc.id === +e.target.id
                    ? { ...acc, value: +(+e.target.value).toFixed(2) }
                    : acc
            );
            setAccount(updatedBalance);
        }
    };

    const depositHandler = (id) => {
        let updateBalance = accounts.map((acc) =>
            acc.id === id
                ? {
                      ...acc,
                      sum: +(acc.sum + acc.value).toFixed(2),
                      value: '',
                  }
                : acc
        );
        setAccount(updateBalance);
    };

    const withdrawHandler = (id) => {
        if (
            +accounts.filter((acc) => acc.id === id)[0].value >
            accounts.filter((acc) => acc.id === id)[0].sum
        ) {
            setModal({
                class: 'visible',
                msg: 'The Empire wont give you more then you have',
                color: '#f470a9',
            });
            setTimeout(() => {
                setModal({
                    class: 'hidden',
                    msg: '',
                    color: '',
                });
            }, 2500);
        } else {
            let updateBalance = accounts.map((acc) =>
                acc.id === id
                    ? {
                          ...acc,
                          sum: +(acc.sum - acc.value).toFixed(2),
                          value: '',
                      }
                    : acc
            );
            setAccount(updateBalance);
        }
    };

    const filterHandler = (e) => {
        setFiltered(e.target.value);
    };

    const filteredAccounts = accounts.filter((acc) =>
        filtered === 'empty'
            ? acc.sum === 0
            : filtered === 'positive'
            ? acc.sum > 0
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
                        .map((acc) => (
                            <div className="accounts-item" key={acc.id}>
                                <div className="info">
                                    <p>
                                        Owner:{' '}
                                        <span>
                                            {acc.name} {acc.lastName}
                                        </span>
                                    </p>
                                    <p>
                                        Balance: Є{' '}
                                        {(+acc.sum.toFixed(2)).toLocaleString(
                                            'lt'
                                        )}
                                    </p>
                                    <button
                                        className="delete"
                                        onClick={() => deleteHandler(acc.id)}
                                    >
                                        {' '}
                                        Destroy the account
                                    </button>
                                </div>
                                <div className="transfers">
                                    <input
                                        type="number"
                                        id={acc.id}
                                        onChange={inputHandler}
                                        value={acc.value}
                                        step="0.01"
                                    />
                                    <div>
                                        <button
                                            className="deposit"
                                            onClick={() =>
                                                depositHandler(acc.id)
                                            }
                                        >
                                            Deposit
                                        </button>
                                        <button
                                            className="withdraw"
                                            onClick={() =>
                                                withdrawHandler(acc.id)
                                            }
                                        >
                                            Withdraw
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                )}
            </section>
        </div>
    );
};

export default AccountList;
