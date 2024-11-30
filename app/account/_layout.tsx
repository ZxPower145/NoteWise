import React from "react";
import { Stack } from "expo-router";

export default function AccountLayout(): React.ReactNode {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='dashboard' options={{ gestureEnabled: false, fullScreenGestureEnabled: false}}/>
      <Stack.Screen name="login"/>
      <Stack.Screen name='signup'/>
      <Stack.Screen name='activate'/>
      <Stack.Screen name='reset'/>
    </Stack>
  )
}
