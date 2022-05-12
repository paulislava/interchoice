import { Button } from '@material-ui/core'
import * as React from 'react'
import { FieldInputProps } from 'react-final-form'

export interface FileFieldProps extends FieldInputProps<File | null> {
  label?: string
}

export const FileInput: React.FC<FileFieldProps> = props => {
  return (
    <Button variant='contained' component='label'>
      {props.value ? props.value.name : props.label ?? 'Выберите файл'}
      <input
        type='file'
        hidden
        name={props.name}
        onChange={event => {
          props.onChange(event.target.files ? event.target.files[0] : null)
        }}
      />
    </Button>
  )
}
