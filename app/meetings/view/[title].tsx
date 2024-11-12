import {router, useLocalSearchParams, useNavigation} from "expo-router"
import { useState, useEffect } from "react"
import {ScrollView, Text, TouchableOpacity, View} from "react-native"
import LocalStorage from "@/hooks/storage/LocalStorage"
import {MeetingDataType} from "@/constants/CustomTypes";
import {SafeAreaView} from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const MeetingDetails = () => {
  const [meeting, setMeeting] = useState<MeetingDataType>({
    title: '',
    date: '',
    startTime: '',
    initialDetails: '',
    transcript: '',
    agents: []
  })
  
  const { title } = useLocalSearchParams()
  
  const navigation = useNavigation()
  
  const getMeeting = async () => {
    if (!Array.isArray(title)) {
      const filteredMeeting = await LocalStorage.meetings.get(title)
      if (filteredMeeting) {
        setMeeting(filteredMeeting)
      } else {
        console.warn("There is no meeting with that name")
      }
      console.info(filteredMeeting)
    }
  }
  
  useEffect(() => {
    getMeeting()
  }, [])
  
  useEffect(() => {
    navigation.setOptions({
      title: title
    })
  }, [])
  
  return (
    <SafeAreaView className="h-full px-2">
      <ScrollView className="p-2" contentContainerStyle={{height: '100%', flexGrow: 1}}>
        <Text className="text-xl px-2 font-bold">Original Transcript</Text>
        <ScrollView className="border rounded-2xl p-4">
           <Text className="text-xl">{meeting.transcript}</Text>
        </ScrollView>
        {
          meeting.agents && meeting.agents.map((agent, index) => (
            <>
              <Text className="text-xl px-2 font-bold">{agent.name}</Text>
              <ScrollView className="border rounded-2xl p-4">
                <Text className="text-xl">{agent.transcript ? agent.transcript : ''}</Text>
              </ScrollView>
            </>
          ))
        }
      </ScrollView>
      <View className="flex flex-row justify-evenly p-5">
        <TouchableOpacity onPress={() => {
          router.dismissAll()
        }}>
          <MaterialIcons name="cancel" size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          // Modal with all agents, checkboxes for add, add on submit
        }}>
          <MaterialIcons name="person-add" size={44} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
  
export default MeetingDetails
