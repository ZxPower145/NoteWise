import { LocalStorageResponseType } from "@/constants/types/CustomTypes";

class Utils {
  static generateResponse(status: number, error?: string) : LocalStorageResponseType {
    return  {
      status,
      error
    }
  }
  static toLowerNoSpaces(text: string) {
    return text.toLowerCase().split(' ').join('')
  }
}

export default Utils
