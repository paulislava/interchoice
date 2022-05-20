import * as React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { Button } from '@material-ui/core'
import { useEffect } from 'react'
import { appRoutes } from 'root/appRoutes'
import { registerUser } from 'root/store/user/user.actions'
import { useAppSelector } from 'root/store/application.store'
import { registerFormDataToResponsePayload } from 'root/store/user/user.serializer'
import { RegisterFormData } from 'root/store/user/user.types'
import { FormInput } from 'components/common/fields/form-input/FormInput'
import { GradientButton } from 'components/common/buttons/gradient-button/GradientButton'

export const RegPage = (): JSX.Element => {
  const pending = useAppSelector(state => state.user.registerPending)
  const success = useAppSelector(state => state.user.registerSuccess)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (success) {
      history.push(appRoutes.login())
    }
  }, [success])

  return (
    <Form<RegisterFormData>
      onSubmit={formData => {
        dispatch(registerUser.request(registerFormDataToResponsePayload(formData)))
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name='firstName'>
            {props => <FormInput placeholder='Введите имя' label='Имя' {...props.input} />}
          </Field>

          <Field name='lastName'>
            {props => <FormInput placeholder='Введите фамилию' label='Фамилия' {...props.input} />}
          </Field>

          <Field name='birthDate'>
            {props => (
              <FormInput
                placeholder='Введите дату рождения'
                label='Дата рождения'
                {...props.input}
              />
            )}
          </Field>

          <Field name='country'>
            {props => (
              <FormInput placeholder='Введите название страны' label='Страна' {...props.input} />
            )}
          </Field>

          <Field name='email'>
            {props => (
              <FormInput
                placeholder='Введите E-mail'
                label='E-mail'
                type='email'
                {...props.input}
              />
            )}
          </Field>

          <Field name='password'>
            {props => (
              <FormInput
                placeholder='Введите пароль'
                label='Пароль'
                type='password'
                {...props.input}
              />
            )}
          </Field>

          <Field name='confirmPassword'>
            {props => (
              <FormInput
                placeholder='Повторите пароль'
                label='Повторите пароль'
                type='password'
                {...props.input}
              />
            )}
          </Field>
          <GradientButton disabled={pending} type='submit'>
            Регистрация
          </GradientButton>
          <NavLink to={appRoutes.login()}>Войти</NavLink>
        </form>
      )}
    </Form>
  )
}
