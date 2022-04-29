import { toast } from 'react-toastify'
import { Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'
import * as actions from './actions'
import { UserInfo } from 'root/shared/users'

export interface UserStore {
  user: UserInfo | null
  pending: boolean
  error: actions.LoginUserResponsePayload | null
}

const initialState: UserStore = {
  user: null,
  pending: false,
  error: null
}

export const userReducer: Reducer<UserStore, ActionType<typeof actions>> = (
  state = initialState,
  action
): UserStore => {
  switch (action.type) {
    case getType(actions.loginUser.request):
      return { ...initialState, pending: true }
    case getType(actions.loginUser.success):
      return { ...initialState, user: { value: action.payload } }
    case getType(actions.loginUser.failure):
      toast(action.payload.message, { type: 'error' })
      return { ...initialState, error: action.payload }
    default:
      return state
  }
}
