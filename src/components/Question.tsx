import React from 'react';
import '../styles/Question.css';

function Question() {
    return (
      <>
        <div className="question">
          <h1>Addition of Two Numbers</h1>
          <section id="objective">
              <div>
            <strong>Objective</strong><br/>
            Complete the function solveMeFirst to compute the sum of two integers.
            </div>
          </section>
          <section id="example">
            <strong>Example</strong><br/>
            a = 7<br/>
            b = 3<br/>
        Return 10.
          </section>
          <section id="function-description">
              <strong>Function Description</strong><br/>
              solveMeFirst has the following parameters:
              <ul>
                  <li>int a: the first value</li>
                  <li>int b: the second value</li>
              </ul>
              Returns<br/>
              - int: the sum of a and b
          </section>
          <section id="constraints">
              <strong>Constraints</strong><br/>
              1 &le; a,b &le; 1000
          </section>
          <section id="sample-input">
              <strong>Sample Input</strong><br/>
              a = 2<br/>
              b = 3<br/>
          </section>
          <section id="sample-output">
              <strong>Sample Output</strong><br/>
              5
          </section>
          <section id="explanation">
              <strong>Explanation</strong><br/>
              2 + 3 = 5
          </section>
        </div>
      </>
    )
  }

export default Question;