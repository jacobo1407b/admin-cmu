import { Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { globalState, User } from 'types'
import CardProfile from 'components/CardProfile';
import FormPerfil from 'components/FormPerfil';

function Profile() {

    const user: User = useSelector((state: globalState) => state.user);

    return (
        <div>
            <Grid stackable centered>
                <Grid.Column width={7}>
                    <CardProfile
                        image={user.url}
                        name={`${user.nombre} ${user.a_paterno} ${user.a_materno}`}
                        matriucla={user.matricula}
                    />
                </Grid.Column>
                <Grid.Column width={9}>
                    <FormPerfil
                        id_usuario={user.id_usuario}
                        nombre={user.nombre}
                        a_materno={user.a_materno}
                        a_paterno={user.a_paterno}
                        correo={user.correo}
                        genero={user.genero}
                        id_carrera={null}
                    />
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Profile;