export interface LoginRequestPayload {
  email: string
  passwordHash: string
}

export enum AuthResponseStatusCode {
  INCORRECT_DATA = 120,
  SUCCESS = 2
}

export interface AuthResponse {
  statusCode: AuthResponseStatusCode
  message: string
  isSuccess: boolean
  value?: string
}

export interface UserInfo {
  value: string
}

export interface RegisterRequestPayload {
  email: string
  passwordHash: string
  passwordHashCheck: string
  birthDate: string
  firstName: string
  lastName: string
  country: string
}