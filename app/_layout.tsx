import React, { useEffect } from "react"
import { SplashScreen, Tabs, useSegments } from 'expo-router'
import { useFonts } from "expo-font"
import { StatusBar } from "expo-status-bar"
import { AccountStateProvider } from "@/hooks/storage/store/AccountStateProvider";
import {Provider as PaperProvider, useTheme} from "react-native-paper";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import "@/constants/global.css"
import fontsList from "@/constants/values/fontsList";

global.Buffer = require("buffer/").Buffer

SplashScreen.preventAutoHideAsync()

export default function RootLayout(): React.ReactNode {
  const [fontsLoaded, error] = useFonts(fontsList)
  const theme = useTheme()
  const tabs = useSegments()
  
  const hide: boolean =
    tabs.includes('login') ||
    tabs.includes('signup') ||
    tabs.includes('reset') ||
    tabs.includes('activate')
  
  useEffect(() => {
    if (error) throw error
    
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])
  
  if (!fontsLoaded && !error) return null
  
  return (
    <AccountStateProvider>
      <PaperProvider>
        <Tabs screenOptions={{tabBarActiveTintColor: '#8867f3'}}>
          <Tabs.Screen name="index" options={{
            headerShown: false,
            title: 'Home',
            tabBarStyle: {display: 'none'},
            tabBarButton: () => null
          }}/>
          
          <Tabs.Screen name="account" options={{
            headerShown: false,
            title: 'Dashboard',
            tabBarStyle: {display: hide ? 'none' : 'flex'},
            tabBarIcon: ({color}) =>
              <MaterialIcons name="calendar-month" size={24} color={color}/>
          }}/>
          
          <Tabs.Screen name="meetings" options={{
            headerShown: false,
            title: 'Meetings',
            tabBarIcon: ({color}) =>
              <MaterialIcons name="sticky-note-2" size={24} color={color}/>
          }}/>
          
          <Tabs.Screen name="agents" options={{
            headerShown: false,
            title: 'Agents',
            tabBarIcon: ({color}) =>
              <MaterialIcons name="support-agent" size={24} color={color}/>
          }}/>
        </Tabs>
        <StatusBar backgroundColor={theme.colors.onBackground} style={theme.colors.background === 'rgba(255, 251, 254, 1)' ? 'dark' : 'light'} />
      </PaperProvider>
    </AccountStateProvider>
  )
}
