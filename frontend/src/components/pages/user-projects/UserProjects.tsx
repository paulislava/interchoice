import * as React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import styles from './styles.styl'
import { Loader } from 'components/Loader'
import { useAppSelector } from 'root/store/application.store'
import { userProjectsActions } from 'root/store/user-projects/user-projects.slice'
import { appRoutes } from 'root/appRoutes'
import { GradientButton } from 'components/common/buttons/gradient-button/GradientButton'

export const UserProjectsPage: React.FC = () => {
  const projects = useAppSelector(state => state.userProjects.value)
  const pending = useAppSelector(state => state.userProjects.pending)

  const [menuOpened, setMenuOpened] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const dispatch = useDispatch()

  const history = useHistory()

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
              <div
                className={styles.menuIcon}
                onClick={event => {
                  setAnchorEl(menuOpened ? null : event.currentTarget)
                  setMenuOpened(!menuOpened)
                }}
              >
                <svg
                  width='52'
                  height='12'
                  viewBox='0 0 52 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='6' cy='6' r='6' fill='white' />
                  <circle cx='46' cy='6' r='6' fill='white' />
                  <circle cx='26' cy='6' r='6' fill='white' />
                </svg>
              </div>
              {menuOpened && (
                <div className={styles.menu}>
                  <Menu
                    anchorEl={anchorEl}
                    onClose={() => {
                      setMenuOpened(false)
                      setAnchorEl(null)
                    }}
                    open={menuOpened}
                  >
                    <MenuItem onClick={() => window.open(appRoutes.movie(project.projectId))}>
                      Открыть фильм
                    </MenuItem>
                    <MenuItem
                      onClick={() => window.open(appRoutes.scenesEditor(project.projectId))}
                    >
                      Редактор сцен
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setMenuOpened(false)

                        const deleting = confirm(
                          'Вы действительно хотите удалить фильм?\nЭта операция необратима!'
                        )

                        if (deleting) {
                          dispatch(userProjectsActions.delete(project.projectId))
                        }
                      }}
                    >
                      Удалить фильм
                    </MenuItem>
                  </Menu>
                </div>
              )}
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
