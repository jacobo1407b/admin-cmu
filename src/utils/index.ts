function isProduction():string{
    if(process.env.NODE_ENV==="development" ){
        return 'awseb-e-j-awsebloa-1km4hr6usj9ak-202473890.us-west-1.elb.amazonaws.com'
    }else if(process.env.NODE_ENV==="production"){
        return '127.0.0.1:3001'
    }else{
        return '127.0.0.1:3001'
    }
}
export const urlApi:string = isProduction();
