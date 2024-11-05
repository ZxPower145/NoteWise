import {View, Text, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState, useEffect, useContext } from "react"
import { useLocalSearchParams } from "expo-router"
import { VoiceStateContext } from "@/components/store/VoiceStateProvider"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { KEY, REGION } from "@env"


const LiveMeeting = () => {
  const { title } = useLocalSearchParams()
  const [isListening, setIsListening] = useState(false)
  const {
    voiceTranscript, setError, addResults,
    clearResults, addPartialResults, clearPartialResults
  } = useContext(VoiceStateContext)
  
  const startListening = () => {
    setIsListening(true)
  }
  
  const stopListening = () => {
    setIsListening(false)
  }
  
  return (
    <SafeAreaView className="h-full px-2">
      <Text className="text-2xl text-center mb-2">{title}</Text>
      <ScrollView className="border rounded-2xl" contentContainerStyle={{ width: '100%', flexGrow: 1 }}>
        {
          voiceTranscript.results.map((item) => (
            <Text key={item.id}>{item.text}</Text>
          ))
        }
      </ScrollView>
      <View className="flex flex-row justify-between p-5">
        <TouchableOpacity onPress={() => {
          clearResults()
          clearPartialResults()
        }}>
          <MaterialIcons name="cancel" size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          isListening ? stopListening() : startListening();
        }}>
          <MaterialIcons name={isListening ? 'pause-circle' : 'not-started'} size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="add-circle" size={44} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LiveMeeting;
