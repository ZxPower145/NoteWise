import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useContext, useState} from "react";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { AccountContext } from "@/hooks/storage/store/AccountStateProvider";
import Toast from "react-native-toast-message";
import {router, useFocusEffect, useNavigation} from "expo-router";
import FormTextInput from "@/components/inputs/FormTextInput";

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { isAuthenticated, logIn } = useContext(AccountContext)
  
  useFocusEffect(React.useCallback(() => {
    if (isAuthenticated) router.push('account/dashboard')
  }, []))
  
  if (isAuthenticated) return null
  
  return (
    <>
      <SafeAreaView className="h-full w-full">
        <Toast />
        <View className="align justify-end pt-5" style={{height: '20%'}}>
          <Text className="text-center text-2xl font-semibold mb-2">
            Login
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}
          className="bg-hotpink"
          style={styles.scrollView}
        >
          <Text
            className='text-2xl font-semibold text-center border-b py-2'
            style={{color: 'white', borderColor: 'white'}}>
            - Intră în cont -
          </Text>
          <View style={{ gap: 10, justifyContent: "space-evenly", height: '80%' }}>
            <FormTextInput
              value={email}
              onChangeText={setEmail}
              placeholder={"Introdu adresa de e-mail"}
              textInputWidth={'90%'}
              beforeIcon={<Fontisto name="email" size={24} color="gray"/>}
            />
            <View>
              <FormTextInput
                beforeIcon={<MaterialIcons name="lock-outline" size={24} color="gray"/>}
                value={password}
                onChangeText={setPassword}
                placeholder={'Introdu parola'}
                secureText={!showPassword}
                textInputWidth={'80%'}
                afterIcon={<TouchableOpacity
                  className="ml-auto"
                  onPress={() => setShowPassword(!showPassword)}
                  style={{width: '10%'}}
                >
                  <FontAwesome6 name={`eye${showPassword ? '-slash' : ''}`} size={24} color="gray" />
                </TouchableOpacity>}
              />
              <TouchableOpacity
                onPress={() => {router.push('account/reset')}}
                style={{width: '35%', alignSelf:'flex-end'}}>
                <Text style={{color: 'white'}} className="px-4 font-semibold">
                  Ai uitat parola
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={{justifyContent: "space-between", gap: 20}}>
              <TouchableOpacity
                className="py-2 rounded-xl"
                style={styles.logInBtn}
                onPress={() => logIn({ email: email, password: password })}>
                <Text className="text-center font-bold text-2xl" style={{color:'white'}}>
                  Conectează-te
                </Text>
              </TouchableOpacity>
             
              <View className="flex-row gap-3 align-center justify-center">
                <Text>Utilizator nou?</Text>
                <TouchableOpacity onPress={() => {router.push('account/signup')}}>
                  <Text style={{color: '#33b86d'}} className="font-bold">
                    Creează cont!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
          
          
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: '100%',
    width: '100%',
    alignContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
    gap: 50,
  },
  scrollView: {borderTopRightRadius: 50, borderTopLeftRadius: 50},
  logInBtn: {
    backgroundColor: '#33b86d',
    shadowColor:"#33b86d",
    shadowOffset: {
      width: -4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8
  }
})

export default Login
