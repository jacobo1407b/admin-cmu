import {env} from './env';
function isProduction():string{

    if(process.env.NODE_ENV==="production" ){
        return env.API_URL;
    }else if(process.env.NODE_ENV==="development"){
        return env.API_URL;
    }else{
        return '127.0.0.1:3001'
    }
}
export const urlApi:string = isProduction();
