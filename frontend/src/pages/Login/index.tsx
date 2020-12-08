import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Links from '../../configs/api-links.json';
import { UserContext } from '../../contexts/UserContext';

function validateEmail(email : string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

function Login() {
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const history = useHistory();
    const {setUser} = useContext(UserContext);

    const onChange = (event : ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

    const onSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setErrorMsg("Please enter a valid email");
            setTimeout(() => setErrorMsg(""), 2000);
            return false;
        }

        fetch(Links.validate_user, {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email})
        }).then(async response => {
            const res = await response.json();
            if (res.success) {
                setUser(res.userId);
                sessionStorage.setItem('uuid', res.userId);
                history.push("/assessment");
            }
            else setErrorMsg(res.error);
        });
    };

    return (
        <div className="login">
            <h1>Welcome to OSG Digital Assessment Platform</h1>
            <form onSubmit={onSubmit}>
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
            </form>
            <div className="error-message">{errorMsg}</div>
        </div>
    );
};

export default Login;
