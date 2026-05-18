// import { GluestackUIProvider } from "@gluestack-ui/nativewind";
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';
// import "../global.css";

// import { useColorScheme } from '@/hooks/use-color-scheme';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <GluestackUIProvider>
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//         <Stack>
//           <Stack.Screen name="index" options={{ headerShown: false }} />
//           <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//           <Stack.Screen name="(main)" options={{ headerShown: false }} />
//         </Stack>
//         <StatusBar style="auto" />
//       </ThemeProvider>
//     </GluestackUIProvider>
//   );
// }

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Linking } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function MainLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode="light">
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  // listen for any deep links (Clerk may redirect to app) and log them
  useEffect(() => {
    const handler = ({ url }) => {
      console.log('Deep link received in RootLayout:', url);
    };
    const sub = Linking.addEventListener('url', handler);
    return () => sub.remove();
  }, []);

  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <MainLayout />
    </ClerkProvider>
  );
};