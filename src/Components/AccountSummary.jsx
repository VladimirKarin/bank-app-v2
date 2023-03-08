const AccountSummary = ({ accounts }) => {
    return (
        <div className="summary">
            <h2>Account Summary</h2>
            <div className="summary_total">
                <p>Total accounts: {accounts.length}</p>
                <p>
                    {' '}
                    Total Balance: Є{' '}
                    {(+accounts.reduce((t, c) => t + c.sum, 0))
                        .toFixed(2)
                        .toLocaleString('lt')}{' '}
                </p>
            </div>
        </div>
    );
};

export default AccountSummary;
