import { useContext, useEffect } from 'react';
import { Global } from './Global';

function Users() {
    const { users, setUserDelete } = useContext(Global);

    useEffect(() => {}, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-7">
                    <div className="card">
                        <div className="hard-header">User List</div>
                        <div className="card-body">
                            <ul className="list-group">
                                {users?.map((u) => (
                                    <li key={u.id} className="list-group-item">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-6">
                                                    <h2>{u.name}</h2>
                                                </div>
                                                <div className="col-2">
                                                    <button
                                                        className="btn"
                                                        type="button"
                                                        onClick={(_) =>
                                                            setUserDelete(u)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Users;
