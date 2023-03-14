import axios from "axios";
import { useEffect, useState } from "react"

const URL = 'http://localhost:3333/bank';


export const useWrite = _ => {

    const [create, setCreate] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {

        axios.post(URL, create)
            .then(res => setResponse(res.data));

    }, [create])


    return [response, setCreate];

}