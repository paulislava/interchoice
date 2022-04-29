import '../AuthPage.css'

import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'
import { appRoutes } from 'root/appRoutes'

export const RegPage = () => {
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

  const registerHandler = async () => {
    const data = await request('/Register', 'POST', { ...form })
    message(data.message)
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
                  onClick={registerHandler}
                  disabled={loading}
                  style={{ background: '#5695b094', marginRight: 10 }}
                >
                  {' '}
                  Регистрация
                </button>
                <NavLink to={appRoutes.login()}>Войти</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
