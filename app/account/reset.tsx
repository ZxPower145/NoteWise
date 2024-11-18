import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import FormTextInput from "@/components/inputs/FormTextInput";
import Fontisto from "@expo/vector-icons/Fontisto";
import {MaterialIcons} from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {AccountContext} from "@/hooks/storage/store/AccountStateProvider";
import Toast from "react-native-toast-message";
const Reset = () => {
  const [email, setEmail] = useState<string>("")
  
  const { sendVerificationCode } = useContext(AccountContext)
  
  return (
    <>
      <Toast />
      <SafeAreaView className="h-full w-full">
        <View className="align justify-end pt-5" style={{height: '20%'}}>
          <Text className="text-center text-2xl font-semibold mb-2">
            Resetare parola
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            height: '100%',
            width: '100%',
            alignContent: "center",
            paddingHorizontal: 30,
            paddingVertical: 20,
            gap: 50
          }}
          className="bg-hotpink"
          style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
        >
          <View style={{height: '20%'}}>
            <Text
              className='text-2xl font-semibold text-center border-b py-2'
              style={{color: 'white', borderColor: 'white'}}>
              - Resetează parola -
            </Text>
          </View>
          <View style={{justifyContent: "center", height: '50%'}}>
            <FormTextInput
              value={email}
              onChangeText={setEmail}
              placeholder={"Introdu adresa de email"}
              beforeIcon={<Fontisto name="email" size={24} color="gray"/>}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          className="py-2"
          style={{
            backgroundColor: '#33b86d',
            shadowColor:"#33b86d",
            shadowOffset: {
              width: -4,
              height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 8
          }}
          onPress={() => {sendVerificationCode(email)}}>
          <Text className="text-center font-bold text-2xl" style={{color:'white'}}>
            Resetează Parola
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

export default Reset
