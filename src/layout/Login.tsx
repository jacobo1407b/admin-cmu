import { useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { login } from 'api';
import { Form, Input, Button, Grid, Icon } from 'semantic-ui-react'
import * as act from 'redux/dispatch'
import { useDispatch } from 'react-redux';

type formLogin = {
    matricula: string,
    password: string
}

function Login(): JSX.Element {

    const [formData, setformData] = useState<formLogin>({ matricula: '', password: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false)
    const dispatch = useDispatch();

    function onChange(e: any) {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }
    function onShow() {
        setShow(!show)
    }
    function onSubmit(e: any) {
        e.preventDefault();
        if (!formData.matricula || !formData.password) {
            alert('Preencha todos os campos');
        } else {
            setLoading(true)
            login(formData.matricula, formData.password).then(res => {
                if (res.error) {
                    alert(res.error)
                    setLoading(false)
                } else {
                    localStorage.setItem('token', res.token);
                    dispatch(act.setUser(res.user));
                    dispatch(act.setRole(res.user.role));
                    setLoading(false)
                }
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
        }
    }
    return (
        <div>
            <Grid stackable centered>
                <Grid.Column width={8}>
                    <Card>
                        <CardContent>
                            <Form onChange={onChange} onSubmit={onSubmit} loading={loading}>
                                <Grid.Row>
                                    <Form.Field
                                        label='Matricula'
                                    />
                                    <Input
                                        name='matricula'
                                        placeholder='Tu Matrícula'
                                        fluid
                                        icon="user"
                                    />
                                </Grid.Row>
                                <br />
                                <Grid.Row>
                                    <Form.Field
                                        label='Password'
                                    />
                                    <Input
                                        style={{ borderRadius: '50px' }}
                                        name="password"
                                        placeholder='Tu password'
                                        fluid
                                        type={show ? 'text' : 'password'}
                                        icon={
                                            show ? (
                                                <Icon name='eye' link onClick={onShow} />
                                            ) : (
                                                <Icon name='eye slash' link onClick={onShow} />
                                            )
                                        }
                                    />
                                </Grid.Row>

                                <br />
                                <Button color='orange' fluid circular>Ingreso</Button>
                            </Form>
                        </CardContent>
                    </Card>

                </Grid.Column>
            </Grid>
        </div>
    );
}

export default Login;
