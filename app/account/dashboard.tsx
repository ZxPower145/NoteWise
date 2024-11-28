import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import React, {useContext, useEffect, useState} from "react";
import {AccountContext} from "@/hooks/storage/store/AccountStateProvider";
import {router, useFocusEffect} from "expo-router";
import AppointmentCard from "@/components/cards/AppointmentCard";
import { getAppointments } from "@/services/AppointmentService";
import { Appointment } from "@/constants/types/AppointmentTypes";
import {Appbar} from "react-native-paper";

export default function Dashboard (): React.ReactNode  {
  const accountContext = useContext(AccountContext)
  const [appointments, setAppointments] = useState<Array<Appointment>>([])
  const [loading, setIsLoading] = useState<boolean>(true)
  
  useFocusEffect(React.useCallback(() => {
    if (!accountContext?.isAuthenticated) {
      setIsLoading(true)
      router.replace('/')
    }
  }, [accountContext?.isAuthenticated]))
  
  useEffect(() => {
    setIsLoading(true)
    const handleAppointments:() => void = async (): Promise<void> => {
      const fetchedAppointments = await getAppointments(accountContext?.account?.token || "")
      setAppointments(fetchedAppointments)
    }
    handleAppointments()
    if (appointments) setIsLoading(false)
  }, [accountContext?.account]);
  
  if (loading) return null
  
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title={"Programări"} />
      </Appbar.Header>
      <SafeAreaView className="w-full" style={{maxHeight: '85%'}}>
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          {
            appointments.map((appointment, index) => {
              return (
                <AppointmentCard
                  key={index}
                  name={appointment.patientName}
                  date={appointment.date}
                  startTime={appointment.startTime}
                  endTime={appointment.endTime}
                  issues={appointment.patientIssues}
                  appointmentType={appointment.type}
                  contact={appointment.patientEmail}
                />
              )
            })
          }
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
