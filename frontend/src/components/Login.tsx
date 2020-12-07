import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';
import Links from '../api-links.json';

function validateEmail(email : string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function Login() {
    const [formInput, setFormInput] = useState({name: "", email: ""});
    const [errorMsg, setErrorMsg] = useState("");

    const history = useHistory();

    const onChange = (event : ChangeEvent<HTMLInputElement>) => 
        setFormInput(oldForm => ({...oldForm, [event.target.id]: event.target.value}));

    const onSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formInput.name === "" || !validateEmail(formInput.email)) {
            setErrorMsg("Please enter a valid name and email");
            setTimeout(() => setErrorMsg(""), 2000);
            return false;
        }

        fetch(Links.validate_user, {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formInput)
        }).then(async response => console.log(await response.json()));

        // history.push("/assessment");
    }

    return (
        <div className="login">
        <h1>Welcome to OSG Digital Assessment Platform</h1>
        <form onSubmit={onSubmit}>
            <div className="input-group">
                <label htmlFor="name">Name</label>
                <input 
                    id="name" 
                    type="text" 
                    placeholder="Required"
                    onChange={onChange} 
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input 
                    id="email" 
                    type="text"
                    placeholder="Required" 
                    onChange={onChange}
                />
            </div>
            <button type="submit">Start assessment</button>
            <div className="error-message">{errorMsg}</div>
        </form>
        </div>
    )
}

export default Login;
