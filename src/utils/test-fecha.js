const fechaActual = new Date(Date.now());

function getFechaString(){
    return new Date(`${fechaActual.getFullYear()}-${fechaActual.getMonth() + 1}-${fechaActual.getDate()}`);
}

console.log(getFechaString());