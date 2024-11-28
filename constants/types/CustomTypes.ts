
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
  system: string
  refreshRate: string
  transcript?: string
}

interface LocalStorageResponseType {
  status?: number
  error?: string
}

interface AccountInfo {
  email: string
  phoneNumber?: string
  firstName?: string
  lastName?: string
  country?: string
  city?: string
  password?: string
  token?: string
}

interface Response {
  status: number
  message?: string
}

export {
  MeetingDataType,
  AgentDataType,
  LocalStorageResponseType,
  AccountInfo,
  Response
}
