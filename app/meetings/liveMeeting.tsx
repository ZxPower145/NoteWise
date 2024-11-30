import React from "react"
import {ScrollView, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {Appbar, Card, Divider, IconButton, MD3Theme, Text, useTheme} from "react-native-paper"
import { MeetingDataType } from "@/constants/types/CustomTypes"
import { useMeeting } from "@/hooks/storage/store/MeetingStateProvider"
// @ts-ignore
// import { KEY, REGION } from "@env"

export default function LiveMeeting(): React.ReactNode {
  const { meeting } = useMeeting()
  const theme: MD3Theme = useTheme()
  
  const [currentMeeting, setCurrentMeeting] = React.useState<MeetingDataType>({} as MeetingDataType)
  
  React.useEffect(() => {
    if (meeting.title) setCurrentMeeting(meeting);
  }, [meeting]);
  
  return (
    <View className="w-full h-full" style={{backgroundColor: theme.colors.background}}>
      <Appbar.Header>
        <Appbar.Content title="Ședința Live" />
      </Appbar.Header>
      <SafeAreaView className="w-full" style={{maxHeight: "85%", padding: 30}}>
        <Card className="p-2">
          <Card.Content>
            <View className="justify-center items-center">
              <Text className="font-bold text-2xl">{currentMeeting.title}</Text>
            </View>
            <Divider/>
            <View className="w-full p-3" style={{height: 400}}>
              <ScrollView>
                <Text style={{color: theme.colors.onBackground}}>
                  {currentMeeting.transcript}
                </Text>
              </ScrollView>
            </View>
            <Divider/>
            <View className="flex-row items-center justify-evenly py-4">
              <IconButton
                icon="cancel"
                size={25}
                style={{backgroundColor: theme.colors.onBackground}}
                iconColor={theme.colors.background}
                onPress={() => {}}
              />
              <IconButton
                icon={true ? 'pause-circle' : 'play-circle'}
                size={25}
                style={{backgroundColor: theme.colors.onBackground}}
                iconColor={theme.colors.background}
                onPress={() => {}}
              />
              <IconButton
                icon="microphone"
                size={25}
                style={{backgroundColor: theme.colors.onBackground}}
                iconColor={theme.colors.background}
                onPress={() => {}}
              />
            </View>
          </Card.Content>
        </Card>
      </SafeAreaView>
    </View>
  )
}
