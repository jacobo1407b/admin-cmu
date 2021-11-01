import { useDispatch } from 'react-redux';
import * as action from 'redux/dispatch'

function useLogout() {
    const dispatch = useDispatch()
    function logout(){
        localStorage.removeItem('token')
        dispatch(action.setUser(null));
        dispatch(action.setRole(''));
    }
    return{logout}
}

export default useLogout
