import {View, Text, TouchableOpacity, ScrollView, Alert} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {useLocalSearchParams} from "expo-router"
import { KEY, REGION } from "@env"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import useAzureSpeechToText from '@/hooks/useAzureSpeech';

const azureConfig = {
  key: KEY,
  region: REGION
}


const LiveMeeting = () => {
  const { title } = useLocalSearchParams()
  const {
    isRecording,
    transcript,
    error,
    startRecording,
    stopRecording,
  } = useAzureSpeechToText(
    KEY,
    REGION
  );
  
  
  return (
    <SafeAreaView className="h-full px-2">
      <Text className="text-2xl text-center mb-2">{title}</Text>
      <ScrollView className="border rounded-2xl" contentContainerStyle={{ width: '100%', flexGrow: 1 }}>
        <Text>{transcript}</Text>
      </ScrollView>
      <View className="flex flex-row justify-between p-5">
        <TouchableOpacity onPress={() => {
        }}>
          <MaterialIcons name="cancel" size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          isRecording ? stopRecording() : startRecording();
        }}>
          <MaterialIcons name={isRecording ? 'pause-circle' : 'not-started'} size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="add-circle" size={44} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LiveMeeting
