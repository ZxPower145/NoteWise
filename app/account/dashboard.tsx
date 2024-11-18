import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import React, {useContext, useState} from "react";
import {AccountContext} from "@/hooks/storage/store/AccountStateProvider";
import {router, useFocusEffect} from "expo-router";

const Dashboard = () => {
  const {account, logOut, getAppointments} = useContext(AccountContext)
  const [appointments, setAppointments] = useState(null)
  
  useFocusEffect(React.useCallback(() => {
    if (!account) {
      router.replace('account/login')
    }
    getAppointments()
  }, []))
  
  if (!account) return null
  
  return (
    <SafeAreaView className="h-full w-full">
      <View className="flex-row justify-center">
        <Text className="text-2xl text-center mx-auto">
          Dashboard
        </Text>
        <TouchableOpacity className="align-center justify-center px-2 border"
          onPress={() => logOut()}
        >
          <Text>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{height: '100%', width: '100%'}}>
        <View>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard
