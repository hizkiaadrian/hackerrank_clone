export default interface EditorParameters {
    defaultValue: string;
    testCases: TestCase[]
}  

interface TestCase {
    input: string;
    expectedOutput: string;
}