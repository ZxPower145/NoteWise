import {Stack} from "expo-router"
import {StatusBar} from "expo-status-bar"
import {AccountStateProvider} from "@/hooks/storage/store/AccountStateProvider";

const AccountLayout = () => {
  return (
    <AccountStateProvider>
      <Stack screenOptions={{headerShow: false}}>
        <Stack.Screen name='dashboard' options={{headerShown: false}}/>
        <Stack.Screen name="login" options={{headerShown: false}}/>
        <Stack.Screen name='signup' options={{headerShown: false}}/>
        <Stack.Screen name='reset' options={{headerShown: false}}/>
      </Stack>
      <StatusBar backgroundColor={'black'} style={'light'} />
    </AccountStateProvider>
  )
}

export default AccountLayout
