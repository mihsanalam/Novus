'use client';

import React from 'react';
import { Box } from '../../components/ui/box';
import { Text } from '../../components/ui/text';
import { Button, ButtonText } from '../../components/ui/button';
import { Protect } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { View, Platform, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

// Web components - only available in web environment


// Web components - only available in web environment
const PricingTable = React.lazy(() => 
  import('@clerk/clerk-expo/web').then(m => ({ default: m.PricingTable }))
);

const PricingView = () => {
  // On web we can render the Clerk pricing table directly; on native we open the web version
  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1, paddingTop: 80, gap: 24, paddingHorizontal: 28 }}>
        <Text className="text-2xl font-semibold text-center">Premium Plans</Text>
        <React.Suspense fallback={<Text>Loading pricing options...</Text>}>
          <PricingTable newSubscriptionRedirectUrl="/billing" />
        </React.Suspense>
      </View>
    );
  }

  // native: render the billing UI inside a WebView so that login/subscription never leaves the app
  const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
  const url = `http://${host}:8081/billing`;

  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1 }}
      onShouldStartLoadWithRequest={(request) => {
        if (request.url.startsWith('novus://') || request.url.startsWith('exp://')) {
          console.log('Ignoring deep link inside WebView', request.url);
          return false;
        }
        return true;
      }}
    />
  );
};

export default function Profile() {
  return (
    <Protect plan="pro" fallback={<PricingView />}>
      <Box className="flex-1 pt-20 gap-6 px-7 items-center justify-center">
        <Box className="bg-secondary-200 p-8 rounded-3xl items-center">
          <Text className="text-3xl font-bold text-[#488cdf] mb-4">✓ Premium User</Text>
          <Text className="text-lg text-center text-typography-600">
            You have unlimited access to all courses!
          </Text>
        </Box>
        <Button
          size="md"
          onPress={() => router.back()}
          action="secondary"
          className="w-full rounded-full"
        >
          <ButtonText>Go Back</ButtonText>
        </Button>
      </Box>
    </Protect>
  );
}
