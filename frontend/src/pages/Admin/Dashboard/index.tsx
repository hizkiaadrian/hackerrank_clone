import React, { useEffect, useState } from 'react';
import NewUserForm from './NewUserForm';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { Candidate } from '../shared.interface';
import CandidatesList from './CandidatesList';
import { validateAdmin, getCandidatesList } from '../adminApiFunctions';

function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    const history = useHistory();

    useEffect(() => {
        (async function() {await validateAdmin(() => {}, () => history.replace("/admin/login"))})();

        const initiateCandidatesList = async () => updateCandidatesList();

        initiateCandidatesList();
    }, [history]);

    const updateCandidatesList= async () => {
        const response = await getCandidatesList();
        if (response.success) {
            setCandidates(response.candidates);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setIsError(true);
        }
    }

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
                <div style={{display: "flex", flexDirection:"column", flex:"1 1 auto"}}/>
                <NewUserForm updateList={updateCandidatesList} />
                <div><button onClick={() => {
                    localStorage.removeItem("token");
                    history.push("/admin/login");
                }}>Log out</button></div>
            </div>
    );
};

export default AdminDashboard;
