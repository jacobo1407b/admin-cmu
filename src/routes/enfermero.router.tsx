import { FunctionComponent } from 'react';
import { Switch, Route,Redirect} from 'react-router-dom';
import { routerE } from './routes';
interface IRouter {
    updateStatus: (id_alerta: string, id_enfermero: string) => void
}

const RouterEnf: FunctionComponent<IRouter> = ({ updateStatus }) => {
    const rout = routerE({ updateStatus });
    return (
        <>
            <Switch>
                {rout.map((values) => (
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

export default RouterEnf