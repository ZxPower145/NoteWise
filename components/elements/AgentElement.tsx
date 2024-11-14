import {View, Text, TouchableOpacity} from "react-native"
import { AgentDataType } from "@/constants/CustomTypes"
import localStorage from "@/hooks/storage/LocalStorage"
import {router} from "expo-router";

const AgentElement = ({name, index}) => {
  return (
    <View className="flex-row items-center justify-center border-b border-gray-300 px-1 my-1">
      <TouchableOpacity className="m-5" onPress={() => {
        router.push({
          pathname: '/agents/view/[name]',
          params: { name: name, index: index }
        })
      }}>
        <Text className="text-3xl font-semibold">
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AgentElement
