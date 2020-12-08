import React from 'react'
import {Candidate} from '../shared.interface';

function CandidatesList({candidates} : {candidates: Candidate[]}) {
    return (
        <>
            <h2>Candidates list</h2>
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
                    {candidates && candidates.map((candidate, index) => 
                        <tr key={candidate._id}>
                            <td>{index + 1}</td>
                            <td>{candidate.name}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.assessmentStarted ?? "Not started"}</td>
                            <td>{candidate.submissionTime ?? "Not submitted"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
} 

export default CandidatesList;
