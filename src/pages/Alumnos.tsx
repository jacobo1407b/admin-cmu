import { Grid } from 'semantic-ui-react';
import { globalState, Alumno } from 'types'
import TablaCustom from 'components/TablaCustom';
import { useSelector,useDispatch } from 'react-redux';
import * as patch from 'redux/dispatch';
import AddAlumno from 'components/Alumnos/Add';

const arrayHeader = [
    'Alumno',
    'Apellidos',
    'Carrera',
    'Correo',
    'Genero',
    'Acciones'
]
function Alumnos() {
    const dispatch = useDispatch();
    const alumno: Alumno[] | null = useSelector((state: globalState) => state.alumnos);

    function openModal() {
        dispatch(patch.setModal({
            open: true,
            title: 'Agregar Alumno',
            content: <AddAlumno/>,
        }));
    }
    return (
        <>
            <Grid stackable centered>
                <TablaCustom
                    type="alumno"
                    headers={arrayHeader}
                    body={alumno}
                    onAdd={openModal}
                />
            </Grid>
        </>
    )
}

export default Alumnos
