import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NamedStyles = StyleSheet.NamedStyles;

interface PropTypes {
  name: string
  date: string
  startTime: string
  endTime: string
  issues: string | string[]
  appointmentType: string
  contact: string
}

export default function AppointmentCard (props: PropTypes): React.ReactNode {
  return (
    <View className="border rounded-2xl mx-auto" style={{width: '90%', height: 350}}>
      <View className="flex-row border-b w-full px-3" style={{height: '10%', alignItems: 'center'}}>
        <MaterialIcons name="person" size={28} color="black" />
        <Text className="text-3xl mx-auto">
          {props.name}
        </Text>
      </View>
      <View className="px-2 py-2" style={{justifyContent: 'space-evenly'}}>
        <View className="flex-row w-full" style={styles.tableCol}>
          <Text className="text-2xl">
            Data programare:
          </Text>
          <Text className="text-xl">
            {props.date}
          </Text>
        </View>
        <View className="border-b" />
        <View className="flex-row w-full" style={styles.tableCol}>
          <Text className="text-2xl">
            Interval Orar:
          </Text>
          <Text className="text-xl">
            {props.startTime} - {props.endTime}
          </Text>
        </View>
        <View className="border-b" />
        <View className="flex-row w-full" style={styles.tableCol}>
          <Text className="text-2xl">
            Tip Programare:
          </Text>
          <Text className="text-xl">
            {props.appointmentType}
          </Text>
        </View>
        <View className="border-b" />
        <View className="flex-row w-full" style={styles.tableCol}>
          <Text className="text-2xl">
            Contact:
          </Text>
          <Text className="text-xl">
            {props.contact}
          </Text>
        </View>
        <View className="border-b" />
        <View className="w-full">
          <Text className="text-2xl">
            Probleme:
          </Text>
          <ScrollView style={{height: '20%'}}>
            {Array.isArray(props.issues) &&
              props.issues.map((issue, index) => {
                return (
                  <Text key={index}>
                   - {issue}
                  </Text>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create<NamedStyles<any>>({
  tableCol: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10
  }
})
