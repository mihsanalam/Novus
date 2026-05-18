import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { useRouter } from 'expo-router';
import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useAuth, useUser } from '@clerk/clerk-expo'

const index = () => {
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    refreshUser();
  }, [user]);

  const refreshUser = async () => {
    if (!user || typeof user.reload !== "function") return;
    try {
      await user.reload();
    } catch (err) {
      console.warn("User reload failed:", err);
    }
  }

  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (!isLoaded) return;

    const timer = setTimeout(() => {
      if (isSignedIn) {
        router.replace("/(main)/home");
      } else {
        router.replace("/(auth)/welcome");
      }
    }, 1500);

    return () => clearTimeout(timer);

  }, [isSignedIn, isLoaded]);

  return (
    <ImageBackground
      source={require("../assets/images/background.jpeg")}
      resizeMode="cover"
      className="flex-1"
    >
      <Animated.View entering={FadeIn.duration(100)} className="flex-1">
        <Center className="flex-1">
          <View className="items-center gap-3">
            <Image
              style={{ width: 400, height: 300 }}
              source={require("../assets/images/logo.png")}
              resizeMode="contain"
            />
            <Text className="text-white text-5xl font-bold">
              NOVUS
            </Text>
          </View>
        </Center>
      </Animated.View>
    </ImageBackground>
  )
};

export default index;

const styles = StyleSheet.create({});