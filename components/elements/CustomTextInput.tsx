import {TextInput, View} from "react-native"

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

const CustomTextInput = (
  { overrideClasses = '',
    extraClasses = '',
    cursorColor = 'black',
    autoCapitalize = 'sentences',
    placeholder = '',
    isMultiline = false,
    maxLength = 50,
    noOfLines = 1,
    placeholderTextColor = '',
    textAlignVertical = "bottom",
    verticalAlign = "bottom",
    value,
    onChangeText
  }: CustomTextInputProps) => {
  return (
    <View className={
        `${overrideClasses ? overrideClasses :
          `p-3 w-full rounded-xl border-b border-gray-300 ${extraClasses}`}`
      }>
      <TextInput
        cursorColor={cursorColor}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        value={String(value)}
        onChangeText={onChangeText}
        textAlignVertical={textAlignVertical}
        multiline={isMultiline}
        maxLength={maxLength}
        verticalAlign={verticalAlign}
        numberOfLines={noOfLines}
        selectionColor={'#8867f3'}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  )
}

export default CustomTextInput
