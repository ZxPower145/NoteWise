import {SafeAreaView} from "react-native-safe-area-context"
import {ScrollView, View, Text, TouchableOpacity} from "react-native"
import { router } from "expo-router"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AgentElement from "@/components/AgentElement";

const Index = () => {
  return(
    <SafeAreaView className="h-full p-3">
      <View className="mb-3 flex-row justify-between align-center px-1">
        <Text className="text-2xl font-bold">
          Agents
        </Text>
        <TouchableOpacity onPress={() => {
          router.push("agents/add")
        }}>
          <MaterialIcons name="person-add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView className="border-t border-gray-300" contentContainerStyle={{height: '100%', flexGrow: 1}}>
        <AgentElement name={"Basescu"} system={""} refreshRate={30}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index
