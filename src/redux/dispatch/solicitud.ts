import * as userActions from "../accion";
export const setSolicitud = (data: any) => {
    return {
        type: userActions.SET_SOLICITUD,
        payload: data,
    };
};