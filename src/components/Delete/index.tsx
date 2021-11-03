import { FunctionComponent, useState } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import { globalState } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import * as patch from 'redux/dispatch';
import { deleteUser } from 'api';


interface IProps {
    i: number,
    id: string,
    matricula: string,
    type: "enfermero" | "alumno"
}
const Delete: FunctionComponent<IProps> = ({ i, id, type, matricula }) => {
    const [loading, setloading] = useState<boolean>(false);
    const alumnos = useSelector((state: globalState) => state.alumnos)
    const enfermeros = useSelector((state: globalState) => state.enfermeros)
    const dispatch = useDispatch();

    function closeModal() {
        dispatch(patch.setModal({
            open: false,
            title: "",
            content: null
        }));
    }
    function handleDelete() {
        setloading(true);
        deleteUser(id).then((res) => {
            if (res.msg === "Usuario eliminado correctamente") {
                if (type === "enfermero") {
                    var tempArr = enfermeros;
                    dispatch(patch.setEnfermero(null));
                    tempArr?.splice(i, 1);
                    dispatch(patch.setEnfermero(tempArr));
                } else {
                    var temp = alumnos;
                    dispatch(patch.setAlumnos(null));
                    temp?.splice(i, 1);
                    dispatch(patch.setAlumnos(temp))
                }
                alert('Usuario eliminado correctamente');
                setloading(false);
                closeModal();
            } else {
                alert('Error en la actualización');
                setloading(false);
            }

        }).catch((err) => {
            console.log(err)
            alert('Error en el servidor')
        });
    }
    return (
        <div>

            <h2>¿Desea eliminar a {matricula} ?</h2>
            <br />
            <Grid>
                <Grid.Column width={8}>
                    <Button
                        color='orange'
                        fluid
                        circular
                        onClick={closeModal}
                    >
                        Cancelar
                    </Button>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Button
                        color='red'
                        fluid
                        circular
                        loading={loading}
                        onClick={handleDelete}
                    >
                        Eliminar
                    </Button>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Delete
