import { LoginResponseStatusCode } from 'root/shared/users'

const errorMessages = {
  [`errors.codes.${LoginResponseStatusCode.INCORRECT_DATA}`]: 'Неверные E-mail или пароль!'
}

export default {
  ...errorMessages
}
