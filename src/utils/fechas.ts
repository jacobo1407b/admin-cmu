const fechaActual = new Date(Date.now());

export function getFechaString():Date{
    return new Date(`${fechaActual.getFullYear()}-${fechaActual.getMonth() + 1}-${fechaActual.getDate()}`);
}