import { ActionType, getType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from './project.actions'
import { apiFetch } from 'root/utils/api-fetch'
import { apiRoutes } from 'root/constants'
import { convertModelToFormData } from 'root/utils/form-data'
import { ProjectFull } from 'root/shared/projects'
import { ApiResponse } from 'root/shared/api'

function* createProject(action: ActionType<typeof actions.createProject.request>): SagaIterator {
  try {
    const formData = convertModelToFormData(action.payload)
    const response = (yield call(apiFetch, apiRoutes.createProject(), {
      method: 'POST',
      body: formData
    })) as ApiResponse
    const projectId = response.value ?? ''

    yield put(actions.createProject.success(projectId))
    yield put(actions.getProject.request(projectId))
  } catch (e) {
    yield put(actions.createProject.failure())
    console.error(e)
  }
}

function* getProject(action: ActionType<typeof actions.getProject.request>): SagaIterator {
  try {
    const project = (yield call(apiFetch, apiRoutes.project(action.payload))) as ProjectFull
    yield put(actions.getProject.success(project))
  } catch (e) {
    yield put(actions.getProject.failure())
    console.error(e)
  }
}

function* addScene(action: ActionType<typeof actions.addScene.request>): SagaIterator {
  try {
    const sceneId =
      (
        (yield call(apiFetch, apiRoutes.projectScenes(action.payload), {
          method: 'POST'
        })) as ApiResponse
      ).value ?? ''
    yield put(actions.addScene.success(sceneId))
  } catch (e) {
    yield put(actions.addScene.failure())
    console.error(e)
  }
}

function* updateSceneCoordinates(
  action: ActionType<typeof actions.updateSceneCoordinates.request>
): SagaIterator {
  try {
    yield call(apiFetch, apiRoutes.sceneCoordinates(action.payload.id), {
      method: 'PUT',
      body: JSON.stringify(action.payload)
    })

    yield put(actions.updateSceneCoordinates.success())
  } catch (e) {
    console.error(e)
    yield put(actions.updateSceneCoordinates.failure())
  }
}

function* deleteScene(action: ActionType<typeof actions.deleteScene.request>): SagaIterator {
  try {
    yield call(apiFetch, apiRoutes.scene(action.payload), {
      method: 'DELETE'
    })

    yield put(actions.deleteScene.success())
  } catch (e) {
    console.error(e)
    yield put(actions.deleteScene.failure())
  }
}

export default function* projectSaga(): SagaIterator {
  yield takeLatest(getType(actions.createProject.request), createProject)
  yield takeLatest(getType(actions.getProject.request), getProject)

  yield takeLatest(getType(actions.addScene.request), addScene)
  yield takeLatest(getType(actions.updateSceneCoordinates.request), updateSceneCoordinates)
  yield takeLatest(getType(actions.deleteScene.request), deleteScene)
}
