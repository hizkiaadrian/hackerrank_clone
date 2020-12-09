import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { validateEmail } from '../../../utils';
import { useHistory } from 'react-router-dom';
import { adminLogin, validateAdmin } from '../adminApiFunctions';

function AdminLogin() {
    const [formInput, setFormInput] = useState({email: "", password: ""});
    const [errorMsg, setErrorMsg] = useState("");

    const history = useHistory();

    useEffect(() => {
        (async function() {validateAdmin(() => history.replace("/admin/dashboard"), () => {});})();
    }, [history]);

    const onChange = (event : ChangeEvent<HTMLInputElement>) => setFormInput(oldForm => ({...oldForm, [event.target.id]:event.target.value}));

    const onSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(formInput.email) || formInput.password === "") {
            setErrorMsg("Please enter a valid name and email");
            setTimeout(() => setErrorMsg(""), 2000);
            return false;
        };
        adminLogin(formInput, () => history.push("/admin/dashboard"), (str : string) => setErrorMsg(str));
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
