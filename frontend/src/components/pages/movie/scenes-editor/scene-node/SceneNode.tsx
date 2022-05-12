import * as React from 'react'
import styles from '../styles.styl'
import { IconType, RoundedIcon } from 'components/common/icons/RoundedIcon'

export interface SceneNodeProps {
  name?: string
}

export const SceneNode: React.FC<SceneNodeProps> = props => {
  return (
    <div>
      <div className={styles.sceneName}>{props.name ?? 'Без названия'}</div>
      <div className={styles.sceneActions}>
        <RoundedIcon type={IconType.EDIT} />
        <RoundedIcon type={IconType.DELETE} />
      </div>
    </div>
  )
}
