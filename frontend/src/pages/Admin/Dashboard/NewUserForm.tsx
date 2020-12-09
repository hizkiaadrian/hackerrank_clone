import React, { ChangeEvent, FormEvent, useState } from 'react';
import { validateEmail } from '../../../utils';
import { createNewUser } from '../adminApiFunctions';

function NewUserForm({updateList} : {updateList : () => Promise<void>}) {
    const [formInput, setFormInput] = useState({name: "", email: ""});
    const [errorMsg, setErrorMsg] = useState("");

    const onChange = (event : ChangeEvent<HTMLInputElement>) => setFormInput(oldForm => ({...oldForm, [event.target.id]:event.target.value}));

    const resetForm = () => setFormInput({name: "", email: ""});

    const onSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(formInput.email) || formInput.name === "") {
            setErrorMsg("Please enter a valid name and email");
            setTimeout(() => setErrorMsg(""), 2000);
            return false;
        }
        await createNewUser(formInput, () => {updateList(); resetForm();}, (str: string) => setErrorMsg(str));
    };
    
    return (
        <>
            <h3>Create new candidate</h3>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        type="text"
                        placeholder="Required" 
                        onChange={onChange}
                        value={formInput.name}
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        type="text"
                        placeholder="Required" 
                        onChange={onChange}
                        value={formInput.email}
                    />
                </div>
                <button type="submit">Create new user</button>
            </form>
            <div className="error-message">{errorMsg}</div>
        </>
    );
};

export default NewUserForm;
