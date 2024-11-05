
interface meetingData {
  title: string
  date: string
  startTime: string
  initialDetails: string
  transcript: string
}

interface agentInfo {
  name: string
  system: string
  refreshRate: number
}

export { meetingData, agentInfo }
