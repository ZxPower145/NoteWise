import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar";
import {VoiceStateProvider} from "@/components/store/VoiceStateProvider";

const MeetingsLayout = () => {
  return (
    <VoiceStateProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: false
        }}/>
        
        <Stack.Screen name="add" options={{
          headerShown: true,
          title: 'Start New Meeting'
        }}/>
        
        <Stack.Screen name="liveMeeting" options={{
          headerShown: true,
          title: 'Transcript Live'
        }}/>
        
        <Stack.Screen name="view/[id]" options={{
          headerShown: false
        }}/>
      </Stack>
      <StatusBar backgroundColor="black" style="light" />
    </VoiceStateProvider>
  )
}

export default MeetingsLayout
