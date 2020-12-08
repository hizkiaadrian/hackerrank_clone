export interface Candidate {
    _id: string,
    name: string,
    email: string,
    assessmentStarted: Date | null,
    submissionTime: Date | null,
    submission: string
}