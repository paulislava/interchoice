import { Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'
import * as actions from './page.actions'

export interface PageInfo {
  title: string | null
}

export interface PageStore {
  info: PageInfo
}

const initialState: PageStore = {
  info: {
    title: null
  }
}

export const pageReducer: Reducer<PageStore, ActionType<typeof actions>> = (
  state = initialState,
  action
): PageStore => {
  switch (action.type) {
    case getType(actions.setPageInfo):
      if (action.payload.title) {
        document.title = action.payload.title
      }
      return { ...initialState, info: action.payload }
    default:
      return state
  }
}
