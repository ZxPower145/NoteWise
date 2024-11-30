import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAppointments } from "@/services/AppointmentService";
import { Appointment } from "@/constants/types/AppointmentTypes";
import {Appbar, MD3Theme, Text, useTheme} from "react-native-paper";
import { useAccount } from "@/hooks/storage/store/AccountStateProvider";
import Loading from "@/components/Loading";

export default function Dashboard(): React.ReactNode {
  const [appointments, setAppointments] = React.useState<Array<Appointment>>([]);
  const [loading, setLoading] = React.useState(true);
  const { account } = useAccount();
  const theme: MD3Theme = useTheme();
  
  React.useEffect((): void => {
    const fetchAppointments: () => void = async (): Promise<void> => {
      if (!account?.token) return;
      const fetchedAppointments: Appointment[] = await getAppointments(account.token);
      setAppointments(fetchedAppointments);
      setLoading(false);
    };
    
    fetchAppointments();
  }, [account?.token]);
  
  if (!account) return (
    <View className="h-full w-full justify-center items-center" style={{backgroundColor: theme.colors.background}}>
      <Text className="text-2xl" style={{color: theme.colors.onBackground}}>
        Trebuie să fii conectat pentru a vizualiza programările curente.
      </Text>
    </View>
  );
  
  if (loading) return <Loading />;
  
  return (
    <View className="w-full h-full" style={{backgroundColor: theme.colors.background}}>
      <Appbar.Header>
        <Appbar.Content title="Programări"/>
      </Appbar.Header>
      <SafeAreaView className="w-full">
        <ScrollView contentContainerStyle={{ justifyContent: "space-evenly" }}>
          {appointments.map((appointment, index) => (
            <Text key={index}>{appointment.patientEmail}</Text>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
