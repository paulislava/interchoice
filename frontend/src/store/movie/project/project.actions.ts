import { createAsyncAction } from 'typesafe-actions'
import { ProjectDraft, ProjectFull, ProjectScene } from 'root/shared/projects'

export const createProject = createAsyncAction(
  'CREATE_PROJECT/REQUEST',
  'CREATE_PROJECT/SUCCESS',
  'CREATE_PROJECT/FAILURE'
)<ProjectDraft, string, void>()

export const getProject = createAsyncAction(
  'GET_PROJECT/REQUEST',
  'GET_PROJECT/SUCCESS',
  'GET_PROJECT/FAILURE'
)<string, ProjectFull, void>()

export const addScene = createAsyncAction(
  'ADD_SCENE/REQUEST',
  'ADD_SCENE/SUCCESS',
  'ADD_SCENE/FAILURE'
)<string, string, void>()

export interface UpdateSceneCoordinatesPayload {
  id: string
  x: number
  y: number
}

export const updateSceneCoordinates = createAsyncAction(
  'UPDATE_SCENE_COORDINATES/REQUEST',
  'UPDATE_SCENE_COORDINATES/SUCCESS',
  'UPDATE_SCENE_COORDINATES/FAILURE'
)<UpdateSceneCoordinatesPayload, void, void>()

export const deleteScene = createAsyncAction(
  'DELETE_SCENE/REQUEST',
  'DELETE_SCENE/SUCCESS',
  'DELETE_SCENE/FAILURE'
)<string, void, void>()
