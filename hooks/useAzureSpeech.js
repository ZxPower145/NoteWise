import { useState, useCallback } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const useAzureSpeechToText = (azureSubscriptionKey, azureRegion) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  // Updated audio settings to ensure compatibility
  const audioSettings = {
    android: {
      extension: '.wav',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_RIFF,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_PCM,  // Changed to PCM
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 256000,  // Increased bitrate
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,  // Changed to MAX
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 256000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const startRecording = useCallback(async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        throw new Error('Audio recording permissions not granted');
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,  // Added to prevent recording interruption
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(audioSettings);
      await newRecording.startAsync();

      setRecording(newRecording);
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to start recording:', err);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      setIsRecording(false);

      const uri = recording.getURI();
      console.log('Recording URI:', uri);  // Added for debugging

      const audioBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64
      });

      // Updated endpoint to use conversation model
      const endpoint = `https://${azureRegion}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;

      // Added more query parameters
      const queryParams = new URLSearchParams({
        'language': 'en-US',
        'format': 'detailed',
        'profanity': 'raw',
        'timestamps': 'true'
      });

      const response = await fetch(`${endpoint}?${queryParams}`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': azureSubscriptionKey,
          'Content-Type': 'audio/wav',  // Simplified content type
          'Accept': 'application/json',
        },
        body: binaryStringToArrayBuffer(atob(audioBase64))
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('API Error Response:', errorBody);  // Added for debugging
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      const result = await response.json();
      console.log('API Response:', JSON.stringify(result, null, 2));  // Pretty print response

      if (result.RecognitionStatus === 'Success') {
        // Check all possible text fields
        const transcriptText =
            result.DisplayText ||
            (result.NBest && result.NBest[0] && (
                result.NBest[0].Display ||
                result.NBest[0].Lexical ||
                result.NBest[0].ITN
            )) || '';

        setTranscript(transcriptText);
        return transcriptText;
      } else {
        throw new Error(`Recognition failed: ${result.RecognitionStatus}`);
      }

    } catch (err) {
      setError(err.message);
      console.error('Failed to stop recording or transcribe:', err);
      throw err;
    } finally {
      setRecording(null);
      if (recording) {
        const uri = recording.getURI();
        try {
          await FileSystem.deleteAsync(uri);
        } catch (e) {
          console.warn('Failed to delete recording file:', e);
        }
      }
    }
  }, [recording, azureSubscriptionKey, azureRegion]);

  const binaryStringToArrayBuffer = (binaryString) => {
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  return {
    isRecording,
    transcript,
    error,
    startRecording,
    stopRecording,
  };
};

export default useAzureSpeechToText;
