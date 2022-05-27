export const required = (value: string | undefined): string | undefined =>
  value ? undefined : 'Поле обязательно для заполнения'
