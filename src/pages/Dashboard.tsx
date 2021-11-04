import {useSelector} from 'react-redux';
import {FunctionComponent} from 'react';
import {globalState} from 'types';
import {Grid} from 'semantic-ui-react';
import TableEnfermero from 'components/TableEnfermero';


interface IRouter{
    updateStatus:(id_alerta:string,id_enfermero:string)=>void
}

const Dashboard:FunctionComponent<IRouter> = ({updateStatus})=> {
    const solicitudes = useSelector((state:globalState) => state.solicitudes);
    return (
        <div>
            <Grid stackable centered>
                    <TableEnfermero solicitudes={solicitudes} updateStatus={updateStatus}/>
            </Grid>
        </div>
    )
}

export default Dashboard
