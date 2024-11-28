import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { router } from "expo-router"

interface AgentElementProps {
  name: string
  index: number
  system: string
  refreshRate: string
}

export default function AgentElement(props: AgentElementProps): React.ReactNode {
  return (
    <View className="flex-row items-center justify-center border-b border-gray-300 px-1 my-1">
      <TouchableOpacity className="m-5" onPress={() => {
        router.push({
          pathname: '/agents/view/[name]',
          params: { name: props.name, index: props.index}
        })
      }}>
        <Text className="text-3xl font-semibold">
          {props.name}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
