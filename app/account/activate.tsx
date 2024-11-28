import React from "react";
import {Button, Text, useTheme} from "react-native-paper";
import {View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";

export default function Activate(): React.ReactNode {
  const theme = useTheme()
  return (
    <View style={{backgroundColor: theme.colors.background}}>
      <SafeAreaView className={'w-full h-full justify-center items-center'} style={{gap: 50}}>
        <Text className="text-3xl" style={{textAlign: 'center'}}>
          Un email de confirmare a fost trimis.
        </Text>
        <Text className="text-2xl" style={{textAlign: 'center'}}>
          Verifică-ți adresa de email pentru a te conecta.
        </Text>
        <Button
          mode={'elevated'}
          style={{backgroundColor: theme.colors.onBackground}}
          textColor={theme.colors.background}
          onPress={() => router.replace("/account/login")}
        >
          Conectează-te
        </Button>
      </SafeAreaView>
    </View>
  )
}
