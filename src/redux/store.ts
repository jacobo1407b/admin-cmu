import { createStore } from "redux";
import * as actions from "./accion";
import {Action,globalState} from 'types';

const initialState:globalState = {
    role: "",
    user: {
        id_usuario: "",
        matricula: "",
        name_image: "",
        url: "",
        nombre: "",
        a_paterno: "",
        a_materno: "",
        correo: "",
        id_carrera: null,
        genero: "",
        role: ""
    },
    alumnos: [],
    enfermeros:[]
};
function updateState(state = initialState, action: Action) {
    switch (action.type) {
        case actions.SET_USER:
            return {
                ...state,
                user:action.payload
            };
        case actions.ROLE:
            return {
                ...state,
                role: action.payload,
            };
        case actions.SET_ALUMNOS:
            return{
                ...state,
                alumnos: action.payload,
            }
        case actions.SET_ENFERMEROS:
            return{
                ...state,
                enfermeros: action.payload,
            }
        default:
            return {
                ...state,
            };
    }

}

const store = createStore(
    updateState
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;