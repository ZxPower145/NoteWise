import {AgentDataType} from "@/constants/CustomTypes";
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";;
import localStorage from "@/hooks/storage/LocalStorage";
import {useContext, useEffect, useState} from "react";
import {router} from "expo-router";
import Animated, { Easing, FadeInRight, FadeOutLeft, runOnJS } from 'react-native-reanimated';
import {MeetingContext} from "@/components/store/MeetingStateProvider";

const SelectAgents = () => {
  
  const [isVisible, setIsVisible] = useState(true)
  
  const [agents, setAgents] = useState<AgentDataType[]>([])
  
  const {
    meeting, initializeMeeting, addAgent, removeAgent, updateTranscript
  } = useContext(MeetingContext)
  
  useEffect(() => {
    const getAllAgents = async () => {
      try {
        const localAgents = await localStorage.agents.getAll()
        setAgents(localAgents)
      } catch (error) {
        console.error("Error fetching agents:", error)
      }
    }
    getAllAgents()
  }, [])
  
  const closeModal = () => {
    setIsVisible(false)
  }
  
  return (
    <TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={closeModal}>
      { isVisible && (
        <Animated.View
          entering={FadeInRight.duration(500).easing(Easing.in(Easing.cubic))}
          exiting={FadeOutLeft.duration(500).easing(Easing.in(Easing.cubic))
            .withCallback((finished) => {
              if (finished) {
                runOnJS(router.back)()
              }
            })
          }
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
          <SafeAreaView className="p-5 bg-white border border-gray-300 rounded-xl align-center justify-center"
            style={{
              height: '40%',
              width: '70%',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 40,
              shadowRadius: 40,
              elevation: 7,
            }}
          >
            <ScrollView contentContainerStyle={{
              height: '100%', flexGrow: 1, justifyContent: 'space-evenly'
            }}
                        className="gap-3">
              { agents.length > 0 ? (
                agents.map((agent, index) => (
                  <View key={index}
                    className="flex-row items-center justify-center px-1 my-1"
                  >
                    <TouchableOpacity
                      onPress={() => {
                        addAgent(agent)
                        router.back()
                      }}
                      className="w-full border border-gray-300 rounded-2xl p-4"
                      style={{
                        backgroundColor: '#a6a6a6',
                      }}
                    >
                      <Text className="text-3xl text-center font-semibold">{agent.name}</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text className="text-xl text-center font-semibold">No agents available</Text>
              )
              }
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      )}
    </TouchableOpacity>
  )
}

export default SelectAgents
