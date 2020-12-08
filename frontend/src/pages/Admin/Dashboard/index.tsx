import React, { useEffect, useState } from 'react';
import Links from '../../../configs/api-links.json';
import NewUserForm from './NewUserForm';

function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetch(Links.get_all_users, {method: 'GET'}).then(
            async response => {
                const res = await response.json();
                if (res.success) {
                    setUsers(res.users);
                } else {
                    console.log(res.error);
                }
            }
        )
    }, []);

    return (
        <div className="centered-page">
            <table style={{marginBottom: "1rem"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Assessment start time</th>
                        <th>Submission time</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => 
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.assessmentStarted ?? "Not started"}</td>
                            <td>{user.submissionTime ?? "Not submitted"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h3>Create new candidate</h3>
            <NewUserForm/>
        </div>
    );
};

export default AdminDashboard;
