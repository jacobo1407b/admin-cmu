import {Switch,Route} from 'react-router-dom';
import {routAdmin} from './definition';

function RouterAdmin() {
    return (
        <>
         <Switch>
             <Route exact path={routAdmin.home}>
                 <h1>Admin Home</h1>
             </Route>
             <Route exact path={routAdmin.alumnos}>
                    <h1>Admin alumnos</h1>
             </Route>
             <Route exact path={routAdmin.enfermeros}>
                    <h1>Admin enfermero</h1>
             </Route>
             <Route exact path={routAdmin.history}>
                    <h1>Admin history</h1>
             </Route>
             <Route exact path={routAdmin.profile}>
                    <h1>Admin profile</h1>
             </Route>
        </Switch>   
        </>
    );
}

export default RouterAdmin


