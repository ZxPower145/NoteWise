import React from "react";
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import images from "@/constants/values/images"
import CustomButton from "@/components/CustomButton"
import { MD3Theme, useTheme } from "react-native-paper";
import { useAccount } from "@/hooks/storage/store/AccountStateProvider";

export default function App(): React.ReactNode {
  const { account, signOut } = useAccount();
  const theme: MD3Theme = useTheme();
  
  const renderButtons: () => React.ReactNode = (): React.ReactNode => account ? (
    <>
      <CustomButton
        text="Dashboard"
        handlePress={(): void => router.push("/account/dashboard")}
        btnClass="w-full"
      />
      <CustomButton
        text="Meetings"
        handlePress={(): void => router.push("/meetings")}
        btnClass="w-full"
      />
      <CustomButton
        text="Log Out"
        handlePress={signOut}
        btnClass="w-full"
      />
    </>
  ) : (
    <>
      <CustomButton
        text="Log In"
        handlePress={(): void => router.push("/account/login")}
        btnClass="w-full"
      />
      <CustomButton
        text="Sign Up"
        handlePress={(): void => router.push("/account/signup")}
        btnClass="w-full"
      />
    </>
  );
  
  return (
    <View className="h-full w-full" style={{backgroundColor: theme.colors.background}}>
      <SafeAreaView className="h-full w-full">
        <ScrollView contentContainerStyle={{width: '100%', flexGrow: 1}}>
          <View className="w-full h-full items-center px-3" style={{justifyContent: "space-evenly"}}>
            <View className="py-5">
              <Image
                source={images.logo}
                className="max-w-[280px] max-h-[280px]"
                resizeMode="contain"
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
            <View
              className="w-full py-2"
              style={{marginTop: 50, alignItems: 'center', justifyContent: 'center', gap: 20}}
            >
              {renderButtons()}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
