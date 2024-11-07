import { TouchableOpacity, Text } from "react-native";

interface buttonOptions {
  text: string,
  btnClass ?: string,
  txtClass ?: string,
  handlePress ?: () => void,
  isLoading ?: boolean,
}

const CustomButton = (data: buttonOptions) => {
  return (
    <TouchableOpacity
      className={`bg-hotpink rounded-xl min-h-[56px] justify-center items-center ${data.isLoading ? 'opacity-50' : ''}
      ${data.btnClass}`}
      onPress={data.handlePress}
      disabled={data.isLoading}
    >
      <Text className={`text-black font-bold text-xl ${data.txtClass}`}>
        {data.text}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
