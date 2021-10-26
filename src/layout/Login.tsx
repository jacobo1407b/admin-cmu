import { useState, useEffect } from 'react';
import { login } from 'api';
import * as act from 'redux/dispatch'
import { useDispatch } from 'react-redux';

type formLogin = {
    matricula: string,
    password: string
}

function Login(): JSX.Element {

    const [formData, setformData] = useState<formLogin>({ matricula: '', password: '' });
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch();

    function onChange(e: any) {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }

    function onSubmit(e: any) {
        e.preventDefault();
        if (formData.matricula === '' || formData.password === '') {
            alert('Preencha todos os campos');
        } else {
            setLoading(true)
            login(formData.matricula, formData.password).then(res => {
                localStorage.setItem('token', res.token);
                dispatch(act.setUser(res.user));
                dispatch(act.setRole(res.user.role));
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
        }
    }
    return (
        <div>

            <input
                onChange={onChange}
                name="matricula"

                type="text"
                placeholder="Tu matricula"

            />

            <input
                onChange={onChange}
                name="password"
                type="password"
                placeholder="Tu password"

            />
            <button
                onClick={onSubmit}

            >
                Ingresar
            </button>


        </div>
    );
}

export default Login;
