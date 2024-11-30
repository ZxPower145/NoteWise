import {ActivityIndicator, View} from "react-native";
import React from "react";
import {useTheme} from "react-native-paper";

export default function Loading() {
  const theme = useTheme()
  return (
    <View
      className="w-full h-full items-center justify-center"
      style={{backgroundColor: theme.colors.background}}
    >
      <ActivityIndicator animating size='large' color={theme.colors.onBackground} />
    </View>
  )
}
