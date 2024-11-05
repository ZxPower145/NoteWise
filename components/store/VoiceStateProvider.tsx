import { useState, createContext } from 'react';

export const VoiceStateContext = createContext({})

export const VoiceStateProvider = ({ children }) => {
  const [voiceTranscript, setVoiceTranscript] = useState({
    error: '',
    results: [],
    partialResults: [],
  })
  
  const setError = (value) => {
    setVoiceTranscript(prevState => ({
      ...prevState,
      error: value
    }))
  }
  
  const addResults = (text: string ) => {
    if (!text) return
    setVoiceTranscript(prevState => ({
      ...prevState,
      results: [...prevState.results, {
        id: Date.now(),
        text: text
      } ]
    }))
  }
  
  const clearResults = () => {
    setVoiceTranscript(prevState => ({
      ...prevState,
      results: []
    }))
  }
  
  const addPartialResults = ( text ) => {
    if (!text) return
    setVoiceTranscript(prevState => ({
      ...prevState,
      partialResults: [...prevState.results, {
        id: Date.now(),
        text: text
      }]
    }))
  }
  
  const clearPartialResults = () => {
    setVoiceTranscript(prevState => ({
      ...prevState,
      partialResults: []
    }))
  }
  
  return (
    <VoiceStateContext.Provider
      value={{
        voiceTranscript,
        setError,
        addResults,
        clearResults,
        addPartialResults,
        clearPartialResults,
      }}>
      {children}
    </VoiceStateContext.Provider>
  )
}
