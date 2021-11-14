import { useState, useEffect } from 'react';
import { useDispatch /*, useSelector*/ } from 'react-redux';
import { getSolicitudesHoy } from 'api';
import * as patch from 'redux/dispatch';


function useInitial() {
    const [loading, setloading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(patch.setSolicitud(await getSolicitudesHoy()))
            setloading(false);
        })()
    }, [dispatch])
    return { loading, setloading };
}

export default useInitial