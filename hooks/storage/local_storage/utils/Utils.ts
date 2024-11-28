import { LocalStorageResponseType } from "@/constants/types/CustomTypes";

export default class Utils {
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
