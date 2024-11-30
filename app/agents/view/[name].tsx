import React from "react"
import { Text, View } from "react-native";
import Loading from "@/components/Loading";

export default function AgentDetails(): React.ReactNode {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  
  const handleNumericInput = (text: string) => {
    const numValue = text.replace(/[^0-9]/g, '')
  }
  
  if (isLoading) {
    return <Loading/>
  }
  
  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    )
  }
}
