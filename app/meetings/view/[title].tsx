import { useLocalSearchParams, useNavigation } from "expo-router"
import { useState, useEffect } from "react"
import {ScrollView, Text, View} from "react-native"
import LocalStorage from "@/hooks/LocalStorage"
import {meetingData} from "@/constants/CustomTypes";
import {SafeAreaView} from "react-native-safe-area-context";

const MeetingDetails = () => {
  const [meeting, setMeeting] = useState<meetingData>({
    title: '',
    date: '',
    startTime: '',
    initialDetails: '',
    transcript: ''
  })
  
  const { title } = useLocalSearchParams()
  
  const navigation = useNavigation()
  
  const getMeeting = async () => {
    await LocalStorage.getMeetingByTitle(title as string)
      .then((item) => {
          if (item !== null) {
            setMeeting(item)
          } else {
            console.warn("There is no meeting with that name.")
          }
        }
      )
  }
  
  useEffect(() => {
    getMeeting()
  }, [])
  
  useEffect(() => {
    if (meeting.title) {
      navigation.setOptions({ title: meeting.title })
    }
  }, [meeting.title])
  
  return (
    <SafeAreaView className="h-full px-2">
      <ScrollView className="border p-2" contentContainerStyle={{width: '100%', flexGrow: 1}}>
        <Text className="text-xl px-2 font-bold">Transcript</Text>
        <ScrollView className="border rounded-2xl p-4" contentContainerStyle={{width: '100%'}}>
           <Text className="text-xl">This is a transcript</Text>
        </ScrollView>
        <Text className="text-xl px-2 font-bold">Transcript</Text>
        <ScrollView className="border rounded-2xl p-4" contentContainerStyle={{width: '100%'}}>
           <Text className="text-xl">This is a transcript</Text>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}
  
export default MeetingDetails
