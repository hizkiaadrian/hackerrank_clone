import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Loader from 'react-loader-spinner';
import { validateCandidate } from '../apiFunctions';
import { validateEmail } from '../../utils';

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

    const onSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setErrorMsg("Please enter a valid email");
            setTimeout(() => setErrorMsg(""), 2000);
            return false;
        }

        await validateCandidate(email,
            () => history.push("/assessment"),
            () => history.push("/thank-you"),
            (str : string) => setErrorMsg(str));
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
