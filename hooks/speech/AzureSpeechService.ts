import {
  AudioConfig, SpeechConfig
} from "microsoft-cognitiveservices-speech-sdk";
import * as fs from 'fs'

import { Audio } from "expo-av";
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  IOSAudioQuality,
  IOSOutputFormat
} from "expo-av/build/Audio/RecordingConstants";


const RecordingOptions = {
  isMeteringEnabled: true,
  android: {
    extension: '.wav',
    outputFormat: AndroidOutputFormat.DEFAULT,
    audioEncoder: AndroidAudioEncoder.DEFAULT,
    sampleRate: 16000,
    bitRate: 16000,
    numberOfChannels: 1
  },
  ios: {
    extension: '.wav',
    outputFormat: IOSOutputFormat.LINEARPCM,
    audioQuality: IOSAudioQuality.HIGH,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 16000
  },
}

class AzureSpeechService {
  speechConfig
  audioConfig
  
  constructor(
    private readonly subscriptionKey: string,
    private readonly serviceRegion: string,
    private readonly language: "en-US" | "ro-RO"
  ){ this.initialize() }
  
  initialize(){
    this.speechConfig = SpeechConfig.fromSubscription(this.subscriptionKey, this.serviceRegion);
    this.speechConfig.speechRecognitionLanguage = this.language;
  }
  
  async startRecording() {
    try {
    
    } catch (error) {
      console.error(error)
    }
  }
  
  async stopRecording() {
    try {
    
    } catch (error) {
      console.error(error)
    }
  }
  
  
}
