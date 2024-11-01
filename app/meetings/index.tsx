import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import MeetingButton from "@/components/MeetingButton"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import localStorage from "@/hooks/localStorage"

const Index = () => {
  return (
    <SafeAreaView className="bg-white h-full px-2">
      <View className='flex flex-wrap flex-row justify-between items-center p-2 border-b'>
        <Text className='text-black text-3xl'>
          Meetings
        </Text>
        <TouchableOpacity onPress={() => router.push('meetings/add')}>
          <MaterialCommunityIcons name="note-plus-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="w-full justify-start content-center min-h-[85vh]">
        
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index
