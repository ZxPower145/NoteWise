import { SafeAreaView } from "react-native-safe-area-context"
import { Image, ScrollView, Text, View } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { router } from "expo-router"
import images from "@/constants/images"
import CustomButton from "@/components/CustomButton"
import localStorage from "@/hooks/localStorage"

export default function App() {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView contentContainerStyle={{width: '100%', flexGrow: 1}}>
        <View className="w-full items-center content-center min-h-[85vh] px-3">
          <View className='py-5'>
            <Image source={images.logo} className="max-w-[280px] max-h-[280px]" resizeMode={"contain"}>
            </Image>
          </View>
          <View className='mt-auto'>
            <Text className="text-3xl text-gray-50 font-bold text-center">
              Discover Endless Possibilities with {' '}
              <Text className="text-hotpink">Meeting Observer</Text>
            </Text>
            <Text className="text-lg font-bold text-gray-100 mt-6 text-center">
              Capture, Clarify, Conquer Your Meetings
            </Text>
          </View>
          <View className="w-full mt-auto px-2 mt-6">
            <CustomButton
              text="Continue with Email"
              isLoading={true}
            />
            
            <CustomButton
              text="Continue with Google"
              btnClass="mt-6"
              isLoading={true}
            />
            
            <CustomButton
              text="Continue as Guest"
              btnClass="mt-6"
              handlePress={async () => {
                
                router.push('/meetings')
              }}
            />
          </View>
        </View>
      </ScrollView>
      
      <StatusBar backgroundColor='white' style='dark'/>
    </SafeAreaView>
  )
}
