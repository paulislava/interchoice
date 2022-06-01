import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Loader } from 'components/Loader'

import { useAppSelector } from 'root/store/application.store'
import { userProjectsActions } from 'root/store/projects/projects.slice'

export const UserProjectsPage: React.FC = () => {
  const projects = useAppSelector(state => state.userProjects.value)
  const pending = useAppSelector(state => state.userProjects.pending)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(userProjectsActions.fetch())
  }, [])

  if (pending) {
    return <Loader />
  }

  return (
    <>
      {projects.map(project => (
        <div key={project.projectId}>{project.name}</div>
      ))}
    </>
  )
}
