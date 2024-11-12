import {View, Text, TouchableOpacity} from "react-native"
import { AgentDataType } from "@/constants/CustomTypes"
import localStorage from "@/hooks/storage/LocalStorage"
import {router} from "expo-router";

const AgentElement = (agent: AgentDataType) => {
  return (
    <View className="flex-row items-center justify-center border-b border-gray-300 px-1 my-1">
      <TouchableOpacity className="m-5" onPress={() => {
        router.push({
          pathname: '/agents/view/[name]',
          params: { name: agent.name }
        })
      }}>
        <Text className="text-3xl font-semibold">
          {agent.name}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AgentElement
