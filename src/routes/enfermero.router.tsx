import {Switch,Route} from 'react-router-dom';
import {routerE} from './routes'
function RouterAdmin() {
    return (
        <>
         <Switch>
             {routerE.map((values)=>(
                 <Route exact path={values.path}>
                     {values.component}
                 </Route>
             ))}
        </Switch>   
        </>
    );
}

export default RouterAdmin