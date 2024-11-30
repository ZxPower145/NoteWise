import {useEffect, useRef, useState} from "react";
import {Audio} from "expo-av";
import * as FileSystem from 'expo-file-system';
import {EncodingType} from 'expo-file-system';
import {
  AudioConfig,
  PushAudioInputStream,
  ResultReason,
  SpeechConfig,
  SpeechRecognizer
} from "microsoft-cognitiveservices-speech-sdk";
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  IOSAudioQuality,
  IOSOutputFormat
} from "expo-av/build/Audio/RecordingConstants";

const RecordingOptions: Audio.RecordingOptions = {
  isMeteringEnabled: true,
  android: {
    extension: '.wav',
    outputFormat: AndroidOutputFormat.MPEG_4,
    audioEncoder: AndroidAudioEncoder.AAC,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 16000,
  },
  ios: {
    extension: '.wav',
    outputFormat: IOSOutputFormat.LINEARPCM,
    audioQuality: IOSAudioQuality.HIGH,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/wav',
    bitsPerSecond: 128000,
  },
}

export const useAzureSpeechStream = (key: string, region: string, language: "en-US" | "ro-RO") => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedPosition = useRef(0);
  const stream = useRef(PushAudioInputStream.create());
  
  const speechConfig = SpeechConfig.fromSubscription(key, region)
  
  speechConfig.speechRecognitionLanguage = language;
  const audioConfig = AudioConfig.fromStreamInput(stream.current);
  const recognizer = useRef(new SpeechRecognizer(speechConfig, audioConfig));
  
  useEffect(() => {
    recognizer.current.recognizing = (s, e) => {
      if (e.result.reason === ResultReason.RecognizingSpeech) {
        console.log(`Recognizing: ${e.result.text}`);
        setTranscript((prev) => prev + " " + e.result.text);
      }
    };

    recognizer.current.recognized = (s, e) => {
      if (e.result.reason === ResultReason.RecognizedSpeech) {
        console.log(`Recognized: ${e.result.text}`);
        setTranscript((prev) => prev + " " + e.result.text);
      }
    };

    recognizer.current.startContinuousRecognitionAsync();

    return () => {
      recognizer.current.stopContinuousRecognitionAsync();
      recognizer.current.close();
    };
  }, []);
  
  const requestAudioPermissions = async () => {
    const response = await Audio.requestPermissionsAsync();
    return response.status === 'granted';
  };
  
  const startRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        setRecording(null);
      }
      
      const hasPermission = await requestAudioPermissions();
      if (!hasPermission) {
        throw new Error('Permission to access microphone is required!');
      }
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
      
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(RecordingOptions);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
      console.log('Recording started');
      
      intervalRef.current = setInterval(async () => {
        const uri = newRecording.getURI();
        if (uri) {
          const fileInfo = await FileSystem.getInfoAsync(uri, {size: true})
          if (fileInfo.exists) {
            const fileString = await FileSystem.readAsStringAsync(uri, {
              encoding: EncodingType.Base64
            })

            const fileBuffer = Buffer.from(fileString, 'base64')

            stream.current.write(fileBuffer)
          }
        }
      }, 3000);
      
    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsRecording(false);
      throw error;
    }
  };
  
  const stopRecording = async () => {
    if (!recording) return;
    
    try {
      await recording.stopAndUnloadAsync();
      console.log("Recording Stopped")
      setRecording(null);
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        intervalRef.current = null;
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      throw error;
    }
  };
  
  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
  };
};
