import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountInfo } from '@/constants/types/CustomTypes'


class AccountStorage {
  constructor() {
    this.initializeStorage()
  }
  
  async initializeStorage() {
    const account = await AsyncStorage.getItem('account')
    if (!account) {
      await AsyncStorage.setItem('account', JSON.stringify({} as AccountInfo))
    }
    return
  }
  
  async logIn(data: AccountInfo) {
    await AsyncStorage.setItem('account', JSON.stringify({
      email: data.email,
      token: data.token
    }))
  }
  
  async update(field: string, value: string) {
  
  }
  
  async logOut() {
    await AsyncStorage.removeItem('account')
  }
  
  async get() {
    const obj = await AsyncStorage.getItem('account') || ""
    return obj.length > 0 ? JSON.parse(obj) : null
  }
}
export default AccountStorage
