import React, { useContext, useState } from "react"
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import Animated, { Easing, FadeInRight, FadeOutLeft, runOnJS } from 'react-native-reanimated'
import { router, useFocusEffect } from "expo-router"
import { MeetingContext } from "@/hooks/storage/store/MeetingStateProvider"
import { AgentDataType } from "@/constants/types/CustomTypes"
import localStorage from "@/hooks/storage/local_storage/LocalStorage"
import NamedStyles = StyleSheet.NamedStyles

export default function SelectAgents(): React.ReactNode {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [agents, setAgents] = useState<Array<AgentDataType>>([])
  const meetingContext = useContext(MeetingContext)
  
  useFocusEffect(React.useCallback(() => {
    const getAllAgents = async () => {
      try {
        const localAgents = await localStorage.agents.getAll()
        setAgents(localAgents || [])
      } catch (error) {
        console.error("Error fetching agents:", error)
      }
    }
    
    getAllAgents()
    
    return () => {
      setAgents([])
    }
  }, []))
  
  return (
    <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={() => setIsVisible(false)}>
      { isVisible && (
        <Animated.View
          entering={FadeInRight.duration(500).easing(Easing.in(Easing.cubic))}
          exiting={FadeOutLeft.duration(500).easing(Easing.in(Easing.cubic))
            .withCallback((finished) => {
              if (finished) {
                runOnJS(router.back)()
              }
            })
          }
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
          <SafeAreaView className="p-5 bg-white border border-gray-300 rounded-xl align-center justify-center"
            style={styles.container}
          >
            <ScrollView contentContainerStyle={{ height: '100%', flexGrow: 1, justifyContent: 'space-evenly' }} className="gap-3">
              { agents.length > 0 ? (
                agents.map((agent, index) => (
                  <View key={index}
                    className="flex-row items-center justify-center px-1 my-1"
                  >
                    <TouchableOpacity
                      onPress={() => {
                        meetingContext?.addAgent(agent)
                        router.back()
                      }} 
                      className="w-full border border-gray-300 rounded-2xl p-4" 
                      style={{backgroundColor: '#a6a6a6' }}>
                      
                      <Text className="text-3xl text-center font-semibold">{agent.name}</Text>
                    </TouchableOpacity>
                  </View>
                ))
                ) : (
                  <Text className="text-xl text-center font-semibold">No agents available</Text>
                )
              }
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create<NamedStyles<any>>({
  container: {
    height: '40%',
    width: '70%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 40,
    shadowRadius: 40,
    elevation: 7,
  }
})
