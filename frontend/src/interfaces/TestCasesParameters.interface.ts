export interface TestCasesParameters {
    testCases: TestCase[];
    testCaseResults: TestCaseResult[];
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