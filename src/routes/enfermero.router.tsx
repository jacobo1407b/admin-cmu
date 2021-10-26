import {Switch,Route} from 'react-router-dom';
import {routEnfe} from './definition';
function RouterAdmin() {
    return (
        <>
         <Switch>
             <Route exact path={routEnfe.home}>
                 <h1>Home</h1>
             </Route>
             <Route exact path={routEnfe.profile}>
                    <h1>Profile</h1>
             </Route>
        </Switch>   
        </>
    );
}

export default RouterAdmin