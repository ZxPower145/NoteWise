import {View, Text, TouchableOpacity} from "react-native"
import {agentInfo} from "@/constants/CustomTypes"

const AgentElement = (agent: agentInfo) => {
  return (
    <View className="flex-row items-center justify-center border-b border-gray-300 px-1 my-1">
      <TouchableOpacity className="m-5">
        <Text className="text-3xl font-semibold">
          {agent.name}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AgentElement
