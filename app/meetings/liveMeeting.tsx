import {View, Text, TouchableOpacity, ScrollView, FlatList} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {useState, useEffect, useContext} from "react"
import { VoiceStateContext } from "@/components/store/VoiceStateProvider"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const LiveMeeting = () => {
  const [isListening, setIsListening] = useState(false)
  const {
    voiceToText, setRecognized, setPitch, setError, setStarted, addResults, addPartialResults, setEnded
  } = useContext(VoiceStateContext)
  
  const startListening = async () => {
    setIsListening(true)
  }
  
  const stopListening = async () => {
    setIsListening(false)
  }
  
  
  
  return (
    <SafeAreaView className="h-full px-2">
      <Text className="text-2xl text-center mb-2">Dummy Title</Text>
      <ScrollView className="border rounded-2xl" contentContainerStyle={{ width: '100%', flexGrow: 1 }}>
        {
          voiceToText.results.map((item) => (
            <Text key={voiceToText.results.indexOf(item)}>{item.text}</Text>
          ))
        }
      </ScrollView>
      <View className="flex flex-row justify-between p-5">
        <TouchableOpacity>
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
