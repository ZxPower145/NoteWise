import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoggedInAccount, SignUpAccount } from "@/constants/types/AccountTypes";
import * as AccountService from "@/services/AccountService";

interface AccountContextType {
  account: LoggedInAccount | null;
  loading: boolean;
  signIn: (account: LoggedInAccount) => Promise<boolean>;
  signUp: (account: SignUpAccount) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<LoggedInAccount | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const initialize = async () => {
      await refreshAccount();
      setLoading(false);
    };
    initialize();
  }, []);
  
  const refreshAccount = async () => {
    const localAccount = await localStorage.account.get();
    if (localAccount) {
      setAccount(localAccount);
      await AccountService.checkAuthentication(localAccount);
    }
  };
  
  const signIn = async (credentials: LoggedInAccount): Promise<boolean> => {
    const loggedAccount = await AccountService.logIn(credentials);
    if (loggedAccount) {
      setAccount(loggedAccount);
      return true;
    }
    return false;
  };
  
  const signUp = async (newAccount: SignUpAccount): Promise<boolean> => {
    return await AccountService.signUp(newAccount);
  };
  
  const signOut = async (): Promise<boolean> => {
    const success = await AccountService.logOut();
    if (success) {
      setAccount(null);
    }
    return success;
  };
  
  const checkAuth = async (): Promise<void> => {
    if (account) {
      await AccountService.checkAuthentication(account);
    }
  };
  
  return (
    <AccountContext.Provider value={{
      account,
      loading,
      signIn,
      signUp,
      signOut,
      resetPassword: AccountService.resetPassword,
      checkAuth
    }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within AccountStateProvider');
  }
  return context;
};
