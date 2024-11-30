import React, { useEffect } from "react"
import {Stack, SplashScreen, useRouter, Router} from 'expo-router'
import { useFonts } from "expo-font"
import { StatusBar } from "expo-status-bar"
import { AccountStateProvider } from "@/hooks/storage/store/AccountStateProvider"
import {BottomNavigation, MD3Theme, Provider as PaperProvider, useTheme} from "react-native-paper"
import "@/constants/global.css"
import fontsList from "@/constants/values/fontsList"
import {useColorScheme, View} from "react-native"
import { AccountContext } from "@/hooks/storage/store/AccountStateProvider";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts(fontsList)
  const [index, setIndex] = React.useState(0)
  const router: Router = useRouter()
  const accountContext = React.useContext(AccountContext)
  
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  
  const [routes] = React.useState([
    { key: 'index', title: 'Acasă', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'account', title: 'Programări', focusedIcon: 'view-dashboard', unfocusedIcon: 'view-dashboard-outline' },
    { key: 'meetings', title: 'Ședințe', focusedIcon: 'comment-text-multiple', unfocusedIcon: 'comment-text-multiple-outline' },
    { key: 'agents', title: 'Agenți', focusedIcon: 'robot', unfocusedIcon: 'robot-outline' },
  ])
  
  const handleIndexChange = (newIndex: number) => {
    const route = routes[newIndex]
    router.push(route.key === 'index' ? '/' : `/${route.key}`)
    setIndex(newIndex)
  }
  
  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])
  
  if (!fontsLoaded && !error) return null
  
  return (
    <PaperProvider>
      <AccountStateProvider>
        <StatusBar
          backgroundColor={isDark ? '#1d1b1e' : '#ffff'}
          style={isDark ? 'light' : 'dark'}
        />
        <View style={{ flex: 1 }}>
          <View style={{height: '92%'}}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index"/>
              <Stack.Screen name="account"/>
              <Stack.Screen name="meetings"/>
              <Stack.Screen name="agents"/>
            </Stack>
          </View>
          <View style={{height: '8%'}}>
            <BottomNavigation
              navigationState={{ index, routes }}
              onIndexChange={handleIndexChange}
              renderScene={() => null}
            />
          </View>
        </View>
      </AccountStateProvider>
    </PaperProvider>
  )
}
