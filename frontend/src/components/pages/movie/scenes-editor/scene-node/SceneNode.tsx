import * as React from 'react'
import { useDispatch } from 'react-redux'
import styles from '../styles.styl'
import { IconType, RoundedIcon } from 'components/common/icons/RoundedIcon'
import { ProjectScene } from 'root/shared/projects'
import { deleteScene, setEditedScene } from 'root/store/movie/project/project.actions'

export interface SceneNodeProps {
  scene: ProjectScene
}

export const SceneNode: React.FC<SceneNodeProps> = ({ scene }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <div className={styles.sceneName}>{scene.name ?? 'Без названия'}</div>
      <div className={styles.sceneActions}>
        <RoundedIcon type={IconType.EDIT} onClick={() => dispatch(setEditedScene.request(scene))} />
        <RoundedIcon
          type={IconType.DELETE}
          onClick={() => dispatch(deleteScene.request(scene.id))}
        />
      </div>
    </div>
  )
}
