import { useState } from 'react';

const AddNewAccount = ({ onSaveNewAccount }) => {
    const [firstName, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [modal, setModal] = useState({ class: 'hidden', msg: '', color: '' });

    //Entered firstName and last firstName validation

    function inputIsValidInput(firstName) {
        return firstName.trim() && /^[A-Za-z\s]*$/.test(firstName);
    }

    const addNameHandler = (e) => {
        setName(e.target.value);
    };

    const addLastNameHandler = (e) => {
        setLastName(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        onSaveNewAccount(firstName, lastName);

        if (inputIsValidInput(firstName) && inputIsValidInput(lastName)) {
            setName('');
            setLastName('');
        } else {
            setModal({
                class: 'visible',
                msg: 'Please, use letters ONLY',
                color: '#f470a9ff',
            });
            setTimeout(() => {
                setModal({
                    class: 'hidden',
                    msg: '',
                });
            }, 1500);
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
            <div className={`${modal.class} modal`}>
                <p style={{ backgroundColor: modal.color }}>{modal.msg}</p>
            </div>
        </form>
    );
};
export default AddNewAccount;
