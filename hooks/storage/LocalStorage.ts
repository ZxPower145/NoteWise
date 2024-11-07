import MeetingStorage from "@/hooks/storage/components/MeetingStorage";
import AgentsStorage from "@/hooks/storage/components/AgentsStorage";

interface LocalStorageResponseType {
  status?: number
  error?: string
}

class LocalStorage {
  meetings: MeetingStorage
  agents: AgentsStorage
  constructor() {
    this.meetings = new MeetingStorage()
    this.agents = new AgentsStorage()
    this.initializeStorages()
  }
  
  async initializeStorages() {
    await this.meetings.initializeStorage()
    await this.agents.initializeStorage()
    
    // await this.agents.clearStorage()
    // await this.meetings.clearStorage()
  }
}

const localStorageInstance = new LocalStorage()
export default localStorageInstance
