import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as patch from 'redux/dispatch';
import { User, globalState } from 'types';
import { Button } from 'semantic-ui-react';
import {updateMatricula,updatePassword} from 'api';
import useLogout from 'hooks/logout';

const UpdateM = () => {
    const dispatch = useDispatch();
    const {logout} = useLogout()

    const user: User = useSelector((state: globalState) => state.user);
    const [matricula, setMatricula] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [loadMatricula, setloadMatricula] = useState<boolean>(false);
    const [loadPassword, setloadPassword] = useState<boolean>(false)

    function onClse() {
        dispatch(patch.setModal({
            open: false,
            title: "",
            content: null
        }))
    }

    function onMatricula(e: any) {
        setMatricula(e.target.value)
    }

    function onUpdatePassword(){
        if(password === ""){
            alert('Completa el campo de contraseña')
        }else if(password.length < 6){
            alert('La contraseña debe tener al menos 6 caracteres')
        } else{
            setloadPassword(true)
            updatePassword(user.id_usuario,password)
            .then(res=>{
                setloadPassword(false)
                if(res.error){
                    alert(res.msg)
                }else{
                    alert('Contraseña actualizada. Es necesario iniciar sesión');
                    logout()
                    dispatch(patch.setModal({
                        open:false,
                        title:"",
                        content:null
                    }))
                }
            })
            .catch(err=>{
                setloadPassword(false)
                console.log(err)
            })
        }
    };
    function onUpdateMatricula(){
        if(!matricula){
            alert('Completa el campo de matricula')
        }else if(matricula === user.matricula){
            alert('Escoge otra matricula')
        }else if(matricula.length < 11 || matricula.length > 11){
            alert('La matricula debe tener 11 caracteres')
        }else{
            setloadMatricula(true);
            updateMatricula(user.id_usuario,matricula)
            .then(res=>{
                setloadMatricula(false);
                if(res.msg === "Esta matricula ya existe"){
                    alert(res.msg);
                }else{
                    var newuser={
                        ...user,
                        matricula:matricula
                    }
                    dispatch(patch.setUser(newuser))
                    alert(res.msg);
                }
            })
            .catch(err=>{
                setloadMatricula(false);
                alert('Error del servidor')
                console.log(err)
            })
        }
    }
    function onPassword(e: any) {
        setPassword(e.target.value)
    }
    return (
        <div>
            <div className="ui action left icon input fluid">
                <input type="text" placeholder={user?.matricula} onChange={onMatricula}/>
                <i aria-hidden="true" className="user icon"></i>
                
                <button className={`ui orange  icon button ${loadMatricula && 'loading'}`} onClick={onUpdateMatricula}>
                    <i aria-hidden="true" className="sync icon"></i>
                </button>
            </div>
            <br />
            <div className="ui action left icon input fluid">
                <input type="password" placeholder='****************' onChange={onPassword}/>
                <i aria-hidden="true" className="key icon"></i>
                <button className={`ui orange  icon button ${loadPassword && 'loading'}`} onClick={onUpdatePassword}>
                    <i aria-hidden="true" className="sync icon"></i>
                </button>
            </div>
            <br />
            <Button
                color="red"
                fluid
                circular
                onClick={onClse}
            >
                Cancelar
            </Button>
        </div>
    )
}

export default UpdateM
