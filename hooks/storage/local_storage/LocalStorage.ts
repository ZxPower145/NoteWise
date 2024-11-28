import MeetingStorage from "@/hooks/storage/local_storage/utils/MeetingStorage";
import AgentsStorage from "@/hooks/storage/local_storage/utils/AgentsStorage";
import AccountStorage from "@/hooks/storage/local_storage/utils/AccountStorage";

class LocalStorage {
  meetings: MeetingStorage
  agents: AgentsStorage
  account: AccountStorage
  constructor() {
    this.meetings = new MeetingStorage()
    this.agents = new AgentsStorage()
    this.account = new AccountStorage()
    this.initializeStorages()
  }
  
  async initializeStorages() {
    await this.meetings.initializeStorage()
    await this.agents.initializeStorage()
    
    // await this.agents.clearStorage()
    // await this.meetings.clearStorage()
    // await this.account.logOut()
  }
}

const localStorageInstance = new LocalStorage()
export default localStorageInstance
