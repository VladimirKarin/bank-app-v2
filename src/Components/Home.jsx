import { useContext } from 'react';
import '../Components/styles/home.css';
import AccountSummary from './AccountSummary';
import { Global } from './Global';

function Home() {
    const { users } = useContext(Global);
    return (
        <Global.Provider>
            {/* <img
                    src=".\img\bank.webp"
                    alt="bank card"
                    className="bank-img"
                /> */}
            {/* <AccountSummary /> */}
        </Global.Provider>
    );
}

export default Home;
