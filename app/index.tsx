import React, {useContext, useEffect, useState} from "react";
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import {router, useFocusEffect, useNavigation} from "expo-router"
import { AccountContext } from "@/hooks/storage/store/AccountStateProvider";
import images from "@/constants/values/images"
import CustomButton from "@/components/buttons/CustomButton"

export default function App(): React.ReactNode {
  const accountContext = useContext(AccountContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  useFocusEffect(React.useCallback(() => {
    if (accountContext?.isAuthenticated) {
      router.replace('/account/dashboard')
    }
    setIsLoading(false)
  }, [accountContext?.isAuthenticated]))
  
  if (isLoading) return null
  
  return (
    <SafeAreaView className="h-full w-full bg-white">
      <ScrollView contentContainerStyle={{width: '100%', flexGrow: 1}}>
        <View className="w-full h-full items-center px-3" style={{justifyContent: "space-evenly"}}>
          <View className='py-5'>
            <Image source={images.logo}
                   className="max-w-[280px] max-h-[280px]"
                   resizeMode={"contain"}
            />
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
          <View className="w-full py-2"
                style={{marginTop: 50, alignItems: 'center', justifyContent: 'space-around', gap: 20}}>
            <CustomButton
              text="Log In"
              handlePress={() => {
                router.push("/account/login")
              }}
              btnClass={"w-full"}
            />
            <CustomButton
              text="Sign Up"
              handlePress={() => {
                router.push("/account/signup")
              }}
              btnClass={"w-full"}
            />
          </View>
        </View>
      </ScrollView>
      
      <StatusBar backgroundColor='white' style='dark'/>
    </SafeAreaView>
  )
}
