import { Grid } from 'semantic-ui-react';
import { globalState, Enfermero } from 'types'
import TablaCustom from 'components/TablaCustom';
import { useSelector, useDispatch } from 'react-redux';
import * as patch from 'redux/dispatch';
import AddEnfermero from 'components/Enfermero/AddEnfermero';
import Edit from 'components/Enfermero/AddEnfermero';
import EditCredentials from 'components/Alumnos/Edit';
import Delete from 'components/Delete';

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

    function editMedico(data: Enfermero, index: number) {
        dispatch(patch.setModal({
            open: true,
            title: 'Editar Medico',
            content: <Edit
                data={data}
                edit={true}
                i={index}
            />,
        }));
    }
    function onEditPassword(data: Enfermero, index: number) {
        dispatch(patch.setModal({
            open: true,
            title: `Cambiar Contraseña para ${data.matricula}`,
            content: <EditCredentials
                type="password" data={data}
                i={index}
                ctxE={enfermeros} />,
        }));
    }

    function onEditMatricula(data: Enfermero, index: number) {
        dispatch(patch.setModal({
            open: true,
            title: `Cambiar Matricula`,
            content: <EditCredentials
                type="matricula"
                data={data}
                i={index}
                ctxE={enfermeros} />,
        }));
    }

    function onEditDelete(data: Enfermero, index: number) {
        dispatch(patch.setModal({
            open: true,
            title: `Eliminar ${data.matricula}`,
            content: <Delete
                id={data.id_usuario}
                matricula={data.matricula}
                type="enfermero"
                i={index}
            />,
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
                    onEdit={editMedico}
                    onPassword={onEditPassword}
                    onEditMatricula={onEditMatricula}
                    onDelete={onEditDelete}
                />
            </Grid>
        </>
    )
}

export default Enfermeros
