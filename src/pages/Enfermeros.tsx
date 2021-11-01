import { Grid } from 'semantic-ui-react';
import { globalState, Enfermero } from 'types'
import TablaCustom from 'components/TablaCustom';
import { useSelector, useDispatch } from 'react-redux';
import * as patch from 'redux/dispatch';
import AddEnfermero from 'components/Enfermero/AddEnfermero';

const arrayHeader = [
    'Medico',
    'Apellidos',
    'Correo',
    'Genero',
    'Acciones'
]
function Enfermeros() {

    const dispatch = useDispatch();
    const enfermeros: Enfermero[] | null = useSelector((state: globalState) => state.enfermeros)

    function openModal() {
        dispatch(patch.setModal({
            open: true,
            title: 'Agregar Medico',
            content: <AddEnfermero />,
        }));
    }

    return (
        <>
            <Grid stackable centered>
                <TablaCustom
                    headers={arrayHeader}
                    type="enfermero"
                    body={enfermeros}
                    onAdd={openModal}
                />
            </Grid>
        </>
    )
}

export default Enfermeros
