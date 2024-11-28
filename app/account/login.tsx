import React, {useContext, useState} from "react";
import { AccountContext } from "@/hooks/storage/store/AccountStateProvider";
import {SafeAreaView} from "react-native-safe-area-context";
import {View} from "react-native";
import {Appbar, Button, TextInput, useTheme} from "react-native-paper";
import {router} from "expo-router";
import Toast from "react-native-toast-message";

export default function Login() : React.ReactNode {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const accountContext = useContext(AccountContext)
  const theme = useTheme()
  
  return (
    <>
      <View style={{width: '100%', position: 'absolute', zIndex: 999}}>
        <Toast />
      </View>
      <View className='h-full w-full' style={{backgroundColor: theme.colors.background}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {router.replace("")}} />
          <Appbar.Content title={"Conectează-te"} />
        </Appbar.Header>
        <SafeAreaView className={'w-full p-4'} style={{justifyContent: 'space-between', height: '85%'}}>
          <View style={{gap: 20}}>
            <View className="w-full">
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Adresa de email"
                selectionColor={'lightblue'}
                cursorColor={"lightblue"}
                onChangeText={(text: string) => setEmail(text)}
                left={<TextInput.Icon icon={"email"}/>}
              />
            </View>
            <View className='w-full'>
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Parola"
                selectionColor={'lightblue'}
                cursorColor={"lightblue"}
                onChangeText={(text: string) => setPassword(text)}
                left={<TextInput.Icon icon={"lock"}/>}
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />}
              />
            </View>
          </View>
          
          <View className="w-full">
            <Button
              mode={"elevated"}
              style={{backgroundColor: theme.colors.onBackground}}
              textColor={theme.colors.background}
              onPress={() => {accountContext?.logIn({email, password})
              }}>
              Conectează-te
            </Button>
          </View>
        </SafeAreaView>
      </View>
    </>
  )
}
