import { createAction, createAsyncAction } from 'typesafe-actions'
import { LoginRequestPayload, LoginResponse } from 'root/shared/users'

export interface LoginUserResponsePayload extends Partial<LoginResponse> {
  error?: any
}

export const loginUser = createAsyncAction(
  'LOGIN_USER/REQUEST',
  'LOGIN_USER/SUCCESS',
  'LOGIN_USER/FAILURE'
)<LoginRequestPayload, string, LoginUserResponsePayload>()

export const unlogin = createAction('UNLOGIN_USER')

export const fetchUsers = createAsyncAction(
  'FETCH_USERS/REQUEST',
  'FETCH_USERS/SUCCESS',
  'FETCH_USERS/FAILURE'
)<undefined, any, string>()

export const updateUser = createAsyncAction(
  'UPDATE_USER/REQUEST',
  'UPDATE_USER/SUCCESS',
  'UPDATE_USER/FAILURE'
)<any, any, void>()

export const createUser = createAsyncAction(
  'CREATE_USER/REQUEST',
  'CREATE_USER/SUCCESS',
  'CREATE_USER/FAILURE'
)<any, any, any>()

export const deleteUser = createAsyncAction(
  'DELETE_USER/REQUEST',
  'DELETE_USER/SUCCESS',
  'DELETE_USER/FAILURE'
)<string, string, string>()
