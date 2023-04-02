import './App.css';
import { GlobalProvider } from './Components/Global';
import Nav from './Components/Nav';
import Routes from './Components/Routes';
// import Messages from './Components/Messages';

function App() {
    return (
        <GlobalProvider>
            <Nav />
            <Routes />
            {/* <Messages /> */}
        </GlobalProvider>
    );
}

export default App;
