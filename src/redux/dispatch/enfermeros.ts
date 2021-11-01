import * as userActions from "../accion";
import {Enfermero} from 'types'
export const setEnfermero = (data:Enfermero[]|null) => {
    return {
      type: userActions.SET_ENFERMEROS,
      payload: data,
    };
  };