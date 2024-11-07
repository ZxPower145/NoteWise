import AsyncStorage from "@react-native-async-storage/async-storage";
import Utils from "@/hooks/storage/Utils";
import {AgentDataInt, MeetingDataInt} from "@/constants/CustomTypes";

class BasicStorage {
  private readonly storageKey
  private readonly primaryKeyPropertyName
  private readonly noPrimaryKeyError
  private readonly notUniqueError
  private readonly notFoundError
  private storageItems
  
  constructor(storageKey, primaryKeyPropertyName, noPrimaryKeyError,
              notUniqueError, notFoundError) {
    this.storageKey = storageKey
    this.primaryKeyPropertyName = primaryKeyPropertyName
    this.noPrimaryKeyError = noPrimaryKeyError
    this.notUniqueError = notUniqueError
    this.notFoundError = notFoundError
    this.storageItems = []
  }
  
  async initializeStorage() {
    const meetings = await AsyncStorage.getItem(this.storageKey)
    if (meetings === null) {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify([]))
    }
    await this.getAll()
  }
  
  async clearStorage() {
    try {
      await AsyncStorage.removeItem(this.storageKey)
    } catch (err) {
      console.error(err)
    }
  }
  
  async delete(primaryKey: string) {
    try {
      const itemToDelete = this.get(primaryKey)
      if (itemToDelete) {
        const newArr = this.storageItems.filter(item => {
          return (
            Utils.toLowerNoSpaces(item[this.primaryKeyPropertyName]) !==
            Utils.toLowerNoSpaces(primaryKey)
            || null
          )
        })
        if (newArr) {
          this.storageItems = newArr
          await AsyncStorage.setItem(this.storageKey, this.storageItems)
        }
      }
    } catch (error) {
    
    }
  }
  
  async getAll() {
    try {
      const items = await AsyncStorage.getItem(this.storageKey)
      if (items) {
        this.storageItems = JSON.parse(items)
        return JSON.parse(items)
      }
      return []
    } catch (error) {
      console.error(error)
    }
  }
  
  async get(primaryKey: string) {
    try {
      return this.storageItems.filter(item => {
        return (
          Utils.toLowerNoSpaces(item[this.primaryKeyPropertyName]) ===
          Utils.toLowerNoSpaces(primaryKey) ||
          null
        )
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  async add(item: MeetingDataInt | AgentDataInt) {
    try {
      if (!item[this.primaryKeyPropertyName] || item[this.primaryKeyPropertyName === ""]) {
        return Utils.generateResponse(400, this.noPrimaryKeyError)
      }
      if (!(await this.isPrimaryKeyUnique(item[this.primaryKeyPropertyName]))) {
        return Utils.generateResponse(400, this.notUniqueError)
      }
      this.storageItems.push(item)
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(this.storageItems))
      return Utils.generateResponse(200)
    } catch (error) {
      return Utils.generateResponse(400, 'Internal error')
    }
  }
  
  async update(primaryKey: string, propertyToUpdate: string, value: any) {
    try {
      const index = this.storageItems.findIndex(
        item => Utils.toLowerNoSpaces(item[this.primaryKeyPropertyName]) ===
          Utils.toLowerNoSpaces(primaryKey)
      )
      if (index === -1) {
        return Utils.generateResponse(404, this.notFoundError)
      }
      this.storageItems[index] = { ...this.storageItems[index], ...{ property: value }}
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(this.storageItems))
      
      console.log('Updated item:', this.storageItems[index])
      return Utils.generateResponse(200)
    } catch (error) {
      console.error('Error updating item:', error)
      return Utils.generateResponse(400, 'Internal error')
    }
  }
  
  private async isPrimaryKeyUnique(primaryKey: string) {
    return !this.storageItems.find(item => {
      return Utils.toLowerNoSpaces(item[this.primaryKeyPropertyName]) ===
        Utils.toLowerNoSpaces(primaryKey)
    })
  }
  
}
export default BasicStorage
