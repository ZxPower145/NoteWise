import {router, useLocalSearchParams, useNavigation} from "expo-router"
import {useContext, useEffect, useState} from "react"
import {AgentStateContext} from "@/components/store/AgentStateProvider";
import localStorage from "@/hooks/storage/LocalStorage";
import AgentForm from "@/components/pages/AgentForm";
import {AgentDataType} from "@/constants/CustomTypes";
import {ActivityIndicator, Text, View} from "react-native";

const AgentDetails = () => {
  const { name, index } = useLocalSearchParams()
  const navigation = useNavigation()
  
  const {
    agent, setAgent, updateName, updateSystem, updateRefreshRate,
    placeholder, updatePlaceholderText, updatePlaceholderColor
  } = useContext(AgentStateContext)
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    navigation.setOptions({
      title: name
    })
  }, [name])
  
  useEffect(() => {
    const initializeAgent = async () => {
      if (!Array.isArray(name)) {
        try {
          setIsLoading(true)
          setError(null)
          
          const localAgent = await localStorage.agents.get(name)
          if (localAgent && localAgent.length > 0) {
            const retrievedAgent = localAgent[0]
            setAgent({
              name: retrievedAgent.name,
              system: retrievedAgent.system,
              refreshRate: retrievedAgent.refreshRate,
              transcript: retrievedAgent.transcript || ''
            })
          } else {
            setError("Agent not found")
          }
        } catch (error) {
          console.error("Error loading agent:", error)
          setError("Error loading agent")
        } finally {
          setIsLoading(false)
        }
      }
    }
    
    initializeAgent()
  }, [name])
  
  const handleNumericInput = (text: string) => {
    const numValue = text.replace(/[^0-9]/g, '')
    updateRefreshRate(numValue)
  }
  
  const handleUpdateAgent = async () => {
    try {
      const response = await localStorage.agents.update(Number(index), agent)
      if (response.status === 200) {
        router.dismissAll()
      } else {
        console.error(response.error)
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }
  
  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    )
  }
  
  return (
    <AgentForm
      name={agent.name}
      system={agent.system}
      refreshRate={agent.refreshRate}
      placeholder={placeholder}
      updateName={updateName}
      updateSystem={updateSystem}
      handleNumericInput={handleNumericInput}
      handleAction={handleUpdateAgent}
    />
  )
}

export default AgentDetails
