import { FunctionComponent, useState } from 'react';
import { User, globalState } from 'types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Button, Form, Input } from 'semantic-ui-react';
import { updateInfo } from 'api';
import { useDispatch, useSelector } from 'react-redux';
import * as patch from 'redux/dispatch'


interface IFPerfil {
    id_usuario: string
    nombre: string,
    a_paterno: string,
    a_materno: string,
    correo: string,
    genero: string,
    id_carrera: null | string
}
const FormPerfil: FunctionComponent<IFPerfil> = (props) => {
    const dispatch = useDispatch()

    const user: User = useSelector((state: globalState) => state.user);
    const role: string = useSelector((state: globalState) => state.role);
    const [formPerfil, setFormPerfil] = useState<IFPerfil>(props);
    const [onEnfermero] = useState<boolean>(role === 'Enfermero' ? true : false)
    const [loading, setloading] = useState<boolean>(false)

    function onChange(e: any) {
        const { value, name } = e.target;
        setFormPerfil({
            ...formPerfil,
            [name]: value
        });
    }

    function onSubmit() {
        if (!formPerfil.id_usuario || !formPerfil.nombre || !formPerfil.a_materno) {
            alert('No se permiten campos vacios')
        } else if (!formPerfil.a_paterno || !formPerfil.correo || !formPerfil.genero) {
            alert('No se permiten campos vacios')
        } else {
            setloading(true)
            updateInfo(formPerfil.id_usuario, formPerfil)
                .then(res => {
                    setloading(false)
                    if (res.error) {
                        alert(res.msg)
                    } else {
                        var upd = {
                            ...user,
                            a_materno: res.data.a_materno,
                            nombre: res.data.nombre,
                            a_paterno: res.data.a_paterno,
                            correo: res.data.correo
                        }
                        dispatch(patch.setUser(upd))
                        alert('Actualizado con exito')
                    }
                })
                .catch(err => {
                    console.log(err)
                    alert(err.msg)
                })
        }
    }
    return (
        <Card >
            <CardContent>
                <Form onChange={onChange}>
                    <Form.Field>
                        <label>Nombre</label>
                        <Input
                            disabled={onEnfermero ? true : false}
                            placeholder="Nombre"
                            name="nombre"
                            defaultValue={formPerfil.nombre}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Apellido paterno</label>
                        <Input
                            placeholder="Apellido paterno"
                            name="a_paterno"
                            defaultValue={formPerfil.a_paterno}
                            disabled={onEnfermero ? true : false}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Apellido materno</label>
                        <Input
                            placeholder="Apellido materno"
                            name="a_materno"
                            disabled={onEnfermero ? true : false}
                            defaultValue={formPerfil.a_materno}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Correo</label>
                        <Input
                            placeholder="Correo electronico"
                            name="correo"
                            defaultValue={formPerfil.correo}
                            disabled={onEnfermero ? true : false}
                        />
                    </Form.Field>
                </Form>
            </CardContent>
            <CardActions>
                {!onEnfermero && (
                    <Button
                        fluid
                        circular
                        color="orange"
                        size="small"
                        onClick={onSubmit}
                        loading={loading}
                    >
                        Actualizar
                    </Button>
                )}

            </CardActions>
        </Card>
    )
}

export default FormPerfil
