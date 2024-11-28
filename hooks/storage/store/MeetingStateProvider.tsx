import React, { createContext, useContext, useState } from 'react';
import {AgentDataType, MeetingDataType} from "@/constants/types/CustomTypes";
import localStorage from "@/hooks/storage/local_storage/LocalStorage";

interface MeetingContextType {
  meeting: MeetingDataType
  initializeMeeting: (title: string) => void
  addAgent: (agent: AgentDataType) => void
  removeAgent: (agent: AgentDataType) => void
  updateTranscript: (transcript: string) => void
}

export const MeetingContext = createContext<MeetingContextType | undefined>(undefined)

export const MeetingStateProvider = ({ children }: any) => {
  const [meeting, setMeeting] = useState<MeetingDataType>({} as MeetingDataType)
  const [selectedAgents, setSelectedAgents] = useState<AgentDataType[]>([])
  
  const initializeMeeting = async (title: string) => {
    const localMeeting = await localStorage.meetings.get(title)
    if (localMeeting) {
      setMeeting(localMeeting);
    } else {
      throw new Error("There was a problem fetching the meeting")
    }
  }
  
  const addMeeting = async (meeting: MeetingDataType) => {
  
  }
  
  const addAgent = (agent: AgentDataType) => {
    setMeeting(prevState => {
      const agentExists = prevState.agents && prevState.agents.some(existingAgent => existingAgent.name === agent.name)
      
      if (agentExists) {
        return prevState;
      }
      
      return {
        ...prevState,
        agents: prevState.agents ? [...prevState.agents, agent] : [agent]
      };
    });
  }
  
  const removeAgent = (agent: AgentDataType) => {
    setMeeting(prevState => ({
      ...prevState,
      agents: meeting.agents.filter(ag => ag.name !== agent.name)
    }))
  }
  
  const updateTranscript = (transcript: string) => {
    setMeeting(prevState => ({
      ...prevState,
      transcript: transcript
    }))
  }
  
  return (
      <MeetingContext.Provider value={{
        meeting,
        initializeMeeting,
        addAgent,
        removeAgent,
        updateTranscript
      }}>
        {children}
      </MeetingContext.Provider>
    )
}
