import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, View} from "react-native";
import CustomTextInput from "@/components/CustomTextInput";
import {useState} from "react";


const Add = () => {
  const [name, setName] = useState("")
  const [system, setSystem] = useState("")
  
  return (
    <SafeAreaView className="h-[85vh] w-full p-3">
      <ScrollView contentContainerStyle={{height: '100%', flexGrow: 1}}>
        <View className="flex w-full">
          <CustomTextInput
            value={name}
            onChangeText={setName}
            placeholder={"Agent Name"}
          />
          <CustomTextInput
            value={system}
            onChangeText={setSystem}
            placeholder={"System"}
            isMultiline={true}
            noOfLines={5}
            maxLength={255}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Add
