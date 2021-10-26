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

export type globalState = {
    user: User | null,
    role: string,
}
export type Action = { type: string; payload: any }