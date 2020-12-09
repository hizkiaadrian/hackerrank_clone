import Links from '../configs/api-links.json';
import { addDays } from '../utils';
import { TestCase } from './Assessment/shared.interface';

export async function checkSubmission(userId: string, callback : Function) {
    const response = await (await fetch(`${Links.check_submission}?uuid=${userId}`, {
        method: 'GET'
    })).json();

    callback(response);
}

export async function validateCandidate(email: string, success : Function, assessmentCompleted : Function, reject : Function) {
    const response = await (await fetch(Links.validate_user, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email})
    })).json();

    localStorage.setItem('uuid', response.userId);
    if (response.success) success();
    else if (response.error === "Assessment completed.") assessmentCompleted();
    else reject(response.error);
}

export async function checkAssessmentStarted(userId : string, success: Function, deadlinePassed: Function, reject: Function) {
    const response = await (await fetch(`${Links.check_assessment_started}?uuid=${encodeURIComponent(userId)}`, {
        method: 'GET'
    })).json();

    if (response.success) {
        if (response.assessmentStarted && addDays((response.assessmentStarted as Date), 1) < new Date()) 
            deadlinePassed();
        else {
            success(response.assessmentStarted as Date);
        }
    }
    else reject();
}

export async function startAssessment(userId: string, success : Function, reject : Function) {
    const response = await (await fetch(Links.start_assessment, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({uuid: userId})
    })).json();

    if (response.success) success(response.assessmentStarted as Date);
    else reject();
}

export async function runCurrentCode(code: string, testCases: TestCase[], callback: Function) {
    const response = await (await fetch(Links.run_code, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({code: code, testCases: testCases})
    })).json();

    callback(response.testCaseResults);
}

export async function submitToServer(code: string, userId: string, success: Function, reject: Function) {
    const response = await (await fetch(Links.submit, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({code: code, userId: userId})
    })).json();

    if (response.success) success();
    else reject(response.error);
}