import * as userActions from "../accion";
import {Modal} from 'types'
export const setModal = (data:Modal) => {
    return {
      type: userActions.SET_MODAL,
      payload: data,
    };
  };