import { useDispatch } from 'react-redux';
import * as action from 'redux/dispatch'

function useLogout() {
    const dispatch = useDispatch()
    function logout(){
        localStorage.removeItem('token')
        dispatch(action.setUser(null));
        dispatch(action.setRole(''));
        dispatch(action.setAlumnos(null));
        dispatch(action.setEnfermero(null));
        dispatch(action.setCarreras([]))
        dispatch(action.setSolicitud(null));
    }
    return{logout}
}

export default useLogout
