import React from "react";
import { Stack } from "expo-router";
import { MeetingStateProvider } from "@/hooks/storage/store/MeetingStateProvider";

export default function MeetingsLayout(): React.ReactNode {
  return (
    <MeetingStateProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="add"/>
        <Stack.Screen name="liveMeeting"/>
        <Stack.Screen name="view/[title]"/>
      </Stack>
    </MeetingStateProvider>
  )
}
