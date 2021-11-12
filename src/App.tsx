import { useEffect, useState } from 'react'
import { HashRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as action from 'redux/dispatch'
import LayoutAdm from 'layout/admin.layout';
import Elayout from 'layout/e.layout';
import Login from 'layout/Login';
import ModalCustom from 'components/ModalCustom';
import { getUser } from 'api';
import cmulogo from 'assets/CMU.png';

function App() {

  const user = useSelector<any | null>(state => state.user);
  const role = useSelector<any>(state => state.role)
  const [onLoad, setonLoad] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    window.onload = function () {
      getUser().then(res => {
        if (res.err) {
          dispatch(action.setUser(null));
          dispatch(action.setRole(''));
          setonLoad(false);
        } else {
          dispatch(action.setUser(res));
          dispatch(action.setRole(res.role));
          setonLoad(false);
        }
      }).catch(err => {
        dispatch(action.setUser(null));
        dispatch(action.setRole(''));
        setonLoad(false);
      });
    };

  }, [dispatch])

  return (
    <HashRouter>
      <ModalCustom />
      {onLoad && <div className="page-init">
        <img src={cmulogo} alt="loading" />
      </div>}
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
