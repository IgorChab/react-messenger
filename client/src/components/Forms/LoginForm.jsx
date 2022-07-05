import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import formStyles from './form.module.css';
import { useContext } from 'react';
import { Context } from '../..';

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const [inEmailInput, setInEmailInput] = useState(false);
    const [inPasswordInput, setInPasswordInput] = useState(false);

    const [validForm, setValidForm] = useState(false);

    useEffect(() => {
        if (email.length === 0 || password.length === 0) {
            setValidForm(false);
        }
    }, [email, password])

    useEffect(() => {
        if (inEmailInput) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            let validEmail = re.test(email);
            if (email.length == 0) {
                setEmailError('Поле не может быть пустым')
                setValidEmail(false)
            } else if (!validEmail) {
                setEmailError('Некорректный email');
                setValidEmail(false)
            } else {
                setEmailError('');
                setValidEmail(true)
            }
        }
    }, [email])

    useEffect(() => {
        if (inPasswordInput) {
            let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            let validPass = re.test(password);
            if (!validPass) {
                setPasswordError('Пароль должен содержать от 6 до 16 символов и включать цифры и символы')
                setValidPassword(false);
            } else {
                setPasswordError('');
                setValidPassword(true);
            }
        }
    }, [password])

    useEffect(() => {
        if (validEmail && validPassword) {
            setValidForm(true);
        } else {
            setValidForm(false);
        }
    }, [validEmail, validPassword])



    const {store} = useContext(Context);

  return (
    <div className={formStyles.container}>
        <div className={formStyles.wrapperForm}>
            <h1>Авторизация</h1>
            <Form layout="vertical" style={{width: "350px"}} >
                <Form.Item label="Email" style={{marginBottom: '10px'}} validateStatus={emailError? 'error': 'success'}>
                    <Input onChange={(e) => {setEmail(e.target.value)}} onFocus={() => {setInEmailInput(true)}}/>
                    <p style={{color: 'red'}}>{emailError}</p>
                </Form.Item>
                <Form.Item label="Password" validateStatus={passwordError? 'error': 'success'}>
                    <Input.Password visibilityToggle={true}
                        onChange={(e) => {setPassword(e.target.value)}}
                        onFocus={() => {setInPasswordInput(true)}}
                    />
                    <p style={{color: 'red'}}>{passwordError}</p>
                </Form.Item>
                
                <Button type="primary" htmlType='submit' disabled={!validForm} onClick={() => {store.login(email, password)}}>Log In</Button>
                
                <Link to={'/'}>
                    <Button type='link'>Sign In</Button>
                </Link>
            </Form>
        </div>
    </div>
  )
}

export default LoginForm;