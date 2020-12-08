import React, { ChangeEvent, FormEvent, useState } from 'react';
import Links from '../../../configs/api-links.json';
import { validateEmail } from '../../../utils/index';

function NewUserForm() {
    const [formInput, setFormInput] = useState({name: "", email: ""});
    const [errorMsg, setErrorMsg] = useState("");

    const onChange = (event : ChangeEvent<HTMLInputElement>) => setFormInput(oldForm => ({...oldForm, [event.target.id]:event.target.value}));

    const onSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(formInput.email) || formInput.name === "") {
            setErrorMsg("Please enter a valid name and email");
            setTimeout(() => setErrorMsg(""), 2000);
            return false;
        }

        fetch(Links.create_new_user, {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formInput)
        }).then(async response => {
            const res = await response.json();
            if (res.success) {
                console.log(res);
            }
            else setErrorMsg(res.error);
        });
    };
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        type="text"
                        placeholder="Required" 
                        onChange={onChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        type="text"
                        placeholder="Required" 
                        onChange={onChange}
                    />
                </div>
                <button type="submit">Create new user</button>
            </form>
            <div className="error-message">{errorMsg}</div>
        </>
    );
};

export default NewUserForm;
