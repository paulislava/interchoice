import * as React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@material-ui/core'
import { useAppSelector } from 'root/store/application.store'
import { loginUser } from 'root/store/user/user.actions'
import { appRoutes } from 'root/appRoutes'
import { FormInput } from 'components/common/fields/form-input/FormInput'

export interface StateType {
  email: string
  password: string
}

export const AuthPage: React.FC = () => {
  const [form, setForm] = useState<StateType>({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()

  const pending = useAppSelector(state => state.user.loginPending)

  const user = useAppSelector(state => state.user.value)

  const history = useHistory()

  React.useEffect(() => {
    if (user) history.push(appRoutes.create())
  }, [user])

  return (
    <div className='container'>
      <form
        onSubmit={e => {
          e.preventDefault()
          dispatch(loginUser.request(form))
        }}
      >
        <div className='fields'>
          <FormInput
            placeholder='Введите email'
            type='email'
            name='email'
            value={form.email}
            onValueChange={value => setForm({ ...form, email: value })}
            label='E-mail'
          />

          <FormInput
            placeholder='Введите пароль'
            type='password'
            name='password'
            value={form.password}
            onValueChange={value => setForm({ ...form, password: value })}
            label='Пароль'
          />
        </div>
        <Button disabled={pending} type='submit'>
          Войти
        </Button>

        <NavLink to={appRoutes.register()}>Нет аккаунта</NavLink>
      </form>
    </div>
  )
}
