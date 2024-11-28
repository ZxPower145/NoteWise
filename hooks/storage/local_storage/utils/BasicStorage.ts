import AsyncStorage from "@react-native-async-storage/async-storage";
import Utils from "@/hooks/storage/local_storage/utils/Utils";
import { AgentDataType, MeetingDataType } from "@/constants/types/CustomTypes";
import { Response } from "@/constants/types/CustomTypes"
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface BasicStorageConstruct<T> {
  storageKey: string;
  primaryKeyPropertyName: keyof T;
  noPrimaryKeyError: string;
  notUniqueError: string;
  notFoundError: string;
  generateId?: boolean;
}

export default class BasicStorage<T extends MeetingDataType | AgentDataType> {
  private readonly storageKey: string;
  private readonly primaryKeyPropertyName: keyof T;
  private readonly noPrimaryKeyError: string;
  private readonly notUniqueError: string;
  private readonly notFoundError: string;
  private readonly generateId: boolean;
  private storageItems: Array<T>;
  
  constructor(props: BasicStorageConstruct<T>) {
    this.storageKey = props.storageKey;
    this.primaryKeyPropertyName = props.primaryKeyPropertyName;
    this.noPrimaryKeyError = props.noPrimaryKeyError;
    this.notUniqueError = props.notUniqueError;
    this.notFoundError = props.notFoundError;
    this.generateId = props.generateId ?? false; // Default to false
    this.storageItems = [];
  }
  
  async initializeStorage(): Promise<void> {
    const items: Array<T> | null = await this.getAll()
    if (!items) {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify([]))
    } else {
      this.storageItems = items
    }
  }
  
  async clearStorage(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.storageKey)
    } catch (err) {
      console.error(err)
    }
  }
  
  async delete(primaryKey: string): Promise<void> {
    try {
      const itemToDelete: T | null = await this.get(primaryKey)
      if (itemToDelete) {
        const newArr: Array<T> = this.storageItems.filter(item => {
          return (
            Utils.toLowerNoSpaces(item[this.primaryKeyPropertyName]) !==
            Utils.toLowerNoSpaces(primaryKey)
            || null
          )
        })
        if (newArr) {
          this.storageItems = newArr
          await AsyncStorage.setItem(this.storageKey, JSON.stringify(this.storageItems))
        }
      }
    } catch (error) {
      console.error(`There was a problem deleting the item ${primaryKey}`)
    }
  }
  
  async getAll(): Promise<Array<T> | null> {
    try {
      return new Promise<Array<T> | null>(async (resolve, reject) => {
        const rawItems = await AsyncStorage.getItem(this.storageKey);
        if (rawItems) {
          const items: Array<T> = JSON.parse(rawItems)
          resolve(items);
        } else {
          reject(new Error(this.notFoundError));
        }
      })
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  async get(primaryKey: string): Promise<T | null> {
    try {
      return new Promise<T | null>(
        (resolve, reject) => {
        const item: T = this.storageItems.find(item => item[this.primaryKeyPropertyName] === primaryKey);
        if (item) {
          resolve(item);
        } else {
          reject(new Error(this.notFoundError));
        }
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  async add(item: T): Promise<Response> {
    return new Promise<Response>(async (resolve, reject) => {
      try {
        // If generateId is true and the primary key is missing or empty, generate a UUID
        if (this.generateId &&
          (!item[this.primaryKeyPropertyName] ||
            (item[this.primaryKeyPropertyName] as string).length === 0)) {
          (item[this.primaryKeyPropertyName] as any) = uuidv4();
        }
        
        if (!(this.primaryKeyPropertyName in item)) {
          reject({
            status: 400,
            message: this.noPrimaryKeyError
          } as Response);
          return;
        }
        
        const validity: Response = await this.isItemValid(item);
        
        if (validity.status !== 200) {
          reject({
            status: validity.status,
            message: validity.message
          } as Response);
          return;
        }
        
        this.storageItems.push(item);
        await AsyncStorage.setItem(this.storageKey, JSON.stringify(this.storageItems));
        
        resolve({
          status: 200,
          message: 'Item added successfully'
        } as Response);
      } catch (error) {
        reject({
          status: 500,
          message: `Failed to add item: ${error}`
        } as Response);
      }
    });
  }
  
  
  async update(index: number, item: T): Promise<void> {
    try {
      const validity = await this.isItemValid(item)
      
      if (validity.status!== 200) {
        throw new Error(validity.message)
      }
      
      if (index >= this.storageItems.length) throw new Error("Out of bounds")
      
      this.storageItems[index] = item
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(this.storageItems))
      
      console.log('Updated item:', this.storageItems[index])
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }
  
  getIndex(primaryKey: string) {
    return this.storageItems.findIndex(
      item => Utils.toLowerNoSpaces(item[this.primaryKeyPropertyName]) ===
        Utils.toLowerNoSpaces(primaryKey)
    )
  }
  
  private async isPrimaryKeyUnique(primaryKey: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const itemWithGivenPrimaryKey = this.storageItems.find(item => {
        return Utils.toLowerNoSpaces(item[this.primaryKeyPropertyName]) === Utils.toLowerNoSpaces(primaryKey)
      })
      resolve(!itemWithGivenPrimaryKey)
    })
  }
  
  private async isItemValid(item: T): Promise<Response> {
    return new Promise<Response>(async resolve=> {
      if (!item) resolve(
        {
          status: 400,
          message: "No item was provided"
        }
      )
      if (item[this.primaryKeyPropertyName as keyof typeof item] as string === "") resolve(
        {
          status: 400,
          message: this.noPrimaryKeyError
        }
      )
      if (!(await this.isPrimaryKeyUnique(item[this.primaryKeyPropertyName as keyof typeof item] as string))) resolve(
        {
          status: 400,
          message: this.notUniqueError
        }
      )
      resolve({ status: 200 } as Response)
    })
  }
}
