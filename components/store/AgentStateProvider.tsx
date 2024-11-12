import { useState, createContext } from "react";
import {AgentDataType} from "@/constants/CustomTypes";

export const AgentStateContext = createContext({})

export const AgentStateProvider = ({ children }) => {
  const [agent, setAgent] = useState<AgentDataType>({
    name: '',
    system: '',
    refreshRate: '',
    transcript: ''
  })
  
  const [placeholder, setPlaceholder] = useState({
    name: {
      text: "Enter your Agent's name",
      color: 'black'
    },
    refreshRate: {
      text: "Refresh Rate",
      color: 'black'
    }
  })
  
  const updatePlaceholderText = (objectToUpdate: string, newPlaceholder: string) => {
    setPlaceholder((prevState) => ({
      ...prevState,
      [objectToUpdate]: {
        ...prevState[objectToUpdate],
        text: newPlaceholder
      }
    }))
  }
  
  const updatePlaceholderColor = (objectToUpdate: string, newColor: string) => {
    setPlaceholder((prevState) => ({
      ...prevState,
      [objectToUpdate]: {
        ...prevState[objectToUpdate],
        color: newColor
      }
    }))
  }
  
  const updateName = (newName: string) => {
    setAgent((prevState: AgentDataType) => ({
      ...prevState,
      name: newName
    }))
  }
  
  const updateSystem = (newSystem: string) => {
    setAgent((prevState: AgentDataType) => ({
      ...prevState,
      system: newSystem
    }))
  }
  
  const updateRefreshRate = (newRefreshRate: string) => {
    setAgent((prevState: AgentDataType) => ({
      ...prevState,
      refreshRate: newRefreshRate
    }))
  }
  
  const setTranscript = (newTranscript: string) => {
    setAgent((prevState) => ({
      ...prevState,
      transcript: newTranscript
    }))
  }
  
  return (
    <AgentStateContext.Provider value={{
      agent,
      setAgent,
      updateName,
      updateSystem,
      updateRefreshRate,
      setTranscript,
      placeholder,
      updatePlaceholderText,
      updatePlaceholderColor
    }}>
      { children }
    </AgentStateContext.Provider>
  )
}
