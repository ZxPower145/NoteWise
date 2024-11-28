import React from "react";
import {ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {router, useFocusEffect, useNavigation} from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NamedStyles = StyleSheet.NamedStyles;


interface AgentFormDataType {
  placeholder: {
    name: { text: string; color: string };
    refreshRate: { text: string; color: string };
  };
  name?: string;
  system?: string;
  refreshRate?: string;
  updateName: (text: string) => void;
  updateSystem: (text: string) => void;
  handleNumericInput: (text: string) => void;
  handleAction: () => void;
}

export default function AgentForm(data: AgentFormDataType): React.ReactNode {
  const navigation = useNavigation()
  
  useFocusEffect(React.useCallback(() => {
    navigation.addListener("blur", () => {
      clear()
    })
  }, []))
  
  const clear = () => {
    data.updateName("")
    data.updateSystem("")
    data.handleNumericInput("")
  }
  
  return (
    <SafeAreaView className={"w-full h-full"}>
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className={"h-full px-4 align-center"}>
          <View className={"p-3 mb-3"}>
            <TextInput
              className="p-4 px-4 text-xl border border-gray-300 rounded-xl"
              value={data.name || ""}
              onChangeText={data.updateName}
              placeholder={data.placeholder.name.text}
              placeholderTextColor={data.placeholder.name.color}
              verticalAlign={"middle"}
              autoCapitalize={"sentences"}
              style={styles.shadow}
            />
          </View>
          <View className={"p-3 mb-3"}>
            <TextInput
              className="p-3 text-lg border border-gray-300 rounded-xl max-h-[80px]"
              value={data.system || ""}
              onChangeText={data.updateSystem}
              aria-expanded={false}
              placeholder={"System information (Who is the agent?)"}
              placeholderTextColor={"black"}
              multiline
              numberOfLines={8}
              textAlignVertical={"top"}
              maxLength={255}
              style={[{minHeight: 200, maxHeight: 200}, styles.shadow]}
            />
          </View>
          <View className={"p-3 flex-row"}>
            <TextInput
              className="p-4 text-xl rounded-xl border-gray-300 border"
              value={data.refreshRate || ""}
              onChangeText={(text) => data.handleNumericInput(text)}
              keyboardType={"number-pad"}
              placeholder={data.placeholder.refreshRate.text}
              placeholderTextColor={data.placeholder.refreshRate.color}
              textAlign={"center"}
              maxLength={2}
              style={styles.shadow}
            />
          </View>
        </View>
      </ScrollView>
      <View className={"flex-row justify-evenly p-5"}>
        <TouchableOpacity onPress={() => {
          clear()
          router.dismissAll()
        }}>
          <MaterialIcons name="cancel" size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={data.handleAction}>
          <MaterialIcons name="add-circle" size={44} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create<NamedStyles<any>>({
  shadow: {
    backgroundColor: '#d1d1d1',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 40,
    shadowRadius: 40,
    elevation: 5,
  }
})
