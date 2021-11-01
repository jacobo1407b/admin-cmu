import { Grid } from 'semantic-ui-react';
import { globalState, Alumno } from 'types'
import TablaCustom from 'components/TablaCustom';
import { useSelector } from 'react-redux';


const arrayHeader = [
    'Alumno',
    'Apellidos',
    'Carrera',
    'Correo',
    'Genero',
    'Acciones'
]
function Alumnos() {
    
    const alumno: Alumno[] | null = useSelector((state: globalState) => state.alumnos);

    return (
        <>
            <Grid stackable centered>
                <TablaCustom
                    type="alumno"
                    headers={arrayHeader}
                    body={alumno}
                />
            </Grid>
        </>
    )
}

export default Alumnos
