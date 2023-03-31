import { useState } from 'react';
import axios from 'axios';

function CookieGenerator() {
    const [text, setText] = useState('');

    const set = (_) => {
        axios
            .post(
                'http://localhost:3333/cookie',
                { text },
                { withCredentials: true }
            )
            .then((res) => {});
    };

    const del = (_) => {
        axios
            .delete(
                'http://localhost:3333/cookie',
                { delete: true },
                { withCredentials: true }
            )
            .then((res) => {});
    };

    return (
        <div className="card mt-4">
            <div className="card-header">Cookie Manager</div>
            <div className="card-body">
                <h5 className="card-title">Cookie Generator</h5>
                <div className="mb3">
                    <label className="form-label">NEW Cookie TEXT</label>
                    <input
                        type="text"
                        className="form-control"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary m-1" onClick={set}>
                    Set
                </button>
                <button className="btn btn-danger m-1" onClick={del}>
                    Delete
                </button>
            </div>
        </div>
    );
}
export default CookieGenerator;
