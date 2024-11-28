import React, { useContext } from "react";
import { router } from "expo-router";
import { AgentContext } from "@/hooks/storage/store/AgentStateProvider";
import localStorage from "@/hooks/storage/local_storage/LocalStorage";
import AgentForm from "@/components/forms/AgentForm";
import { Response } from "@/constants/types/CustomTypes"

export default function Add() : React.ReactNode {
  const { agent, updateName, updateSystem, updateRefreshRate,
    placeholder, updatePlaceholderText, updatePlaceholderColor } = useContext(AgentContext)
  
  const handleNumericInput = (text: string) => {
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
      
      const response: Response = await localStorage.agents.add(newAgent)
      if (response.status === 400) {
        updateName("")
        
      } else if (response.status === 200) {
        router.dismissAll()
      }
    } catch (error: any) {
      updatePlaceholderText("name", error.message || "")
      updatePlaceholderColor("name", "red")
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
