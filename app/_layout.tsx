import {router, SplashScreen, Tabs, usePathname, useSegments} from 'expo-router'
import { useFonts } from "expo-font"
import {useContext, useEffect, useState} from "react"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { StatusBar } from "expo-status-bar"
import "@/constants/global.css"
import 'react-native-get-random-values'
import {AccountStateProvider} from "@/hooks/storage/store/AccountStateProvider";

const Buffer = require("buffer/").Buffer
global.Buffer = Buffer
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  })
  
  const segments = useSegments()
  
  const hide = segments.includes('login') || segments.includes('signup') || segments.includes('reset')
  
  useEffect(() => {
    if (error) throw error
    
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])
  
  if (!fontsLoaded && !error) return null
  
  return (
    <AccountStateProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#8867f3' }}>
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
          tabBarIcon: ({color}) => <MaterialIcons name="calendar-month" size={24} color={color} />
        }}/>
        
        <Tabs.Screen name="meetings" options={{
          headerShown: false,
          title: 'Meetings',
          tabBarIcon: ({color}) => <MaterialIcons name="sticky-note-2" size={24} color={color}/>
        }}/>
        
        <Tabs.Screen name="agents" options={{
          headerShown: false,
          title: 'Agents',
          tabBarIcon: ({color}) => <MaterialIcons name="support-agent" size={24} color={color} />
        }}/>
      </Tabs>
      <StatusBar backgroundColor={'black'} style={'light'} />
    </AccountStateProvider>
  )
}

export default RootLayout
