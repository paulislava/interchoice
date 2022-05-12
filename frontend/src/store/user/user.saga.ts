import { ActionType, getType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { call, Effect, put, takeLatest } from 'redux-saga/effects'
import * as actions from './user.actions'
import { apiCall } from 'root/utils/api-call'
import { apiFetch, FetchError } from 'root/utils/api-fetch'
import { apiRoutes } from 'root/constants'
import { AuthResponse, UserInfo } from 'root/shared/users'

function* loginUser(action: ActionType<typeof actions.loginUser.request>): SagaIterator {
  try {
    const login = (yield call(apiFetch, apiRoutes.login(), {
      method: 'POST',
      body: JSON.stringify(action.payload)
    })) as AuthResponse

    yield put(actions.currentUser.request())
    yield put(actions.loginUser.success(login.value ?? ''))
  } catch (e) {
    const data: actions.LoginUserResponsePayload =
      e instanceof FetchError
        ? (e.responseData as actions.LoginUserResponsePayload)
        : { error: e.message }
    yield put(actions.loginUser.failure(data))
    console.error(e)
  }
}

function* registerUser(
  action: ActionType<typeof actions.registerUser.request>
): Generator<Effect | Generator, void, AuthResponse> {
  try {
    const register = yield apiCall(apiFetch, apiRoutes.register(), {
      method: 'POST',
      body: JSON.stringify(action.payload)
    })
    if (register.isSuccess) put(actions.registerUser.success(register.value ?? ''))
    else yield put(actions.registerUser.failure(register))
  } catch (e) {
    put(actions.registerUser.failure({ error: String(e.message) }))
  }
}

function* currentUser(
  _action: ActionType<typeof actions.currentUser.request>
): Generator<Effect | Generator, void, UserInfo> {
  try {
    const currentUser = yield apiCall(apiFetch, apiRoutes.currentUser(), {
      method: 'GET'
    })

    yield put(actions.currentUser.success(currentUser))
  } catch (e) {
    yield put(actions.currentUser.failure())
  }
}

export default function* userSaga(): SagaIterator {
  yield takeLatest(getType(actions.loginUser.request), loginUser)
  yield takeLatest(getType(actions.registerUser.request), registerUser)
  yield takeLatest(getType(actions.currentUser.request), currentUser)
}
