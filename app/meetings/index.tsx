import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"
import {router, useFocusEffect } from "expo-router"
import localStorage from "@/hooks/storage/local_storage/LocalStorage";
import { MeetingDataType } from "@/constants/types/CustomTypes";
import {View} from "react-native";
import {Appbar, Divider, Drawer, Text, useTheme} from "react-native-paper";

export default function Index(): React.ReactNode {
  const [meetings, setMeetings] = useState<Array<MeetingDataType>>([])
  const [activeMeeting, setActiveMeeting] = useState<MeetingDataType | null>(null)
  const theme = useTheme()
  
  useFocusEffect(React.useCallback(() => {
    const getMeetings = async (): Promise<void> => {
      const meetingsArr: Array<MeetingDataType> | null = await localStorage.meetings.getAll()
      if (meetingsArr) {
        setMeetings(meetingsArr)
      } else {
        setMeetings([])
      }
    }
    
    getMeetings()
  }, []))
  
  return (
    <View className="h-full w-full" style={{backgroundColor: theme.colors.background}}>
      <Appbar.Header className="shadow">
        <Appbar.Content title={"Meetings"} />
        <Appbar.Action icon={'file-plus-outline'} onPress={() => router.push('/meetings/add')} />
      </Appbar.Header>
      <SafeAreaView className="h-full px-2">
        <Drawer.Section>
          {meetings.map((meeting, index) => {
            return (
              <>
                <Drawer.Item
                  key={index}
                  label={meeting.title}
                  active={activeMeeting === meeting}
                  onPress={() => setActiveMeeting(meeting)}
                  icon={'file-document'}
                  right={() =>
                    <View className="items-center justify-center">
                      <Text style={{fontWeight: 'semibold'}}>{meeting.date}</Text>
                      <Text>{meeting.startTime}</Text>
                    </View>} />
            </>
            )
          })}
        </Drawer.Section>
        {/*<MeetingElement*/}
        {/*  key={index}*/}
        {/*  startTime={item.startTime}*/}
        {/*  date={item.date}*/}
        {/*  title={item.title}*/}
        {/*/>*/}
      </SafeAreaView>
    </View>
  )
}
