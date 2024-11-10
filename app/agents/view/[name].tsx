import {router, useLocalSearchParams, useNavigation} from "expo-router"
import {useContext, useEffect, useState} from "react"
import {AgentStateContext} from "@/components/store/AgentStateProvider";
import localStorage from "@/hooks/storage/LocalStorage";
import AgentForm from "@/components/pages/AgentForm";


const AgentDetails = () => {
  const { name } = useLocalSearchParams()
  const navigation = useNavigation()
  const {agent, setAgent, updateName, updateSystem, updateRefreshRate, setTranscript,
    placeholder, updatePlaceholderText, updatePlaceholderColor} = useContext(AgentStateContext)
  
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    navigation.setOptions({
      title: name
    })
  }, [name])
  
  const initializeAgent = async () => {
    if (!Array.isArray(name)) {
      const localAgent = await localStorage.agents.get(name)
      setIndex(localStorage.agents.getIndex(name))
      setAgent(localAgent)
    }
  }
  
  const handleNumericInput = (text) => {
    const numValue = text.replace(/[^0-9]/g, '')
    updateRefreshRate(numValue)
  }
  
  const handleUpdateAgent = async () => {
    try {
      const response = await localStorage.agents.update(index, agent)
      if (response.status === 200) {
        router.dismissAll()
      } else {
        console.error(response.error)
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  return  (
    <AgentForm
      agent={agent}
      placeholder={placeholder}
      updateName={updateName}
      updateSystem={updateSystem}
      handleNumericInput={handleNumericInput}
      handleAction={handleUpdateAgent}
    />
  )
}

export default AgentDetails
