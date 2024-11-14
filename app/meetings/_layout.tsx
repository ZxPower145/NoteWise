import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar";
import {VoiceStateProvider} from "@/components/store/VoiceStateProvider";
import {MeetingContextProvider} from "@/components/store/MeetingStateProvider";

const MeetingsLayout = () => {
  return (
    <MeetingContextProvider>
      <VoiceStateProvider>
        <Stack screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          
          <Stack.Screen name="index" options={{
            headerShown: false
          }}/>
          
          <Stack.Screen name="modals/deleteConfirmation" options={{
            presentation: "transparentModal",
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
          
          <Stack.Screen name="modals/selectAgents" options={{
            presentation: "transparentModal",
            headerShown: false
          }}/>
          
          <Stack.Screen name="view/[title]" options={{
            headerShown: true,
          }}/>
          
        </Stack>
        <StatusBar backgroundColor="black" style="light" />
      </VoiceStateProvider>
    </MeetingContextProvider>
  )
}

export default MeetingsLayout
