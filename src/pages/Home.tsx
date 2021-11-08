import { Header, Icon, Segment, Grid } from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {globalState} from 'types';
import {Link} from 'react-router-dom';
import {routAdmin} from 'routes/definition';

function Home() {

    const {alumnos,enfermeros,user} = useSelector((state:globalState) => state)
    return (
        <>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={16}>
                    <Segment placeholder color='green'>
                            <Header icon >
                                Bienvenido {user.nombre} {user.a_paterno} {user.a_materno} a la aplicación
                                de gestión de alumnos y enfermeros
                            </Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Link to={routAdmin.alumnos}>
                        <Segment inverted placeholder color='green'>
                            <Header icon >
                                <Icon name='users' />
                                {alumnos?.length} Alumnos registrados en plataforma
                            </Header>
                        </Segment>
                        </Link>
                        
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Link to={routAdmin.enfermeros}>
                        <Segment placeholder inverted color="orange">
                            <Header icon >
                                <Icon name='user doctor' />
                                {enfermeros?.length} Medicos registrados en plataforma
                            </Header>
                        </Segment>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export default Home
