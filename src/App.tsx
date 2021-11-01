import { useEffect } from 'react'
import { HashRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as action from 'redux/dispatch'
import LayoutAdm from 'layout/admin.layout';
import Elayout from 'layout/e.layout';
import Login from 'layout/Login';
import ModalCustom from 'components/ModalCustom';
import { getUser } from 'api';

function App() {

  const user = useSelector<any|null>(state => state.user);
  const role = useSelector<any>(state => state.role)
  const dispatch = useDispatch();

  useEffect(() => {
    getUser().then(res => {
      if (res.err) {
        dispatch(action.setUser(null));
        dispatch(action.setRole(''));
      } else {
        dispatch(action.setUser(res));
        dispatch(action.setRole(res.role));
      }
    }).catch(err => {
      dispatch(action.setUser(null));
        dispatch(action.setRole(''));
      console.log(err);
    });
  }, [dispatch])

  return (
    <HashRouter>
      <ModalCustom/>
      {
        !user ? (
          <Login />
        ) : role === "Admin" ? (
          <LayoutAdm />
        ) : role === "Enfermero" ? (
          <Elayout />
        ) : (
          <Login />
        )
      }
    </HashRouter>
  );
}

export default App;
