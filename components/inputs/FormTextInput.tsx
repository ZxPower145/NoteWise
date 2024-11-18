import {TextInput, View} from "react-native";

interface FormTextInputProps {  // Changed from Children to Props for better naming
  value: string
  onChangeText: (text: string) => void
  placeholder: string  // Changed from placeHolder to placeholder
  beforeIcon?: any
  secureText?: boolean
  textInputWidth?: string
  viewWidth?: String
  afterIcon?: any
}

const FormTextInput = (props: FormTextInputProps) => {  // Changed from children to props
  return (
    <>
      <View className="bg-white rounded-2xl flex flex-row px-4 py-1"
            style={{
              width: `${props.viewWidth || "100%"}`,
              alignItems: "center",
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 14,
              },
              shadowOpacity:  0.24,
              shadowRadius: 15.38,
              elevation: 19
            }}>
        {props.beforeIcon}
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureText}
          placeholder={props.placeholder}
          className="px-4 py-2 text-xl mx-auto"
          style={{width: `${props.textInputWidth || "90%"}`}}
        />
        {props.afterIcon}
      </View>
    </>
  )
}

export default FormTextInput
