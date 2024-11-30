import React, { createContext, useContext, useState, useEffect } from 'react';
import { AgentDataType, Response } from "@/constants/types/CustomTypes";
import localStorage from "@/hooks/storage/local_storage/LocalStorage";

interface PlaceholderType {
  name: { text: string; color: string };
  refreshRate: { text: string; color: string };
}

interface AgentContextType {
  agent: AgentDataType;
  agents: AgentDataType[];
  loading: boolean;
  placeholder: PlaceholderType;
  createAgent: (agent: AgentDataType) => Promise<Response>;
  updateAgent: (agent: AgentDataType) => Promise<void>;
  deleteAgent: (name: string) => Promise<void>;
  updateName: (text: string) => void;
  updateSystem: (text: string) => void;
  updateRefreshRate: (text: string) => void;
  setTranscript: (text: string) => void;
  updatePlaceholder: {
    text: (field: keyof PlaceholderType, text: string) => void;
    color: (field: keyof PlaceholderType, color: string) => void;
  };
  refreshAgents: () => Promise<void>;
}

export const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [agent, setAgent] = useState<AgentDataType>({ name: '', system: '', refreshRate: '', transcript: '' });
  const [agents, setAgents] = useState<AgentDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [placeholder, setPlaceholder] = useState<PlaceholderType>({
    name: { text: "Enter your Agent's name", color: 'black' },
    refreshRate: { text: "Refresh Rate", color: 'black' }
  });
  
  const refreshAgents = async () => {
    const allAgents = await localStorage.agents.getAll();
    if (allAgents) setAgents(allAgents);
  };
  
  useEffect(() => {
    const initialize = async () => {
      await localStorage.agents.initializeStorage();
      await refreshAgents();
      setLoading(false);
    };
    initialize();
  }, []);
  
  const saveAgentToStorage = async (updatedAgent: AgentDataType) => {
    const index = localStorage.agents.getIndex(updatedAgent.name);
    if (index !== -1) {
      await localStorage.agents.update(index, updatedAgent);
      await refreshAgents();
    }
  };
  
  const createAgent = async (newAgent: AgentDataType): Promise<Response> => {
    const response = await localStorage.agents.add(newAgent);
    if (response.status === 200) {
      await refreshAgents();
      setAgent(newAgent);
    }
    return response;
  };
  
  const updateAgent = async (updatedAgent: AgentDataType) => {
    setAgent(updatedAgent);
    await saveAgentToStorage(updatedAgent);
  };
  
  const deleteAgent = async (name: string) => {
    await localStorage.agents.delete(name);
    await refreshAgents();
    if (agent.name === name) {
      setAgent({ name: '', system: '', refreshRate: '', transcript: '' });
    }
  };
  
  const updateName = (text: string) => setAgent(prev => ({ ...prev, name: text }));
  const updateSystem = (text: string) => setAgent(prev => ({ ...prev, system: text }));
  const updateRefreshRate = (text: string) => setAgent(prev => ({ ...prev, refreshRate: text }));
  const setTranscript = (text: string) => setAgent(prev => ({ ...prev, transcript: text }));
  
  const updatePlaceholder = {
    text: (field: keyof PlaceholderType, text: string) => {
      setPlaceholder(prev => ({
        ...prev,
        [field]: { ...prev[field], text }
      }));
    },
    color: (field: keyof PlaceholderType, color: string) => {
      setPlaceholder(prev => ({
        ...prev,
        [field]: { ...prev[field], color }
      }));
    }
  };
  
  return (
    <AgentContext.Provider value={{
      agent,
      agents,
      loading,
      placeholder,
      createAgent,
      updateAgent,
      deleteAgent,
      updateName,
      updateSystem,
      updateRefreshRate,
      setTranscript,
      updatePlaceholder,
      refreshAgents
    }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within AgentStateProvider');
  }
  return context;
};
