import AsyncStorage from "@react-native-async-storage/async-storage"
import { meetingData, agentInfo } from "@/constants/CustomTypes";

class LocalStorage {
  constructor() {
    this.initializeMeetingsStorage()
    this.initializeAgentsStorage()
  }
  
  async initializeMeetingsStorage() {
    const meetings = await this.getItem("meetings")
    if (meetings === null) {
      await this.setItem('meetings', [])
    }
  }
  
  async initializeAgentsStorage() {
    const agents = await this.getItem("agents")
    if (agents === null) {
      await this.setItem("agents", [])
    }
  }
  
  async addItem(key: string, value: meetingData | agentInfo) {
    try {
      switch (key) {
        case 'meetings':
          if ('title' in value && value.title) {
            if (!await this.isValueUnique('meetings', 'title', value.title)) {
              console.warn("You already have a meeting with that title!")
              return 400
            } else {
              const meetings = await this.getItem('meetings');
              if (Array.isArray(meetings)) {
                await this.setItem('meetings', [...meetings, value])
                return 201
              } else {
                console.error("Saving the meeting failed, make sure 'meetings' is a list!")
                return 500
              }
            }
          }
          return 400
        
        case 'agents':
          if ('name' in value && value.name) {
            if (!await this.isValueUnique("agents", 'name', value.name)) {
              console.warn("You already have an agent with that name!")
              return 400
            } else {
              const agents = await this.getItem('agents')
              if (Array.isArray(agents)) {
                await this.setItem('agents', [...agents, value])
                return 201
              } else {
                console.error("Saving the agent failed, make sure 'agents' is a list!")
                return 500
              }
            }
          }
          return 400;
        
        default:
          console.warn("You can only add an item to 'meetings' or 'agents' arrays.")
          return 400
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return 50
    }
  }
  
  
  async setItem(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }
  
  async getItem(key: string) {
    try {
      const data: any = await AsyncStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error getting item:', error)
      throw error
    }
  }
  
  async findObjectByValue(key: string, field: string, value: string) {
    const object = await this.getItem(key)
    if (Array.isArray(object)) {
      object.find((obj) => {
        if (field in obj) {
          return this.lowerNoSpaces(obj[field]) === this.lowerNoSpaces(value) ? obj : null
        }
      })
    }
    return null
  }
  
  async isValueUnique(key: string, field: string, value: string) {
    const object = await this.getItem(key)
    if (Array.isArray(object)) {
      const objectWithValue = object.find((obj) => {
        if (field in obj) {
          return this.lowerNoSpaces(obj[field]) === this.lowerNoSpaces(value)
        }
        return false
      })
      return objectWithValue === undefined;
    }
    return false
  }
  
  async deleteItem(key: string) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.error("No store object with that name! ", e)
    }
  }
  
  lowerNoSpaces(text: string) {
    return text.toLowerCase().split(" ").join("")
  }
}

const localStorageInstance = new LocalStorage()
export default localStorageInstance
