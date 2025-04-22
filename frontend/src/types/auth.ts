interface AuthState {
  token: string
}

interface LoginParams {
  email: string
  password: string
}

interface RegisterParams {
  name: string
  email: string
  password: string
}

interface ResetPasswordParams {
  token: string
  password: string
}


interface User {
  pid: string
  name: string
  email: string
  is_verified: boolean
}

export type {
  AuthState,
  LoginParams,
  ResetPasswordParams,
  RegisterParams,
  User,
}
