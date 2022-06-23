import React, { useState, useEffect }from "react";
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './form.scss';
function RegForm() {

    const [username, setusername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [validUsername, setValidUsername] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const [inUsenameInput, setInUsenameInput] = useState(false);
    const [inEmailInput, setInEmailInput] = useState(false);
    const [inPasswordInput, setInPasswordInput] = useState(false);

    const [validForm, setValidForm] = useState(false);

    useEffect(() => {
        if (username.length === 0 || email.length === 0 || password.length === 0) {
            setValidForm(false);
        }
    }, [username, email, password])

    useEffect(() => {
        if (inUsenameInput) {
            if (username.trim().length === 0 ) {
                setUsernameError('Поле не может быть пустым')
                setValidUsername(false)
            } else {
                setUsernameError('');
                setValidUsername(true)
            }
        }
    }, [username])

    useEffect(() => {
        if (inEmailInput) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            let validEmail = re.test(email);
            if (email.length === 0) {
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
        if (validUsername && validEmail && validPassword) {
            setValidForm(true);
        } else {
            setValidForm(false);
        }
    }, [validUsername, validEmail, validPassword])

    const submitForm = (e) => {
        e.preventDefault();
        axios.post('/register', {
            username: username,
            email: email,
            password: password
        }).then(res => {
            if(res.data.error){
                setEmailError(res.data.error);
                setValidEmail(false);
            } else {
                window.location.pathname = '/auth';
            }
        })
    }

    return (
        <div className="wrapperForm">
            <h1>Регистрация</h1>
            <Form layout="vertical" style={{width: "350px"}} onSubmitCapture={(e) => {submitForm(e)}} autoComplete="off"> 
                <Form.Item label='Username' validateStatus={usernameError? 'error': 'success'} >
                    <Input name="username" onChange={(e) => {setusername(e.target.value)}} onFocus={() => {setInUsenameInput(true)}}/>
                    <p style={{color: 'red'}}>{usernameError}</p>
                </Form.Item>

                <Form.Item label="Email" validateStatus={emailError? 'error': 'success'}>
                    <Input name="email" onChange={(e) => {setEmail(e.target.value)}} onFocus={() => {setInEmailInput(true)}}
                    />
                    <p style={{color: 'red'}}>{emailError}</p>
                </Form.Item>

                <Form.Item label="Password" validateStatus={passwordError? 'error': 'success'}>
                    <Input.Password visibilityToggle={true} 
                        onChange={(e) => {setPassword(e.target.value)}} 
                        onFocus={() => {setInPasswordInput(true)}}
                        name="password"
                    />
                    <p style={{color: 'red'}}>{passwordError}</p>
                </Form.Item>

                <Button type="primary" htmlType="submit" disabled={!validForm}>Sign In</Button>

                <Link to={'/auth'}>
                    <Button type='link'>Log In</Button>
                </Link>
            </Form>
        </div>
    )
}

export default RegForm;