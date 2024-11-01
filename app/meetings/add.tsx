import {TouchableOpacity, Text, View, ScrollView} from "react-native"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import CustomTextInput from "@/components/CustomTextInput"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import localStorage from "@/hooks/localStorage";

const Add = () => {
  const date = new Date()
  const localDate = date.toLocaleDateString("ro-RO")
  const hour = date.getHours()
  const minutes = date.getMinutes().toString()
  
  const [meetingData, setMeetingData] = useState({
    id: 1,
    date: localDate,
    startTime: `${hour}:${minutes.length > 1 ? minutes : '0' + minutes}`,
    title: '',
    initialDetails: '',
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
  
  const updatePlaceholderText = (newText) => {
    setPlaceholder((prevData) => ({
      ...prevData,
      text: newText
    }))
  }
  
  const updatePlaceholderColor = (newColor) => {
    setPlaceholder((prevData) => ({
      ...prevData,
      color: newColor
    }))
  }
  
  const submit = () => {
    if (meetingData.title.trim() === "") {
      updatePlaceholderText("The Meeting Title is Required.")
      updatePlaceholderColor("red")
      return
    } else {
      router.push({
        pathname: '/meetings/liveMeeting',
        params: {
          title: meetingData.title
        }
      });
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
              onPress={() => {
                submit()
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
