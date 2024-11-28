import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { router } from "expo-router"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

interface meetingInfo {
  startTime: string,
  date: string,
  title: string,
}

export default function MeetingElement(data: meetingInfo): React.ReactNode {
  return (
    <View className="flex-row min-h-[60px] items-center justify-between border-b
    border-gray-300 px-1 my-1">
      <View className="items-center">
        <Text className='color-black text-xl font-semibold'>
          {data.startTime}
        </Text>
        <Text className='color-black text-sm font-semibold'>
          {data.date}
        </Text>
      </View>
      <TouchableOpacity onPress={() => {
        router.push(`/meetings/view/${data.title}`)
      }}>
        <Text className='color-black text-xl font-semibold'>
          {data.title}
        </Text>
      </TouchableOpacity>
      <View className="flex-row gap-5">
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: '/meetings/modals/deleteConfirmation',
              params: {
                title: data.title
              }
            })
          }}>
          <FontAwesome6 name="trash-can" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
