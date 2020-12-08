import React from 'react';

import {TestCase, TestCaseResult} from '../shared.interface';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function TestCasesPanel({testCases, testCaseResults} : {testCases: TestCase[], testCaseResults: TestCaseResult[]}) {
    return (
        <div className="test-cases">
            {testCaseResults && 
                testCaseResults.every(result => 
                    result && 
                    result.success && 
                    result.stdout.trim() === result.expected.trim()
                ) && 
                <h3>Congratulations! You passed all test cases. Press "Submit" to submit your code</h3>
            }
            <Tabs className="full-width">
                {testCases &&
                    <TabList className="tab-list">
                        {testCases.map((_, index) => {
                            let result = testCaseResults[index];
                            const testCasePassed = result && result.success && result.stdout.trim() === result.expected.trim();

                            return(
                                <Tab key={index}>
                                    <FontAwesomeIcon icon={testCasePassed ? faCheckCircle : faTimesCircle}/> Test Case {index}
                                </Tab>
                            );
                        })}
                    </TabList>
                }
                {testCaseResults && testCaseResults.map((value: any, index) => {
                    let testCasePassed = value.success && (value.stdout.trim() === value.expected.trim());
                    
                    return (
                        <TabPanel className='tab-panel' key={index}>
                            <div className="tab-panel-content">

                                <h2 className={testCasePassed ? "success": "error"}>
                                    <FontAwesomeIcon icon={testCasePassed ? faCheckCircle : faTimesCircle}/>
                                    <span className="spacer"/>
                                    Test case {testCasePassed ? "passed" : "failed"}
                                </h2>

                                <div>Input (stdin): 
                                    <div className="codeblock multi-line output">
                                        {value.stdin}
                                    </div>
                                </div>

                                <div>Your output (stdout):
                                    <div className={"codeblock multi-line output " + (value.success ? "" : "error")}>
                                        {value.stdout}
                                    </div>
                                </div>

                                <div>Expected output
                                    <div className="codeblock multi-line output">
                                        {value.expected}
                                    </div>
                                </div>

                            </div>
                        </TabPanel>
                    )
                })}
            </Tabs>
        </div>
    )
}

export default TestCasesPanel;