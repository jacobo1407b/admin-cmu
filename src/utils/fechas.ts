const fechaActual = new Date(Date.now());

export function getFechaString(mes:number,dia:number,anio?:number):Date{
    let a = anio? anio : fechaActual.getFullYear();
    return new Date(`${a}-${mes}-${dia}`);
}

export function getAnio():number{
    return fechaActual.getFullYear();
}

export function getMes(i:number):string{
    var arrMeses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return arrMeses[i];
}