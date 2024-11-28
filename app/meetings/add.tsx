import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { MeetingDataType } from "@/constants/types/CustomTypes"
import localStorage from "@/hooks/storage/local_storage/LocalStorage"
import { Response } from "@/constants/types/CustomTypes"
import {Appbar, Button, IconButton, Text, TextInput, useTheme} from "react-native-paper";
import {View} from "react-native";
import Toast from "react-native-toast-message";

export default function Add(): React.ReactNode {
  const theme = useTheme()
  const date = new Date()
  const localDate = date.toLocaleDateString("ro-RO")
  const hour = date.getHours()
  const minutes = date.getMinutes().toString()
  
  const [meetingData, setMeetingData] = useState<MeetingDataType>({
    title: '',
    date: localDate,
    startTime: `${hour}:${minutes.length > 1 ? minutes : '0' + minutes}`,
    initialDetails: '',
    transcript: '',
    agents: []
  })
  
  const [placeholder, setPlaceholder] = useState<any>({
    text: 'Meeting Title',
    color: 'black'
  })
  
  const updateTitle = (newTitle: string) => {
    setMeetingData((prevData: MeetingDataType) => ({
      ...prevData,
      title: newTitle
    }))
  }
  
  const updateInitialDetails = (newDetails: string) => {
    setMeetingData((prevData: MeetingDataType) => ({
      ...prevData,
      initialDetails: newDetails
    }))
  }
  
  const saveData = async (data: MeetingDataType) : Promise<void> => {
    try {
      let response: Response = await localStorage.meetings.add(data)
      if (response.status === 200) {
        router.push({
          pathname: '/meetings/liveMeeting',
          params: {
            title: meetingData.title
          }
        })
      }
    } catch (error: any) {
      setPlaceholder({
        text: error.message,
        color: "red"
      })
    }
  }
  
  return (
    <>
      <View style={{width: '100%', position: 'absolute', zIndex: 999}}>
        <Toast />
      </View>
      <View className="w-full h-full">
        <Appbar.Header style={{backgroundColor: theme.colors.background}}>
          <Appbar.BackAction onPress={() => {router.back()}} />
          <Appbar.Content title={"Adaugă o ședința"} />
        </Appbar.Header>
        <SafeAreaView style={{height: '80%', justifyContent: 'flex-start', gap: 40}}>
          <View style={{paddingHorizontal: 30, gap: 40}}>
            <TextInput
              mode="outlined"
              outlineColor={theme.colors.secondary}
              activeOutlineColor={theme.colors.secondary}
              label="Titlu"
              selectionColor={'lightblue'}
              cursorColor={"lightblue"}
              onChangeText={(text: string) => updateTitle(text)}
              left={<TextInput.Icon icon={"format-title"}/>}
            />
            <View>
              <TextInput
                mode="outlined"
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.secondary}
                label="Detalii inițiale"
                selectionColor={'lightblue'}
                cursorColor={"lightblue"}
                multiline
                numberOfLines={8}
                onChangeText={(text: string) => updateInitialDetails(text)}
                left={<TextInput.Icon icon={"format-title"}/>}
              />
              <Text className="px-2 text-lg">
                Sau începe cu detaliile inițiale în ședința:
              </Text>
            </View>
          </View>
          <View className="w-full items-center justify-center">
            <IconButton
              icon='microphone'
              size={50}
              style={{backgroundColor: theme.colors.onBackground}}
              iconColor={theme.colors.background}
              onPress={async () =>
                await saveData(meetingData)
              }
            />
          </View>
        </SafeAreaView>
      </View>
    </>
  )
}
