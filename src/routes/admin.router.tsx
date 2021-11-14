
import { Switch, Route, Redirect } from 'react-router-dom';
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
                            <Route exact path="*">
                                   <Redirect to="/" />
                            </Route>
                     </Switch>
              </>
       );
}

export default RouterAdmin


