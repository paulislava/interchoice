import { ActionType, getType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { userProjectsActions } from './user-projects.slice'
import { jsonFetch } from 'root/utils/api-fetch'
import { apiRoutes } from 'root/constants'
import { ProjectOverview } from 'root/shared/projects'

function* fetchUserProjects(_action: ActionType<typeof userProjectsActions.fetch>): SagaIterator {
  try {
    const projects = (yield call(jsonFetch, apiRoutes.userProjects())) as ProjectOverview[]

    yield put(userProjectsActions.fetchSuccess(projects))
  } catch (e) {
    yield put(userProjectsActions.fetchFailure(e.message ?? null))

    console.error(e)
  }
}

export default function* userProjectsSaga(): SagaIterator {
  yield takeLatest(getType(userProjectsActions.fetch), fetchUserProjects)
}
