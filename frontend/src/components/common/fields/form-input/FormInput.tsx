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
        InputProps={{
          classes: {
            root: styles.field,
            input: styles.input,
            focused: styles.focused,
          }
        }}
        InputLabelProps={{
          classes: {
            root: styles.label,
            focused: styles.focusedLabel
          }
        }}
        classes={{
          root: styles.root
        }}
        className={styles.fieldContainer}
        onChange={field => {
          if (props.onChange) props.onChange(field)
          if (props.onValueChange) props.onValueChange(field.target.value)
        }}
      />
    </div>
  )
}
