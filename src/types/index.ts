import { SemanticICONS } from 'semantic-ui-react'

export type SolicitudRealtime = {
    alumno: string,
    causa: string,
    enfermero_nombre?: string,
    enfermero_apellido?:string
    estado: boolean,
    id_solicitud: string,
    img_enfermero?: string,
    nombre_solicitante: string | null,
    ubicacion: string,
}
export type Carreras = {
    id_carrera: string,
    carrera: string,
    abreviatura: string
}
export type Enfermero = {
    matricula: string,
    id_usuario: string,
    url: string,
    nombre: string,
    a_paterno: string,
    a_materno: string,
    correo: string,
    genero: string
}
export type Alumno = {
    matricula: string,
    id_usuario: string,
    url: string,
    nombre: string,
    a_paterno: string,
    a_materno: string,
    correo: string,
    genero: string,
    carrera: string,
    abreviatura: string,
    id_carrera: string
}
export type User = {
    id_usuario: string,
    matricula: string,
    name_image: string,
    url: string,
    nombre: string,
    a_paterno: string,
    a_materno: string,
    correo: string,
    id_carrera: null,
    genero: string,
    role: string
}
export type Modal = {
    title: string,
    content: JSX.Element | null,
    open: boolean
}
export type globalState = {
    user: User,
    role: string,
    alumnos: Alumno[] | null,
    enfermeros: Enfermero[] | null,
    modal: Modal,
    carreras: Carreras[] | null,
    solicitudes:SolicitudRealtime[],
    data: any
}
export type Action = { type: string; payload: any }
export interface IRuta {
    id: number,
    path: string,
    icon: SemanticICONS,
    name: string,
    component: JSX.Element,
    active?: boolean
}

export type UpdateUser = {
    error: boolean,
    msg: string,
    data: User
}

export type UserPromise = {
    data: Alumno[]
    msg: string,
    error: boolean
}

export type Carrera = {
    id_carrera: string,
    carrera: string,
    abreviatura: string
}
export type SolicitudReq = {
    alumno: User
    ubicacion: string,
    causas: string,
    solicitante: boolean,
    nombre_solicitante: string | null,
    fecha: number | Date,
    id_medico?: string | null,
    id_alumno: string,
    carrera?: Carrera
}