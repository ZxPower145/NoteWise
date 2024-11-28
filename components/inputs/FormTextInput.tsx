import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import NamedStyles = StyleSheet.NamedStyles;

interface FormTextInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder: string
  secureText?: boolean
  beforeIcon?: any
  afterIcon?: any
  textInputStyles?: any
  containerStyles?: any
}


export default function FormTextInput(props: FormTextInputProps) : React.ReactNode {
  return (
    <>
      <View style={[styles.container, props.containerStyles]}>
        {props.beforeIcon}
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureText}
          placeholder={props.placeholder}
          style={[styles.textInput, props.textInputStyles]}
          className="text-2xl"
        />
        {props.afterIcon}
      </View>
    </>
  )
}

const styles = StyleSheet.create<NamedStyles<any>>({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.24,
    shadowRadius: 15.38,
    elevation: 19,
    gap: 15
  },
});
