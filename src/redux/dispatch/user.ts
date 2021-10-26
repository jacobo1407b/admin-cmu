import * as userActions from "../accion";
export const setUser = (data:any) => {
    return {
      type: userActions.SET_USER,
      payload: data,
    };
  };