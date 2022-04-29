import * as React from 'react'
import { connect, MapDispatchToProps } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ComponentPropsType, DispatchProps, OwnProps, StateProps, StateType } from './types'
import { LoginRequestPayload } from 'root/shared/users'
import { ApplicationStore } from 'root/store/application.store'
import { loginUser } from 'root/store/user/actions'
import { appRoutes } from 'root/appRoutes'
import withPageInfo from 'root/store/page/pageinfo'

class AuthPageComponent extends React.Component<ComponentPropsType, StateType> {
  constructor(props: ComponentPropsType) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  loginHandler(): void {
    this.props.login({
      email: this.state.email,
      passwordHash: this.state.password
    })
  }

  componentDidMount(): void {
    this.props.setPageInfo({
      title: 'Вход'
    })
  }

  render(): React.ReactNode {
    const { error, pending } = this.props

    return (
      <div id='container'>
        <div id='AuthContainer'>
          <div id='row' className='row'>
            <div className='col s6 offset-l3'>
              <div className='card' style={{ background: '#945d82' }}>
                <div className='card-content white-text'>
                  <span className='card-title'>Авторизация</span>
                  {error?.statusCode && <div>{error.message}</div>}
                  <div>
                    <div className='input-field'>
                      <input
                        placeholder='Введите email'
                        id='email'
                        type='text'
                        name='email'
                        className='yellow-input'
                        value={this.state.email}
                        onChange={field => this.setState({ email: field.target.value })}
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
                        value={this.state.password}
                        onChange={field => this.setState({ password: field.target.value })}
                      />
                      <label htmlFor='first_name'>Пароль</label>
                    </div>
                  </div>
                </div>
                <div className='card-action'>
                  <button
                    className='btn'
                    style={{ marginRight: 10, background: '#56afb0' }}
                    disabled={pending}
                    onClick={this.loginHandler.bind(this)}
                  >
                    Войти
                  </button>

                  <NavLink to={appRoutes.register()}>Нет акаунта</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ApplicationStore): StateProps => ({
  error: state.user.error,
  pending: state.user.pending
})

const mapDispatchToProps: MapDispatchToProps<Partial<DispatchProps>, OwnProps> = dispatch => ({
  login(payload: LoginRequestPayload) {
    dispatch(loginUser.request(payload))
  }
})

export const AuthPage = withPageInfo(
  connect(mapStateToProps, mapDispatchToProps)(AuthPageComponent)
)
