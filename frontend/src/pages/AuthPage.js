import './AuthPage.css'

import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        const data = await request('/Login', 'POST', {
            email: form.email,
            passwordHash: form.password
        })
        auth.login(data.token, data.userId)
    }

    document.body.style = 'background: #23353d;'

    return (
        <div id='container'>
            <div id='AuthContainer'>
                <div id='row' className='row'>
                    <div className='col s6 offset-l3'>
                        <center>
                            <h4 style={{ color: '#FFFFFF' }}>Онлайн кинотеатр</h4>
                            <h2 style={{ color: '#FFFFFF' }}>iCinema</h2>
                        </center>
                        <div className='card' style={{ background: '#945d82' }}>
                            <div className='card-content white-text'>
                                <span className='card-title'>Авторизация</span>

                                <div>
                                    <div className='input-field'>
                                        <input
                                            placeholder='Введите email'
                                            id='email'
                                            type='text'
                                            name='email'
                                            className='yellow-input'
                                            value={form.email}
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor='first_name'>Email</label>
                                    </div>

                                    <div className='input-field'>
                                        <input
                                            placeholder='Введите пароль'
                                            id='password'
                                            type='password'
                                            name='password'
                                            className='yellow-input'
                                            value={form.password}
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor='first_name'>Пароль</label>
                                    </div>
                                </div>
                            </div>
                            <div className='card-action'>
                                <button
                                    className='btn'
                                    style={{ marginRight: 10, background: '#56afb0' }}
                                    disabled={loading}
                                    onClick={loginHandler}
                                >
                                    Войти
                                </button>

                                <NavLink to='/register'>Нет акаунта</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
