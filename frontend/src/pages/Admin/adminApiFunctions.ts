import Links from '../../configs/api-links.json';

async function authorizedFetch(link: string, method: string) {
    return await fetch(link, {method: method, headers:{'Authorization': localStorage.getItem("token") ?? ""}});
}

export async function validateAdmin(next: Function, reject: Function) {
    if (!localStorage.getItem("token")) {
        reject();
    } else {
        const response = await authorizedFetch(Links.validate_admin, 'GET');
        if (response.status !== 200) {
            localStorage.clear();
            reject();
        } else {
            next();
        }
    }
}

export async function adminLogin(formInput: {email: string, password: string}, success: Function, reject: Function) {
    const response =  await (await fetch(Links.admin_login, {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formInput)
        })).json();
        if (response.success) {
            localStorage.setItem("token", response.token);
            success();
        }
        else reject(response.error);
}

export const downloadSubmission = async (filePath: string) => {
    const blob = await (await authorizedFetch(`${Links.download_submission}?filePath=${filePath}`, 'GET')).blob();
    const link = document.createElement('a');
    link.setAttribute('href', window.URL.createObjectURL(blob));
    link.setAttribute('download', filePath);
    link.click();
}

export const createNewUser = async (formInput: {name: string, email: string}, success: Function, reject: Function) => {
    const response = await (await fetch(Links.create_new_user, {method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem("token") ?? ""},
            body: JSON.stringify(formInput)
        })).json();
    if (response.success) {
        success();
    }
    else reject(response.error);
}

export const getCandidatesList = async () => {
    return await (await authorizedFetch(Links.get_all_candidates, 'GET')).json();
}