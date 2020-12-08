import React, { ChangeEvent, FormEvent, useState } from 'react';
import Links from '../../../configs/api-links.json';
import { validateEmail } from '../../../utils/index';

function NewUserForm({updateList} : {updateList : () => Promise<void>}) {
    const [formInput, setFormInput] = useState({name: "", email: ""});
    const [errorMsg, setErrorMsg] = useState("");

    const onChange = (event : ChangeEvent<HTMLInputElement>) => setFormInput(oldForm => ({...oldForm, [event.target.id]:event.target.value}));

    const resetForm = () => setFormInput({name: "", email: ""});

    const onSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(formInput.email) || formInput.name === "") {
            setErrorMsg("Please enter a valid name and email");
            setTimeout(() => setErrorMsg(""), 2000);
            return false;
        }

        fetch(Links.create_new_user, {method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem("token") ?? ""},
            body: JSON.stringify(formInput)
        }).then(async response => {
            const res = await response.json();
            if (res.success) {
                updateList();
                resetForm();
            }
            else setErrorMsg(res.error);
        });
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
