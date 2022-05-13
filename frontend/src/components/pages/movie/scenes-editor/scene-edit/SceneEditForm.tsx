import * as React from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { Button } from '@material-ui/core'
import styles from './styles.styl'
import { ProjectSceneData } from 'root/shared/projects'
import { useAppSelector } from 'root/store/application.store'
import { updateScene, uploadSceneVideo } from 'root/store/movie/project/project.actions'
import { FormInput } from 'components/common/fields/form-input/FormInput'
import { FileInput } from 'components/common/fields/file-input/FileInput'

export const SceneEditForm: React.FC = () => {
  const scene = useAppSelector(state => state.project.editedScene)
  const dispatch = useDispatch()

  const initialValues = useMemo(() => scene, [scene])

  if (!scene || !initialValues) return <></>

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        <Form<ProjectSceneData>
          initialValues={initialValues}
          onSubmit={data => {
            dispatch(updateScene.request(data))
          }}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <Field name='name'>
                {props => (
                  <FormInput
                    placeholder='Введите название сцены'
                    label='Название'
                    {...props.input}
                  />
                )}
              </Field>
              <Field name='description'>
                {props => (
                  <FormInput
                    placeholder='Введите описание сцены'
                    label='Описание'
                    multiline={true}
                    rows={7}
                    {...props.input}
                  />
                )}
              </Field>
              <Field name='buttonName'>
                {props => (
                  <FormInput
                    placeholder='Введите название кнопки'
                    label='Название кнопки'
                    {...props.input}
                  />
                )}
              </Field>
              <Button type='submit' variant='raised'>
                Сохранить
              </Button>
            </form>
          )}
        </Form>
      </div>
      <div>
        {scene.videoUrl && <iframe src={scene.videoUrl} />}
        <FileInput
          accept='video/mp4,video/x-m4v,video/*'
          onChoose={value => {
            if (value) dispatch(uploadSceneVideo.request({ video: value, sceneId: scene.id }))
          }}
          label='Выбрать видео'
        />
      </div>
    </div>
  )
}
