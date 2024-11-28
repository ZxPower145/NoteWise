import React from 'react';
import { TextInput, View } from "react-native"

interface CustomTextInputProps {
  overrideClasses?: string
  extraClasses?: string
  cursorColor?: string
  placeholder?: string
  placeholderTextColor?: string
  autoCapitalize?: 'none' | 'characters' | 'words' | 'sentences'
  isMultiline?: boolean
  maxLength?: number
  noOfLines?: number
  textAlignVertical?: "auto" | "top" | "bottom" | "center" | undefined
  verticalAlign?: "auto" | "top" | "bottom" | "middle" | undefined
  value: string
  onChangeText: (text: string) => void
}

export default function CustomTextInput(props: CustomTextInputProps): React.ReactNode {
  return (
    <View
      className={`${props.overrideClasses ? props.overrideClasses :  `p-3 w-full rounded-xl border-b border-gray-300 ${props.extraClasses}`}`}>
      <TextInput
        cursorColor={props.cursorColor}
        autoCapitalize={props.autoCapitalize}
        placeholder={props.placeholder}
        value={String(props.value)}
        onChangeText={props.onChangeText}
        textAlignVertical={props.textAlignVertical}
        multiline={props.isMultiline}
        maxLength={props.maxLength}
        verticalAlign={props.verticalAlign}
        numberOfLines={props.noOfLines}
        selectionColor={'#8867f3'}
        placeholderTextColor={props.placeholderTextColor}
      />
    </View>
  )
}
