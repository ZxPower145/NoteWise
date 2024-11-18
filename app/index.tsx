import { SafeAreaView } from "react-native-safe-area-context"
import { Image, ScrollView, Text, View } from 'react-native'
import { StatusBar } from "expo-status-bar"
import {router, useFocusEffect} from "expo-router"
import images from "@/constants/values/images"
import CustomButton from "@/components/buttons/CustomButton"
import LocalStorage from "@/hooks/storage/local_storage/LocalStorage"
import React from "react";

export default function App() {
  const authenticatedAccount = LocalStorage.account.get()
  
  useFocusEffect(React.useCallback(() => {
    if (authenticatedAccount) router.push('account/dashboard')
  }, []))
  
  if (authenticatedAccount) return null
  
  return (
    <SafeAreaView className="bg-white">
      <ScrollView contentContainerStyle={{width: '100%', flexGrow: 1}}>
        <View className="w-full h-full items-center px-3" style={{justifyContent: "space-evenly"}}>
          <View className='py-5'>
            <Image source={images.logo} className="max-w-[280px] max-h-[280px]" resizeMode={"contain"}>
            </Image>
          </View>
          <View className="w-full" style={{marginTop: 30}}>
            <Text className="text-3xl text-gray-50 font-bold text-center">
              Discover Endless Possibilities with {' '}
              <Text className="text-hotpink">Note Wise</Text>
            </Text>
            <Text className="text-lg font-bold text-gray-100 mt-6 text-center">
              Capture, Clarify, Conquer Your Meetings
            </Text>
          </View>
          <View className="w-full px-2" style={{marginTop: 50}}>
            <CustomButton
              text="Continue with Email"
              handlePress={() => {
                router.push("/account/login")
              }}
            />
          </View>
        </View>
      </ScrollView>
      
      <StatusBar backgroundColor='white' style='dark'/>
    </SafeAreaView>
  )
}
