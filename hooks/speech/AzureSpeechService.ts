import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import {
    SpeechConfig,
    AudioConfig,
    ConversationTranscriber,
    ResultReason,
    AudioInputStream,
    PushAudioInputStream,
    AudioStreamFormat
} from 'microsoft-cognitiveservices-speech-sdk';
import {RecordingOptions} from "expo-av/build/Audio/Recording.types";

export interface TranscriptionResult {
    text: string;
    speakerId: string;
    timestamp: Date;
}

export interface TranscriptionError {
    errorDetails: string;
    sessionId?: string;
}

export interface TranscriptionCallbacks {
    onTranscribed?: (result: TranscriptionResult) => void;
    onError?: (error: TranscriptionError) => void;
    onSessionStarted?: (sessionId: string) => void;
    onSessionStopped?: (sessionId: string) => void;
    onCanceled?: (error: TranscriptionError) => void;
}

export class AzureSpeechService {
    private speechConfig: SpeechConfig | null = null;
    private pushStream: PushAudioInputStream | null = null;
    private transcriber: ConversationTranscriber | null = null;
    private isTranscribing: boolean = false;
    private recording: Audio.Recording | null = null;
    private callbacks: TranscriptionCallbacks = {};
    private lastProcessedPosition: number = 0;
    
    constructor(
      private readonly subscriptionKey: string,
      private readonly serviceRegion: string,
      private readonly language: "en-US" | "ro-RU"
    ) {
        this.initializeAudioPermissions();
    }
    
    public setCallbacks(callbacks: TranscriptionCallbacks) {
        this.callbacks = callbacks;
    }
    
    private async initializeAudioPermissions(): Promise<void> {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
            });
        } catch (error) {
            throw new Error(`Failed to initialize audio permissions: ${error}`);
        }
    }
    
    private initialize(): void {
        try {
            if (!this.speechConfig) {
                this.speechConfig = SpeechConfig.fromSubscription(
                  this.subscriptionKey,
                  this.serviceRegion
                );
                this.speechConfig.speechRecognitionLanguage = this.language;
            }
        } catch (error) {
            throw new Error(`Failed to initialize speech service: ${error}`);
        }
    }
    
    public async startRecordingAndTranscribing(): Promise<any> {
        try {
            this.initialize();
            
            if (!this.speechConfig) {
                throw new Error("SpeechConfig initialization failed");
            }
            
            const recordingOptions: RecordingOptions = {
                isMeteringEnabled: true,
                android: {
                    extension: '.m4a',
                    outputFormat: Audio.AndroidOutputFormat.MPEG_4,
                    audioEncoder: Audio.AndroidAudioEncoder.AAC,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 128000,
                },
                ios: {
                    extension: '.m4a',
                    outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
                    audioQuality: Audio.IOSAudioQuality.HIGH,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 128000,
                    linearPCMBitDepth: 16,
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
                web: {
                    mimeType: 'audio/webm',
                    bitsPerSecond: 128000,
                }
            };
            
            this.recording = new Audio.Recording();
            await this.recording.prepareToRecordAsync(recordingOptions);
            
            const format = AudioStreamFormat.getWaveFormatPCM(16000, 16, 1);
            this.pushStream = AudioInputStream.createPushStream(format);
            const audioConfig = AudioConfig.fromStreamInput(this.pushStream);
            
            this.transcriber = new ConversationTranscriber(this.speechConfig, audioConfig);
            this.setupTranscriberEvents();
            
            await this.recording.startAsync();
            console.log("Recording started");
            
            return new Promise((resolve, reject) => {
                if (!this.transcriber) {
                    reject(new Error("Transcriber not initialized"));
                    return;
                }
                
                this.transcriber.startTranscribingAsync(
                  () => {
                      this.isTranscribing = true;
                      this.startAudioProcessing();
                      resolve();
                  },
                  (error) => {
                      reject(new Error(`Failed to start transcription: ${error}`));
                      this.cleanup();
                  }
                );
            });
        } catch (error) {
            this.cleanup();
            throw error;
        }
    }
    
    private async startAudioProcessing() {
        if (!this.recording) return;
        
        const processChunk = async () => {
            if (!this.isTranscribing || !this.pushStream) return;
            
            try {
                const uri = this.recording?.getURI();
                if (!uri) return;
                
                const info = await FileSystem.getInfoAsync(uri);
                if (!info.exists) return;
                
                // Get file size
                const { size } = info;
                
                // If there's new data to process
                if (size > this.lastProcessedPosition) {
                    // Read a chunk of the file
                    const chunkSize = 4096; // Adjust this value as needed
                    const options: FileSystem.ReadingOptions = {
                        encoding: FileSystem.EncodingType.Base64,
                        position: this.lastProcessedPosition,
                        length: Math.min(chunkSize, size - this.lastProcessedPosition)
                    };
                    
                    const chunk = await FileSystem.readAsStringAsync(uri, options);
                    
                    // Convert base64 to Uint8Array
                    const binaryString = atob(chunk);
                    const len = binaryString.length;
                    const bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    
                    // Write to stream
                    if (this.pushStream) {
                        this.pushStream.write(bytes);
                        this.lastProcessedPosition += Number(options.length);
                    }
                }
                
                // Continue processing if still recording
                if (this.isTranscribing) {
                    setTimeout(processChunk, 100);
                }
            } catch (error) {
                console.error('Error processing audio chunk:', error);
                this.callbacks.onError?.({
                    errorDetails: `Error processing audio: ${error instanceof Error ? error.message : String(error)}`
                });
            }
        };
        
        // Reset position counter and start processing
        this.lastProcessedPosition = 0;
        processChunk();
    }
    
    private setupTranscriberEvents(): void {
        if (!this.transcriber) return;
        
        this.transcriber.sessionStarted = (s, e) => {
            console.log("Session started:", e.sessionId);
            this.callbacks.onSessionStarted?.(e.sessionId);
        };
        
        this.transcriber.sessionStopped = (s, e) => {
            console.log("Session stopped:", e.sessionId);
            this.callbacks.onSessionStopped?.(e.sessionId);
            this.cleanup();
        };
        
        this.transcriber.canceled = (s, e) => {
            console.log("Session canceled:", e.errorDetails);
            this.callbacks.onCanceled?.({ errorDetails: e.errorDetails });
            this.cleanup();
        };
        
        this.transcriber.transcribed = (s, e) => {
            console.log("Transcription event received");
            if (e.result.reason === ResultReason.RecognizedSpeech) {
                const result: TranscriptionResult = {
                    text: e.result.text,
                    speakerId: e.result.speakerId,
                    timestamp: new Date()
                };
                console.log("Transcribed text:", result.text);
                this.callbacks.onTranscribed?.(result);
            }
        };
    }
    
    public async stopTranscription(): Promise<any> {
        if (this.recording) {
            await this.recording.stopAndUnloadAsync();
            const uri = this.recording.getURI();
            if (uri) {
                console.log('Audio recorded at:', uri);
            }
            this.recording = null;
        }
        
        if (!this.transcriber || !this.isTranscribing) {
            return;
        }
        
        return new Promise((resolve, reject) => {
            if (!this.transcriber) {
                resolve();
                return;
            }
            
            this.transcriber.stopTranscribingAsync(
              () => {
                  this.isTranscribing = false;
                  this.cleanup();
                  resolve();
              },
              (error) => {
                  reject(new Error(`Failed to stop transcription: ${error}`));
                  this.cleanup();
              }
            );
        });
    }
    
    private cleanup(): void {
        this.lastProcessedPosition = 0;
        
        if (this.recording) {
            this.recording.stopAndUnloadAsync();
            this.recording = null;
        }
        
        if (this.transcriber) {
            this.transcriber.stopTranscribingAsync(
              () => {
                  this.transcriber?.close();
                  this.transcriber = null;
              },
              () => {
                  this.transcriber?.close();
                  this.transcriber = null;
              }
            );
        }
        
        if (this.pushStream) {
            this.pushStream.close();
            this.pushStream = null;
        }
        
        this.isTranscribing = false;
    }
}
