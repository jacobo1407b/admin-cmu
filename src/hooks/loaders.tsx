import { useState, useEffect } from 'react';
import { useDispatch /*, useSelector*/ } from 'react-redux';
//import { globalState } from 'types';
import * as actions from 'redux/dispatch';
import { getAllAlumnos, getAllCarreras } from 'api';
import { getEnfermeros, getHistoryAll } from 'api';
import { getFechaString, getMes } from 'utils/fechas';

function useLoaders() {
    const [loading, setloading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        ((async () => {
            var tempData = [];
            const alumnos = await getAllAlumnos();
            const enfermeros = await getEnfermeros();
            for (let i = 0; i < 12; i++) {
                const { data } = await getHistoryAll({ fechai: getFechaString(i+1, 1), fechaf: getFechaString(i+1, 30) });
                
                let temp = {
                    "name": getMes(i),
                    "uv": data.length,
                };
                tempData.push(temp);
            }
            dispatch(actions.setHistory(tempData));
            dispatch(actions.setAlumnos(alumnos.data));
            dispatch(actions.setCarreras(await getAllCarreras()));
            dispatch(actions.setEnfermero(enfermeros.data));
            setloading(false);
        }))()
    }, [dispatch])
    return { loading, setloading };
}

export default useLoaders
