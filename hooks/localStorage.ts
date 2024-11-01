import AsyncStorage from '@react-native-async-storage/async-storage'

const saveItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(pausevalue))
  } catch (e) {
    throw new Error(e.message)
  }
}

const getItem = async (key: string) => {
  await AsyncStorage.getItem(key)
    .then((data) => {
      if (data) {
        return JSON.parse(data)
      }
      return null
    }).catch((err) => {
      console.error(err)
    })
}


const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    return null
  }
}

export default {
  saveItem,
  getItem,
  removeItem
}
