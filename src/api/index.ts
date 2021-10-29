import {UpdateUser} from 'types';
const token: string | null = localStorage.getItem('token');
const apiUrl: string = 'http://localhost:3001/api/v1';

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "BEARER " + token);

function requestOptions(method: string, body?: any, whitoken?: boolean): RequestInit {

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


export function updateInfo(id: string,body:any):Promise<UpdateUser> {
    return fetch(`${apiUrl}/auth/update-user/${id}`, requestOptions('PUT',body,true)).then(response=>response.json())
}