import React, { ChangeEvent, FormEvent, useState } from 'react';
import Links from '../../../configs/api-links.json';
import { validateEmail } from '../../../utils';
import { useHistory } from 'react-router-dom';

function AdminLogin() {
    const [formInput, setFormInput] = useState({email: "", password: ""});
    const [errorMsg, setErrorMsg] = useState("");

    const history = useHistory();

    const onChange = (event : ChangeEvent<HTMLInputElement>) => setFormInput(oldForm => ({...oldForm, [event.target.id]:event.target.value}));

    const onSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(formInput.email) || formInput.password === "") {
            setErrorMsg("Please enter a valid name and email");
            setTimeout(() => setErrorMsg(""), 2000);
            return false;
        };
        fetch(Links.admin_login, {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formInput)
        }).then(async response => {
            const res = await response.json();
            if (res.success) {
                localStorage.setItem("token", res.token);
                history.push("/admin/dashboard");
            }
            else setErrorMsg(res.error);
        });
    };

    return (
        <div className="login">
            <h1>Admin Login</h1>
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
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        type="password"
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

export default AdminLogin;
