import * as React from 'react'
import { default as CoreTextField, TextFieldProps } from '@material-ui/core/TextField'
import styles from './styles.styl'

export type FormInputProps = TextFieldProps & {
  defaultValue?: string
  onValueChange?(value: string): void
}

export const FormInput: React.FC<FormInputProps> = props => {
  return (
    <div className={styles.container}>
      <CoreTextField
        {...props}
        variant='outlined'
        inputProps={{
          className: 'browser-default'
        }}
        onChange={field => {
          if (props.onChange) props.onChange(field)
          if (props.onValueChange) props.onValueChange(field.target.value)
        }}
      />
    </div>
  )
}
