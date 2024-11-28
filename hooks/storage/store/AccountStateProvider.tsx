import localStorage from "@/hooks/storage/local_storage/LocalStorage";
import React, {createContext, useEffect, useState} from "react";
import {router, useFocusEffect} from "expo-router";
import * as AccountService from "@/services/AccountService"
import { LoggedInAccount, SignUpAccount } from "@/constants/types/AccountTypes";

interface AccountContextType {
  account: LoggedInAccount
  isAuthenticated: boolean | null
  logIn: (account: LoggedInAccount) => void
  logOut: () => void
  signUp: (account: SignUpAccount) => void
  resetPassword: (email: string) => void
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const AccountStateProvider = ({ children }: { children: React.ReactNode } ) => {
  const [account, setAccount] = useState<LoggedInAccount | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useFocusEffect(React.useCallback(() => {
    const initializeAccountState = async () => {
      const loggedInAccount: LoggedInAccount | null = await localStorage.account.get()
      if (loggedInAccount?.password) {
        setAccount(loggedInAccount)
        await checkAuthentication(loggedInAccount)
        setIsAuthenticated(true)
      }
    }
    initializeAccountState()
  }, []))
  
  const logIn: (account: LoggedInAccount) => Promise<void> = async (account: LoggedInAccount): Promise<void> => {
    const acc = await AccountService.logIn(account)
    if (acc) {
      setAccount(acc)
      setIsAuthenticated(true)
      router.replace("/account/dashboard")
    }
    return
  }
  
  const signUp: (account: SignUpAccount) => Promise<void> = async (account: SignUpAccount): Promise<void> => {
    const success = await AccountService.signUp(account)
    if (success) {
      router.replace("/account/activate")
    }
  }
  
  const logOut = async () => {
    const success = await AccountService.logOut()
    if (success) {
      setAccount(null)
      setIsAuthenticated(false)
      router.replace('/')
    }
  }
  
  const resetPassword: (email: string) => Promise<void> = async (email: string) => {
    await AccountService.resetPassword(email)
  }
  
  const checkAuthentication: (account: LoggedInAccount) => Promise<void> =
    async (account: LoggedInAccount): Promise<void> => {
    await AccountService.checkAuthentication(account)
  }
  
  return (
    <AccountContext.Provider value={{
      account: account as LoggedInAccount,
      isAuthenticated,
      logIn,
      logOut,
      signUp,
      resetPassword
    }}>
      {children}
    </AccountContext.Provider>
  )
}
