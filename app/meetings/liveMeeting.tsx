import React, {useContext, useEffect, useState} from "react"
import {router, useFocusEffect, useLocalSearchParams, useNavigation} from "expo-router"
import { MeetingContext } from "@/hooks/storage/store/MeetingStateProvider";
import {View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Appbar, Card, Divider, IconButton, Text, useTheme} from "react-native-paper";
import {MeetingDataType} from "@/constants/types/CustomTypes";
import {useAzureSpeechStream} from "@/hooks/speech/useAzureSpeech";
import {KEY, REGION} from "@env"

export default function LiveMeeting(): React.ReactNode {
  const { title } = useLocalSearchParams()
  const meetingContext = useContext(MeetingContext)
  const theme = useTheme()
  
  const { isRecording } = useAzureSpeechStream(KEY, REGION, "ro-RO")
  
  const [meeting, setMeeting] = useState<MeetingDataType>({} as MeetingDataType)
  
  useEffect(() => {
    if (meetingContext?.meeting) setMeeting(meetingContext?.meeting)
  }, [meetingContext?.meeting]);
  
  useFocusEffect(React.useCallback(() => {
    const initialize = async () => {
      if (title && meetingContext) {
        meetingContext.initializeMeeting(title as string)
      }
    }
    initialize()
  }, [title, meetingContext]))
  
  return (
    <View className="w-full h-full" style={{backgroundColor: theme.colors.background}}>
      <Appbar.Header>
        <Appbar.Content title={"Ședința Live"} />
      </Appbar.Header>
      <SafeAreaView className="w-full" style={{maxHeight: "85%", padding: 30}}>
        <Card className="p-2">
          <Card.Content>
            <View className='justify-center items-center'>
              <Text className="font-bold text-2xl">{meeting.title}</Text>
            </View>
            <Divider/>
            <Text>{meeting.transcript}</Text>
            <Divider/>
            <View className="flex-row items-center justify-evenly py-4">
              <IconButton
                icon='cancel'
                size={25}
                style={{backgroundColor: theme.colors.onBackground}}
                iconColor={theme.colors.background}
                onPress={async () => {}}
              />
              <IconButton
                icon={isRecording ? 'pause-circle' : 'play-circle'}
                size={25}
                style={{backgroundColor: theme.colors.onBackground}}
                iconColor={theme.colors.background}
                onPress={async () => {}}
              />
              <IconButton
                icon='microphone'
                size={25}
                style={{backgroundColor: theme.colors.onBackground}}
                iconColor={theme.colors.background}
                onPress={async () => {}}
              />
            </View>
          </Card.Content>
        </Card>
      </SafeAreaView>
    </View>
  )
}
