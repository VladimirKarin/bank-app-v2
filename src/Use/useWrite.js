import { useState } from "react"

const URL = 'http://localhost:3333/bank';


export const useWrite = _ => {

    const [create, setCreate] = useState(null);
    const [response, setResponse] = useState(null);
    const [destroy, setDelete] = useState(null);
    const [edit, setEdit] = useState(null);

}