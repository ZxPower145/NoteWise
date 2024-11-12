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
      onSessionStarted: (sessionId: string) => {
        console.log('Session started:', sessionId)
      },
      onSessionStopped: (sessionId: string) => {
        console.log('Session stopped:', sessionId)
        setIsRecording(false)
      },
      onCanceled: (error: TranscriptionError) => {
        console.log('Session cancelled: ', error.errorDetails)
        setError(error.errorDetails)
        setIsRecording(false)
      },
      onError: (error: TranscriptionError) => {
        console.log('Session error: ', error.errorDetails)
        setError(error.errorDetails)
      },
      onTranscribed: (result: TranscriptionResult) => {
        console.log('Recognized: ', result.text)
        setTranscription(prev => prev + '\n' + result.text);
      }
    })
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
