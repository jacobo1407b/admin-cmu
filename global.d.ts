declare global {
    interface User{
        id_usuario: string
    }
  }
  
  // Adding this exports the declaration file which Typescript/CRA can now pickup:
  export {}