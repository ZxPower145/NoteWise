import React from "react";
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import { ScrollView, View } from "react-native";
import Loading from "@/components/Loading";
import { useMeeting } from "@/hooks/storage/store/MeetingStateProvider";
import { MeetingDataType } from "@/constants/types/CustomTypes";
import {
  Appbar,
  Button,
  Dialog,
  Divider,
  Drawer,
  IconButton,
  MD3Theme,
  Portal,
  Text,
  useTheme
} from "react-native-paper";

export default function Index(): React.ReactNode {
  const [activeMeeting, setActiveMeeting] = React.useState<MeetingDataType | null>(null)
  const [isDeleteVisible, setIsDeleteVisible] = React.useState(false)
  const { meetings, loading, deleteMeeting } = useMeeting()
  const theme: MD3Theme = useTheme()
  
  const handleView: () => void = (): void => {/*TODO: Handle View*/}
  
  const handleDelete: () => void = (): void => setIsDeleteVisible(true)
  
  const acceptDelete: () => Promise<void> = async (): Promise<void> => {
    if (activeMeeting) {
      await deleteMeeting(activeMeeting.title)
      setActiveMeeting(null)
      setIsDeleteVisible(false)
    }
  }
  
  if (loading) return <Loading />
  
  return (
    <View className="h-full w-full" style={{backgroundColor: theme.colors.background}}>
      <Portal>
        <Dialog visible={isDeleteVisible}>
          <Dialog.Title>Sunteți sigur că vreți să ștergeți această consultație?</Dialog.Title>
          <Dialog.Content>
            <Text className="text-2xl">Aceasta acțiune este permanenta!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDeleteVisible(false)}>Nu</Button>
            <Button onPress={acceptDelete}>Da</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      
      <Appbar.Header className="shadow">
        <Appbar.Content title="Meetings" />
        <Appbar.Action icon="file-plus-outline" onPress={() => router.push('/meetings/add')} />
      </Appbar.Header>
      
      <View className="w-full justify-between" style={{height: '85%'}}>
        <SafeAreaView className="h-full px-2 justify-between" style={{height: '90%'}}>
          <ScrollView style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.onBackground}}>
            <Drawer.Section>
              {meetings.map((meeting, index) => (
                <View key={meeting.title} className="flex justify-center">
                  <Drawer.Item
                    label={meeting.title}
                    active={activeMeeting?.title === meeting.title}
                    onPress={() => setActiveMeeting(meeting)}
                    icon="file-document"
                    right={() => (
                      <View className="items-center justify-center">
                        <Text style={{fontWeight: 'semibold'}}>{meeting.date}</Text>
                        <Text>{meeting.startTime}</Text>
                      </View>
                    )}
                  />
                  {index < (meetings.length - 1) && <Divider style={{marginVertical: 5}} />}
                </View>
              ))}
            </Drawer.Section>
          </ScrollView>
        </SafeAreaView>
        
        {activeMeeting && (
          <View className="w-full flex-row gap-2 px-3">
            <IconButton
              icon="tooltip-edit"
              iconColor={theme.colors.primary}
              size={32}
              onPress={handleView}
            />
            <IconButton
              icon="delete"
              iconColor={theme.colors.primary}
              size={32}
              onPress={handleDelete}
            />
          </View>
        )}
      </View>
    </View>
  )
}
