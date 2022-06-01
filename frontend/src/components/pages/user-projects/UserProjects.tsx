import * as React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './styles.styl'
import { Loader } from 'components/Loader'

import { useAppSelector } from 'root/store/application.store'
import { userProjectsActions } from 'root/store/user-projects/user-projects.slice'
import { appRoutes } from 'root/appRoutes'
import { GradientButton } from 'components/common/buttons/gradient-button/GradientButton'

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
    <div className='container'>
      <div className={styles.moviesGrid}>
        {projects.map(project => (
          <div key={project.projectId} className={styles.movie}>
            <div className={styles.moviePreview}>
              <img src={project.previewUrl} />
            </div>
            <div className={styles.movieInfo}>
              <NavLink
                className={styles.movieLink}
                target='_blank'
                to={appRoutes.movie(project.projectId)}
              >
                <h2 className={styles.movieTitle}>{project.name}</h2>
              </NavLink>
              <div className={styles.shortDescription}>{project.shortDescription}</div>
              <div className={styles.movieActions}>
                <GradientButton target='_blank' href={appRoutes.scenesEditor(project.projectId)}>
                  Редактор сцен
                </GradientButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
