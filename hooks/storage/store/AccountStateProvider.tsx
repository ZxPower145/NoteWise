import localStorage from "@/hooks/storage/local_storage/LocalStorage";
import React, {createContext, useState} from "react";
import {AccountInfo} from "@/constants/types/CustomTypes";
import Toast from 'react-native-toast-message';
import UseFetch from "@/hooks/fetch/useFetch";
import endPoints from "@/constants/values/endPoints";
import {router, useFocusEffect} from "expo-router";

interface AccountContextType {
  account: AccountInfo,
  isAuthenticated: boolean,
  logIn: (account: AccountInfo) => void,
  logOut: () => void,
  getAppointments: () => void
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const AccountStateProvider = ({ children }) => {
  const [account, setAccount] = useState<AccountInfo>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const fetcher = new UseFetch()

  useFocusEffect(React.useCallback(() => {
    const initializeAccountState = async () => {
      const loggedInAccount = await localStorage.account.get()
      if (loggedInAccount) setAccount(loggedInAccount)
    }
    initializeAccountState()
  }, []))
  
  const logIn = async (account: AccountInfo) => {
    try {
      const validated = validateEmail(account.email) && validatePassword(account.password || "")
      
      if (validated) {
        const data = await fetcher
          .setUrl(endPoints.login)
          .setMethod('POST')
          .setBody({
            email: account.email,
            password: account.password
          })
          .execute()
        if (data.status === 200) {
          await localStorage.account.logIn(account)
          setAccount(account)
          setIsAuthenticated(true)
          router.push('account/dashboard')
        } else {
          Toast.show({
            type: 'error',
            text1: "Nu am putut găsi niciun cont cu aceste informații",
            text2: 'CONT'
          })
        }
      }
      return
    } catch (error) {
      console.error(error)
    }
  }
  
  const logOut = async () => {
    try {
      setAccount(null)
      await localStorage.account.logOut()
      setIsAuthenticated(false)
      router.push('account/login')
    } catch (error) {
      console.error(error)
    }
  }
  
  const signUp = async () => {
  
  }
  
  const sendVerificationCode = async (email: string) => {
    const validated = validateEmail(email)
    if (validated) {
      await fetcher
        .setUrl(endPoints.passReset)
        .setMethod("POST")
        .addHeader("Accept-Language", "ro")
        .setBody({email: email})
        .execute()
      router.replace('account/login')
    }
  }
  
  const getAppointments = async () => {
    if (!account || !account.token) return
    return await fetcher
      .setUrl(endPoints.appointments)
      .setMethod("GET")
      .addHeader("Authorization", account.token)
      .addHeader("Accept-Language", "ro")
      .execute()
  }
  
  const validateEmail = (email: string) => {
    let raiseToast = false
    let error = ""
    if (!email) {
      raiseToast = true
      error = "Adresa de e-mail lipsește"
    } else if (!email.includes("@")) {
      raiseToast = true
      error = "Introdu o adresă de e-mail validă"
    }
    if (raiseToast) {
      Toast.show({
        type: "error",
        text1: error,
        text2: "EMAIL",
      })
    }
    return !raiseToast
  }
  
  const validatePassword = (password: string) => {
    let raiseToast = false
    let error = ""
    if (!password) {
      raiseToast = true
      error = "Parola lipsește"
    } else if (password.length < 8) {
      raiseToast = true
      error = "Parola trebuie sa conțină cel putin 8 caractere"
    }
    if (raiseToast) {
      Toast.show({
        type: "error",
        text1: error,
        text2: "PAROLĂ",
      })
    }
    return !raiseToast
  }
  
  return (
    <AccountContext.Provider value={{
      account,
      isAuthenticated,
      logIn,
      logOut,
      sendVerificationCode,
      getAppointments
    }}>
      {children}
    </AccountContext.Provider>
  )
}
