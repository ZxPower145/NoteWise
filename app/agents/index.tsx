import React, { useState } from "react"
import { ScrollView, View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router, useFocusEffect } from "expo-router"
import { AgentDataType } from "@/constants/types/CustomTypes"
import localStorage from "@/hooks/storage/local_storage/LocalStorage"
import AgentElement from "@/components/buttons/AgentElement"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function Index() : React.ReactNode {
  const [agents, setAgents] = useState<AgentDataType[]>([])
  
  
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true
      
      const getAllAgents = async () => {
        try {
          const all = await localStorage.agents.getAll()
          if (all && isActive) setAgents(all)
        } catch (error) {
          console.error(error)
        }
      }
      
      getAllAgents()
      
      return () => {
        isActive = false
      }
      
    }, [])
  )
  
  return(
    <SafeAreaView className="h-full p-3">
      <View className="mb-3 flex-row justify-between align-center px-1">
        <Text className="text-2xl font-bold">
          Agents
        </Text>
        <TouchableOpacity onPress={() => {
          router.push("agents/add")
        }}>
          <MaterialIcons name="person-add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView className="border-t border-gray-300" contentContainerStyle={{height: '100%', flexGrow: 1}}>
        {
          agents.map((agent, index) => (
            <AgentElement
              key={index}
              index={index}
              name={agent.name}
              system={agent.system}
              refreshRate={agent.refreshRate}
            />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}
