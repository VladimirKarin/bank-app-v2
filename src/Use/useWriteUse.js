import axios from "axios";
import { useEffect, useState } from "react"

const URL = 'http://localhost:3333/registered-users';


export const useWriteRegisteredUsers = _ => {

    const [destroy, setDestroy] = useState(null);
    const [response, setResponse] = useState(null);


    useEffect(() => {
        if (null === destroy) {
            return;
        }
        axios.delete(URL + '/' + destroy.id, { withCredentials: true })
            .then(res => setResponse(res.data))
            .catch(error => setResponse(error));
    }, [destroy]);

    return [response, setDestroy];

}