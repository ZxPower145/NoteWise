export interface LoggedInAccount {
  email: string
  password: string
  token?: string
}

export interface SignUpAccount {
  email: string
  phone: string
  firstName: string
  lastName: string
  country: string
  city: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordAccount {
  email: string
}
