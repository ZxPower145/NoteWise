import { Stack } from "expo-router"
import {StatusBar} from "expo-status-bar"
import {AgentStateProvider} from "@/hooks/storage/store/AgentStateProvider";

const AgentsLayout = () => {
  return (
    <AgentStateProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: false
        }}/>
        
        <Stack.Screen name="add" options={{
          title: "Add a new Agent"
        }}/>
        
        <Stack.Screen name="view/[name]" />
      </Stack>
      <StatusBar backgroundColor={'black'} style={'light'} />
    </AgentStateProvider>
  )
}

export default AgentsLayout
