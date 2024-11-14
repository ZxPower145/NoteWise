import {useEffect, useState} from "react"
import { Audio } from "expo-av"
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing';
import {
  AudioConfig,
  CancellationDetails,
  CancellationReason,
  ResultReason,
  SpeechConfig,
  SpeechRecognizer
} from "microsoft-cognitiveservices-speech-sdk"

import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  IOSAudioQuality,
  IOSOutputFormat
} from "expo-av/build/Audio/RecordingConstants"
import {Platform} from "react-native";

const RecordingOptions: Audio.RecordingOptions = {
  isMeteringEnabled: true,
  android: {
    extension: '.wav',
    outputFormat: AndroidOutputFormat.DEFAULT,
    audioEncoder: AndroidAudioEncoder.DEFAULT,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 256000,
  },
  ios: {
    extension: '.wav',
    outputFormat: IOSOutputFormat.LINEARPCM,
    audioQuality: IOSAudioQuality.HIGH,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 256000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/wav',
    bitsPerSecond: 256000,
  },
}

export const useAzureSpeech = (key: string, region: string, language: "en-US" | "ro-RO") => {
  const [recording, setRecording] = useState<Audio.Recording>(null)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [transcript, setTranscript] = useState<string>("")
  const Buffer = require('buffer/').Buffer
  
  const speechConfig = SpeechConfig.fromSubscription(key, region)
  speechConfig.speechRecognitionLanguage = language
  
  const requestAudioPermissions = async () => {
    const response = await Audio.requestPermissionsAsync()
    return response.status === 'granted'
  }
  
  const startRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync()
        setRecording(null)
      }
      
      const hasPermission = await requestAudioPermissions()
      if (!hasPermission) {
        throw new Error('Permission to access microphone is required!')
      }
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      })
      
      const newRecording = new Audio.Recording()
      await newRecording.prepareToRecordAsync(RecordingOptions)
      await newRecording.startAsync()
      
      setRecording(newRecording)
      setIsRecording(true)
      console.log('Recording started')
    } catch (error) {
      console.error('Failed to start recording:', error)
      setIsRecording(false)
      throw error
    }
  }
  
  const createWavHeader = (dataLength: number) => {
    const buffer = Buffer.alloc(44);
    
    // RIFF chunk descriptor
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + dataLength, 4);
    buffer.write('WAVE', 8);
    
    // Format sub-chunk
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
    buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
    buffer.writeUInt16LE(1, 22); // NumChannels (1 for mono)
    buffer.writeUInt32LE(16000, 24); // SampleRate
    buffer.writeUInt32LE(32000, 28); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
    buffer.writeUInt16LE(2, 32); // BlockAlign (NumChannels * BitsPerSample/8)
    buffer.writeUInt16LE(16, 34); // BitsPerSample
    
    // Data sub-chunk
    buffer.write('data', 36);
    buffer.writeUInt32LE(dataLength, 40);
    
    return buffer;
  };

// Improved audio file conversion with additional validation
  const convertToWav = (audioData: Buffer): Buffer => {
    // Check if the audio data already has a RIFF header
    const hasRiffHeader = audioData.slice(0, 4).toString() === 'RIFF';
    
    if (hasRiffHeader) {
      console.log('Audio data already has RIFF header');
      return audioData;
    }
    
    const header = createWavHeader(audioData.length);
    return Buffer.concat([header, audioData]);
  };
  
  const getTranscriptFromFile = async (uri): Promise<any> => {
    try {
      console.log("Processing audio file:", uri);
      
      const fileContent = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64
      });
      
      const audioBuffer = Buffer.from(fileContent, 'base64');
      console.log("Audio buffer size:", audioBuffer.length);
      
      const wavBuffer = convertToWav(audioBuffer);
      console.log("WAV buffer size:", wavBuffer.length);
      console.log("First 44 bytes (header):", wavBuffer.slice(0, 44));
      
      const audioConfig = AudioConfig.fromWavFileInput(wavBuffer);
      const recognizer = new SpeechRecognizer(speechConfig, audioConfig);
      
      return new Promise((resolve, reject) => {
        recognizer.recognizeOnceAsync(
          result => {
            if (result.reason === ResultReason.RecognizedSpeech) {
              console.log(`RECOGNIZED: ${result.text}`);
              resolve(result.text);
            } else {
              const errorDetails = result.reason === ResultReason.Canceled
                ? CancellationDetails.fromResult(result).errorDetails
                : 'Speech could not be recognized.';
              console.error(`Recognition failed: ${errorDetails}`);
              reject(new Error(errorDetails));
            }
            recognizer.close();
          },
          error => {
            console.error('Error during recognition:', error);
            recognizer.close();
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Error processing audio:', error);
      throw error;
    }
  };
  
  async function shareCacheFile(fileUri): Promise<void> {
    if (Platform.OS !== 'android') {
      throw new Error('This function is only supported on Android');
    }
    
    try {
      // Verify file exists
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }
      
      // Check if sharing is available
      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (!isSharingAvailable) {
        throw new Error('Sharing is not available on this platform');
      }
      
      // Share with UTI for audio
      await Sharing.shareAsync(fileUri, {
        mimeType: 'audio/wav',
        dialogTitle: 'Save audio file',
        UTI: 'public.audio'
      });
      
      console.log('File sharing dialog opened');
    } catch (error) {
      console.error('Error sharing file:', error);
      throw error;
    }
  }
  
  const stopRecording = async () => {
    if (!recording) return
    
    try {
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      setRecording(null)
      setIsRecording(false)
      
      // await shareCacheFile(uri)
      return await getTranscriptFromFile(uri)
    } catch (error) {
      console.error("Error stopping recording:", error)
      throw error
    }
  }
  
  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording
  }
}
