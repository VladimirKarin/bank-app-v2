function AccountsFilter({ filterHandler }) {
    return (
        <section className="filter">
            <label htmlFor="filter">FilterAccounts:</label>
            <select id="filter" onChange={filterHandler}>
                <option value="all">Show All</option>
                <option value="positive">Have some funds</option>
                <option value="empty">Empty accounts</option>
            </select>
        </section>
    );
}

export default AccountsFilter;
