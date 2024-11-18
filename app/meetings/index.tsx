import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import MeetingElement from "@/components/buttons/MeetingElement"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {useCallback, useRef, useState} from "react";
import { useFocusEffect } from "@react-navigation/native";
import localStorage from "@/hooks/storage/local_storage/LocalStorage";

const Index = () => {
  const [meetings, setMeetings] = useState([])
  
  const getMeetings = async () => {
    const meetingsArr = await localStorage.meetings.getAll()
    if (meetingsArr) {
      setMeetings(meetingsArr)
    } else {
      setMeetings([])
    }
  }
  
  useFocusEffect(
    useCallback(() => {
      getMeetings()
    }, [])
  )
  
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
          {
            meetings.length > 0 && meetings.map((item, index) => (
              Array.isArray(item) && item.length > 0 ? null : (
                <MeetingElement
                  key={index}
                  startTime={item.startTime}
                  date={item.date}
                  title={item.title}
                />
              )
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index
