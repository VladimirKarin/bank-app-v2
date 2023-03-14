import { useState } from 'react';

const User = ({ user, onDeleteUser, onDepositAmountChange }) => {
    const [amount, setAmount] = useState(0);

    return (
        <div className="accounts-item" key={user.id}>
            <div className="info">
                <p>
                    Owner:{' '}
                    <span>
                        {user.firstName} {user.lastName}
                    </span>
                </p>
                <p>Balance: Є {(+user.sum.toFixed(2)).toLocaleString('lt')}</p>
                <button
                    className="delete"
                    onClick={() => onDeleteUser(user.id)}
                >
                    {' '}
                    Destroy the account
                </button>
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
                        className="deposit"
                        onClick={() => {
                            onDepositAmountChange(user.id, amount);
                            setAmount(0);
                        }}
                    >
                        Deposit
                    </button>
                    <button
                        className="withdraw"
                        onClick={() => {
                            onDepositAmountChange(user.id, -amount);
                            setAmount(0);
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
