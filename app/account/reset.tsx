import React, {useContext, useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccountContext } from "@/hooks/storage/store/AccountStateProvider";
import FormTextInput from "@/components/inputs/FormTextInput";
import Fontisto from "@expo/vector-icons/Fontisto";
import Toast from "react-native-toast-message";
import NamedStyles = StyleSheet.NamedStyles;

export default function Reset(): React.ReactNode {
  const [email, setEmail] = useState<string>("")
  const accountContext = useContext(AccountContext)
  
  return (
    <>
      <Toast />
      <SafeAreaView className="h-full w-full">
        <View className="align justify-end pt-5" style={{height: '20%'}}>
          <Text className="text-center text-2xl font-semibold mb-2">
            Resetează parola
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.container}
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
          style={styles.button}
          onPress={() => {accountContext?.resetPassword(email)}}>
          <Text className="text-center font-bold text-2xl" style={{color:'white'}}>
            Resetează Parola
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create<NamedStyles<any>>({
  container: {
    height: '100%',
    width: '100%',
    alignContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
    gap: 50
  },
  button: {
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
