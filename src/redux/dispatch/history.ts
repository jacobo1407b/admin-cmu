import * as userActions from "../accion";

export const setHistory = (data:any) => {
    return {
      type: userActions.SET_HISTORIAL,
      payload: data,
    };
  };