import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from 'redux/dispatch';
import {getAllAlumnos} from 'api';

function useLoaders() {
    const [loading, setloading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        ((async () => {
            const alumnos = await getAllAlumnos();
            dispatch(actions.setAlumnos(alumnos.data));
        }))()
    }, [dispatch])
    return {loading,setloading};
}

export default useLoaders
