
import { Switch, Route} from 'react-router-dom';
import { routerAdmin } from './routes';

function RouterAdmin() {
       return (
              <>
                     <Switch>
                            {routerAdmin.map((values) => (
                                          <Route exact path={values.path} key={values.id}>
                                                 {values.component}
                                          </Route>
                            ))}
                     </Switch>
              </>
       );
}

export default RouterAdmin


