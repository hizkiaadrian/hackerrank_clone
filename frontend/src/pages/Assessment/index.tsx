import React, { useEffect, useState } from 'react';
import Question from './Question';
import Editor from './Editor';
import AdditionOfTwoNumbers from '../../questions/AdditionOfTwoNumbers';
import './Assessment.css';
import { Redirect, useHistory } from 'react-router-dom';
import Links from '../../configs/api-links.json';
import Loader from 'react-loader-spinner';
import { addDays } from '../../utils/index';

function Assessment() {
    const [isLoading, setIsLoading] = useState(true);
    const [assessmentStarted, setAssessmentStarted] = useState<Date | null>(null);
    const userId = localStorage.getItem('uuid');

    const history = useHistory();

    useEffect(() => {
        if (userId) {
            fetch(`${Links.check_assessment_started}?uuid=${encodeURIComponent(userId)}`, {
                method: 'GET'
            }).then(async response => {
                const res = await response.json();
                if (res.success) {
                    if (addDays((res.assessmentStarted as Date), 1) < new Date()) 
                        history.replace("/thank-you");
                    else {
                        setAssessmentStarted(res.assessmentStarted);
                        setIsLoading(false);
                    }
                }
                else history.replace("/");
            });
        } 
        else
            history.replace("/");
    }, [userId, history]);

    const startAssessment = () => {
        fetch(Links.start_assessment, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({uuid: userId})
		}).then(async response => {
            const res = await response.json();
            if (res.success) {
                setAssessmentStarted(res.assessmentStarted as Date);
            } else {
                history.replace("/");
            }
        })
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
            : userId == null 
                ? <Redirect to="/"/> : 
                    assessmentStarted 
                        ? <>
                            <div className="grid">
                                <Question question={AdditionOfTwoNumbers.question} />
                                <Editor defaultValue={AdditionOfTwoNumbers.defaultEditorValue} testCases={AdditionOfTwoNumbers.testCases} deadline={addDays(assessmentStarted, 1)}/>
                            </div>
                        </> 
                        : <div className="centered-page">
                            <button onClick={startAssessment}>
                                Start assessment?
                            </button>
                            <ol>
                                <li>You need to have JavaScript enabled</li>
                                <li>Do not clear any cookies and browser cache throughout the assessment</li>
                                <li>Your assessment link will be active for 24 hours after you press start</li>
                            </ol>
                        </div>
}

export default Assessment;
