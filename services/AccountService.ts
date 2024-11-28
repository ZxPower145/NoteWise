import { LoggedInAccount, SignUpAccount } from "@/constants/types/AccountTypes";
import localStorage from "@/hooks/storage/local_storage/LocalStorage"
import UseFetch from "@/hooks/fetch/useFetch"
import endPoints from "@/constants/values/endPoints"
import Toast from "react-native-toast-message";
import * as Validator from "@/services/ValidatorService"

const useFetch: UseFetch = new UseFetch()

export const logIn: (account: LoggedInAccount) => Promise<LoggedInAccount | null> =
  async (account: LoggedInAccount): Promise<LoggedInAccount | null> => {
    const validated: boolean = validateLogInAccount(account)
    if (!validated) return null
    else {
      const data = await useFetch
        .setUrl(endPoints.login)
        .setMethod('POST')
        .setBody({
          email: account.email,
          password: account.password
        })
        .execute()
      if (data.status === 200) {
        const token: string = data.headers.map.authorization
        if (token.startsWith("Bearer")) {
          const acc: LoggedInAccount = {
            email: account.email,
            password: account.password,
            token: token
          }
          await localStorage.account.logIn(acc)
          return acc
        }
      } else {
        useToast('CONT', "Nu am putut găsi niciun cont cu aceste informații")
      }
    }
    return null
  }

export const signUp: (account: SignUpAccount) => Promise<boolean> =
  async (account: SignUpAccount) : Promise<boolean> => {
    const validated: boolean = validateSignUpAccount(account)
    if (!validated) return false
    else {
      const data = await useFetch
        .setUrl(endPoints.signup)
        .setMethod("POST")
        .addHeader("Accept-Language", "ro")
        .setBody({
          email: account.email,
          password: account.password,
          name: `${account.firstName} ${account.lastName}`,
          country: account.country,
          city: account.city,
          phone: account.phone
        })
        .execute()
      if (data.status === 204) {
        return true
      } else {
        useToast('ERROR', "Eroare interna, încearcă din nou")
        return false
      }
    }
  }

export const logOut: () => Promise<boolean> = async (): Promise<boolean> => {
  try {
    await localStorage.account.logOut()
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export const resetPassword: (email: string) => Promise<void> =
  async (email: string): Promise<void> => {
  if (Validator.validateEmail(email)) {
    await useFetch
     .setUrl(endPoints.passReset)
     .setMethod("POST")
     .addHeader("Accept-Language", "ro")
     .setBody({ email })
     .execute()
    useToast('CONT', "S-a trimis un email de confirmare")
  }
}

export const checkAuthentication: (account: LoggedInAccount) => Promise<void> =
  async (account: LoggedInAccount) : Promise<void> => {
  if (account.token) {
    const response = await useFetch
      .setUrl(endPoints.checkAccount)
      .setMethod("GET")
      .addHeader("Authorization", account.token)
      .execute()
    if (response.status !== 200) {
      await logIn(account)
    }
  }
}

const validateLogInAccount: (account: LoggedInAccount) => boolean = (account: LoggedInAccount): boolean => {
  return Validator.validateEmail(account.email) && Validator.validatePassword(account.password)
}

const validateSignUpAccount: (account: SignUpAccount) => boolean = (account: SignUpAccount): boolean => {
  return Validator.validateEmail(account.email) &&
    Validator.validatePasswords(account.password, account.confirmPassword) &&
    Validator.validateFirstName(account.firstName) &&
    Validator.validateLastName(account.lastName) &&
    Validator.validateCountry(account.country) &&
    Validator.validateCity(account.city) &&
    Validator.validatePhoneNumber(account.phone.toString())
}

const useToast: (category: string, message: string) => void = (category: string, message: string): void => {
  Toast.show({
    text1: message,
    text2: category,
    type: "error"
  })
}
