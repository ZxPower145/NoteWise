import React, {useContext, useState} from "react";
import { SignUpAccount } from "@/constants/types/AccountTypes";
import { AccountContext } from "@/hooks/storage/store/AccountStateProvider"

import {Appbar, Button, Checkbox, Modal, Portal, Text, TextInput, useTheme} from "react-native-paper";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, TouchableOpacity, View} from "react-native";
import TAncC from "@/components/cards/TAncC";
import * as Linking from 'expo-linking';
import endPoints from "@/constants/values/endPoints";
import Toast from "react-native-toast-message";

export default function Signup(): React.ReactNode  {
  const [account, setAccount] = useState<SignUpAccount>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    phone: '',
    confirmPassword: '',
  })
  const theme = useTheme()
  const accountContext = useContext(AccountContext)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false)
  const [showTerms, setShowTerms] = useState<boolean>(false)
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false)
  
  const updateAccount = (key: keyof SignUpAccount, value: string) => {
    setAccount((prevState: SignUpAccount) : SignUpAccount => ({
      ...prevState,
      [key]: value
    }))
  }
  
  return (
    <>
      <View style={{width: '100%', position: 'absolute', zIndex: 999}}>
        <Toast />
      </View>
      <View className={'w-full h-full'} style={{backgroundColor: theme.colors.background}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {router.replace("")}} />
          <Appbar.Content title={"Înregistrează-te"} />
        </Appbar.Header>
        <SafeAreaView
          className={"align-center justify-between w-full"}
          style={{height: '85%', paddingHorizontal: 30}}>
          <Portal>
              <Modal
                visible={showTerms}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                contentContainerStyle={{
                  backgroundColor: theme.colors.background,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '85%',
                  height: '70%',
                  padding: 20
              }}
                onDismiss={() => {setShowTerms(false)}
              }>
                <TAncC />
                <View className={'flex-row w-full'}
                      style={{paddingVertical: 10, alignItems: 'center', justifyContent: 'space-evenly'}}
                >
                  <Button mode={"elevated"}
                          onPress={() => {
                            Linking.openURL(endPoints.termsAndConditions)
                          }}
                          style={{backgroundColor: 'blue'}}
                          compact={true}
                          textColor={'white'}
                  >
                    DETALII
                  </Button>
                  <Button mode={"elevated"}
                          onPress={() => {
                            setTermsAccepted(false)
                            setShowTerms(false)
                          }}
                          style={{backgroundColor: 'red'}}
                          compact={true}
                          textColor={'white'}
                  >
                    REFUZ
                  </Button>
                  <Button mode={"elevated"}
                          onPress={() => {
                            setTermsAccepted(true)
                            setShowTerms(false)
                          }}
                          style={{backgroundColor: 'green'}}
                          textColor={'white'}
                          compact={true}
                  >
                    ACCEPT
                  </Button>
                  
                </View>
              </Modal>
          </Portal>
          <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 50, gap: 20}}>
            <View className='w-full'>
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Adresa de email"
                selectionColor={'lightblue'}
                cursorColor={"lightblue"}
                onChangeText={(text: string) => updateAccount('email', text)}
                left={<TextInput.Icon icon={"email"}/>}
              />
            </View>
            
            <View className='flex-row w-full' style={{alignItems: 'center', justifyContent: 'space-between'}}>
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Nume"
                selectionColor={'lightblue'}
                cursorColor={"lightblue"}
                onChangeText={(text: string) => updateAccount('lastName', text)}
                left={<TextInput.Icon icon={"account"}/>}
                style={{width: '48%'}}
              />
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Prenume"
                selectionColor={'lightblue'}
                cursorColor={"lightblue"}
                onChangeText={(text: string) => updateAccount('firstName', text)}
                left={<TextInput.Icon icon={"account"}/>}
                style={{width: '48%'}}
              />
            </View>
            
            <View className='w-full'>
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Numar de telefon"
                selectionColor={'lightblue'}
                cursorColor={"lightblue"}
                onChangeText={(text: string) => updateAccount('phone', text)}
                left={<TextInput.Icon icon={"phone"}/>}
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
                onChangeText={(text: string) => updateAccount('password', text)}
                left={<TextInput.Icon icon={"lock"}/>}
                secureTextEntry={!showPassword}
                right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />}
              />
            </View>
            
            <View className='w-full'>
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Confirma parola"
                selectionColor={'lightblue'}
                cursorColor={"lightblue"}
                onChangeText={(text: string) => updateAccount('confirmPassword', text)}
                left={<TextInput.Icon icon={"lock"}/>}
                secureTextEntry={!showPasswordConfirmation}
                right={
                <TextInput.Icon
                  icon={showPasswordConfirmation ? 'eye-off' : 'eye'}
                  onPress={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                />}
              />
            </View>
            
            <View className='flex-row w-full' style={{alignItems: 'center', justifyContent: 'space-between'}}>
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Tara"
                selectionColor={'lightblue'}
                cursorColor={"lightblue"}
                onChangeText={(text: string) => updateAccount('country', text)}
                left={<TextInput.Icon icon={"google-maps"}/>}
                style={{width: '48%'}}
              />
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Oras"
                selectionColor={'lightblue'}
                cursorColor={"lightblue"}
                onChangeText={(text: string) => updateAccount('city', text)}
                left={<TextInput.Icon icon={"google-maps"}/>}
                style={{width: '48%'}}
              />
            </View>
          
            <View className='w-full flex-row items-center'>
              <Text className='text-xl'>Acceptă </Text>
              <TouchableOpacity onPress={() => {setShowTerms(true)}}>
                <Text className="text-xl" style={{color: theme.colors.primary}}>
                  termenii și condițiile
                </Text>
              </TouchableOpacity>
              <Checkbox status={termsAccepted ? 'checked' : 'unchecked'}
                        onPress={() => setTermsAccepted(!termsAccepted)} />
            </View>
          </ScrollView>
          <View className="w-full">
            <Button
              mode={"elevated"}
              style={{backgroundColor: theme.colors.onBackground}}
              textColor={theme.colors.background}
              onPress={() => {
                if (termsAccepted)  accountContext?.signUp(account)
                else alert('Trebuie să accepți termenii și condițiile')
              }}>
              Înregistrează-te
            </Button>
          </View>
        </SafeAreaView>
      </View>
    </>
  )
}
