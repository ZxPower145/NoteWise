import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { Easing, FadeInRight, FadeOutLeft, runOnJS } from 'react-native-reanimated';
import localStorage from "@/hooks/storage/local_storage/LocalStorage";

const DeleteConfirmation = () => {
  const { title } = useLocalSearchParams()
  const [isVisible, setIsVisible] = useState(true)
  
  const closeModal = () => {
    setIsVisible(false)
  }
  
  const deleteMeeting = async () => {
    if (!Array.isArray(title)) {
      await localStorage.meetings.delete(title)
      closeModal()
    }
  }
  
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ flex: 1 }}
      onPress={closeModal}
    >
      {isVisible && (
        <Animated.View
          entering={FadeInRight.duration(500).easing(Easing.in(Easing.cubic))}
          exiting={FadeOutLeft.duration(500).easing(Easing.in(Easing.cubic))
            .withCallback((finished) => {
              if (finished) {
                runOnJS(router.back)()
              }
            })
          }
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <SafeAreaView className="p-5 h-full align-center justify-center">
            <View
              className="border border-gray-300 p-5 rounded-xl gap-5"
              style={{
                backgroundColor: '#edebeb',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 40,
                shadowRadius: 40,
                elevation: 7,
              }}
              onStartShouldSetResponder={() => true}
            >
              <Text className="font-semibold text-2xl text-center">
                Are you sure you want to delete '{title}' ?
              </Text>
              <View className="flex-row justify-evenly">
                <TouchableOpacity onPress={() => {
                  deleteMeeting()
                }}>
                  <Text>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal}>
                  <Text>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

export default DeleteConfirmation;
