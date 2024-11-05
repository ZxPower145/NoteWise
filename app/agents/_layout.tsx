import { Stack } from "expo-router";
import {StatusBar} from "expo-status-bar";

const AgentsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: false
        }}/>
        
        <Stack.Screen name="add" options={{
          title: "Add a new Agent"
        }}/>
        
        <Stack.Screen name="view/[name]" options={{
          headerShown: false
        }}/>
      </Stack>
      <StatusBar backgroundColor={'black'} style={'light'} />
    </>
  )
}

export default AgentsLayout
