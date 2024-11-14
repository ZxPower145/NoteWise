import localStorage from "@/hooks/storage/LocalStorage";
import { AgentStateContext } from "@/components/store/AgentStateProvider";
import {useContext} from "react";
import {router} from "expo-router";
import AgentForm from "@/components/pages/AgentForm";

const Add = () => {
  const { agent, setAgent, updateName, updateSystem, updateRefreshRate,
    placeholder, updatePlaceholderText, updatePlaceholderColor } = useContext(AgentStateContext)
  
  const handleNumericInput = (text) => {
    const numValue = text.replace(/[^0-9]/g, '')
    updateRefreshRate(numValue)
  }
  
  const handleSaveAgent = async () => {
    try {
      const newAgent = {
        name: agent.name,
        system: agent.system,
        refreshRate: agent.refreshRate,
        transcript: ''
      }
      
      const response = await localStorage.agents.add(newAgent)
      if (response.status === 400) {
        updateName("")
        updatePlaceholderText("name", response.error || "")
        updatePlaceholderColor("name", "red")
      } else if (response.status === 200) {
        router.dismissAll()
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  return(
    <AgentForm
      name={agent.name}
      system={agent.system}
      refreshRate={agent.refreshRate}
      placeholder={placeholder}
      updateName={updateName}
      updateSystem={updateSystem}
      handleNumericInput={handleNumericInput}
      handleAction={handleSaveAgent}
    />
    )
  
}

export default Add
