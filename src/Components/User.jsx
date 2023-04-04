import { useState } from 'react';

const User = ({ user, onDeleteUser, onDepositAmountChange }) => {
    const [amount, setAmount] = useState(0);
    const [disable, setDisable] = useState(false);
    const [disabledClassName, setDisabledClassName] = useState('');

    const currentDisabledValue = disable;

    const buttonBlockHandler = () => {
        setDisable(!currentDisabledValue);
    };

    const userBalance = (+user.sum.toFixed(2)).toLocaleString('lt');

    return (
        <div className="accounts-item" key={user.id}>
            <div className="info">
                <p>
                    Owner:{' '}
                    <span>
                        {user.firstName} {user.lastName}
                    </span>
                </p>
                <p>Balance: Є {userBalance}</p>
                <div>
                    <button
                        className={disable ? 'delete-disabled' : 'delete'}
                        disabled={disable}
                        onClick={() => onDeleteUser(user.id)}
                    >
                        {' '}
                        Destroy the account
                    </button>
                    <div>
                        <button
                            className={disable ? 'unblock' : 'block'}
                            onClick={() => setDisable(!currentDisabledValue)}
                        >
                            {disable ? 'Unblock' : 'Block'}
                        </button>
                        <button
                            disabled={disable}
                            className={
                                disable ? 'add-picture-disabled' : 'add-picture'
                            }
                        >
                            Add Picture
                        </button>
                    </div>
                </div>
            </div>
            <div className="transfers">
                <input
                    type="number"
                    id={user.id}
                    onChange={(event) => {
                        setAmount(event.target.value);
                    }}
                    value={amount}
                    step="0.01"
                />
                <div>
                    <button
                        className={disable ? 'deposit-disabled' : 'deposit'}
                        disabled={disable}
                        onClick={() => {
                            onDepositAmountChange(user.id, amount);
                            setAmount('');
                        }}
                    >
                        Deposit
                    </button>
                    <button
                        className={disable ? 'withdraw-disabled' : 'withdraw'}
                        disabled={disable}
                        onClick={() => {
                            onDepositAmountChange(user.id, -amount);
                            setAmount('');
                        }}
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </div>
    );
};

export default User;
