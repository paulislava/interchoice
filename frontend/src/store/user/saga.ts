import { ActionType, getType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { Effect, put, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'
import { apiCall } from 'root/utils/api-call'
import { apiFetch } from 'root/utils/api-fetch'
import { apiRoutes } from 'root/constants'
import { LoginResponse } from 'root/shared/users'

function* loginUser(
  action: ActionType<typeof actions.loginUser.request>
): Generator<Effect | Generator, void, LoginResponse> {
  try {
    const login = yield apiCall(apiFetch, apiRoutes.login(), {
      method: 'POST',
      body: JSON.stringify(action.payload)
    })
    if (login.isSuccess) put(actions.loginUser.success(login.value ?? ''))
    else yield put(actions.loginUser.failure(login))
  } catch (e) {
    put(actions.loginUser.failure({ error: e.message }))
  }
}

export default function* userSaga(): SagaIterator {
  yield takeLatest(getType(actions.loginUser.request), loginUser)
}
