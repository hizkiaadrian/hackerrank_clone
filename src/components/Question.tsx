import React from 'react';
import '../styles/Question.css';
import {QuestionParameters} from '../interfaces/QuestionParameters.interface';
import MathJax from 'react-mathjax';

export const useLatex = (input : string) => {
return <MathJax.Node inline formula={input}/>
}

function Question(props: QuestionParameters) {
    return (
      <>
        <div className="question">
            {props.title && 
                <h1>{props.title}</h1>
            }
            {props.objective && 
                <section id="objective">
                    <strong>Objective</strong><br/>
                    {props.objective}
                </section>
            }
            {props.example && 
                <section id="example">
                    <strong>Example</strong><br/>
                    {props.example}
                </section>
            }
            {props.functionDescription && 
                <section id="function-description">
                    <strong>Function Description</strong><br/>
                    {props.functionDescription}
                </section>
            }
            {props.constraints && 
                <section id="constraints">
                    <strong>Constraints</strong><br/>
                    {props.constraints}
                </section>
            }
            {props.sampleInput && 
                <section id="sample-input">
                    <strong>Sample Input</strong><br/>
                    {props.sampleInput}
                </section>
            }
            {props.sampleOutput && 
                <section id="sample-output">
                    <strong>Sample Output</strong><br/>
                    {props.sampleOutput}
                </section>
            }
            {props.explanation && 
                <section id="explanation">
                    <strong>Explanation</strong><br/>
                    {props.explanation}
                </section>
            }
        </div>
      </>
    )
  }

export default Question;