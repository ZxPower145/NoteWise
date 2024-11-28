import {Stack} from "expo-router"
import {StatusBar} from "expo-status-bar"
import React from "react";

export default function AccountLayout(): React.ReactNode {
  return (
    <>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='dashboard' options={{headerShown: false, gestureEnabled: false, fullScreenGestureEnabled: false}}/>
        <Stack.Screen name="login" options={{headerShown: false}}/>
        <Stack.Screen name='signup' options={{headerShown: false}}/>
        <Stack.Screen name='activate' options={{headerShown: false}}/>
        <Stack.Screen name='reset' options={{headerShown: false}}/>
      </Stack>
      <StatusBar backgroundColor={'black'} style={'light'} />
    </>
  )
}
