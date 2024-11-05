import { Text, View, TouchableOpacity } from 'react-native'
import { router } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface meetingInfo {
  startTime: string,
  date: string,
  title: string,
}

const MeetingElement = (data: meetingInfo) => {
  return (
    <View className="flex-row items-center justify-between border-b border-gray-300 px-1 my-1">
      <View className="items-center">
        <Text className='color-black text-xl'>
          {data.startTime}
        </Text>
        <Text className='color-black text-sm'>
          {data.date}
        </Text>
      </View>
      <Text className='color-black text-xl'>
        {data.title}
      </Text>
      <TouchableOpacity onPress={() => {
        router.push(`/meetings/view/${data.title.toLowerCase().split(" ").join("")}`)
      }}>
        <FontAwesome6 name="eye" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default MeetingElement
