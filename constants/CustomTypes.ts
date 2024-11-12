
interface MeetingDataType {
  title: string
  date: string
  startTime: string
  initialDetails: string
  transcript: string
  agents: AgentDataType[]
}

interface AgentDataType {
  name: string
  system?: string
  refreshRate: string
  transcript?: string
}

interface LocalStorageResponseType {
  status?: number
  error?: string
}

export { MeetingDataType, AgentDataType, LocalStorageResponseType }
