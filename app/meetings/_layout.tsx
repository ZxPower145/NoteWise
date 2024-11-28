import React from "react";
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar";
import { VoiceStateProvider } from "@/hooks/storage/store/VoiceStateProvider";
import { MeetingStateProvider } from "@/hooks/storage/store/MeetingStateProvider";
import {useTheme} from "react-native-paper";
export default function MeetingsLayout(): React.ReactNode {
  const theme = useTheme()
  console.log(theme.colors.background)
  return (
    <MeetingStateProvider>
      <VoiceStateProvider>
        <Stack>
          <Stack.Screen name="index" options={{
            headerShown: false
          }}/>
          
          <Stack.Screen name="modals/deleteConfirmation" options={{
            presentation: "transparentModal",
            headerShown: false
          }}/>
          
          <Stack.Screen name="add" options={{
            headerShown: false
          }}/>
          
          <Stack.Screen name="liveMeeting" options={{
            headerShown: false,
          }}/>
          
          <Stack.Screen name="modals/selectAgents" options={{
            presentation: "transparentModal",
            headerShown: false
          }}/>
          
          <Stack.Screen name="view/[title]" options={{
            headerShown: true,
          }}/>
        </Stack>
      </VoiceStateProvider>
    </MeetingStateProvider>
  )
}
