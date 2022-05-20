import { Button } from '@material-ui/core'
import { GradientButton } from 'components/common/buttons/gradient-button/GradientButton'
import * as React from 'react'
import { useState } from 'react'

export interface FileFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  value?: File | null
  accept?: string
  name?: string
  onChoose(value: File | null): void
  children?(props: FileFieldProps): void
}

export const FileInput: React.FC<FileFieldProps> = props => {
  const [value, setValue] = useState(props.value)

  return (
    <div {...props}>
      <GradientButton component='label'>
        {value ? value.name : props.label ?? 'Выберите файл'}
        <input
          type='file'
          hidden
          name={props.name}
          accept={props.accept}
          onChange={event => {
            const newValue = event.target.files ? event.target.files[0] : null
            setValue(newValue)
            props.onChoose(newValue)
          }}
        />
      </GradientButton>
    </div>
  )
}
