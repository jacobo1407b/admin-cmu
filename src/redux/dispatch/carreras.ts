import * as userActions from "../accion";
export const setCarreras = (data:any) => {
    return {
      type: userActions.SET_CARRERAS,
      payload: data,
    };
  };