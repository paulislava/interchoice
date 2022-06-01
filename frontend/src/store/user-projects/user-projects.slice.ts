import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectsStore } from '../projects/projects.slice'
import { ProjectOverview } from 'root/shared/projects'

const initialState: ProjectsStore = {
  value: [],
  pending: false,
  error: null
}

const projectsSlice = createSlice({
  name: 'userProjectsSelector',
  initialState,
  reducers: {
    fetch(state: ProjectsStore) {
      state.pending = true
    },
    fetchSuccess(state: ProjectsStore, action: PayloadAction<ProjectOverview[]>) {
      state.pending = false
      state.value = action.payload
    },
    fetchFailure(state: ProjectsStore, action: PayloadAction<string | null>) {
      state.pending = false
      state.error = action.payload
    }
  }
})

export const { reducer: userProjectsReducer, actions: userProjectsActions } = projectsSlice
