import * as React from 'react'
import { default as CoreTextField, TextFieldProps } from '@material-ui/core/TextField'
import { FieldMetaState } from 'react-final-form'
import styles from './styles.styl'

export type FormInputProps<FieldValue = string> = TextFieldProps & {
  meta?: FieldMetaState<FieldValue>
  defaultValue?: string
  onValueChange?(value: string): void
}

export function FormInput<FieldValue = string>(props: FormInputProps<FieldValue>): JSX.Element {
  const invalid: Boolean = Boolean(props.meta?.touched && props.meta.invalid)

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
            focused: styles.focused
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
        className={[styles.fieldContainer, invalid ? styles.dirty : undefined].join(' ')}
        onChange={field => {
          if (props.onChange) props.onChange(field)
          if (props.onValueChange) props.onValueChange(field.target.value)
        }}
      />
      {invalid && <div className={styles.error}>{props.meta?.error}</div>}
    </div>
  )
}
