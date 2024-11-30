import React, { createContext, useContext, useState, useEffect } from 'react';
import { AgentDataType, MeetingDataType, Response } from "@/constants/types/CustomTypes";
import localStorage from "@/hooks/storage/local_storage/LocalStorage";

interface MeetingContextType {
  meeting: MeetingDataType;
  meetings: MeetingDataType[];
  loading: boolean;
  initializeMeeting: (title: string) => Promise<void>;
  createMeeting: (meeting: MeetingDataType) => Promise<Response>;
  updateMeeting: (meeting: MeetingDataType) => Promise<void>;
  deleteMeeting: (title: string) => Promise<void>;
  addAgent: (agent: AgentDataType) => Promise<void>;
  removeAgent: (agent: AgentDataType) => Promise<void>;
  updateTranscript: (transcript: string) => Promise<void>;
  refreshMeetings: () => Promise<void>;
}

export const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [meeting, setMeeting] = useState<MeetingDataType>({} as MeetingDataType);
  const [meetings, setMeetings] = useState<MeetingDataType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const refreshMeetings = async () => {
    const allMeetings = await localStorage.meetings.getAll();
    if (allMeetings) {
      setMeetings(allMeetings);
    }
  };
  
  useEffect(() => {
    const initialize = async () => {
      await localStorage.meetings.initializeStorage();
      await refreshMeetings();
      setLoading(false);
    };
    initialize();
  }, []);
  
  const saveMeetingToStorage = async (updatedMeeting: MeetingDataType) => {
    const index = localStorage.meetings.getIndex(updatedMeeting.title);
    if (index !== -1) {
      await localStorage.meetings.update(index, updatedMeeting);
    }
    await refreshMeetings();
  };
  
  const initializeMeeting = async (title: string) => {
    const localMeeting = await localStorage.meetings.get(title);
    if (localMeeting) {
      setMeeting(localMeeting);
    } else {
      throw new Error("Meeting not found");
    }
  };
  
  const createMeeting = async (newMeeting: MeetingDataType): Promise<Response> => {
    const response = await localStorage.meetings.add(newMeeting);
    if (response.status === 200) {
      await refreshMeetings();
      setMeeting(newMeeting);
    }
    return response;
  };
  
  const updateMeeting = async (updatedMeeting: MeetingDataType) => {
    setMeeting(updatedMeeting);
    await saveMeetingToStorage(updatedMeeting);
  };
  
  const deleteMeeting = async (title: string) => {
    await localStorage.meetings.delete(title);
    await refreshMeetings();
    if (meeting.title === title) {
      setMeeting({} as MeetingDataType);
    }
  };
  
  const addAgent = async (agent: AgentDataType) => {
    const updatedMeeting = {
      ...meeting,
      agents: meeting.agents ?
        meeting.agents.some(existingAgent => existingAgent.name === agent.name) ?
          meeting.agents : [...meeting.agents, agent]
        : [agent]
    };
    await updateMeeting(updatedMeeting);
  };
  
  const removeAgent = async (agent: AgentDataType) => {
    const updatedMeeting = {
      ...meeting,
      agents: meeting.agents.filter(ag => ag.name !== agent.name)
    };
    await updateMeeting(updatedMeeting);
  };
  
  const updateTranscript = async (transcript: string) => {
    const updatedMeeting = {
      ...meeting,
      transcript
    };
    await updateMeeting(updatedMeeting);
  };
  
  return (
    <MeetingContext.Provider value={{
      meeting,
      meetings,
      loading,
      initializeMeeting,
      createMeeting,
      updateMeeting,
      deleteMeeting,
      addAgent,
      removeAgent,
      updateTranscript,
      refreshMeetings
    }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error('useMeeting must be used within a MeetingStateProvider');
  }
  return context;
};
