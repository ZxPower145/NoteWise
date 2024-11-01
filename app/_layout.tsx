import {SplashScreen, Tabs} from 'expo-router'
import { useFonts } from "expo-font"
import {useEffect} from "react"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import "@/constants/global.css"
import {StatusBar} from "expo-status-bar";

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
  
  useEffect(() => {
    if (error) throw error
    
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])
  
  if (!fontsLoaded && !error) return null
  
  return (
    <>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#8867f3' }}>
        <Tabs.Screen name="index" options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({color}) => <MaterialIcons name="home" size={24} color={color}/>
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
    </>
  )
}

export default RootLayout
