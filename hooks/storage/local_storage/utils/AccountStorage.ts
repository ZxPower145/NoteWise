import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoggedInAccount } from "@/constants/types/AccountTypes";
import CryptoJS from 'crypto-js';
// @ts-ignore
import { ENCRYPTIONKEY } from "@env";

class AccountStorage {
  encryptData(data: LoggedInAccount): string {
    const dataStr: string = JSON.stringify(data);
    // Use CBC mode with a static IV to avoid random number generation
    const key = CryptoJS.enc.Utf8.parse(ENCRYPTIONKEY.slice(0, 32)); // Use first 32 chars as key
    const iv = CryptoJS.enc.Utf8.parse(ENCRYPTIONKEY.slice(0, 16));  // Use first 16 chars as IV
    
    const encrypted = CryptoJS.AES.encrypt(dataStr, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return encrypted.toString();
  }
  
  decryptData(encryptedData: string): LoggedInAccount | null {
    try {
      if (!encryptedData) {
        return null
      }
      // Use the same key and IV for decryption
      const key = CryptoJS.enc.Utf8.parse(ENCRYPTIONKEY.slice(0, 32));
      const iv = CryptoJS.enc.Utf8.parse(ENCRYPTIONKEY.slice(0, 16));
      
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      
      const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedStr) {
        return null
      }
      
      return JSON.parse(decryptedStr);
    } catch (error) {
      console.error('Decryption error:', error);
      return null
    }
  }
  
  async logIn(data: LoggedInAccount): Promise<void> {
    try {
      const encryptedData = this.encryptData(data);
      await AsyncStorage.setItem('account', encryptedData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  
  async logOut(): Promise<void> {
    try {
      await AsyncStorage.removeItem('account');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
  
  async get(): Promise<LoggedInAccount | null> {
    try {
      const encryptedData: string | null = await AsyncStorage.getItem('account');
      if (!encryptedData) {
        return null
      }
      return this.decryptData(encryptedData);
    } catch (error) {
      console.error('Get account error:', error);
      return null
    }
  }
}

export default AccountStorage;
