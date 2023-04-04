const AccountSummary = ({ accounts }) => {
    const totalAccountsNumber = accounts.length;

    const totalBalance = (+accounts.reduce((t, c) => t + c.sum, 0))
        .toFixed(2)
        .toLocaleString('lt');

    const averageSumPerAccount = (totalBalance / totalAccountsNumber)
        .toFixed(2)
        .toLocaleString('lt');

    const emptyBalance = +accounts.filter((account) => account.sum === 0)
        .length;
    const negativeBalance = +accounts.filter((account) => account.sum < 0)
        .length;

    const positiveBalance = +accounts.filter((account) => account.sum > 0)
        .length;

    return (
        <div className="account-summary">
            <div className="summary summary-left">
                <h2>Account Summary</h2>
                <div className="summary_total">
                    <p>Total accounts: {totalAccountsNumber}</p>
                    <p> Total Balance: Є {totalBalance} </p>
                    <p>Average Sum Per Balance: Є {averageSumPerAccount}</p>
                </div>
            </div>
            <div className="summary summary-right">
                <h2>Account Summary</h2>
                <div className="summary_total">
                    <p>Zero Balance: {emptyBalance}</p>
                    <p>Negative Balance:{negativeBalance} </p>
                    <p>Positive Balance: {positiveBalance}</p>
                </div>
            </div>
        </div>
    );
};

export default AccountSummary;
