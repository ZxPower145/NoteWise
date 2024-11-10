import {AgentDataInt} from "@/constants/CustomTypes";
import {ScrollView, TextInput, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {SafeAreaView} from "react-native-safe-area-context";

interface AgentFormDataType {
  agent: AgentDataInt
  placeholder: object
  updateName: () => void
  updateSystem: () => void
  handleNumericInput: (arg) => void
  handleAction: () => void
}

const AgentForm = (data:AgentFormDataType) => {
  return (
    <SafeAreaView className={"w-full h-full"}>
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className={"h-full px-4 align-center"}>
          <View className={"p-3 mb-3"}>
            <TextInput
              className="p-3 px-4 border border-gray-300 rounded-xl"
              value={data.agent.name}
              onChangeText={data.updateName}
              placeholder={data.placeholder.name.text}
              placeholderTextColor={data.placeholder.name.color}
              verticalAlign={"middle"}
              autoCapitalize={"sentences"}
            />
          </View>
          <View className={"p-3 mb-3"}>
            <TextInput
              className="p-3 border border-gray-300 rounded-xl max-h-[80px]"
              value={data.agent.system}
              onChangeText={data.updateSystem}
              aria-expanded={false}
              placeholder={"System information (Who is the agent?)"}
              multiline
              numberOfLines={3}
              textAlignVertical={"top"}
              maxLength={255}
              style={{minHeight: 150, maxHeight: 150}}
            />
          </View>
          <View className={"p-3 flex-row"}>
            <TextInput
              className="p-3 rounded-xl border-b border-gray-300 border"
              value={data.agent.refreshRate}
              onChangeText={(text) => data.handleNumericInput(text)}
              keyboardType={"number-pad"}
              placeholder={data.placeholder.refreshRate.text}
              placeholderTextColor={data.placeholder.refreshRate.color}
              textAlign={"center"}
              maxLength={2}
            />
          </View>
        </View>
      </ScrollView>
      <View className={"flex-row justify-evenly p-5"}>
        <TouchableOpacity onPress={() => router.dismissAll()}>
          <MaterialIcons name="cancel" size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          data.handleAction()
        }}>
          <MaterialIcons name="add-circle" size={44} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AgentForm
