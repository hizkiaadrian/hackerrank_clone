import React from 'react';
import '../styles/Question.css';
import QuestionParameters from '../interfaces/QuestionParameters.interface';
import MathJax from 'react-mathjax';

export const useLatex = (input : string) => <MathJax.Node inline formula={input}/>;

function Question({question}: QuestionParameters) {
    return (
        <MathJax.Provider>
            <div className="question">
                {question.title && 
                    <h1>{question.title}</h1>
                }
                {question.objective && 
                    <section id="objective">
                        <strong>Objective</strong><br/>
                        {question.objective}
                    </section>
                }
                {question.example && 
                    <section id="example">
                        <strong>Example</strong><br/>
                        {question.example}
                    </section>
                }
                {question.functionDescription && 
                    <section id="function-description">
                        <strong>Function Description</strong><br/>
                        {question.functionDescription}
                    </section>
                }
                {question.constraints && 
                    <section id="constraints">
                        <strong>Constraints</strong><br/>
                        {question.constraints}
                    </section>
                }
                {question.sampleInput && 
                    <section id="sample-input">
                        <strong>Sample Input</strong><br/>
                        {question.sampleInput}
                    </section>
                }
                {question.sampleOutput && 
                    <section id="sample-output">
                        <strong>Sample Output</strong><br/>
                        {question.sampleOutput}
                    </section>
                }
                {question.explanation && 
                    <section id="explanation">
                        <strong>Explanation</strong><br/>
                        {question.explanation}
                    </section>
                }
            </div>
        </MathJax.Provider>
    )
}

export default Question;