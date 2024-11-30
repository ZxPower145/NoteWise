import React, {useContext, useState} from "react";
import { AccountContext } from "@/hooks/storage/store/AccountStateProvider";
import Toast from "react-native-toast-message";

export default function Reset(): React.ReactNode {
  const [email, setEmail] = useState<string>("")
  const accountContext = useContext(AccountContext)
  
  return (
    <>
      <Toast />
    </>
  )
}
