import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import {
    SpeechConfig,
    AudioConfig,
    ConversationTranscriber,
    ResultReason,
    AudioInputStream,
    PushAudioInputStream,
    SessionEventArgs,
    ConversationTranscriptionEventArgs,
    CancellationEventArgs
} from 'microsoft-cognitiveservices-speech-sdk'

export interface TranscriptionResult {
    text: string
    speakerId: string
    timestamp: Date
}

export interface TranscriptionError {
    errorDetails: string
    sessionId?: string
}

export interface TranscriptionCallbacks {
    onTranscribed?: (result: TranscriptionResult) => void
    onError?: (error: TranscriptionError) => void
    onSessionStarted?: (sessionId: string) => void
    onSessionStopped?: (sessionId: string) => void
    onCanceled?: (error: TranscriptionError) => void
}

export class AzureSpeechService {
    private speechConfig: SpeechConfig | null = null
    private pushStream: PushAudioInputStream | null = null
    private transcriber: ConversationTranscriber | null = null
    private isTranscribing: boolean = false
    private recording: Audio.Recording | null = null
    private callbacks: TranscriptionCallbacks = {}
    
    constructor(
      private readonly subscriptionKey: string,
      private readonly serviceRegion: string,
      private readonly language: "en-US" | "ro-RO"
    ) {
        this.initializeAudioPermissions()
    }
    
    public setCallbacks(callbacks: TranscriptionCallbacks) {
        this.callbacks = callbacks
    }
    
    private async initializeAudioPermissions(): Promise<void> {
        try {
            await Audio.requestPermissionsAsync()
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
            })
        } catch (error) {
            throw new Error(`Failed to initialize audio permissions: ${error}`)
        }
    }
    
    private initialize(): void {
        try {
            if (!this.speechConfig) {
                this.speechConfig = SpeechConfig.fromSubscription(
                  this.subscriptionKey,
                  this.serviceRegion
                )
                this.speechConfig.speechRecognitionLanguage = this.language
            }
        } catch (error) {
            throw new Error(`Failed to initialize speech service: ${error instanceof Error ? error.message : String(error)}`)
        }
    }
    
    public async startRecordingAndTranscribing(): Promise<any> {
        try {
            this.initialize()
            
            if (!this.speechConfig) {
                throw new Error("SpeechConfig initialization failed")
            }
            
            this.recording = new Audio.Recording()
            await this.recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
            await this.recording.startAsync()
            
            const audioConfig = this.initializeStream()
            this.transcriber = new ConversationTranscriber(this.speechConfig, audioConfig)
            
            this.setupTranscriberEvents()
            
            return new Promise((resolve, reject) => {
                if (!this.transcriber) {
                    reject(new Error("Transcriber not initialized"))
                    return
                }
                
                this.transcriber.startTranscribingAsync(
                  () => {
                      this.isTranscribing = true
                      resolve()
                  },
                  (error) => {
                      reject(new Error(`Failed to start transcription: ${error}`))
                      this.cleanup()
                  }
                )
            })
        } catch (error) {
            this.cleanup()
            throw error
        }
    }
    
    private setupTranscriberEvents(): void {
        if (!this.transcriber) return
        
        this.transcriber.sessionStarted = (s: ConversationTranscriber, e: SessionEventArgs) => {
            console.log("Transcription event:", e.sessionId)
            this.callbacks.onSessionStarted?.(e.sessionId)
        }
        
        this.transcriber.sessionStopped = (s: ConversationTranscriber, e: SessionEventArgs) => {
            console.log("Transcription event:", e.sessionId)
            this.callbacks.onSessionStopped?.(e.sessionId)
            this.cleanup()
        }
        
        this.transcriber.canceled = (s: ConversationTranscriber, e: CancellationEventArgs) => {
            console.log("Transcription event:", e.errorDetails)
            this.callbacks.onCanceled?.({ errorDetails: e.errorDetails })
            this.cleanup()
        }
        
        this.transcriber.transcribed = (s: ConversationTranscriber, e: ConversationTranscriptionEventArgs) => {
            console.log("Transcription event:", e.result);
            if (e.result.reason === ResultReason.RecognizedSpeech) {
                const result: TranscriptionResult = {
                    text: e.result.text,
                    speakerId: e.result.speakerId,
                    timestamp: new Date()
                }
                this.callbacks.onTranscribed?.(result)
            }
        }
    }
    
    public async stopTranscription(): Promise<any> {
        if (this.recording) {
            await this.recording.stopAndUnloadAsync()
            const uri = this.recording.getURI()
            if (uri) {
                await this.processRecordedAudio(uri)
            }
            this.recording = null
        }
        
        if (!this.transcriber || !this.isTranscribing) {
            return
        }
        
        return new Promise((resolve, reject) => {
            if (!this.transcriber) {
                resolve()
                return
            }
            
            this.transcriber.stopTranscribingAsync(
              () => {
                  this.isTranscribing = false
                  this.cleanup()
                  resolve()
              },
              (error) => {
                  reject(new Error(`Failed to stop transcription: ${error}`))
                  this.cleanup()
              }
            )
        })
    }
    
    private async processRecordedAudio(uri: string): Promise<void> {
        try {
            // Process the recorded audio if needed
            console.log('Audio recorded at:', uri)
        } catch (error) {
            console.error('Error processing recorded audio:', error)
        }
    }
    
    private initializeStream(): AudioConfig {
        this.pushStream = AudioInputStream.createPushStream()
        return AudioConfig.fromStreamInput(this.pushStream)
    }
    
    private cleanup(): void {
        if (this.recording) {
            this.recording.stopAndUnloadAsync()
            this.recording = null
        }
        
        if (this.transcriber) {
            this.transcriber.stopTranscribingAsync(
              () => {
                  this.transcriber?.close()
                  this.transcriber = null
              },
              () => {
                  this.transcriber?.close()
                  this.transcriber = null
              }
            )
        }
        
        if (this.pushStream) {
            this.pushStream.close()
            this.pushStream = null
        }
        
        this.isTranscribing = false
    }
}
