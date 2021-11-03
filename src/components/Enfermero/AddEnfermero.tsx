import { useState, FunctionComponent } from 'react';
import { Form, Button, Input, Select, Icon, Grid } from 'semantic-ui-react';
import { registerEnfermero,updateInfo } from 'api';
import { useSelector, useDispatch } from 'react-redux';
import { Enfermero, globalState } from 'types';
import * as patch from 'redux/dispatch';


interface IAForm {
    matricula: string,
    password: string,
    nombre: string,
    a_paterno: string,
    a_materno: string,
    correo: string,
    genero: string,
    id_carrera: null
}

interface IAddEnfermero {
    edit?: boolean,
    data?: Enfermero,
    i?: number
}


const AddEnfermero: FunctionComponent<IAddEnfermero> = ({ edit, data, i }) => {
    const dispatch = useDispatch();

    const enfermeros: any = useSelector((state: globalState) => state.enfermeros)
    const [showPassword, setshowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<IAForm>(initialForm(data, edit))
    const [loading, setLoading] = useState<boolean>(false)


    function onShowPassword() {
        setshowPassword(!showPassword);
    }

    function handlerChange(e: any) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    function changeSelectGenero(e: any, { value }: any) {
        setFormData({
            ...formData,
            genero: value
        })
    }
    function validateForm() {
        let valid = true;
        Object.values(formData).forEach((val: any) => {
            if (val === '') {
                valid = false;
            }
        })
        return valid;
    }

    function closeModal() {
        dispatch(patch.setModal({
            open: false,
            content: null,
            title: ""
        }))
    }
    function onSubmit(e: any) {
        if (!validateForm()) {
            alert('Todos los campos son obligatorios');
        } else {
            setLoading(true);
            registerEnfermero(formData)
                .then(res => {
                    setLoading(false);
                    if (res.error) {
                        alert(res.msg)
                    } else {
                        dispatch(patch.setEnfermero(null))
                        const enfermero: Enfermero = {
                            matricula: res.data.matricula,
                            a_materno: res.data.a_materno,
                            a_paterno: res.data.a_paterno,
                            nombre: res.data.nombre,
                            correo: res.data.correo,
                            genero: res.data.genero,
                            url: res.data.url,
                            id_usuario: res.data.id_usuario,
                        }
                        enfermeros?.push(enfermero);
                        dispatch(patch.setEnfermero(enfermeros))
                        alert('Se ha registrado correctamente');
                        closeModal()

                    }
                })
                .catch(err => {
                    console.log(err);
                    alert('Error al registrar');
                    setLoading(false);
                })
        }
    }

    function onEdit(){
        if(!validateForm()){
            alert('Todos los campos son obligatorios');
        }else{
            setLoading(true);
            updateInfo(data?.id_usuario,formData)
            .then(res=>{
                setLoading(false);
                if(res.error){
                    alert(res.msg)
                }else{
                    var x = Number(i)
                    var enf = enfermeros;
                    enf[x]= {
                        matricula: res.data.matricula,
                        a_materno: res.data.a_materno,
                        a_paterno: res.data.a_paterno,
                        nombre: res.data.nombre,
                        correo: res.data.correo,
                        genero: res.data.genero,
                        url: res.data.url,
                        id_usuario: res.data.id_usuario,
                    }
                    dispatch(patch.setEnfermero(enf))
                    alert('Se ha actualizado correctamente');
                    closeModal()
                }
            })
            .catch(err=>{
                setLoading(false);
                alert('Error al actualizar');
                console.log(err);
            })
        }
    }
    return (
        <div>
            <Form loading={loading}>
                {!edit && (
                    <>
                        <Form.Field>
                            <Input

                                onChange={handlerChange}
                                name="matricula"
                                icon="address card outline"
                                placeholder="Matricula"
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                onChange={handlerChange}
                                type={showPassword ? 'text' : 'password'}
                                icon={<Icon name={showPassword ? 'lock open' : 'lock'} link onClick={onShowPassword} />}
                                placeholder="Password"
                                name="password"
                            />
                        </Form.Field>
                    </>
                )}

                <Form.Group widths='equal'>
                    <Form.Field>
                        <Input
                            defaultValue={formData.nombre}
                            onChange={handlerChange}
                            placeholder="Nombre Medico"
                            icon="user doctor"
                            name="nombre"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            defaultValue={formData.a_paterno}
                            onChange={handlerChange}
                            placeholder="Apellido paterno"
                            icon="user doctor"
                            name="a_paterno"
                        />
                    </Form.Field>

                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Input
                            defaultValue={formData.a_materno}
                            onChange={handlerChange}
                            placeholder="Apellido materno"
                            icon="user doctor"
                            name="a_materno"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            defaultValue={formData.correo}
                            onChange={handlerChange}
                            placeholder="Correo electronico"
                            name="correo"
                            icon="mail"
                        />
                    </Form.Field>

                </Form.Group>
                <Form.Field>
                    <Select
                        defaultValue={formData.genero}
                        name="genero"
                        placeholder="Genero"
                        options={getOption()}
                        onChange={changeSelectGenero}
                    />
                </Form.Field>
                <Form.Field>
                </Form.Field>
            </Form>
            <Grid>
                <Grid.Column width={8}>
                    <Button
                        circular
                        fluid
                        color="red"
                        onClick={closeModal}
                    >
                        Cancelar
                    </Button>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Button
                        circular
                        fluid
                        color="orange"
                        onClick={edit ? onEdit : onSubmit}
                    >
                        {edit ? 'Editar' : 'Registrar'}
                    </Button>
                </Grid.Column>
            </Grid>

        </div>
    )
}

function initialForm(data?: Enfermero, edit?: boolean) {
    return {
        matricula: data?.matricula || '',
        password: edit ? '0' : '',
        nombre: data?.nombre || '',
        a_paterno: data?.a_paterno || '',
        a_materno: data?.a_materno || '',
        correo: data?.correo || '',
        genero: data?.genero || '',
        id_carrera: null
    }
}
function getOption() {
    return [
        { key: 'M', value: 'Masculino', text: 'Masculino' },
        { key: 'F', value: 'Femenino', text: 'Femenino' },
    ]
}
export default AddEnfermero
