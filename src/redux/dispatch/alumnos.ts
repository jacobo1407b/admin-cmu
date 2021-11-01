import * as userActions from "../accion";
import {Alumno} from 'types'
export const setAlumnos = (data:Alumno[]) => {
    return {
      type: userActions.SET_ALUMNOS,
      payload: data,
    };
  };