import React, { useEffect, useState } from 'react';
import Question from './Question';
import Editor from './Editor';
import AdditionOfTwoNumbers from '../../questions/AdditionOfTwoNumbers';
import './Assessment.css';
import { Redirect, useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { addDays } from '../../utils';
import { checkAssessmentStarted, startAssessment } from '../apiFunctions';

function Assessment() {
    const [isLoading, setIsLoading] = useState(true);
    const [assessmentStarted, setAssessmentStarted] = useState<Date | null>(null);
    const userId = localStorage.getItem('uuid');

    const history = useHistory();

    useEffect(() => {
        if (userId) {
            (async (success : Function, deadlinePassed: Function, reject: Function) => 
                checkAssessmentStarted(userId, success, deadlinePassed, reject))(
                    (startDate : Date) => {
                        setAssessmentStarted(startDate);
                        setIsLoading(false);
                    },
                    () => history.replace("/thank-you"),
                    () => history.replace("/")
                );
        } 
        else
            history.replace("/");
    }, [userId, history]);

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
                            <button onClick={async () => await startAssessment(
                                userId,
                                (startTime : Date) => setAssessmentStarted(startTime),
                                () => history.replace("/")
                            )}>
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
