import { useState, createContext } from 'react';

export const VoiceStateContext = createContext({})

export const VoiceStateProvider = ({ children }) => {
  const [voiceToText, setVoiceToText] = useState({
    recognized: '',
    pitch: '',
    error: '',
    started: false,
    results: [{
      speaker: '',
      text: ''
    }],
    partialResults: [{
      speaker: '',
      text: ''
    }],
    end: true
  })
  
  const setRecognized = (value) => {
    setVoiceToText(prevState => ({
      ...prevState,
      recognized: value
    }))
  }
  
  const setPitch = (value) => {
    setVoiceToText(prevState => ({
      ...prevState,
      pitch: value
    }))
  }
  
  const setError = (value) => {
    setVoiceToText(prevState => ({
      ...prevState,
      error: value
    }))
  }
  
  const setStarted = (value: boolean) => {
    setVoiceToText(prevState => ({
      ...prevState,
      started: value
    }))
  }
  
  const addResults = (text: string, speaker = '' ) => {
    setVoiceToText(prevState => ({
      ...prevState,
      results: [...prevState.results, {
        speaker: speaker,
        text: text
      }]
    }))
  }
  
  const addPartialResults = ( text, speaker?) => {
    setVoiceToText(prevState => ({
      ...prevState,
      partialResults: [...prevState.results, {
        speaker: speaker ? speaker : '',
        text: text
      }]
    }))
  }
  
  const setEnded = (value) => {
    setVoiceToText(prevState => ({
      ...prevState,
      end: value
    }))
  }
  
  return (
    <VoiceStateContext.Provider
      value={{
        voiceToText,
        setRecognized,
        setPitch,
        setError,
        setStarted,
        addResults,
        addPartialResults,
        setEnded
      }}>
      {children}
    </VoiceStateContext.Provider>
  )
  
}
