export default interface QuestionParameters {
    title: string;
    objective: string;
    example: JSX.Element;
    functionDescription: JSX.Element;
    constraints: JSX.Element;
    sampleInput: JSX.Element;
    sampleOutput: JSX.Element;
    explanation: JSX.Element;
}