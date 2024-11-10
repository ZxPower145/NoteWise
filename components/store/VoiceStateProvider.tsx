import {createContext, ReactNode, useState} from "react";

interface VoiceState {
  isRecording: boolean;
  transcription: string;
  processingChunks: number;
  error: string | null;
  setIsRecording: (value: boolean) => void;
  setTranscription: (value: string | ((prev: string) => string)) => void;
  setProcessingChunks: (value: number | ((prev: number) => number)) => void;
  setError: (value: string | null) => void;
}

export const VoiceStateContext = createContext<VoiceState>({
  isRecording: false,
  transcription: '',
  processingChunks: 0,
  error: null,
  setIsRecording: () => {},
  setTranscription: () => {},
  setProcessingChunks: () => {},
  setError: () => {},
});

interface VoiceStateProviderProps {
  children: ReactNode;
}

export const VoiceStateProvider = ({ children }: VoiceStateProviderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [processingChunks, setProcessingChunks] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  return (
    <VoiceStateContext.Provider
      value={{
        isRecording,
        transcription,
        processingChunks,
        error,
        setIsRecording,
        setTranscription,
        setProcessingChunks,
        setError
      }}>
      {children}
    </VoiceStateContext.Provider>
  );
};
