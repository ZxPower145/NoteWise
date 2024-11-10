
interface MeetingDataInt {
  title: string
  date: string
  startTime: string
  initialDetails: string
  transcript: string
  agents: AgentDataInt[]
}

interface AgentDataInt {
  name: string
  system?: string
  refreshRate: string
  transcript?: string
}

interface LocalStorageResponseType {
  status?: number
  error?: string
}

export { MeetingDataInt, AgentDataInt, LocalStorageResponseType }
