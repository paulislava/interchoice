import { Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'
import { toast } from 'react-toastify'
import { concat } from 'lodash'
import * as actions from './project.actions'
import { ProjectFull, ProjectScene } from 'root/shared/projects'

export interface ProjectStore {
  savePending: boolean
  getPending: boolean
  addScenePending: boolean
  error: string | null
  value: ProjectFull | null
  editedScene: ProjectScene | null
  uploadVideoPending: boolean
}

const initialState: ProjectStore = {
  savePending: false,
  addScenePending: false,
  getPending: false,
  error: null,
  value: null,
  editedScene: null,
  uploadVideoPending: false
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

    case getType(actions.addScene.request):
      return { ...state, addScenePending: true }
    case getType(actions.addScene.success):
      if (!state.value) return state
      return {
        ...state,
        addScenePending: false,
        value: {
          ...state.value,
          nodes: [
            ...state.value.nodes,
            {
              id: action.payload
            }
          ]
        }
      }
    case getType(actions.addScene.failure):
      return { ...state, addScenePending: false }

    case getType(actions.updateScene.request):
      return { ...state, savePending: true }

    case getType(actions.updateScene.success):
      if (!state.value) return state

      return {
        ...state,
        value: {
          ...state.value,
          nodes: state.value.nodes.map(node => {
            if (node.id != action.payload.id) return node
            return { ...node, ...action.payload }
          })
        },
        savePending: false
      }

    case getType(actions.updateScene.failure):
      toast('Произошла ошибка при сохранении сцены', { type: 'error' })
      return { ...state, savePending: false }

    case getType(actions.setEditedScene.request):
      return { ...state, editedScene: action.payload }

    case getType(actions.deleteScene.request):
      return {
        ...state,
        editedScene: state.editedScene?.id === action.payload ? null : state.editedScene,
        value: state.value && {
          ...state.value,
          nodes: state.value.nodes.filter(node => node.id != action.payload)
        }
      }

    case getType(actions.updateSceneCoordinates.request):
      return {
        ...state,
        value: state.value && {
          ...state.value,
          nodes: state.value.nodes.map(node => {
            if (node.id != action.payload.id) return node
            return { ...node, ...action.payload }
          })
        }
      }

    case getType(actions.addConnection.request):
      return {
        ...state,
        value: state.value && {
          ...state.value,
          nodes: state.value.nodes.map(node => {
            if (node.id === action.payload.fromId)
              return {
                ...node,
                childGuids: concat(node.childGuids ?? [], action.payload.toId)
              }

            if (node.id === action.payload.toId)
              return { ...node, parentGuids: concat(node.parentGuids ?? [], action.payload.fromId) }

            return node
          })
        }
      }

    case getType(actions.deleteConnection.request):
      return {
        ...state,
        value: state.value && {
          ...state.value,
          nodes: state.value.nodes.map(node => {
            if (node.id === action.payload.fromId)
              return {
                ...node,
                childGuids: node.childGuids?.filter(id => id != action.payload.toId)
              }

            if (node.id === action.payload.toId)
              return {
                ...node,
                parentGuids: node.parentGuids?.filter(id => id != action.payload.fromId)
              }

            return node
          })
        }
      }

    case getType(actions.uploadSceneVideo.request):
      return {
        ...state,
        uploadVideoPending: true
      }

    case getType(actions.uploadSceneVideo.success):
      return {
        ...state,
        uploadVideoPending: false,
        editedScene: state.editedScene && {
          ...state.editedScene,
          videoUrl: action.payload.videoUrl
        },
        value: state.value && {
          ...state.value,
          nodes: state.value.nodes.map(node => {
            if (node.id != action.payload.sceneId) return node
            return { ...node, videoUrl: action.payload.videoUrl }
          })
        }
      }

    case getType(actions.uploadSceneVideo.failure):
      toast('Произошла ошибка при загрузке видео.<br>Повторите попытку позже', { type: 'error' })
      return {
        ...state,
        uploadVideoPending: false
      }

    default:
      return state
  }
}
