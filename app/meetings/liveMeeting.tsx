import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import {useContext, useEffect, useState} from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import {router, useLocalSearchParams, useNavigation} from "expo-router"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useAzureSpeechStream } from "@/hooks/speech/useAzureSpeech";
import { MeetingContext } from "@/hooks/storage/store/MeetingStateProvider";
import { KEY, REGION } from "@env"

const LiveMeeting = () => {
  const { title } = useLocalSearchParams()
  const navigation = useNavigation()
  
  const {
    meeting, initializeMeeting, removeAgent, updateTranscript
  } = useContext(MeetingContext)
  
  const {
    isRecording, transcript, startRecording, stopRecording
  } = useAzureSpeechStream(KEY, REGION, "en-US")
  
  useEffect(() => {
    const init = async () => {
      await initializeMeeting(title as string)
      navigation.setOptions({
        title: title
      })
    }
    init()
  }, [title])
  
  useEffect(() => {
    // console.log(meeting.agents)
  }, [meeting.agents])
  
  useEffect(() => {
    if (transcript) {
      updateTranscript(transcript)
    }
  }, [transcript])
  
  return (
    <SafeAreaView className="h-full flex-1">
      <ScrollView
        className="flex-1"
        scrollEnabled={!!meeting.agents}
        contentContainerStyle={{
          gap: 20,
          justifyContent: 'space-between',
          paddingBottom: 100
        }}
      >
        {/* Main transcription */}
        <View className="mx-auto px-4" style={{
          width: '95%', height: 400, marginBottom: 30
        }}>
          <Text className="text-2xl font-semibold px-2">Live Transcript:</Text>
          <View className="rounded-2xl border border-gray-300 h-full" style={{
            backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 40,
            shadowRadius: 40,
            elevation: 7,
          }}>
            <ScrollView className="h-full p-3">
              <Text>{meeting.transcription}</Text>
            </ScrollView>
          </View>
        </View>
      
        {/* Agent transcriptions */}
        {meeting.agents && meeting.agents.length > 0 ? (
          meeting.agents.map((agent, index) => (
            <View key={index} className="mx-auto px-4" style={{
              width: '95%', height: 400, marginBottom: 30
            }}>
              <Text className="text-2xl font-semibold px-2">{ agent.name }</Text>
              <View className="rounded-2xl border border-gray-300 h-full" style={{
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 40,
                shadowRadius: 40,
                elevation: 7,
              }}>
                <ScrollView className="h-full p-3">
                  <Text>{agent.transcription}</Text>
                </ScrollView>
              </View>
            </View>
          ))
        ) : null}
      </ScrollView>
    
      <View className="flex flex-row justify-between p-5 border-t border-gray-300 bg-white">
        <TouchableOpacity onPress={() => {
          router.dismissAll()
        }}>
          <MaterialIcons name="cancel" size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={
          isRecording ? stopRecording : startRecording
        }>
          <MaterialIcons name={isRecording ? 'pause-circle' : 'not-started'} size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          router.push("meetings/modals/selectAgents")
        }}>
          <MaterialIcons name="add-circle" size={44} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )
}

export default LiveMeeting
