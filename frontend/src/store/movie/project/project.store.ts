import { Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'
import * as actions from './project.actions'
import { ProjectFull } from 'root/shared/projects'

export interface ProjectStore {
  savePending: boolean
  getPending: boolean
  error: string | null
  value: ProjectFull | null
}

const initialState: ProjectStore = {
  savePending: false,
  getPending: false,
  error: null,
  value: null
}

export const projectReducer: Reducer<ProjectStore, ActionType<typeof actions>> = (
  state = initialState,
  action
): ProjectStore => {
  switch (action.type) {
    case getType(actions.createProject.request):
      return { ...initialState, savePending: true }
    case getType(actions.createProject.success):
      return { ...state, savePending: false }
    case getType(actions.createProject.failure):
      return { ...state, savePending: false }

    case getType(actions.getProject.request):
      return { ...state, getPending: true }
    case getType(actions.getProject.success):
      return { ...state, getPending: false, value: action.payload }
    case getType(actions.getProject.failure):
      return { ...state, getPending: false }

    case getType(actions.addScene.success):
      if (!state.value) return state
      return {
        ...state,
        value: {
          ...state.value,
          nodesId: [
            ...state.value.nodesId,
            {
              id: action.payload
            }
          ]
        }
      }

    default:
      return state
  }
}
