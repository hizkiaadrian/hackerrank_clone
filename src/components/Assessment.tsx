import React from 'react';
import Question from './Question';
import Editor from './Editor';
import AdditionOfTwoNumbers from '../questions/AdditionOfTwoNumbers';
import '../styles/Assessment.css';

function Assessment() {
    return (
        <div className="grid">
            <Question question={AdditionOfTwoNumbers.question} />
            <Editor defaultValue={AdditionOfTwoNumbers.defaultEditorValue} testCases={AdditionOfTwoNumbers.testCases}/>
        </div>
    )
}

export default Assessment;
