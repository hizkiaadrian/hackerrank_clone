import React, { useEffect, useState } from 'react';
import Question from './Question';
import Editor from './Editor';
import AdditionOfTwoNumbers from '../../questions/AdditionOfTwoNumbers';
import './Assessment.css';
import { Redirect, useHistory } from 'react-router-dom';
import Links from '../../configs/api-links.json';

function Assessment() {
    const [assessmentStarted, setAssessmentStarted] = useState(false);
    const userId = sessionStorage.getItem('uuid');

    const history = useHistory();

    useEffect(() => {
        if (userId) {
            fetch(`${Links.check_assessment_started}?uuid=${encodeURIComponent(userId)}`, {
                method: 'GET'
            }).then(async response => {
                const res = await response.json();
                if (res.success) setAssessmentStarted(res.assessmentStarted !== null);
                else history.replace("/");
            })
        }
    }, [userId, history]);

    const startAssessment = () => {
        fetch(Links.start_assessment, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({uuid: userId})
		}).then(async response => {
            const res = await response.json();
            if (res.success) {
                setAssessmentStarted(true);
                sessionStorage.setItem('startTime', Date.now().toString());
            } else {
                history.replace("/");
            }
        })
    };

    
    return userId == null ?
        <Redirect to="/"/> :
        assessmentStarted ? 
        <div className="grid">
            <Question question={AdditionOfTwoNumbers.question} />
            <Editor defaultValue={AdditionOfTwoNumbers.defaultEditorValue} testCases={AdditionOfTwoNumbers.testCases}/>
        </div> :
        <div className="centered-page"><button onClick={startAssessment}>Start assessment?</button></div>
}

export default Assessment;
