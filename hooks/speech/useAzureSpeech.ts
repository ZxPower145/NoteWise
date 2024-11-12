import { useState, useEffect, useCallback } from 'react';
import { AzureSpeechService, TranscriptionResult, TranscriptionError } from './AzureSpeechService';

export const useAzureSpeech = (
  subscriptionKey: string,
  serviceRegion: string,
  language: "en-US" | "ro-RO" = "en-US"
) => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [transcription, setTranscription] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [speechService] = useState(() => new AzureSpeechService(subscriptionKey, serviceRegion, language))
  
  useEffect(() => {
    speechService.setCallbacks({
      onTranscribed: (result: TranscriptionResult) => {
        console.log("Transcription received:", result.text);
        setTranscription(prev => prev + '\n' + result.text);
      },
      onError: (error: TranscriptionError) => {
        console.log("Error occurred:", error.errorDetails);
        setError(error.errorDetails);
      },
      onSessionStarted: (sessionId: string) => {
        console.log("Session started:", sessionId);
      },
      onSessionStopped: (sessionId: string) => {
        console.log("Session stopped:", sessionId);
      },
    });
  }, [speechService])
  
  const startRecording = useCallback(async () => {
    try {
      await speechService.startRecordingAndTranscribing()
      setIsRecording(true)
      setError(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to start recording');
      setIsRecording(false);
    }
  }, [speechService])
  
  const stopRecording = useCallback(async () => {
    try {
      await speechService.stopTranscription()
      setIsRecording(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stop recording')
    }
  }, [speechService])
  
  return {
    isRecording,
    transcription,
    error,
    startRecording,
    stopRecording
  }
}
