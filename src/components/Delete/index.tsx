import { FunctionComponent,useState } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import {  useDispatch } from 'react-redux';
import * as patch from 'redux/dispatch';


interface IProps {
    i: number,
    data: any
}
const Delete: FunctionComponent<IProps> = ({ i, data }) => {
    const [loading, setloading] = useState<boolean>(false);

    const dispatch = useDispatch();

    function closeModal() {
        dispatch(patch.setModal({
            open: false,
            title:"",
            content:null
        }));
    }
    function handleDelete() {
        setloading(true);
    }
    return (
        <div>

            <h2>¿Desea eliminar a {data.matricula} ?</h2>
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
