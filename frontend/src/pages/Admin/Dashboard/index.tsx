import React, { useEffect, useState } from 'react';
import Links from '../../../configs/api-links.json';
import NewUserForm from './NewUserForm';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {Candidate} from '../shared.interface';
import CandidatesList from './CandidatesList';

function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            history.replace("/admin/login");
            return;
        }
        fetch(Links.get_all_candidates, {method: 'GET', headers: {"Authorization": localStorage.getItem("token")?? ""}}).then(
            async response => {
                const res = await response.json();
                if (res.success) {
                    setCandidates(res.candidates);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        )
    }, [history]);

    return (
        isLoading 
            ? <div className="centered-page">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
                <h3>Loading</h3>
            </div> 
        : isError 
            ? <div className="centered-page">
                Error loading candidates list. Please refresh the page in a few minutes.
            </div>
            : <div className="centered-page">
                <CandidatesList candidates={candidates} />
                <NewUserForm/>
                <div style={{display: "flex", flexDirection:"column", flex:"1 1 auto"}}/>
                <div><button onClick={() => {
                    localStorage.removeItem("token");
                    history.push("/admin/login");
                }}>Log out</button></div>
            </div>
    );
};

export default AdminDashboard;
