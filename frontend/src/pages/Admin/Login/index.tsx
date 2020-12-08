import React from 'react';

function AdminLogin() {
    const onChange = () => {

    };

    const onSubmit = () => {};

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
        </div>
    );
};

export default AdminLogin;
