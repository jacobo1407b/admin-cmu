import * as userActions from "../accion";

export const setRole = (data:any) => {
    return {
      type: userActions.ROLE,
      payload: data,
    };
  };