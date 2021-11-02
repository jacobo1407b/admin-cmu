import { Grid } from 'semantic-ui-react';
import { globalState, Alumno } from 'types'
import TablaCustom from 'components/TablaCustom';
import { useSelector, useDispatch } from 'react-redux';
import * as patch from 'redux/dispatch';
import AddAlumno from 'components/Alumnos/Add';
import Edit from 'components/Alumnos/Edit';
import Delete from 'components/Delete';

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
            content: <AddAlumno />,
        }));
    }

    function editAlumno(data: Alumno, index: number) {
        dispatch(patch.setModal({
            open: true,
            title: 'Editar Alumno',
            content: <AddAlumno edit data={data} i={index} />,
        }));
    }

    function onEditPassword(data: Alumno, index: number) {
        dispatch(patch.setModal({
            open: true,
            title: `Cambiar Contraseña para ${data.matricula}`,
            content: <Edit type="password" data={data} i={index} ctxA={alumno} />,
        }));
    }

    function onEditMatricula(data: Alumno, index: number) {
        dispatch(patch.setModal({
            open: true,
            title: `Cambiar Matricula`,
            content: <Edit type="matricula" data={data} i={index} ctxA={alumno} />,
        }));
    }

    function onEditDelete(data: Alumno, index: number) {
        dispatch(patch.setModal({
            open: true,
            title: `Eliminar ${data.matricula}`,
            content: <Delete
                data={data}
                i={index}
            />,
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
                    onEdit={editAlumno}
                    onPassword={onEditPassword}
                    onEditMatricula={onEditMatricula}
                    onDelete={onEditDelete}
                />
            </Grid>
        </>
    )
}

export default Alumnos
