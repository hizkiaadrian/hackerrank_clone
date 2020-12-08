export interface QuestionInterface {
    title: string;
    objective: string;
    example: JSX.Element;
    functionDescription: JSX.Element;
    constraints: JSX.Element;
    sampleInput: JSX.Element;
    sampleOutput: JSX.Element;
    explanation: JSX.Element;
}

export interface TestCase {
    input: string;
    expectedOutput: string;
}

export interface TestCaseResult {
    success: boolean;
    stdin: string;
    stdout: string;
    expected: string;
}