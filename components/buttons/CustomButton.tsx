import React from "react"
import {TouchableOpacity, Text, View, StyleSheet, ViewStyle} from "react-native";
import styles from "@/constants/values/styles"
import NamedStyles = StyleSheet.NamedStyles;

interface buttonOptions {
  text: string,
  btnClass ?: string,
  txtClass ?: string,
  handlePress ?: () => void,
  isLoading ?: boolean,
  styles ?: ViewStyle
}

export default function CustomButton(data: buttonOptions): React.ReactNode  {
  return (
    <TouchableOpacity
      className={`bg-hotpink rounded-xl justify-center items-center ${data.isLoading ? 'opacity-50' : ''}
      ${data.btnClass}`}
      onPress={data.handlePress}
      disabled={data.isLoading}
      style={[{ paddingVertical: 15 }, styles.shadow, data.styles]}
    >
      <Text className={`text-black font-bold text-2xl ${data.txtClass}`}>
        {data.text}
      </Text>
    </TouchableOpacity>
  )
}
