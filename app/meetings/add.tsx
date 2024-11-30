import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { MeetingDataType } from "@/constants/types/CustomTypes"
import { Appbar, IconButton, Text, TextInput, useTheme } from "react-native-paper"
import { View } from "react-native"
import Toast from "react-native-toast-message"
import { useMeeting } from "@/hooks/storage/store/MeetingStateProvider";

export default function Add(): React.ReactNode {
  const theme = useTheme()
  const { createMeeting, initializeMeeting } = useMeeting()
  
  const date = new Date()
  const localDate = date.toLocaleDateString("ro-RO")
  const hour = date.getHours()
  const minutes = date.getMinutes().toString()
  
  const [meetingData, setMeetingData] = React.useState<MeetingDataType>({
    title: '',
    date: localDate,
    startTime: `${hour}:${minutes.length > 1 ? minutes : '0' + minutes}`,
    initialDetails: '',
    transcript: '',
    agents: []
  })
  
  const updateTitle = (newTitle: string) => {
    setMeetingData(prevData => ({
      ...prevData,
      title: newTitle
    }))
  }
  
  const updateInitialDetails = (newDetails: string) => {
    setMeetingData(prevData => ({
      ...prevData,
      initialDetails: newDetails
    }))
  }
  
  const saveData = async () => {
    if (!meetingData.title) {
      Toast.show({
        type: 'error',
        text1: 'Titlul este obligatoriu',
        text2: 'Error'
      })
      return
    } else {
      try {
        const response = await createMeeting(meetingData)
        if (response.status === 200) {
          await initializeMeeting(meetingData.title)
          router.push('/meetings/liveMeeting')
        } else {
          Toast.show({
            type: 'error',
            text1: response.message,
            text2: 'EROARE'
          })
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to create meeting'
        })
      }
    }
  }
  
  return (
    <>
      <View style={{width: '100%', position: 'absolute', zIndex: 999}}>
        <Toast />
      </View>
      <View className="w-full h-full" style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: theme.colors.background}}>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title="Adaugă o ședința" />
        </Appbar.Header>
        <SafeAreaView className="h-full w-full" style={{backgroundColor: theme.colors.background, gap: 50}}>
          <View style={{paddingHorizontal: 30, gap: 40}}>
            <TextInput
              mode="outlined"
              outlineColor={theme.colors.secondary}
              activeOutlineColor={theme.colors.secondary}
              label="Titlu"
              selectionColor="lightblue"
              cursorColor="lightblue"
              onChangeText={updateTitle}
              left={<TextInput.Icon icon="format-title"/>}
            />
            <View>
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Detalii inițiale"
                selectionColor="lightblue"
                cursorColor="lightblue"
                multiline
                numberOfLines={8}
                onChangeText={updateInitialDetails}
                left={<TextInput.Icon icon="comment-text-outline"/>}
              />
              <Text className="px-2 text-lg">
                Sau începe cu detaliile inițiale în ședința:
              </Text>
            </View>
          </View>
          <View className="w-full justify-center items-center">
            <IconButton
              icon="microphone"
              size={50}
              style={{backgroundColor: theme.colors.onBackground}}
              iconColor={theme.colors.background}
              onPress={saveData}
            />
          </View>
        </SafeAreaView>
      </View>
    </>
  )
}
