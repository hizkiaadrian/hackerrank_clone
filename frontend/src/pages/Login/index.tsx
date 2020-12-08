import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Links from '../../configs/api-links.json';
import Loader from 'react-loader-spinner';

function validateEmail(email : string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

function Login() {
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const history = useHistory();

    useEffect(() => {
        const userId = localStorage.getItem('uuid');

        if (userId) history.replace("/assessment");
        else setIsLoading(false);
    }, [history]);

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
            localStorage.setItem('uuid', res.userId);
            if (res.success) {
                history.push("/assessment");
            }
            else if (res.error === "Assessment completed.") history.push("/thank-you");
            else setErrorMsg(res.error);
        });
    };

    return isLoading
            ? <div className="centered-page">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
                <h3>Loading</h3>
            </div> 
            : (
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
                        <button type="submit">Log in</button>
                    </form>
                    <div className="error-message">{errorMsg}</div>
                </div>
            );
};

export default Login;
