import {TouchableOpacity, Text, View, ScrollView} from "react-native"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { MeetingDataType } from "@/constants/types/CustomTypes"
import CustomTextInput from "@/components/inputs/CustomTextInput"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import localStorage from "@/hooks/storage/local_storage/LocalStorage"

const Add = () => {
  const date = new Date()
  const localDate = date.toLocaleDateString("ro-RO")
  const hour = date.getHours()
  const minutes = date.getMinutes().toString()
  
  const [meetingData, setMeetingData] = useState<MeetingDataType>({
    title: '',
    date: localDate,
    startTime: `${hour}:${minutes.length > 1 ? minutes : '0' + minutes}`,
    initialDetails: '',
    transcript: '',
    agents: []
  })
  
  const [placeholder, setPlaceholder] = useState({
    text: 'Meeting Title',
    color: 'black'
  })
  
  const updateTitle = (newTitle) => {
    setMeetingData((prevData) => ({
      ...prevData,
      title: newTitle
    }))
  }
  
  const updateInitialDetails = (newDetails) => {
    setMeetingData((prevData) => ({
      ...prevData,
      initialDetails: newDetails
    }))
  }
  
  const saveData = async (data: MeetingDataType) => {
    let response = await localStorage.meetings.add(data)
    if (response.status === 400 && response.error) {
      updateTitle("")
      setPlaceholder({
        text: response.error,
        color: "red"
      })
    } else {
      router.push({
        pathname: '/meetings/liveMeeting',
        params: {
          title: meetingData.title
        }
      })
    }
  }
  
  return (
    <SafeAreaView className="h-full px-4">
      <ScrollView contentContainerStyle={{width: '100%', flexGrow: 1}}>
        <View className="flex justify-start gap-20 align-center">
          <CustomTextInput
            placeholder={placeholder.text}
            placeholderTextColor={placeholder.color}
            value={meetingData.title}
            onChangeText={updateTitle}
          />
          
          <CustomTextInput
            placeholder={'Initial Details'}
            overrideClasses={'w-full rounded-2xl border-b border-gray-300 text-end p-2 max-h-[50px]'}
            isMultiline={true}
            maxLength={255}
            noOfLines={3}
            value={meetingData.initialDetails}
            onChangeText={updateInitialDetails}
          />
          <View className="mt-6">
            <Text className="px-2 text-lg mb-2">
              Or just start recording and begin with the initial details:
            </Text>
            <TouchableOpacity
              className="rounded-3xl p-2 w-[100px] mx-auto"
              onPress={async () => {
                await saveData(meetingData)
              }}>
              <FontAwesome className="mx-auto"
                name='microphone'
                size={64}
                color="#8867f3" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Add
