import { useState, useEffect } from 'react';
import { useDispatch /*, useSelector*/ } from 'react-redux';
//import { globalState } from 'types';
import * as actions from 'redux/dispatch';
import { getAllAlumnos, getAllCarreras } from 'api';
import { getEnfermeros } from 'api';

function useLoaders() {
    const [loading, setloading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        ((async () => {
                const alumnos = await getAllAlumnos();
                const enfermeros = await getEnfermeros();
                dispatch(actions.setAlumnos(alumnos.data));
                dispatch(actions.setCarreras(await getAllCarreras()));
                dispatch(actions.setEnfermero(enfermeros.data));
                setloading(false);
        }))()
    }, [dispatch])
    return { loading, setloading };
}

export default useLoaders
