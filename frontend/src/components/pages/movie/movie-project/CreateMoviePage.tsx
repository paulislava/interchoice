import * as React from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { FormInput } from 'components/common/fields/form-input/FormInput'
import { ProjectDraft } from 'root/shared/projects'
import { createProject } from 'root/store/movie/project/project.actions'
import { FileInput } from 'components/common/fields/file-input/FileInput'
import { useAppSelector } from 'root/store/application.store'
import { appRoutes } from 'root/appRoutes'

export const CreateMoviePage: React.FC = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const project = useAppSelector(state => state.project.value)

  useEffect(() => {
    if (project) history.push(appRoutes.scenesEditor(project.projectId))
  }, [project])

  return (
    <Form<ProjectDraft>
      onSubmit={formData => {
        dispatch(createProject.request(formData))
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name='Name'>
            {props => (
              <FormInput placeholder='Название' label='Введите название' {...props.input} />
            )}
          </Field>
          <Field name='Overview'>
            {props => <FileInput {...props.input} label='Выберите превью' />}
          </Field>
          <Field name='ShortDescription'>
            {props => (
              <FormInput
                placeholder='Краткое описание'
                label='Введите краткое описание'
                multiline={true}
                {...props.input}
              />
            )}
          </Field>
          <Field name='FullDescription'>
            {props => (
              <FormInput
                placeholder='Развернутое описание'
                label='Введите развернутое описание'
                multiline={true}
                {...props.input}
              />
            )}
          </Field>
          <Button variant='outlined' type='submit'>
            Создать фильм
          </Button>
        </form>
      )}
    </Form>
  )
}
