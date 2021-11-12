import { useState, useEffect, FunctionComponent } from 'react';
import { Button, Form, Input, Select, Icon, Grid } from 'semantic-ui-react';
import { Carreras, globalState, Alumno } from 'types';
import { useSelector, useDispatch } from 'react-redux';
import * as patch from 'redux/dispatch';
import { registerAlumno,updateInfo } from 'api';
interface IAForm {
    matricula: string,
    password: string,
    nombre: string,
    a_paterno: string,
    a_materno: string,
    correo: string,
    genero: string,
    id_carrera: string,
}
interface IAddAlumno {
    edit?: boolean,
    data?: Alumno,
    i?: number
}
const AddAlumno: FunctionComponent<IAddAlumno> = ({ edit, data,i }) => {
    const dispatch = useDispatch();
    const generoOpt = [
        { key: 'M', value: 'Masculino', text: 'Masculino' },
        { key: 'F', value: 'Femenino', text: 'Femenino' },
    ]
    const carreras: Carreras[] | null = useSelector((state: globalState) => state.carreras);
    const alumnos: any = useSelector((state: globalState) => state.alumnos)
    const [options, setoptions] = useState<any>([])
    const [show, setsSow] = useState<boolean>(false)
    const [formAlumno, setformAlumno] = useState<IAForm>(initialForm(data,edit));
    const [loading, setloading] = useState<boolean>(false)
    useEffect(() => {
        const arrayCarrerasTemp: any = [];
        carreras?.map((carrera: Carreras) => {
            arrayCarrerasTemp.push({ key: carrera.id_carrera, value: carrera.id_carrera, text: carrera.abreviatura })
            return carrera;
        })
        setoptions(arrayCarrerasTemp);
    }, [carreras])

    function onShowPassword() {
        setsSow(!show);
    }

    function closeModal() {
        dispatch(patch.setModal({
            open: false,
            title: '',
            content: null,
        }));
    }
    function changeSelectGenero(e: any, { value }: any) {
        setformAlumno({
            ...formAlumno,
            genero: value
        })
    }

    function changeSelectCarrera(e: any, { value }: any) {
        setformAlumno({
            ...formAlumno,
            id_carrera: value
        })
    }

    function handleChange(e: any) {
        const { name, value } = e.target
        setformAlumno({
            ...formAlumno,
            [name]: value
        })
    }
    function validateForm() {
        let valid = true;
        Object.values(formAlumno).forEach((val: any) => {
            if (val === '') {
                valid = false;
            }
        })
        return valid;
    }
    function handleSubmit(e: any) {
        if (!validateForm()) {
            alert('Todos los campos son obligatorios')
        } else if(formAlumno.password.length < 6){
            alert('La contraseña debe tener al menos 6 caracteres')
        }else if(formAlumno.matricula.length < 12){
            alert('La matricula debe tener al menos 11 caracteres')
        }else {
            setloading(true)
            registerAlumno(formAlumno)
                .then(res => {
                    if (res.error) {
                        alert(res.msg)
                        setloading(false);
                    } else {
                        dispatch(patch.setAlumnos(null))
                        var userAlum: Alumno = {
                            matricula: res?.matricula,
                            id_usuario: res?.id_usuario,
                            url: res?.url,
                            nombre: res?.nombre,
                            a_paterno: res?.a_paterno,
                            a_materno: res?.a_materno,
                            correo: res?.correo,
                            genero: res?.genero,
                            carrera: res?.carrera?.carrera,
                            abreviatura: res?.carrera?.abreviatura,
                            id_carrera: res?.id_carrera
                        }
                        alumnos?.push(userAlum)
                        dispatch(patch.setAlumnos(alumnos))
                        alert('Alumno registrado con exito')
                        setloading(false);
                        closeModal();
                    }

                })
                .catch(err => {
                    alert('Error al registrar alumno')
                    setloading(false)
                })
        }


    }

    function onEdit() {
        if(!validateForm()){
            alert('Todos los campos son obligatorios')
        }else{
            setloading(true)
            updateInfo(data?.id_usuario,formAlumno)
            .then((res:any)=>{
                setloading(false)
                if(res.error){
                    alert('Error al actualizar')
                }else{
                    const num:number =Number(i)
                    const alumn = alumnos;
                    dispatch(patch.setAlumnos(null))
                    var userAlum = {
                        matricula: res.data.matricula,
                        id_usuario: res.data.id_usuario,
                        url: res.data.url,
                        nombre: res.data.nombre,
                        a_paterno: res.data.a_paterno,
                        a_materno: res.data.a_materno,
                        correo: res.data.correo,
                        genero: res.data.genero,
                        carrera: res.data?.carrera?.carrera,
                        abreviatura: res.data.carrera?.abreviatura,
                        id_carrera: res.data.id_carrera
                    }
                    alumn[num] = userAlum
                    dispatch(patch.setAlumnos(alumn))
                    alert('Alumno actualizado con exito')
                    closeModal();
                }
            })
            .catch(err=>{
                setloading(false)
                console.log(err)
                alert('Error al actualizar')
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
                                icon="address card outline"
                                placeholder='Matricula'
                                name='matricula'
                                onChange={handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                icon={<Icon name={show ? "lock open" : "lock"} link onClick={onShowPassword} />}
                                type={show ? 'text' : 'password'}
                                placeholder='Password'
                                name='password'
                                onChange={handleChange}
                            />
                        </Form.Field>
                    </>
                )}
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Input
                            defaultValue={data?.nombre}
                            icon="user"
                            placeholder='Nombre'
                            name="nombre"
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            defaultValue={data?.a_paterno}
                            icon="user"
                            placeholder='Apellido paterno'
                            name="a_paterno"
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Input
                            defaultValue={data?.a_materno}
                            icon="user"
                            placeholder='Apellido Materno'
                            name="a_materno"
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            defaultValue={data?.correo}
                            icon="mail"
                            type='email'
                            name="correo"
                            placeholder='Correo'
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Select
                            defaultValue={data?.genero}
                            name="genero"
                            id="genero"
                            placeholder='Seleccionar genero'
                            options={generoOpt}
                            onChange={changeSelectGenero}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Select
                            defaultValue={data?.abreviatura}
                            placeholder='Seleccionar carrera'
                            options={options}
                            onChange={changeSelectCarrera}
                        />
                    </Form.Field>
                </Form.Group>
            </Form>
            <Grid>
                <Grid.Column width={8}>
                    <Button
                        fluid
                        circular
                        color="orange"
                        onClick={closeModal}
                    >
                        Cancelar
                    </Button>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Button
                        fluid
                        circular
                        color="green"
                        onClick={edit ? onEdit : handleSubmit}
                    >
                        {edit ? 'Actualizar' : 'Registrar'}
                    </Button>
                </Grid.Column>
            </Grid>

        </div>
    )
}
function initialForm(data?: Alumno,edit?:boolean) {
    return {
        matricula: data?.matricula || '',
        password: edit?'0':'',
        nombre: data?.nombre || '',
        a_paterno: data?.a_paterno || '',
        a_materno: data?.a_materno || '',
        correo: data?.correo || '',
        genero: data?.genero || '',
        id_carrera: data?.id_carrera || '',
    }
}
export default AddAlumno;