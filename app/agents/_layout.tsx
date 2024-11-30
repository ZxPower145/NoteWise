import React from "react";
import { Stack } from "expo-router"
import { AgentStateProvider } from "@/hooks/storage/store/AgentStateProvider";

export default function AgentsLayout(): React.ReactNode {
  return (
    <AgentStateProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="add"/>
        <Stack.Screen name="view/[name]"/>
      </Stack>
    </AgentStateProvider>
  )
}
