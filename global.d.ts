import { compose } from "redux";
declare global {
    interface User{
        id_usuario: string
    }
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
      }
  }
  
  // Adding this exports the declaration file which Typescript/CRA can now pickup:
  export {}