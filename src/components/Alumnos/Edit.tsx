import { FunctionComponent, useState } from 'react';
import { Alumno,Enfermero} from 'types'
import { Button, Form, Input, Icon, Grid } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import * as patch from 'redux/dispatch';
import { updatePassword, updateMatricula } from 'api';

interface IProps {
    type: "password" | "matricula"
    data: Alumno | any
    i: number
    ctxA?: any
    ctxE?: any
}
const Edit: FunctionComponent<IProps> = ({ type, data, ctxA, i,ctxE }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [matricula, setMatricula] = useState<string>(data.matricula);
    const [showPassword, setShowPassword] = useState<boolean>(false)

    function closeModal() {
        dispatch(patch.setModal({
            open: false,
            title: '',
            content: null,
        }));
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name === "password") {
            setPassword(value);
        } else {
            setMatricula(value);
        }
    }

    function onShowPassword() {
        setShowPassword(!showPassword);
    }

    function onSubmitPassword() {
        if (password.length < 6 || !password) {
            alert("La contraseña debe tener al menos 6 caracteres")
        } else {
            setLoading(true);
            updatePassword(data.id_usuario, password)
                .then((res) => {
                    if (res.error) {
                        setLoading(false);
                        alert(res.msg)
                    } else {
                        alert("Contraseña actualizada")
                        closeModal()
                    }

                })
                .catch(() => {
                    setLoading(false);
                    alert("Error al actualizar la contraseña")
                })
        }
    }

    function onSubmitMatricula() {
        if (matricula.length < 11 || !matricula) {
            alert("La Matricula debe tener al menos 11 caracteres")
        } else {
            setLoading(true);
            updateMatricula(data.id_usuario, matricula)
                .then(res => {
                    setLoading(false);
                    if (res.msg === "Esta matricula ya existe") {
                        alert(res.msg)
                    } else {
                        if (ctxA) {
                            var tempArray = ctxA;
                            dispatch(patch.setAlumnos(null))
                            const alumnoNuevo: Alumno = {
                                ...data,
                                matricula: matricula
                            }
                            tempArray[i] = alumnoNuevo;
                            dispatch(patch.setAlumnos(tempArray))
                        } else {
                            var tempArrayE = ctxE;
                            dispatch(patch.setAlumnos(null))
                            const enfNuevo: Enfermero={
                                ...data,
                                matricula:matricula
                            }
                            tempArrayE[i] = enfNuevo;
                            dispatch(patch.setEnfermero(tempArray))
                        }

                        alert("Matricula actualizada");

                        closeModal()
                    }
                })
                .catch(err => {
                    setLoading(false);
                    alert("Error al actualizar la matricula")
                    console.log(err)
                })
        }
    }
    return (
        <div>
            <Form loading={loading}>
                {type === "password" ? (
                    <Form.Field>
                        <label>Contraseña Nueva</label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            icon={showPassword ?
                                <Icon name="lock open" onClick={onShowPassword} link /> :
                                <Icon name="lock" onClick={onShowPassword} link />}
                            placeholder='Contraseña Nueva'
                            name="password"
                            onChange={handleChange}
                        />
                    </Form.Field>
                ) : (
                    <Form.Field>
                        <label>Matricula Nueva</label>
                        <Input
                            icon="user"
                            defaultValue={matricula}
                            placeholder='Matricula Nueva'
                            name="matricula"
                            onChange={handleChange}
                        />
                    </Form.Field>
                )}
            </Form>
            <br />
            <Grid>
                <Grid.Column width={8}>
                    <Button
                        onClick={closeModal}
                        circular
                        fluid
                        color='red'
                    >
                        Cancelar
                    </Button>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Button
                        circular
                        fluid
                        color='green'
                        onClick={type === "password" ? onSubmitPassword : onSubmitMatricula}
                    >
                        Actualizar
                    </Button>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Edit
