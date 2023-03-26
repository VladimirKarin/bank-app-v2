import { useState } from 'react';

const AddNewAccount = ({ onSaveNewAccount }) => {
    const MODAL_TYPES = {
        ERROR: 'error',
        SUCCESS: 'success',
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('ERROR');
    const [type, setType] = useState(MODAL_TYPES.ERROR);
    const [modalClassName, setModalClassName] = useState('app-modal,');

    //Entered firstName and last firstName validation

    function inputIsValidInput(name) {
        return name.trim() && /^[A-Za-z\s]*$/.test(name);
    }

    const addNameHandler = (e) => {
        setFirstName(e.target.value);
    };

    const addLastNameHandler = (e) => {
        setLastName(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (inputIsValidInput(firstName) && inputIsValidInput(lastName)) {
            onSaveNewAccount(firstName, lastName);
            setFirstName('');
            setLastName('');
        } else {
            setVisible(true);
            setMessage('Use only letters');
            setModalClassName('app-modal modal-error');
            setType(MODAL_TYPES.ERROR);

            setTimeout(() => {
                setVisible(false);
                setMessage('');
                setModalClassName('app-modal');
                setType(MODAL_TYPES.ERROR);
            }, 2000);
        }
    };

    return (
        <form className="form-style" onSubmit={submitHandler}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={addNameHandler}
                    placeholder="Enter your First Name"
                    title="Be so kind and enter your First Name"
                    required
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    placeholder="Enter your Last Name"
                    title="Now your last Name, please"
                    onChange={addLastNameHandler}
                    required
                />
            </div>
            <button className="add" type="submit">
                Create the Account
            </button>

            {/* Modal*/}
            {visible && (
                <div className={modalClassName}>
                    <p>{message}</p>
                </div>
            )}
            {/*app-modal-success app-modal-error*/}
        </form>
    );
};
export default AddNewAccount;
