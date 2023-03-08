import { useState } from 'react';

const AddNewAccount = ({ accountListGenerator }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [modal, setModal] = useState({ class: 'hidden', msg: '', color: '' });

    //Entered name and last name validation

    function inputIsValidInput(name) {
        return name.trim() && /^[A-Za-z\s]*$/.test(name);
    }

    const addNameHandler = (e) => {
        setName(e.target.value);
    };

    const addLastNameHandler = (e) => {
        setLastName(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (inputIsValidInput(name) && inputIsValidInput(lastName)) {
            accountListGenerator(name, lastName);
            setName('');
            setLastName('');
        } else {
            setModal({
                class: 'visible',
                msg: 'Please, use letter ONLY',
                color: '#f470a9',
            });
            setTimeout(() => {
                setModal({
                    class: 'hidden',
                    msg: '',
                });
            }, 2500);
        }
    };

    return (
        <form className="form-style" onSubmit={submitHandler}>
            <div>
                <label htmlFor="name">First Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
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
                    placeholder="Enter your last name"
                    title="Now your last name, please"
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
