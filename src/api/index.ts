import { UpdateUser, UserPromise, Carreras, Enfermero } from 'types';
const apiUrl: string = 'http://localhost:3001/api/v1';


function requestOptions(method: string, body?: any, whitoken?: boolean): RequestInit {
    const token: string | null = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "BEARER " + token);
    if (method === 'GET') {
        return {
            method: method,
            headers: myHeaders,
            cache: 'default'
        }
    } else {
        return {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(body),
            redirect: 'follow'
        };
    }
}

export function login(matricula: string, password: string): Promise<any> {
    var body = { matricula, password };
    return fetch(`${apiUrl}/auth/login`, requestOptions('POST', body)).then(response => response.json())
}

export function getUser(): Promise<any> {
    return fetch(`${apiUrl}/auth/get`, requestOptions('GET', null, true)).then(response => response.json())
}


export function updateInfo(id?: string, body?: any): Promise<UpdateUser> {
    return fetch(`${apiUrl}/auth/update-user/${id}`, requestOptions('PUT', body, true)).then(response => response.json())
}

export function updatePassword(id: string, password: string) {
    return fetch(`${apiUrl}/client/update-password/${id}`, requestOptions('PUT', { password }, true)).then(response => response.json())
}

export function updateMatricula(id: string, matricula: string) {
    return fetch(`${apiUrl}/client/update-matricula/${id}`, requestOptions('PUT', { newmatricula: matricula }, true)).then(response => response.json())
}
type FormImage = {
    resolve: {
        url: string,
        name_image: string
    },
    msg: string,
    error: boolean
}
export function addImage(formdata: any): Promise<FormImage> {
    const token: string | null = localStorage.getItem('token');
    var myHe = new Headers();
    myHe.append("Authorization", "BEARER " + token);
    return fetch(`${apiUrl}/image/add`, {
        method: 'POST',
        headers: myHe,
        body: formdata,
        redirect: 'follow'
    }).then(response => response.json())
}

export function getAllAlumnos(): Promise<UserPromise> {
    return fetch(`${apiUrl}/client/get-alumnos`, requestOptions('GET', null, true)).then(response => response.json())
}
//getallCarreras
export function getAllCarreras(): Promise<Carreras[]> {
    return fetch(`${apiUrl}/carrera/get-all`, requestOptions('GET', null, true)).then(response => response.json())
}

export function registerAlumno(body: any): Promise<any> {
    return fetch(`${apiUrl}/auth/create-alum`, requestOptions('POST', body, true)).then(response => response.json())
}
type EnfermeroRequArray = {
    error: boolean,
    msg: string
    data: Enfermero[]
}
type EnfermeroRequ = {
    error: boolean,
    msg: string
    data: Enfermero
}
export function getEnfermeros(): Promise<EnfermeroRequArray> {
    return fetch(`${apiUrl}/client/get-enfermero`, requestOptions('GET', null, true)).then(response => response.json())
}

export function registerEnfermero(body: any): Promise<EnfermeroRequ> {
    return fetch(`${apiUrl}/auth/create-enf`, requestOptions('POST', body, true)).then(response => response.json())
}
/**queda pendiente de realizar api */
export function deleteUser(id: string) {
    return fetch(`${apiUrl}/auth/delete-user/${id}`, requestOptions('DELETE', null, true)).then(response => response.json())
}