import { createContext, useState } from 'react';
import { useWrite } from '../Use/useWrite';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
    const [response, setCreate] = useWrite();
    const [filtered, setFiltered] = useState('all');

    return (
        <Global.Provider
            value={{
                filtered,
                setFiltered,
                setCreate,
            }}
        >
            {children}
        </Global.Provider>
    );
};
