export interface LoginRequestPayload {
  email: string
  passwordHash: string
}

export enum LoginResponseStatusCode {
  INCORRECT_DATA = 120,
  SUCCESS = 2
}

export interface LoginResponse {
  statusCode: LoginResponseStatusCode
  message: string
  isSuccess: boolean
  value?: string
}

export interface UserInfo {
  value: string
}