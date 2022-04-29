import { LoginRequestPayload } from 'root/shared/users'
import { PageInfoProps } from 'root/store/page/page.types'
import { LoginUserResponsePayload } from 'root/store/user/actions'

export type OwnProps = PageInfoProps

export interface StateProps {
  error: LoginUserResponsePayload | null
  pending: boolean
}

export interface DispatchProps {
  login(payload: LoginRequestPayload): void
}

export type ComponentPropsType = OwnProps & StateProps & DispatchProps

export interface StateType {
  email: string
  password: string
}
