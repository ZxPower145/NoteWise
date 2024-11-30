import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { Appbar, Button, TextInput, useTheme } from "react-native-paper";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAccount } from "@/hooks/storage/store/AccountStateProvider";

export default function Login(): React.ReactNode {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAccount();
  const theme = useTheme();
  
  const handleLogin = async () => {
    const success = await signIn({ email, password });
    if (success) {
      router.replace("/account/dashboard");
    }
  };
  
  return (
    <>
      <View style={{width: '100%', position: 'absolute', zIndex: 999}}>
        <Toast />
      </View>
      <View className='h-full w-full' style={{backgroundColor: theme.colors.background}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.replace("")} />
          <Appbar.Content title="Conectează-te" />
        </Appbar.Header>
        <SafeAreaView className='w-full p-4' style={{justifyContent: 'space-between', height: '85%'}}>
          <View style={{gap: 20}}>
            <TextInput
              mode="outlined"
              outlineColor={theme.colors.secondary}
              activeOutlineColor={theme.colors.secondary}
              label="Adresa de email"
              selectionColor="lightblue"
              cursorColor="lightblue"
              onChangeText={setEmail}
              autoCapitalize="none"
              left={<TextInput.Icon icon="email"/>}
            />
            <TextInput
              mode="outlined"
              outlineColor={theme.colors.secondary}
              activeOutlineColor={theme.colors.secondary}
              label="Parola"
              selectionColor="lightblue"
              cursorColor="lightblue"
              onChangeText={setPassword}
              left={<TextInput.Icon icon="lock"/>}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          </View>
          
          <View className="w-full align-center items-center">
            <Button
              mode="elevated"
              style={{backgroundColor: theme.colors.onBackground}}
              textColor={theme.colors.background}
              onPress={handleLogin}
            >
              Conectează-te
            </Button>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}
