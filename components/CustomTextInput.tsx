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
        textAlignVertical='bottom'
        multiline={isMultiline}
        maxLength={maxLength}
        verticalAlign={'bottom'}
        numberOfLines={noOfLines}
        selectionColor={'#8867f3'}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  )
}

export default CustomTextInput
