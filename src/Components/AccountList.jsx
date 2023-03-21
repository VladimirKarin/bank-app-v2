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

    // const deleteHandler = (id) => {
    //     if (accounts.filter((user) => user.id === id)[0].sum > 0) {
    //     setModal({
    //         class: 'visible',
    //         msg: `Destruction is imposible. You've got funds.`,
    //         color: '#f470a9FF',
    //     });
    //     setTimeout(() => {
    //         setModal({
    //             class: 'hidden',
    //             msg: '',
    //             color: '',
    //         });
    //     }, 1500);
    // } else {
    //     setModal({
    //         class: 'hidden',
    //         msg: 'Destruction completed',
    //         color: '#93d1d1ff',
    //     });
    //     setTimeout(() => {
    //         setModal({
    //             class: 'hidden',
    //             msg: '',
    //             color: '',
    //         });
    //     }, 1500);
    //         setAccount((prev) => prev.filter((user) => user.id !== id));
    //     }
    // };

    //Dealing with money transfers

    // const inputHandler = (e) => {
    //     if (+e.target.value >= 0 || !e.target.value) {
    //         let updatedBalance = accounts.map((user) =>
    //             user.id === +e.target.id
    //                 ? { ...user, value: +(+e.target.value).toFixed(2) }
    //                 : user
    //         );
    //         setAccount(updatedBalance);
    //     }
    // };

    // const depositHandler = (id) => {
    //     let updateBalance = accounts.map((user) =>
    //         user.id === id
    //             ? {
    //                   ...user,
    //                   sum: +(user.sum + user.value).toFixed(2),
    //                   value: '',
    //               }
    //             : user
    //     );
    //     setAccount(updateBalance);
    // };

    // const withdrawHandler = (id) => {
    //     if (
    //         +accounts.filter((user) => user.id === id)[0].value >
    //         accounts.filter((user) => user.id === id)[0].sum
    //     ) {
    //         setModal({
    //             class: 'visible',
    //             msg: 'The Big Brother wont give you more then you have',
    //             color: '#f470a9',
    //         });
    //         setTimeout(() => {
    //             setModal({
    //                 class: 'hidden',
    //                 msg: '',
    //                 color: '',
    //             });
    //         }, 1500);
    //     } else {
    //         let updateBalance = accounts.map((user) =>
    //             user.id === id
    //                 ? {
    //                       ...user,
    //                       sum: +(user.sum - user.value).toFixed(2),
    //                       value: '',
    //                   }
    //                 : user
    //         );
    //         setAccount(updateBalance);
    //     }
    // };

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
